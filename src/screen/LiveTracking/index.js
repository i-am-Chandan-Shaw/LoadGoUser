import React, { useState, useRef, useEffect, } from 'react';
import { View, Dimensions, Text, Pressable, Image,Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import { REACT_APP_MAPS_API } from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import imagePath from '../../constants/imagePath';
import style from './style';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import CurrentTripDetails from '../../core/View/CurrentTripDetails';


const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const LiveTracking = (props) => {

    const bottomSheetRef = useRef(null)
    const mapRef = useRef();
    const snapPoints = [175];
    const [tripDetails, setTripDetails] = useState('');
    const [mapCoords, setMapCoords]=useState('')

    useEffect(() => {
        bottomSheetRef.current?.present();
        setTripDetails(props.route.params.details)
    }, []);

    const callSupport=()=>{
        Linking.openURL(`tel:${3326264567}`)
    }

    const onCenter=()=>{
        mapRef.current.fitToCoordinates(mapCoords);
    }

    const goBack = () => {
        props.navigation.goBack()
    }

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <View style={style.container}>
                    <View style={style.header}>
                        <TouchableOpacity onPress={goBack}>
                            <IonicIcon name="arrow-back-circle" size={40} color={'#222'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={callSupport}>
                            <Button mode='contained' textColor='#fff' style={{ backgroundColor: '#222' }}>Support</Button>
                        </TouchableOpacity>
                    </View>
                    <MapView ref={mapRef} style={style.mapContainer}
                        initialRegion={{
                            latitude: 22.5629,
                            longitude: 88.3962,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        toolbarEnabled={false}
                        loadingEnabled={false}
                        showsUserLocation={false}
                        mapType={'terrain'}
                        showsMyLocationButton={false} >

                        <Marker
                            coordinate={tripDetails.dropCoords}>
                            <CustomMarker
                                headerText={''}
                                text={tripDetails.drop}
                                imgSrc={imagePath.dropMarker} />
                        </Marker>

                        <Marker
                            coordinate={tripDetails.pickupCoords}>
                            <CustomMarker
                                headerText={''}
                                text={null}
                                imgSrc={imagePath.truck} />
                        </Marker>


                        <MapViewDirections
                            origin={tripDetails.pickupCoords}
                            destination={tripDetails.dropCoords}
                            apikey={GOOGLE_MAPS_API_KEY}
                            strokeWidth={3}
                            strokeColor='#666'
                            optimizeWaypoints={true}
                            onReady={result => {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: { top: 50, right: 10, bottom: 10, left: 50 },
                                });
                                setMapCoords(result.coordinates)  
                            }}
                        />

                    </MapView>
                    <View style={style.bottomContainer}>
                        <TouchableOpacity onPress={onCenter} style={style.onCenterContainer}  >
                            <Image source={imagePath.liveLocationBtn} />
                        </TouchableOpacity>
                    </View>

                    <BottomSheetModal
                        ref={bottomSheetRef}
                        index={0}
                        enablePanDownToClose={false}
                        backgroundStyle={{ borderRadius: 20, borderWidth: 1, borderColor: '#d6d6d6', elevation: 20 }}
                        snapPoints={snapPoints}>
                        <View style={style.bottomSheetPopup}>
                            <CurrentTripDetails data={tripDetails}/>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default LiveTracking;