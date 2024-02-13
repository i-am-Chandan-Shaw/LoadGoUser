import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, Image, Platform, TouchableOpacity, Linking, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import LocationInputButton from '../../core/component/LocationInputButton';
import { locationPermission, getCurrentLocation, getAddressFromCoordinates } from '../../core/helper/helper';
import imagePath from '../../constants/imagePath';
import style from './style';
import { REACT_APP_MAPS_API } from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-paper';
import ReceiverDetails from '../../core/View/ReceiverDetails';
import LocationAccess from '../LocationAccess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from '../../core/helper/services';
const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const Dashboard = () => {
    const mapRef = useRef();
    const markerRef = useRef();
    const bottomSheetRef = useRef(null);
    const snapPoints = [270];
    const [isRiding, setIsRiding] = useState(false)

    const navigation = useNavigation();

    // States
    const [address, setAddress] = useState({ pickUp: '', drop: '' });
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationAccessed, setLocationAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tripData, setTripData] = useState(null)
    const [state, setState] = useState({
        pickupCords: {},
        dropCords: {},
        directionDetails: {},
        coordinate: new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: LONGITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
        currentAddress: ''
    });
    const [amount, setAmount] = useState({
        tataAce: null,
        bolero: null,
        bike: null
    });

    const [fare, setFare] = useState({
        baseFare: 200,
        perKm: 30,
        perHour: 100
    })

    useEffect(() => {
        getLiveLocation(false);
        getTripFare();
        fetchTripId();
        return () => clearTimeout(waitForTrip);
    }, []);




    const fetchTripId = async () => {
        try {
            const value = await AsyncStorage.getItem('tripId');
            console.log(value);
            if (value) {
                checkFoTipStatus(value);
            } else {
                console.log(key, 'Data not found!');
                return false
            }
        } catch (error) {
            console.log('Error retrieving getRideStatus data:', error);
            return false
        }
    }

    let waitForTrip;

    const checkFoTipStatus = async (id) => {
        try {
            let trip = await getTripStatus(id);
            if (trip) {
                if (trip.status == 1) {
                    waitForTrip = setTimeout(() => {
                        checkFoTipStatus(id);
                        setIsRiding(false)
                    }, 3000);
                } else if (trip.status == 2 || trip.status == 4) {
                    console.log('ride accepted');
                    setIsRiding(true)
                    const data = {
                        ...trip,
                        pickupCoords: {
                            "latitude": parseFloat(trip.pickUpCoords.pickUpLat),
                            "latitudeDelta": 0.0122,
                            "longitude": parseFloat(trip.pickUpCoords.pickUpLng),
                            "longitudeDelta": 0.0061627689429373245
                        },
                        dropCoords: {
                            "latitude": parseFloat(trip.dropCoords.dropLat),
                            "latitudeDelta": 0.0122,
                            "longitude": parseFloat(trip.dropCoords.dropLng),
                            "longitudeDelta": 0.0061627689429373245
                        }
                    }

                    setTripData(data)
                    waitForTrip = setTimeout(() => {
                        checkFoTipStatus(id)
                    }, 3000);

                } else {
                    setIsRiding(false)
                    clearTimeout(waitForTrip);
                }
            }
        } catch (error) {
            clearTimeout(waitForTrip);
            console.log(error);
        }
    }



    const getTripStatus = async (id) => {
        const queryParameter = '?tripId=' + id.toString()
        try {
            const data = await get('getRequestVehicle', queryParameter);
            if (data) {
                return data[0]
            }
        } catch (error) {
            console.log('getTripStatus', error);
        }
    }

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: state.pickupCords.latitude,
                longitude: state.pickupCords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            });
        }

    }, [state.pickupCords])

    const startFetchingLocation = () => {
        const interval = setInterval(() => {
            getLiveLocation(false)
        }, 6000)
        return () => clearInterval(interval)
    }

    const getLiveLocation = async (openSettings) => {
        openSettings = openSettings ? true : openSettings;
        try {
            setLocationAccess(false);
            const status = await locationPermission()
            if (status == 'granted') {
                setIsLoading(true);
                const { latitude, longitude } = await getCurrentLocation();
                animate(latitude, longitude);
                setCurrentLocation(() => {
                    return ({
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    })
                });
                setLocationAccess(true);
                setAddress({
                    ...address,
                    pickUp: await getAddressFromCoordinates(latitude, longitude)
                })
                setState({
                    ...state,
                    pickupCords: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                    coordinate: new AnimatedRegion({
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }),
                })
            }
        } catch (error) {
            setLocationAccess(false);
            setIsLoading(false)
            console.log(error);
            if (openSettings)
                Linking.openSettings()
        }

    }

    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000)
            }
        } else {
            state.coordinate.timing(newCoordinate).start()
        }
    }

    const searchLocation = (searchType) => {
        navigation.navigate('ChooseLocation', { getCoordinates: fetchValues, locationType: searchType })
    }

    const fetchValues = (data) => {
        if (data.locationType == 'pickup') {
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
        } else {
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
    }

    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        });
    }

    const openBottomSheet = () => {
        bottomSheetRef.current?.present()
    }

    const cancelRoute = async () => {
        setState({
            ...state,
            dropCords: {},
            pickupCords: currentLocation
        });

        setAddress({
            drop: '',
            pickUp: await getAddressFromCoordinates(currentLocation.latitude, currentLocation.longitude)

        });

        onCenter();
        bottomSheetRef.current?.close()
    }

    const bookVehicle = (data) => {
        const details = {
            pickup: state.pickupCords,
            drop: state.dropCords,
            amount: amount,
            address: address
        }
        navigation.navigate('BookingScreen', { locationDetails: details, receiverDetails: data })
    }

    const trackTrip = () => {
        navigation.navigate('LiveTracking', { details: tripData })
    }

    const getTripFare = async () => {
        try {
            const data = await get('getFare');
            if (data) {
                setFare({
                    baseFare: data[0].baseFare,
                    perKm: data[0].perKm,
                    perHour: data[0].afterAnHour
                })
            }
        } catch (error) {
            console.log('getTripStatus', error);
        }
    }

    return (
        <GestureHandlerRootView>
            {locationAccessed && <BottomSheetModalProvider>
                <View style={style.container}>
                    {Object.keys(state.dropCords).length > 0 && (<TouchableOpacity onPress={cancelRoute} style={style.backButton}>
                        <View style={{ marginLeft: 5 }}>
                            <IonicIcon name="arrow-back-circle" size={40} color={'#222'} />
                        </View>
                    </TouchableOpacity>)}
                    {(Object.keys(state.pickupCords).length != 0 && !isRiding && Object.keys(state.dropCords).length == 0) && (<LocationInputButton

                        onPress={() => { searchLocation('pickup') }}
                        iconColor={'#097969'}
                        textColor={address.pickUp == '' ? '#aaaa' : '#000'}
                        text={address.pickUp == '' ? 'Enter Pickup Location' : address.pickUp} />)}

                    {(Object.keys(state.dropCords).length == 0 && !isRiding) && (<LocationInputButton
                        styles={{ position: 'absolute', top: 55, width: '100%' }}
                        onPress={() => { searchLocation('drop') }}
                        iconColor={'#800000'}
                        textColor={address.drop == '' ? '#aaaa' : '#000'}
                        text={address.drop == '' ? 'Enter Drop Location' : address.drop} />)}



                    {isRiding && <View style={style.orderNavContainer}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>You've a trip currently running !</Text>
                        <Pressable style={style.viewButton} onPress={trackTrip}>
                            <Text style={{ color: '#000' }}>View</Text>
                        </Pressable>
                    </View>}

                    <MapView ref={mapRef} style={style.mapContainer}
                        initialRegion={currentLocation}
                        toolbarEnabled={false}
                        loadingEnabled={false}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        onMapLoaded={() => {
                            setState({
                                ...state
                            })
                        }}
                    >

                        {/* Current Location Marker */}
                        {Object.keys(state.pickupCords).length == 0 && (<Marker.Animated
                            coordinate={state.coordinate}
                            onPress={() => { searchLocation('pickup') }}
                            ref={markerRef} >
                            <CustomMarker
                                headerText={'Pickup Location:'}
                                text={address.pickUp}
                                coordinates={currentLocation}
                                imgSrc={imagePath.pickupMarker} />
                        </Marker.Animated>)}

                        {/* {Object.keys(state.pickupCords).length > 0 && (<Marker coordinate={state.pickupCords}>
                            <Image style={{ height: 25, width: 25 }} source={imagePath.currentLocationMarker} />
                        </Marker>)} */}

                        {(Object.keys(state.pickupCords).length > 0 && !isRiding) && (
                            <Marker
                                onPress={() => { searchLocation('pickup') }}
                                coordinate={state.pickupCords}>
                                <CustomMarker
                                    headerText={'Pickup Location:'}
                                    text={address.pickUp}
                                    imgSrc={imagePath.pickupMarker} />
                            </Marker>)}
                        {(Object.keys(state.dropCords).length > 0 && !isRiding) && (
                            <Marker coordinate={state.dropCords} onPress={() => { searchLocation('drop') }}>
                                <CustomMarker
                                    headerText={'Drop Location:'}
                                    text={address.drop}
                                    imgSrc={imagePath.dropMarker} />
                            </Marker>
                        )}
                        {(Object.keys(state.dropCords).length > 0 &&
                            Object.keys(state.pickupCords).length > 0 && !isRiding)
                            &&
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
                                        directionDetails: result
                                    })

                                    let kmPrice = fare.perKm;
                                    let tataAceFare = fare.baseFare + (result.distance * kmPrice);;
                                    let boleroFare = fare.baseFare + (result.distance * kmPrice);
                                    if (result.duration > 120) {
                                        tataAceFare = tataAceFare + ((result.duration - 120) * 2);
                                        boleroFare = boleroFare + ((result.duration - 120) * 2);
                                    }

                                    setAmount({
                                        tataAce: parseInt(tataAceFare),
                                        bolero: parseInt(boleroFare),
                                        bike: parseInt(tataAceFare * 0.6)
                                    })


                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: { top: 50, right: 30, bottom: 10, left: 50 },
                                        animated: true,
                                    });
                                }}
                            />}
                    </MapView>
                    <View style={style.bottomContainer}>
                        <TouchableOpacity style={style.onCenterContainer} onPress={onCenter} >
                            <Image source={imagePath.liveLocationBtn} />
                        </TouchableOpacity>
                        {Object.keys(state.dropCords).length > 0 && (
                            <Button mode="contained" style={{ backgroundColor: '#0047ab', width: '100%' }} onPress={openBottomSheet}>
                                Confirm Location
                            </Button>)}
                    </View>
                    <BottomSheetModal
                        ref={bottomSheetRef}
                        index={0}
                        enablePanDownToClose={false}
                        backgroundStyle={{ borderRadius: 20, borderWidth: 1, borderColor: '#d6d6d6', elevation: 20 }}
                        snapPoints={snapPoints}>
                        <View style={style.bottomSheetPopup}>
                            <ReceiverDetails passDetails={bookVehicle} />
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>}
            {!locationAccessed && <LocationAccess isLoading={isLoading} onPress={() => { getLiveLocation(true) }} />}

        </GestureHandlerRootView>
    )
}

export default Dashboard;