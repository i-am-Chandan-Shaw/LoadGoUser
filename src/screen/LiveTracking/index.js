import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  Linking,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import {REACT_APP_MAPS_API} from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import imagePath from '../../constants/imagePath';
import style from './style';
import {} from 'react-native-paper';
import CurrentTripDetails from '../../core/View/CurrentTripDetails';
import {useNavigation} from '@react-navigation/native';
import {get} from '../../core/helper/services';
import {getInitialRegionForMap} from '../../core/helper/helper';
import {AppContext} from '../../core/helper/AppContext';
import {useTheme} from '../../constants/ThemeContext';
import AppLoader from '../../core/component/AppLoader';
import {convertMinToHours} from '../../core/helper/commonHelper';

const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialRegion = getInitialRegionForMap();

const LiveTracking = props => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const mapRef = useRef();
  const markerRef = useRef();
  const bottomSheetRef = useRef();

  const [currentTrip, setCurrentTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pollingActive, setPollingActive] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [locationDetails, setLocationDetails] = useState({
    driverCoords: null,
    dropLocation: null,
    travelDuration: null,
    distanceLeft: null,
    hasTripStarted: false,
    locationType: 'pickup location',
    locationAddress: 'Pickup Location',
  });

  const setDriverCoords = driverCoords => {
    if (driverCoords?.driverLat && driverCoords?.driverLng) {
      const latitude = parseFloat(driverCoords.driverLat);
      const longitude = parseFloat(driverCoords.driverLng);
      animateMarkerMovement(latitude, longitude);
      setLocationDetails(prevState => ({
        ...prevState,
        driverCoords: {
          latitude,
          longitude,
        },
      }));
    }
  };

  const initializeMapDirectionPoints = trip => {
    if (!trip) return;

    const tripStarted = trip.status === '4';
    const endLat = tripStarted
      ? parseFloat(trip.dropCoords.dropLat)
      : parseFloat(trip.pickUpCoords.pickUpLat);
    const endLng = tripStarted
      ? parseFloat(trip.dropCoords.dropLng)
      : parseFloat(trip.pickUpCoords.pickUpLng);

    const updatedLocationType = tripStarted
      ? 'drop location'
      : 'pickup location';

    const updatedLocationAddress = tripStarted
      ? currentTrip?.dropLocation
      : currentTrip?.pickUpLocation;

    setLocationDetails(prevState => ({
      ...prevState,
      dropLocation: {
        latitude: endLat,
        longitude: endLng,
      },
      locationType: updatedLocationType,
      locationAddress: updatedLocationAddress,
    }));
  };

  const getTripStatus = async () => {
    if (!currentTrip) return;

    try {
      const queryParameter = `?tripId=${currentTrip.tripId}`;
      const tripData = await get('getRequestVehicle', queryParameter);

      if (tripData?.[0]) {
        const tripStatus = parseInt(tripData[0].status, 10);

        console.log(tripStatus);

        setCurrentTrip(tripData[0]);
        setDriverCoords(tripData[0].driverCoords);

        if (tripStatus === 7) {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
          Alert.alert('Ride cancelled', 'Ride was cancelled by the driver!', [
            {text: 'OK', onPress: () => {}},
          ]);
          return;
        } else if (tripStatus === 5) {
          navigation.replace('Rating', {tripData});
        }

        if ([2, 4].includes(tripStatus)) {
          initializeMapDirectionPoints(tripData[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching trip status:', error);
    }
  };

  const initializeTrip = async () => {
    const trip = props.route.params.tripData;
    if (trip) {
      setCurrentTrip(trip);
      setDriverCoords(trip.driverCoords);
      initializeMapDirectionPoints(trip);

      if (bottomSheetRef.current) {
        bottomSheetRef.current.present();
      }

      // Activate polling
      setPollingActive(true);
    }
  };

  useEffect(() => {
    initializeTrip();

    // Poll for trip status every 3 seconds when pollingActive is true
    let interval;
    if (pollingActive) {
      interval = setInterval(() => {
        getTripStatus();
      }, 8000);
    }

    return () => {
      clearInterval(interval);
      setPollingActive(false); // Stop polling on unmount
    };
  }, [pollingActive]);

  const animateMarkerMovement = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};

    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 5000);
      }
    }
  };

  const onMapReady = responseData => {
    if (!locationDetails.distanceLeft) {
      mapRef.current.fitToCoordinates(responseData.coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 300, left: 50},
        animated: true,
      });
    }

    const durationLeft = convertMinToHours(responseData.duration);
    const distanceLeft = responseData.distance;

    setMapData(responseData);

    setLocationDetails(prevState => ({
      ...prevState,
      travelDuration: durationLeft,
      distanceLeft,
    }));
  };
  const onCenter = () => {
    if (mapData) {
      mapRef.current.fitToCoordinates(mapData.coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 300, left: 50},
        animated: true,
      });
    }
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        {isLoading && <AppLoader />}
        <TouchableOpacity
          style={style.showLocationContainer}
          onPress={onCenter}>
          <Image source={imagePath.liveLocationBtn} />
        </TouchableOpacity>
        <MapView
          ref={mapRef}
          style={style.mapContainer}
          initialRegion={initialRegion}
          toolbarEnabled={true}
          loadingEnabled={false}
          showsUserLocation={true}
          mapType={'standard'}
          showsMyLocationButton={false}>
          {locationDetails.dropLocation && (
            <>
              <Marker.Animated
                ref={markerRef}
                coordinate={locationDetails.driverCoords}>
                <View style={style.vehicleImageContainer}>
                  <Image
                    source={require('../../assets/images/tata-ace.png')}
                    style={style.vehicleImage}
                  />
                </View>
              </Marker.Animated>
              <Marker coordinate={locationDetails.dropLocation}>
                <CustomMarker
                  headerText={locationDetails.locationAddress}
                  imgSrc={imagePath.dropMarker}
                />
              </Marker>
            </>
          )}

          {locationDetails.dropLocation && (
            <MapViewDirections
              origin={locationDetails.driverCoords}
              destination={locationDetails.dropLocation}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor={theme.bgPrimary}
              optimizeWaypoints={true}
              onReady={result => {
                onMapReady(result);
              }}
            />
          )}
        </MapView>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          enablePanDownToClose={false}
          enableContentPanningGesture={false}
          backgroundStyle={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#d6d6d6',
            elevation: 20,
          }}
          snapPoints={[320, 500]}>
          <View>
            <CurrentTripDetails
              tripData={currentTrip}
              locationDetails={locationDetails}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default LiveTracking;
