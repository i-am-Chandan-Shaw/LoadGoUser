import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Text, Image, Platform, TouchableOpacity } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import LocationInputButton from '../../core/component/LocationInputButton';
import { locationPermission, getCurrentLocation } from '../../core/helper/helper';
import imagePath from '../../constants/imagePath';
import style from './style';
import {REACT_APP_MAPS_API} from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-paper';
import ReceiverDetails from '../../core/View/ReceiverDetails';

const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Dashboard = () => {
    const mapRef = useRef();
    const markerRef= useRef();
    const bottomSheetRef = useRef(null)
    const snapPoints=[270]

    const navigation = useNavigation()

    // States
    const [address, setAddress] = useState({ pickUp: '', drop: '' });
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 22.5629,
        longitude: 88.3962,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    const [state, setState] = useState({
        pickupCords: {},
        dropCords: {},
        directionDetails:{},
        coordinate:new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta:LONGITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
        isLoading:true,
        currentAddress:''
    });

    useEffect(()=>{
        getLiveLocation();
    },[]);

    useEffect(()=>{
        mapRef.current.animateToRegion({
            latitude: state.pickupCords.latitude,
            longitude:state.pickupCords.longitude,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        });
        
    },[state.pickupCords])

    const startFetchingLocation=()=>{
        const interval = setInterval(() => {
            getLiveLocation()
        }, 6000)
        return ()=> clearInterval(interval)
    }

    const getLiveLocation = async () => {
        try{
            const status = await locationPermission()
            if (status) {
                const {latitude,longitude} = await getCurrentLocation();
                animate(latitude,longitude)
                setCurrentLocation((currentLoc)=>{
                    return ({
                        latitude:latitude,
                        longitude:longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    })
                })
                setAddress({
                    ...address,
                    pickUp: await getAddressFromCoordinates(latitude,longitude)
                })
                setState({
                    ...state,
                    pickupCords:{
                        latitude:latitude,
                        longitude:longitude,
                    },
                    coordinate:new AnimatedRegion({
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    })
                })
            }
        }catch(error){
            console.log(error);
        }
       
    }

    const animate=(latitude, longitude)=>{
        const newCoordinate = {latitude,longitude};
        if(Platform.OS=='android'){
            if(markerRef.current){
                markerRef.current.animateMarkerToCoordinate(newCoordinate,7000)
            }
        }else{
            state.coordinate.timing(newCoordinate).start()
        }
    }

    const searchDestination = () => {
        navigation.navigate('ChooseLocation', { getCoordinates: fetchValues, locationType:'drop' })
    }

    const searchPickup = () => {
        navigation.navigate('ChooseLocation', { getCoordinates: fetchValues, locationType:'pickup' })
    }

    const fetchValues = (data) => {
        if(data.locationType=='pickup'){
            setState(
                {
                    ...state,
                    pickupCords: {
                        latitude: data.lat,
                        longitude: data.lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                }
            );
    
            setAddress({
                ...address,
                pickUp: data.selectedAddress,
            });
        }else{
            setState(
                {
                    ...state,
                    dropCords: {
                        latitude: data.lat,
                        longitude: data.lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                }
            )
            setAddress({
                ...address,
                drop: data.selectedAddress,
            });
        }

        
        

        // bottomSheetRef.current?.present()
    }

    const onCenter= () =>{
        mapRef.current.animateToRegion({
            latitude: currentLocation.latitude,
            longitude:currentLocation.longitude,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        });
        openBottomSheet();

    }

    const getAddressFromCoordinates=(latitude, longitude) =>{
        return new Promise((resolve, reject) => {
          fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              latitude +
              ',' +
              longitude +
              '&key=' +
              GOOGLE_MAPS_API_KEY,
          )
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.status === 'OK') {
                resolve(responseJson?.results?.[3]?.formatted_address);
              } else {
                reject('not found');
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      }

    const openBottomSheet=()=>{
        bottomSheetRef.current?.present()
    }

    const cancelRoute= async ()=>{
        setState({
            ...state,
            dropCords:{},
            pickupCords:currentLocation
        });

        setAddress({
            drop:'',
            pickUp: await getAddressFromCoordinates(currentLocation.latitude,currentLocation.longitude)
            
        });

        onCenter();
    }

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <View style={style.container}>
                    {Object.keys(state.dropCords).length > 0 &&(<TouchableOpacity onPress={cancelRoute} style={style.backButton}>
                        <IonicIcon name="arrow-back-circle" size={40} color={'#222'}/>
                    </TouchableOpacity>)}
                    {Object.keys(state.dropCords).length == 0 && (<LocationInputButton
                        onPress={searchDestination}
                        iconColor={'#800000'}
                        textColor={address.drop == '' ? '#aaaa' : '#000'}
                        text={address.drop == '' ? 'Enter Drop Location' : address.drop} />)}

                    <MapView ref={mapRef} style={style.mapContainer}
                        initialRegion={currentLocation}
                        toolbarEnabled={false}
                        loadingEnabled={false}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        onMapLoaded={()=>{setState({
                            ...state,
                            isLoading:false
                        })}}
                        >

                        {/* Current Location Marker */}
                        {Object.keys(state.pickupCords).length == 0 && (<Marker.Animated 
                            coordinate={state.coordinate} 
                            onPress={searchPickup}
                            ref={markerRef} >
                           <CustomMarker  
                            headerText={'Pickup Location:'}
                            text={address.pickUp} 
                            coordinates={currentLocation} 
                            imgSrc={imagePath.pickupMarker}/>
                        </Marker.Animated>)}

                        {/* {Object.keys(state.pickupCords).length > 0 && (<Marker coordinate={state.pickupCords}>
                            <Image style={{ height: 25, width: 25 }} source={imagePath.currentLocationMarker} />
                        </Marker>)} */}

                        {Object.keys(state.pickupCords).length > 0 && (
                            <Marker 
                                onPress={searchPickup}
                                coordinate={state.pickupCords}>
                                <CustomMarker  
                                    headerText={'Pickup Location:'}
                                    text={address.pickUp} 
                                    imgSrc={imagePath.pickupMarker}/>
                            </Marker>)}
                        {Object.keys(state.dropCords).length > 0 && (
                        <Marker coordinate={state.dropCords} onPress={searchDestination}>
                            <CustomMarker  
                                headerText={'Drop Location:'}
                                text={address.drop} 
                                imgSrc={imagePath.dropMarker}/>
                        </Marker>
                        )}
                        {Object.keys(state.dropCords).length > 0 && Object.keys(state.pickupCords).length > 0 && 
                        <MapViewDirections
                            origin={state.pickupCords}
                            destination={state.dropCords}
                            apikey={GOOGLE_MAPS_API_KEY}
                            strokeWidth={3}
                            strokeColor='#666'
                            optimizeWaypoints={true}
                            onReady={result => {
                                setState({
                                    ...state,
                                    directionDetails:result
                                })
                                console.log(`Distance: ${result.distance} km`)
                                console.log(`Duration: ${result.duration} min.`)

                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    
                                });
                            }}
                        />}
                    </MapView>
                    
                    <View style={style.bottomContainer}>
                        <TouchableOpacity style={style.onCenterContainer} onPress={onCenter} >
                            <Image source={imagePath.liveLocationBtn} />
                        </TouchableOpacity>
                        {Object.keys(state.dropCords).length > 0 && (
                        <Button mode="contained" style={{backgroundColor:'#0047ab', width:'100%'}} onPress={openBottomSheet}>
                            Confirm Location
                        </Button>)}
                    </View>
                    <BottomSheetModal 
                        ref={bottomSheetRef}
                        index={0}
                        enablePanDownToClose={true}
                        backgroundStyle={{borderRadius:20, borderWidth:1, borderColor:'#d6d6d6', elevation:20}}
                        snapPoints={snapPoints}>
                        <View style={style.bottomSheetPopup}>
                            <ReceiverDetails onPress={openBottomSheet}/>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default Dashboard;