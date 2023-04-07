import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Image, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {  useNavigation } from '@react-navigation/native';
import LocationInputButton from '../../core/component/LocationInputButton';
import style from './style';
import { locationPermission, getCurrentLocation } from '../../core/helper/helper';
import imagePath from '../../constants/imagePath';
import { ActivityIndicator } from 'react-native-paper';
import {REACT_APP_MAPS_API} from '@env'






const GOOGLE_MAPS_APIKEY = REACT_APP_MAPS_API;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const Dashboard = () => {
    const mapRef = useRef();
    const markerRef= useRef();
    const navigation = useNavigation()
    const [address, setAddress] = useState({ pickUp: '', drop: '' });

    useEffect(()=>{
        getLiveLocation();
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation()
        }, 6000)
        return ()=> clearInterval(interval)
    })

    const getLiveLocation = async () => {
        try{
            const status = await locationPermission()
            if (status) {
                const {latitude,longitude} = await getCurrentLocation();
                animate(latitude,longitude)
                setCurrentLocation({
                    latitude:latitude,
                    longitude:longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                })
                setState({
                    ...state,
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


    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.4,
        longitudeDelta: LONGITUDE_DELTA,
    })
    const [state, setState] = useState({
        pickupCords: {},
        dropCords: {},
        coordinate:new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.4,
            longitudeDelta: LONGITUDE_DELTA,
        }),
        isLoading:false
    })

    

    

    

    

    const choosePickup = () => {
        navigation.navigate('ChooseLocation', { getCoordinates: fetchValues })
    }

    const fetchValues = (data, address) => {
        setState(
            {
                ...state,
                pickupCords: {
                    latitude: data.pickUp.lat,
                    longitude: data.pickUp.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
                dropCords: {
                    latitude: data.drop.lat,
                    longitude: data.drop.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
            }
        )

        setAddress({
            pickUp: address.pickUp,
            drop: address.drop
        })
    }

    const onCenter=()=>{
        mapRef.current.animateToRegion({
            latitude: currentLocation.latitude,
            longitude:currentLocation.longitude,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        })
    }

    

    return (
        <View>
        <View style={style.loaderContainer}>
            {state.isLoading && <ActivityIndicator size={'medium'}/>}
        </View>
            <View>
                 <LocationInputButton
                    onPress={choosePickup}
                    iconColor={'green'}
                    textColor={address.pickUp == '' ? '#aaaa' : '#000'}
                    text={address.pickUp == '' ? 'Enter Pickup Location' : address.pickUp} />

            <MapView ref={mapRef} style={{ width: '100%', height: 420 }}
                initialRegion={{
                    latitude: 22.5629,
                    longitude: 88.3962,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }} >



                <Marker.Animated 
                    coordinate={state.coordinate}
                    ref={markerRef} >
                    <Image style={{ height: 35, width: 35 }} source={imagePath.currentLocationMarker} />
                </Marker.Animated>
                {Object.keys(state.pickupCords).length > 0 && (<Marker pinColor='green' coordinate={state.pickupCords} />)}
                {Object.keys(state.dropCords).length > 0 && (<Marker coordinate={state.dropCords} />)}

                {Object.keys(state.dropCords).length > 0 && (<MapViewDirections
                    origin={state.pickupCords}
                    destination={state.dropCords}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor='#666'
                    optimizeWaypoints={true}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)

                        mapRef.current.fitToCoordinates(result.coordinates, {
                            
                        });
                    }}
                />)}
            </MapView>
            <TouchableOpacity style={{
                position:'absolute',
                bottom:0,
                right:0
            }} onPress={onCenter} >
                <Image source={imagePath.liveLocationBtn} />
            </TouchableOpacity>
            <View style={style.bottomContainer}>
                <LocationInputButton
                    onPress={choosePickup}
                    textColor={address.drop == '' ? '#aaa' : '#000'}
                    iconColor={'#800000'}
                    text={address.drop == '' ? 'Enter Drop Location' : address.drop} />
            </View>
           </View>
        </View>
    )
}

export default Dashboard;