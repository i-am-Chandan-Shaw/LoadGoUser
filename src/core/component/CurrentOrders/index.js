import React from 'react';
import {View, Text, Image, Pressable, Linking} from 'react-native';
import style from './style';
import imagePath from '../../../constants/imagePath';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import AppDivider from '../AppDivider';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../../../constants/commonStyle';
import {getInitials} from '../../helper/commonHelper';

const CurrentOrders = ({data, trackTripStatus}) => {
  const navigation = useNavigation();
  const trackStatus = () => {
    navigation.replace('LiveTracking', {tripData: data});
  };

  const callDriver = () => {
    Linking.openURL(`tel:${data.driverPhone}`);
  };
  return (
    <View style={[commonStyles.p16, commonStyles.gap2]}>
      <View style={[commonStyles.rowCenter, commonStyles.gap1]}>
        <Text style={commonStyles.fnt14Medium}>
          {' '}
          {data?.vehicleNumber} • Tata Ace
        </Text>
        <View style={{marginBottom: 3}}>
          <FeatherIcon name="chevron-right" size={20} />
        </View>
        <Text style={commonStyles.fnt14Medium}> Running</Text>
        <View style={{marginBottom: 3}}>
          <FeatherIcon name="chevron-right" size={20} />
        </View>
        <Text style={[commonStyles.fnt14Medium]}>
          Rs {Math.floor(data.amount)}
        </Text>
      </View>
      <View>
        <View style={[commonStyles.rowFlex, commonStyles.gap2]}>
          <View style={style.vehicleContainer}>
            <View style={style.vehicle}>
              <Image style={style.image} source={imagePath.tataAce} />
            </View>
          </View>
          <View style={commonStyles.flex1}>
            <View>
              <Text style={commonStyles.fnt14Regular}>{data?.driverName}</Text>
            </View>
            <View style={[commonStyles.rowCenter, commonStyles.gap1]}>
              <Text style={commonStyles.fnt14Regular}>
                Ratings: {data?.driverTotalRating}
              </Text>
              <FAIcons name="star" color="#f4c430" size={12} />
            </View>
            <View>
              <Text style={commonStyles.fnt14Regular}>
                Distance: {data?.distance} Km
              </Text>
            </View>
          </View>
          <View style={style.bottomContainer}>
            <Pressable onPress={callDriver} style={[commonStyles.rowCenter]}>
              <View style={{marginTop: 2, marginRight: 5}}>
                <FeatherIcon color="#000" name="phone-call" size={16} />
              </View>
              <Text style={[commonStyles.fnt14Medium]}> Call Driver </Text>
            </Pressable>
            <Pressable onPress={trackStatus} style={[commonStyles.rowCenter]}>
              <View style={{marginTop: 2, marginRight: 5}}>
                <FeatherIcon color="#000" name="send" size={16} />
              </View>
              <Text style={[commonStyles.fnt14Medium]}> View Map </Text>
            </Pressable>
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default CurrentOrders;
