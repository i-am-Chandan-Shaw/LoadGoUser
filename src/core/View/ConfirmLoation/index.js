import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import commonStyles from '../../../constants/commonStyle';
import imagePath from '../../../constants/imagePath';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './styles';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/ThemeContext';
import {convertMinToHours} from '../../helper/helper';

const ConfirmLocation = ({
  distance,
  duration,
  pickupAddress,
  dropAddress,
  confirmLocation,
}) => {
  const {theme} = useTheme();
  return (
    <>
      <Text style={[commonStyles.fnt16Medium, commonStyles.textCenter]}>
        Confirm Location
      </Text>
      <View>
        <View style={style.infoContainer}>
          <View style={commonStyles.flexColumnCenter}>
            <FAIcon
              name="map-marker-distance"
              size={20}
              color={Colors.bgDark}
            />
            <Text style={[commonStyles.fnt12Regular]}>{distance} Km</Text>
          </View>
          <View style={commonStyles.flexColumnCenter}>
            <EntypoIcon name="back-in-time" size={20} color={Colors.bgDark} />
            <Text style={[commonStyles.fnt12Regular]}>
              {convertMinToHours(duration)}
            </Text>
          </View>
        </View>
        <View style={style.locationContainer}>
          <View style={style.timeLine}>
            <Image style={[style.pin]} source={imagePath.redPin} />
            <View style={style.dottedLine} />
            <Image style={[style.pin]} source={imagePath.yellowPin} />
          </View>
          <View style={style.locationText}>
            <Text numberOfLines={1} style={[commonStyles.fnt14Medium]}>
              Pickup Location
            </Text>
            <Text numberOfLines={1} style={[style.text]}>
              {pickupAddress}
            </Text>
            <View style={{height: 30}} />
            <Text numberOfLines={1} style={[commonStyles.fnt14Medium]}>
              Drop Location
            </Text>
            <Text numberOfLines={1} style={[style.text]}>
              {dropAddress}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={commonStyles.btnPrimary}
          onPress={confirmLocation}>
          <Text
            style={[
              commonStyles.textCenter,
              commonStyles.fnt16Medium,
              {color: theme.white},
            ]}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ConfirmLocation;
