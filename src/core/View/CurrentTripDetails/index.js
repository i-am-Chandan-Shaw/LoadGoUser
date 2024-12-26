import React, {useState} from 'react';
import {
  View,
  Text,
  Linking,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../constants/ThemeContext';
import {patch} from '../../helper/services';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import commonStyles from '../../../constants/commonStyle';
import AppLoader from '../../component/AppLoader';
import {convertMinToHours, getInitials} from '../../helper/commonHelper';
import imagePath from '../../../constants/imagePath';

const CurrentTripDetails = ({tripData, locationDetails}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const customerSupportNumber = 8240687723;
  const [isLoading, setIsLoading] = useState(false);

  const callDriver = () => {
    Linking.openURL(`tel:${tripData?.driverPhone}`);
  };

  const callCustomerSupport = () => {
    Linking.openURL(`tel:${customerSupportNumber}`);
  };

  const confirmForCancellation = () => {
    Alert.alert('Cancel Ride', 'Are you sure you want to cancel the ride?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Cancel',
        onPress: () => {
          changeCurrentTripStatus(6);
        },
      },
    ]);
  };

  const changeCurrentTripStatus = async tripStatusValue => {
    setIsLoading(true);
    const payload = {
      id: tripData?.tripId,
      status: tripStatusValue.toString(),
    };
    try {
      const data = await patch(payload, 'patchRequestVehicle');

      if (!data) return;
      console.log('trip status updated');

      switch (tripStatusValue) {
        case 5:
          navigation.replace('Rating', {tripData});
          break;

        case 6:
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          break;

        default:
          console.log(`Unhandled status value: ${tripStatusValue}`);
      }
    } catch (error) {
      console.error('Error changing trip status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading && <AppLoader />}

      <View style={style.durationContainer}>
        <View style={[commonStyles.rowCenter, commonStyles.justifyBetween]}>
          <Text style={commonStyles.fnt12Medium}>
            Driver will reach your {locationDetails.locationType} in{' '}
            {locationDetails?.travelDuration}
          </Text>

          <Pressable onPress={confirmForCancellation}>
            <FAIcon name="window-close" size={20} color={theme.danger} />
          </Pressable>
        </View>
      </View>

      <View style={style.topContainer}>
        <View style={style.driverDetailsContainer}>
          <View style={style.imageContainer}>
            <Text style={commonStyles.fnt16Medium}>
              {getInitials(tripData?.driverName)}
            </Text>
          </View>
          <View style={style.driverMetaDataContainer}>
            <Text style={commonStyles.fnt16Medium} numberOfLines={1}>
              {tripData?.driverName}
            </Text>
            <View style={[commonStyles.rowCenter, commonStyles.gap1]}>
              <MatIcon name="location-pin" size={12} color="#777" />
              <Text style={commonStyles.fnt10Regular}>
                {tripData?.distance} Km
              </Text>
              <MatIcon name="access-time" size={12} color="#777" />
              <Text style={commonStyles.fnt10Regular}>
                {convertMinToHours(tripData.totalTime)}
              </Text>
            </View>

            <View style={[commonStyles.rowCenter, commonStyles.gap1]}>
              <MatIcon name="star" size={12} color="#FBC02D" />
              <Text style={commonStyles.fnt10Regular}>
                {tripData.totalDriverRating} ({tripData.driverTotalTrips}{' '}
                reviews)
              </Text>
            </View>
          </View>
        </View>
        <View style={commonStyles.flexColumnCenter}>
          <Image style={style.vehicleImage} source={imagePath.tataAce} />
          <Text
            numberOfLines={1}
            style={[commonStyles.fnt16Medium, {maxWidth: 100}]}>
            {tripData.vehicleNumber}
          </Text>
        </View>
      </View>
      <View style={style.paymentContainer}>
        <Text
          style={[commonStyles.fnt14Medium, {color: theme.textTertiary}]}
          numberOfLines={1}>
          Estimated Amount
        </Text>
        <Text style={commonStyles.fnt24Medium} numberOfLines={1}>
          ₹ {tripData?.amount}
        </Text>
      </View>
      <View style={style.actionContainer}>
        <View style={[commonStyles.rowCenter, commonStyles.gap2]}>
          <Pressable onPress={callDriver} style={style.circularContainer}>
            <FeatherIcon name="phone" color={theme.bgPrimary} size={20} />
          </Pressable>
          <Pressable
            onPress={callCustomerSupport}
            style={style.circularContainer}>
            <MatIcon name="support-agent" size={30} color="#FBC02D" />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={confirmForCancellation}
          style={[commonStyles.btnDanger, style.tripStatusBtn]}>
          <Text
            style={[
              commonStyles.fnt16Medium,
              commonStyles.textCenter,
              commonStyles.textWhite,
            ]}>
            Cancel Trip
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={style.addressContainer}>
          <Text style={commonStyles.fnt16Medium} numberOfLines={1}>
            Trip Details
          </Text>
          <View style={style.locationContainer}>
            <View style={style.timeLine}>
              <View style={style.circle}></View>
              <View style={style.dottedLine}></View>
              <View style={[style.circle, {backgroundColor: '#568203'}]}></View>
            </View>
            <View style={style.locationText}>
              <Text numberOfLines={2} style={[style.text]}>
                {tripData?.pickUpLocation}
              </Text>
              <View style={{height: 30}}></View>
              <Text numberOfLines={2} style={[style.text]}>
                {tripData?.dropLocation}
              </Text>
            </View>
          </View>
          <View
            style={[
              commonStyles.rowCenter,
              commonStyles.gap1,
              commonStyles.mt16,
            ]}>
            <Text style={commonStyles.fnt12Medium}>
              Goods Type : ({tripData?.goodsType})
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentTripDetails;
