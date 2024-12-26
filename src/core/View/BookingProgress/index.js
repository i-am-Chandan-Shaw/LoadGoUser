import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import style from './style';
import {Button} from 'react-native-paper';
import imagePath from '../../../constants/imagePath';
import AntIcon from 'react-native-vector-icons/AntDesign';
import commonStyles from '../../../constants/commonStyle';
import {lightTheme} from '../../../constants/color';
import {AppContext} from '../../helper/AppContext';
import {del, get, post} from '../../helper/services';
import AppLoader from '../../component/AppLoader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const textArr = [
  'Connecting to a nearby driver.',
  'Check goods before loading.',
  'We ensure safe delivery.',
  'Drivers nearby, ready to accept.',
  'Delayed, please wait.',
  'Finding ride, check status in Ride Tab.',
];

const BookingProgress = ({
  onCancel,
  receiverData: receiverData,
  locationDetails,
  goodsDetails,
  routeDetails,
  fareDetails,
}) => {
  const {globalData} = useContext(AppContext);
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState(textArr[0]);
  let tripStatusTimeout = null;
  const [isRiding, setIsRiding] = useState(false);
  const [requestedTripDetails, setRequestedTripDetails] = useState({
    id: null,
    data: null,
  });

  useEffect(() => {
    initiateRequest();
  }, [globalData]);

  useEffect(() => {
    if (requestedTripDetails.id) {
      pollTripStatus(requestedTripDetails.id);
    }

    return () => {
      // Cleanup trip status polling
      clearTimeout(tripStatusTimeout);
    };
  }, [requestedTripDetails.id]);

  const pollTripStatus = async id => {
    console.log(id);

    const queryParameter = '?tripId=' + id.toString();
    try {
      const trip = await get('getRequestVehicle', queryParameter);
      if (trip) {
        const tripStatus = parseInt(trip[0].status);

        if (tripStatus === 1) {
          console.log('Waiting for trip acceptance...');
          setTimeout(() => pollTripStatus(id), 3000);
          setIsRiding(false);
        } else if (tripStatus === 2 || tripStatus === 4) {
          console.log('Ride accepted');
          setIsRiding(true);

          navigation.navigate('LiveTracking', {tripData: trip[0]});
        } else {
          console.log('Trip not accepted or canceled');
          setIsRiding(false);
        }
      }
    } catch (error) {
      console.error('Error checking trip status:', error);
    }
  };

  const initiateRequest = () => {
    startProgress();
    handleVehicleRequest();
  };
  const startProgress = () => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prevProgress + 0.01;
      });
    }, 500);
  };

  // Make an API request for a vehicle
  const handleVehicleRequest = async () => {
    setIsLoading(true);
    try {
      const payload = createRequestPayload();
      const response = await post(payload, 'postRequestVehicle');
      if (response) {
        console.log('Response:', response);
        setRequestedTripDetails({
          id: response.tripId,
          data: response,
        });
        storeTripId(response.tripId);
      }
    } catch (error) {
      console.error('Error while requesting vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel the ongoing request
  const cancelRequest = async () => {
    if (!requestedTripDetails.id) {
      onCancel();
      return;
    }
    await deleteRequest();
    onCancel();
  };

  // Delete a trip request
  const deleteRequest = async () => {
    setIsLoading(true);
    try {
      const queryParameter = `?tripId=${requestedTripDetails.id}`;
      const response = await del('deleteRequestVehicle', queryParameter);
      if (response) {
        console.log('Delete Response:', response);
      }
    } catch (error) {
      console.error('Error while deleting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create payload for vehicle request
  const createRequestPayload = () => ({
    userId: globalData?.userData[0]?.id,
    distance: routeDetails.distance,
    totalTime: routeDetails.duration,
    amount: fareDetails.fare,
    paymentMethod: 'cash',
    goodsType: goodsDetails,
    pickUpCoords: {
      lat: locationDetails.pickupCoords.latitude,
      lng: locationDetails.pickupCoords.longitude,
    },
    dropCoords: {
      lat: locationDetails.dropCoords.latitude,
      lng: locationDetails.dropCoords.longitude,
    },
    pickUpLocation: locationDetails.pickupAddress,
    dropLocation: locationDetails.dropAddress,
    status: 1,
  });

  const storeTripId = async id => {
    try {
      await AsyncStorage.setItem('tripId', id.toString());
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  return (
    <>
      {isLoading && <AppLoader />}
      <Pressable onPress={cancelRequest} style={style.headerIconContainer}>
        <AntIcon name="closecircleo" size={20} color={'#000'} />
      </Pressable>
      <View style={style.mainContainer}>
        <View>
          <Image
            style={{height: 75, width: 75}}
            source={imagePath.parcelLoading}
          />
        </View>
        <View style={style.textContainer}>
          <Text style={style.progressTextStyle}>{progressText}</Text>
        </View>

        <View style={style.detailsContainer}>
          <View style={[commonStyles.rowCenter, commonStyles.justifyBetween]}>
            <Text style={[commonStyles.fnt16Medium]}>Estimated Amount</Text>
            <Text
              style={[commonStyles.fnt16Medium, {color: lightTheme.success}]}>
              Rs {fareDetails.fare}
            </Text>
          </View>
          <View style={style.locationContainer}>
            <View style={style.timeLine}>
              <Image style={[style.pin]} source={imagePath.redPin} />
              <View style={style.dottedLine} />
              <Image style={[style.pin]} source={imagePath.yellowPin} />
            </View>
            <View style={style.locationText}>
              <Text numberOfLines={1} style={[commonStyles.fnt12Medium]}>
                Pickup Location
              </Text>
              <Text numberOfLines={2} style={[style.text]}>
                {locationDetails.pickupAddress}
              </Text>
              <View style={{height: 20}} />
              <Text numberOfLines={1} style={[commonStyles.fnt12Medium]}>
                Drop Location
              </Text>
              <Text numberOfLines={2} style={[style.text]}>
                {locationDetails.dropAddress}
              </Text>
            </View>
          </View>
          <View style={style.shadedContainer}>
            <Text style={[commonStyles.fnt14Medium]}>Route Details</Text>
            <View>
              <Text style={commonStyles.fnt12Regular}>
                Total Distance: {routeDetails.distance}
              </Text>
            </View>
          </View>
          <View style={style.shadedContainer}>
            <Text style={[commonStyles.fnt14Medium]}>Receiver Details</Text>
            <View>
              <Text style={commonStyles.fnt12Regular}>
                Name: {receiverData.name}
              </Text>
              <Text style={commonStyles.fnt12Regular}>
                Phone: {receiverData.phone}
              </Text>
            </View>
          </View>
          <View style={style.shadedContainer}>
            <Text style={[commonStyles.fnt14Medium]}>Goods Type</Text>
            <View>
              <Text style={commonStyles.fnt12Regular}>
                Type: {goodsDetails}{' '}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={commonStyles.btnDanger}
          onPress={cancelRequest}>
          <Text
            style={[
              commonStyles.textCenter,
              commonStyles.fnt16Medium,
              {color: lightTheme.white},
            ]}>
            Cancel Request
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BookingProgress;
