import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import {REACT_APP_MAPS_API} from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import imagePath from '../../constants/imagePath';
import style from './style';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import CurrentTripDetails from '../../core/View/CurrentTripDetails';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {get, patch} from '../../core/helper/services';
import {getCurrentLocation, locationPermission} from '../../core/helper/helper';

const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LiveTracking = props => {
  const bottomSheetRef = useRef(null);
  const mapRef = useRef();
  const markerRef = useRef();
  const snapPoints = [185];
  const [tripDetails, setTripDetails] = useState(null);
  const [mapCoords, setMapCoords] = useState('');
  const navigation = useNavigation();
  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);
  const [navigationPoints, setNavigationPoints] = useState(null);

  useEffect(() => {
    bottomSheetRef.current?.present();
    setTripDetails(props.route.params.details);
  }, []);

  useEffect(() => {
    if (!isDetailsLoaded && tripDetails) {
      let coords = {
        latitude: parseFloat(tripDetails?.driverCoords.driverLat),
        longitude: parseFloat(tripDetails?.driverCoords.driverLng),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      if (tripDetails.status == 2) {
        console.log('sas', {
          pickupCoords: coords,
          dropCoords: tripDetails.pickupCoords,
        });
        setNavigationPoints({
          pickupCoords: coords,
          dropCoords: tripDetails.pickupCoords,
        });
      } else {
        setNavigationPoints({
          pickupCoords: coords,
          dropCoords: tripDetails.dropCoords,
        });
      }

      checkTripStatus(tripDetails.tripId);
      setIsDetailsLoaded(true);
    }
  }, [tripDetails]);

  const cancelRide = () => {
    changeTripStatus(6);
  };

  const checkTripStatus = async id => {
    try {
      let trip = await getTripStatus(id);
      if (trip) {
        if (trip.status == 4) {
          let coords = {
            latitude: parseFloat(trip.driverCoords.driverLat),
            longitude: parseFloat(trip.driverCoords.driverLng),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          setNavigationPoints({
            pickupCoords: coords,
            dropCoords: tripDetails.dropCoords,
          });
        }
        // getLiveLocation()
        animate(
          parseFloat(trip.driverCoords.driverLat),
          parseFloat(trip.driverCoords.driverLng),
        );
        if (trip.status == 5) {
          navigation.navigate('Rating', {tripDetails: trip});
        } else if (trip.status > 5) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else {
          setTimeout(() => {
            checkTripStatus(id);
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTripStatus = async id => {
    const queryParameter = '?tripId=' + id.toString();
    try {
      const data = await get('getRequestVehicle', queryParameter);
      if (data) {
        return data[0];
      }
    } catch (error) {
      console.log('getTripStatus', error);
    }
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      state.coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.fitToCoordinates(mapCoords);
  };

  const changeTripStatus = async statusValue => {
    // status value 5 for completed
    // status value 6 for cancelled by user
    const payload = {
      id: tripDetails.tripId,
      status: statusValue.toString(),
    };
    try {
      const data = await patch(payload, 'patchRequestVehicle');
      if (data) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={style.container}>
          <View style={style.header}>
            <TouchableOpacity onPress={goBack}>
              <IonicIcon name="arrow-back-circle" size={40} color={'#222'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelRide}>
              <Button
                mode="contained"
                textColor="#fff"
                style={{backgroundColor: '#222'}}>
                Cancel
              </Button>
            </TouchableOpacity>
          </View>
          <MapView
            ref={mapRef}
            style={style.mapContainer}
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
            showsMyLocationButton={false}>
            <Marker coordinate={navigationPoints?.dropCoords}>
              <CustomMarker
                headerText={''}
                text={tripDetails?.drop}
                imgSrc={imagePath.dropMarker}
              />
            </Marker>

            <Marker.Animated
              ref={markerRef}
              coordinate={navigationPoints?.pickupCoords}>
              <CustomMarker
                headerText={''}
                text={null}
                imgSrc={imagePath.driverLoc}
              />
            </Marker.Animated>

            <MapViewDirections
              origin={navigationPoints?.pickupCoords}
              destination={navigationPoints?.dropCoords}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="#666"
              optimizeWaypoints={true}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {top: 50, right: 10, bottom: 10, left: 50},
                });
                setMapCoords(result.coordinates);
              }}
            />
          </MapView>
          <View style={style.bottomContainer}>
            <TouchableOpacity
              onPress={onCenter}
              style={style.onCenterContainer}>
              <Image source={imagePath.liveLocationBtn} />
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            enablePanDownToClose={false}
            backgroundStyle={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#d6d6d6',
              elevation: 20,
            }}
            snapPoints={snapPoints}>
            <View style={style.bottomSheetPopup}>
              <CurrentTripDetails data={tripDetails} />
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default LiveTracking;
