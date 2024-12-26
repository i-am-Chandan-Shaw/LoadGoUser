import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Linking,
  Text,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import LocationInputButton from '../../core/component/LocationInputButton';
import {fetchUserLocationHelper} from '../../core/helper/helper';
import imagePath from '../../constants/imagePath';
import style from './style';
import {REACT_APP_MAPS_API} from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import ReceiverDetails from '../../core/View/ReceiverDetails';
import LocationAccess from '../LocationAccess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from '../../core/helper/services';
import ConfirmLocation from '../../core/View/ConfirmLoation';
import AppLoader from '../../core/component/AppLoader';
import {useTheme} from '../../constants/ThemeContext';
import commonStyles from '../../constants/commonStyle';
import {AppContext} from '../../core/helper/AppContext';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {calculateFare, initializeFareAmount} from '../../core/helper/apiHelper';
import {Picker} from '@react-native-picker/picker';
import EditFareAmount from '../../core/View/EditFareAmount';
import BookingProgress from '../../core/View/BookingProgress';
const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Dashboard = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const mapRef = useRef();
  const bottomSheetRef = useRef();
  const overlayModalRef = useRef();
  const {globalData} = useContext(AppContext);

  const snapPoints = [380];
  const [overlaySnapPoints, setOverlaySnapPoints] = useState([310]);
  const [selectedGoods, setSelectedGoods] = useState('Loose Goods');
  const [overlayModalName, setOverlayModalName] = useState('editFare');
  const [activeTrip, setActiveTrip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [receiverDetails, setReceiverDetails] = useState({
    name: null,
    phone: null,
  });
  const [fareDetails, setFareDetails] = useState({
    minFare: 0,
    fare: 0,
  });
  const [mapDirectionResult, setMapDirectionResult] = useState(null);
  const [locationState, setLocationState] = useState({
    locationAccess: false,
    currentLocation: null,
    pickupCoords: null,
    dropCoords: null,
    pickupAddress: '',
    dropAddress: '',
  });

  const fetchUserLocation = async (shouldOpenSettings = false) => {
    try {
      const locationData = await fetchUserLocationHelper(
        setLocationState,
        setIsLoading,
        shouldOpenSettings,
      );

      if (!locationData) return;

      const {coordinates, address} = locationData;
      setLocationState(prevState => ({
        ...prevState,
        currentLocation: coordinates,
        pickupCoords: coordinates,
        pickupAddress: address,
      }));
      bottomSheetRef.current?.present();
    } catch (error) {
      console.error('Error in fetchUserLocation:', error);
    }
  };

  useEffect(() => {
    initializeReceiverDetails();
    getPreviousTripStatus();
  }, [globalData]);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const getPreviousTripStatus = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('tripId');
      if (value) {
        fetchTripStatus(value);
      }
    } catch (error) {
      console.error('Error retrieving trip ID:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTripStatus = async id => {
    if (!id) return;

    const queryParameter = `?tripId=${id}`;
    try {
      const data = await get('getRequestVehicle', queryParameter);
      if (data) {
        const status = parseInt(data[0].status, 10);
        if (status === 2 || status === 4) {
          console.log(status);
          setActiveTrip(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching trip status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeReceiverDetails = () => {
    if (globalData?.userData) {
      setReceiverDetails({
        name: globalData.userData[0]?.name || '',
        phone: globalData.userData[0]?.phone || '',
      });
    }
  };

  const onCenter = () => {
    if (mapDirectionResult) {
      mapRef.current.fitToCoordinates(mapDirectionResult.coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 210, left: 50},
        animated: true,
      });
    } else {
      mapRef.current.animateToRegion(locationState.currentLocation);
    }
  };

  const setPickupLocation = () => {
    navigation.navigate('ChooseLocation', {
      getCoordinates: initializeLocationData,
      locationType: 'pickup',
    });
  };

  const setDropLocation = () => {
    navigation.navigate('ChooseLocation', {
      getCoordinates: initializeLocationData,
      locationType: 'drop',
    });
  };

  const initializeLocationData = locationData => {
    if (locationData.locationType === 'pickup') {
      setLocationState(prevState => ({
        ...prevState,
        pickupCoords: locationData.coords,
        pickupAddress: locationData.selectedAddress,
      }));
      mapRef.current.animateToRegion(locationData.coords);
    } else if (locationData.locationType === 'drop') {
      setLocationState(prevState => ({
        ...prevState,
        dropCoords: locationData.coords,
        dropAddress: locationData.selectedAddress,
      }));
    }
  };

  const onMapDirectionReady = async mapData => {
    setMapDirectionResult(mapData);

    const mapPadding = {top: 50, right: 50, bottom: 210, left: 50};

    mapRef.current.fitToCoordinates(mapData.coordinates, {
      edgePadding: mapPadding,
      animated: true,
    });

    setOverlaySnapPoints([340]);
    setOverlayModalName('confirmLocation');
    overlayModalRef.current?.present();

    const minFare = await initializeFareAmount(mapData.distance);
    setFareDetails(prevState => ({
      ...prevState,
      minFare,
      fare: minFare,
    }));
  };

  const confirmLocationDetails = () => {
    overlayModalRef.current?.close();
  };

  const openReceiverDetailsModal = () => {
    setOverlaySnapPoints([310]);
    setOverlayModalName('receiverDetails');
    overlayModalRef.current?.present();
  };

  const openFareModal = () => {
    setOverlaySnapPoints([230]);
    setOverlayModalName('editFare');
    overlayModalRef.current?.present();
  };

  const updateReceiverDetails = details => {
    setReceiverDetails(details);
    overlayModalRef.current?.close();
  };

  const setNewFareDetails = fareDetails => {
    setFareDetails(fareDetails);
    overlayModalRef.current?.close();
  };

  const findDriver = () => {
    if (locationState.pickupAddress && locationState.dropAddress) {
      setOverlaySnapPoints([660]);
      setOverlayModalName('bookingProgress');
      overlayModalRef.current?.present();
    } else {
      setDropLocation();
    }
  };

  const cancelTripRequest = () => {
    overlayModalRef.current?.close();
  };

  const viewActiveTrip = () => {
    navigation.replace('LiveTracking', {tripData: activeTrip});
  };

  return (
    <GestureHandlerRootView>
      {isLoading && <AppLoader />}
      {!locationState.locationAccess && (
        <LocationAccess onPress={fetchUserLocation} />
      )}
      {locationState.locationAccess && locationState.currentLocation && (
        <BottomSheetModalProvider>
          {activeTrip && (
            <View
              style={[
                style.waitingContainer,
                {backgroundColor: theme.bgLight},
              ]}>
              <Image
                style={style.homeScreenImg}
                source={imagePath.homeScreen}
              />
              <Text style={[commonStyles.fnt16Medium, {color: theme.bgDark}]}>
                You have an active trip !
              </Text>
              {activeTrip && (
                <TouchableOpacity
                  onPress={viewActiveTrip}
                  style={[
                    commonStyles.btnSuccess,
                    commonStyles.btnSmall,
                    {marginTop: 16, width: 220},
                  ]}>
                  <Text
                    style={[
                      commonStyles.fnt16Medium,
                      commonStyles.textCenter,
                      commonStyles.textWhite,
                    ]}>
                    View Trip
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {!activeTrip && (
            <View style={commonStyles.flex1}>
              <TouchableOpacity
                style={style.showLocationContainer}
                onPress={onCenter}>
                <Image source={imagePath.liveLocationBtn} />
              </TouchableOpacity>
              <MapView
                ref={mapRef}
                style={[style.mapContainer]}
                initialRegion={locationState.currentLocation}
                toolbarEnabled={false}
                loadingEnabled={false}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onMapLoaded={() => {}}>
                <Marker
                  coordinate={locationState.pickupCoords}
                  anchor={{x: 0.5, y: 1.12}}>
                  <CustomMarker
                    headerText={locationState.pickupAddress}
                    imgSrc={imagePath.pickupMarker}
                  />
                </Marker>
                {locationState.dropCoords && (
                  <Marker
                    coordinate={locationState.dropCoords}
                    anchor={{x: 0.5, y: 1.12}}>
                    <CustomMarker
                      headerText={locationState.dropAddress}
                      imgSrc={imagePath.dropMarker}
                    />
                  </Marker>
                )}
                {locationState.pickupCoords && locationState.dropCoords && (
                  <MapViewDirections
                    origin={locationState.pickupCoords}
                    destination={locationState.dropCoords}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor={'#007FFF'}
                    optimizeWaypoints={true}
                    onReady={result => {
                      onMapDirectionReady(result);
                    }}
                  />
                )}
              </MapView>
              <View style={style.mainView}>
                <LocationInputButton
                  onPress={() => {
                    setPickupLocation();
                  }}
                  iconColor={'#097969'}
                  textColor={
                    locationState.pickupAddress === '' ? '#aaaa' : '#000'
                  }
                  text={
                    locationState.pickupAddress === ''
                      ? 'Enter Pickup Location'
                      : locationState.pickupAddress
                  }
                />
                <LocationInputButton
                  onPress={() => {
                    setDropLocation();
                  }}
                  iconColor={'#800000'}
                  textColor={
                    locationState.dropAddress === '' ? '#aaaa' : '#000'
                  }
                  text={
                    locationState.dropAddress === ''
                      ? 'Enter Drop Location'
                      : locationState.dropAddress
                  }
                />
                <View style={[commonStyles.rowCenter, commonStyles.gap4]}>
                  <View style={commonStyles.gap1}>
                    <Text style={commonStyles.fnt12Regular}>
                      Selected Cargo
                    </Text>
                    <View style={style.selectedVehicleContainer}>
                      <Image
                        style={style.vehicleImage}
                        source={imagePath.tataAce}
                      />
                      <Text style={commonStyles.fnt10Regular}>Tata Ace</Text>
                    </View>
                  </View>
                  <View style={[commonStyles.flex1, commonStyles.gap1]}>
                    <Text style={commonStyles.fnt12Regular}>
                      Receiver Details
                    </Text>
                    <Pressable
                      onPress={openReceiverDetailsModal}
                      style={style.receiverDetailsContainer}>
                      <View>
                        <Text style={commonStyles.fnt12Regular}>
                          Name: {receiverDetails.name}{' '}
                        </Text>
                        <Text style={commonStyles.fnt12Regular}>
                          Phone: {receiverDetails.phone}
                        </Text>
                      </View>
                      <MatIcon name="edit" size={14} color={theme.black} />
                    </Pressable>
                  </View>
                </View>
                <View style={[commonStyles.rowCenter, commonStyles.gap2]}>
                  <Pressable
                    style={commonStyles.inputPlaceholder}
                    onPress={openFareModal}>
                    <View
                      style={[
                        commonStyles.rowCenter,
                        commonStyles.justifyBetween,
                        commonStyles.flex1,
                      ]}>
                      <Text
                        style={[
                          fareDetails.minFare ? commonStyles.fnt16Medium : null,
                        ]}>
                        {fareDetails.fare
                          ? 'Rs ' + fareDetails.fare
                          : 'Offer your fare'}
                      </Text>
                      <MatIcon name="edit" size={14} color={theme.black} />
                    </View>
                  </Pressable>
                  <View style={style.inputPickerStyle}>
                    <Picker
                      selectedValue={selectedGoods}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedGoods(itemValue)
                      }>
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Select Goods Type"
                        value="Loose Goods"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="General"
                        value="General"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Textile"
                        value="Textile"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Electronics/Home Appliance"
                        value="Electronics/Home Appliance"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Catering/Restaurant"
                        value="restaurant"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Books/Stationery/Toys"
                        value="Books/Stationery/Toys"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Machines/Equipments/Metals"
                        value="Machines/Equipments/Metals"
                      />
                      <Picker.Item
                        style={{fontSize: 14}}
                        label="Furniture"
                        value="Furniture"
                      />
                    </Picker>
                  </View>
                </View>
                <TouchableOpacity
                  style={commonStyles.btnPrimary}
                  onPress={findDriver}>
                  <Text
                    style={[
                      commonStyles.textCenter,
                      commonStyles.fnt16Medium,
                      {color: theme.white},
                    ]}>
                    Find Driver
                  </Text>
                </TouchableOpacity>
              </View>

              <BottomSheetModal
                ref={overlayModalRef}
                index={0}
                enablePanDownToClose={overlayModalName !== 'bookingProgress'}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustPan"
                backgroundStyle={style.bottomSheetPopup}
                backdropComponent={props => (
                  <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={overlayModalName === 'bookingProgress' ? 0 : 0.4}
                  />
                )}
                snapPoints={
                  overlayModalName === 'bookingProgress'
                    ? [355, 665]
                    : overlaySnapPoints
                }>
                <View style={[commonStyles.p16, commonStyles.flex1]}>
                  {overlayModalName === 'receiverDetails' && (
                    <ReceiverDetails onSubmit={updateReceiverDetails} />
                  )}
                  {overlayModalName === 'confirmLocation' && (
                    <ConfirmLocation
                      duration={mapDirectionResult?.duration}
                      distance={mapDirectionResult?.distance}
                      pickupAddress={locationState.pickupAddress}
                      dropAddress={locationState.dropAddress}
                      confirmLocation={confirmLocationDetails}
                    />
                  )}
                  {overlayModalName === 'editFare' && (
                    <EditFareAmount
                      fareAmountDetails={fareDetails}
                      confirmFareDetails={setNewFareDetails}
                    />
                  )}

                  {overlayModalName === 'bookingProgress' && (
                    <BookingProgress
                      receiverData={receiverDetails}
                      locationDetails={locationState}
                      goodsDetails={selectedGoods}
                      routeDetails={mapDirectionResult}
                      fareDetails={fareDetails}
                      onCancel={cancelTripRequest}
                    />
                  )}
                </View>
              </BottomSheetModal>
            </View>
          )}
        </BottomSheetModalProvider>
      )}
    </GestureHandlerRootView>
  );
};

export default Dashboard;
