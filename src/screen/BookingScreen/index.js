import React, {useState, useRef, useEffect, useContext} from 'react';
import {View, Dimensions, Text, Pressable, AppState} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
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
import ChooseVehicle from '../../core/View/ChooseVehicle';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {Button, RadioButton, Snackbar} from 'react-native-paper';
import BookingProgress from '../../core/View/BookingProgress';
import AppModal from '../../core/component/AppModal';
import {del, get, post} from '../../core/helper/services';
import {AppContext} from '../../core/helper/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const BookingScreen = props => {
  const {globalData} = useContext(AppContext);
  let waitingTimeout;
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const mapRef = useRef();
  const [snapPoints, setSnapPoints] = useState([290, 400]);
  const [value, setValue] = useState('Cash');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [goodsType, setGoodsType] = useState('looseGoods');
  const [bsIndex, setBsIndex] = useState(1);
  const [discount, setDiscount] = useState(0);
  const markerArr = [];
  let receiverData = props.route.params.receiverDetails;
  const [currentTripId, setCurrentTripId] = useState(null);
  const [navigationData, setNavigationData] = useState({
    distance: null,
    duration: null,
  });

  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  // const [locationArr, setLocationArr]= useState([
  //     {latitude: 22.5629, longitude: 88.3196},
  //     {latitude: 22.5229, longitude: 88.3462},
  //     {latitude: 22.5959, longitude: 88.3262}
  // ]);

  const [state, setState] = useState({
    pickupCoords: {},
    dropCoords: {},
    amount: {},
    address: {},
  });

  const [screenType, setScreenType] = useState('chooseVehicle');

  useEffect(() => {
    bottomSheetRef.current?.present();
    setState({
      pickupCoords: props.route.params.locationDetails.pickup,
      dropCoords: props.route.params.locationDetails.drop,
      amount: props.route.params.locationDetails.amount,
      address: props.route.params.locationDetails.address,
    });

    const timeoutId = setTimeout(() => {
      setBsIndex(0);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(waitingTimeout);
    };
  }, []);

  const [paymentModal, setPaymentModal] = useState(false);

  // const setMarkers = ()=>{
  //     for(let i = 0; i < locationArr.length; i++){
  //         markerArr.push(
  //             <View key={i}>
  //                 <Marker
  //                 onPress={searchLocation}
  //                 coordinate={{
  //                     latitude: locationArr[i].latitude,
  //                     longitude: locationArr[i].longitude,
  //                     latitudeDelta: LATITUDE_DELTA,
  //                     longitudeDelta: LONGITUDE_DELTA,
  //                 }}>
  //                 <CustomMarker
  //                     headerText={''}
  //                     text={'Stop '+(i+1)}
  //                     imgSrc={imagePath.otherPin}/>
  //             </Marker>
  //             </View>
  //         )
  //     }
  // }

  const goBack = () => {
    if (currentTripId != null) deleteRequest(currentTripId.tripId);
    setScreenType('chooseVehicle');
    props.navigation.goBack();
  };

  const goHome = () => {
    if (currentTripId != null) deleteRequest(currentTripId.tripId);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const searchLocation = () => {
    navigation.navigate('ChooseLocation', {
      getCoordinates: fetchValues,
      locationType: 'drop',
    });
  };

  const cancelModal = () => {
    setPaymentModal(false);
  };

  const handleChildValue = () => {
    setPaymentMode(value);
    cancelModal();
  };

  const bookVehicle = () => {
    setScreenType('bookingProgress');
    setSnapPoints([300, 340]);
    setBsIndex(0);
    requestVehicle();
  };

  const requestVehicle = async () => {
    try {
      let payload = {
        userId: globalData?.userData[0].id,
        distance: navigationData.distance,
        amount: state.amount.tataAce - discount,
        paymentMethod: 'cash',
        goodsType: goodsType,
        pickUpCoords: {
          lat: state.pickupCoords.latitude,
          lng: state.pickupCoords.longitude,
        },
        dropCoords: {
          lat: state.dropCoords.latitude,
          lng: state.dropCoords.longitude,
        },
        pickUpLocation: state.address.pickUp,
        dropLocation: state.address.drop,
        status: 1,
      };
      const data = await post(payload, 'postRequestVehicle');
      if (data) {
        console.log(data);
        setCurrentTripId(data);
        storeTripId(data.tripId);
        waitForDriver(data.tripId);
      }
    } catch (error) {
      console.log(error);
      setVisible(true);
      setScreenType('chooseVehicle');
      setSnapPoints([290, 400]);
      setBsIndex(0);
    }
  };

  const waitForDriver = async id => {
    try {
      let trip = await getTripStatus(id);

      if (trip) {
        if (trip.status == 1) {
          waitingTimeout = setTimeout(() => {
            waitForDriver(id);
          }, 3000);
        } else {
          console.log(trip);
          const data = {
            ...trip,
            pickupCoords: {
              latitude: parseFloat(trip.pickUpCoords.pickUpLat),
              latitudeDelta: 0.0122,
              longitude: parseFloat(trip.pickUpCoords.pickUpLng),
              longitudeDelta: 0.0061627689429373245,
            },
            dropCoords: {
              latitude: parseFloat(trip.dropCoords.dropLat),
              latitudeDelta: 0.0122,
              longitude: parseFloat(trip.dropCoords.dropLng),
              longitudeDelta: 0.0061627689429373245,
            },
          };
          navigation.navigate('LiveTracking', {details: data});
          clearTimeout(waitingTimeout);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTripStatus = async id => {
    console.log(id);
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

  const storeTripId = async id => {
    try {
      await AsyncStorage.setItem('tripId', id.toString());
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const removeTripId = async id => {
    try {
      await AsyncStorage.removeItem('tripId');
      console.log('Data removed successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const handleGoodSelection = data => {
    setGoodsType(data);
  };

  const cancelRideRequest = () => {
    setScreenType('chooseVehicle');
    deleteRequest(currentTripId?.tripId);
    setSnapPoints([290, 400]);
    setBsIndex(0);
    removeTripId(currentTripId?.tripId);
  };

  const deleteRequest = async id => {
    const queryParameter = '?tripId=' + id.toString();
    try {
      const data = await del('deleteRequestVehicle', queryParameter);
      if (data) {
        try {
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscount = amount => {
    console.log(amount);
    setDiscount(amount);
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <AppModal
          header={'Choose Payment'}
          height={220}
          onValueChange={handleChildValue}
          onCancel={cancelModal}
          onConfirm={cancelModal}
          visibility={paymentModal}>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={style.radioItem}>
              <RadioButton value="Cash" />
              <Pressable onPress={() => setValue('Cash')}>
                <Text style={{fontSize: 16, color: '#000'}}>Cash</Text>
              </Pressable>
            </View>
            <View style={style.radioItem}>
              <RadioButton value="Online"></RadioButton>
              <Pressable onPress={() => setValue('Online')}>
                <Text style={{fontSize: 16, color: '#000'}}>
                  UPI/Net Banking
                </Text>
              </Pressable>
            </View>
          </RadioButton.Group>
        </AppModal>
        <View style={style.container}>
          <View style={style.header}>
            <TouchableOpacity onPress={goBack}>
              <IonicIcon name="arrow-back-circle" size={40} color={'#222'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goHome}>
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
            {markerArr}

            <Marker onPress={searchLocation} coordinate={state.dropCoords}>
              <CustomMarker
                headerText={''}
                text={'Drop'}
                imgSrc={imagePath.dropMarker}
              />
            </Marker>

            <Marker onPress={searchLocation} coordinate={state.pickupCoords}>
              <CustomMarker
                headerText={''}
                text={'Pickup'}
                imgSrc={imagePath.pickupMarker}
              />
            </Marker>

            {Object.keys(state.dropCoords).length != 0 && (
              <MapViewDirections
                origin={state.pickupCoords}
                destination={state.dropCoords}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="#666"
                optimizeWaypoints={true}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);

                  setNavigationData({
                    distance: result.distance,
                    duration: result.duration,
                  });

                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {top: 50, right: 20, bottom: 10, left: 30},
                    animated: true,
                  });
                }}
              />
            )}
          </MapView>

          <BottomSheetModal
            ref={bottomSheetRef}
            index={bsIndex}
            enablePanDownToClose={false}
            backgroundStyle={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#d6d6d6',
              elevation: 20,
            }}
            snapPoints={snapPoints}>
            <View style={{position: 'relative', zIndex: 1000, top: 270}}>
              <Snackbar
                style={{backgroundColor: '#b92e34'}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: 'OK',
                  onPress: () => {
                    onDismissSnackBar();
                  },
                }}>
                Something went wrong. Try Again !
              </Snackbar>
            </View>
            <View style={style.bottomSheetPopup}>
              {screenType == 'chooseVehicle' && (
                <ChooseVehicle
                  discountReceived={getDiscount}
                  receiverData={receiverData}
                  selectGoods={handleGoodSelection}
                  onPress={bookVehicle}
                  changeMethod={() => {
                    setPaymentModal(true);
                  }}
                  paymentMode={paymentMode}
                  amount={state.amount}
                />
              )}
              {screenType == 'bookingProgress' && (
                <BookingProgress onCancel={cancelRideRequest} />
              )}
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BookingScreen;
