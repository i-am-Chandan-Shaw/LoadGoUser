import React from 'react';
import {View, Text, Pressable, Dimensions} from 'react-native';
import GoogleAutocomplete from '../../core/component/GoogleAutocomplete';
import {REACT_APP_MAPS_API} from '@env';
import AntIcon from 'react-native-vector-icons/AntDesign';
import style from './style';

const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const latitudeDelta = 0.1522;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;

const ChooseLocation = ({navigation, route}) => {
  const {locationType, getCoordinates} = route.params;

  const setCoordinates = (data, details) => {
    const selectedCoordinates = {
      locationType,
      selectedAddress: details.formatted_address,
      coords: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta,
        longitudeDelta,
      },
    };
    getCoordinates(selectedCoordinates);
    navigation.goBack();
  };

  const locationText =
    locationType === 'pickup' ? 'Pickup Location' : 'Drop Location';
  const placeholderText =
    locationType === 'pickup'
      ? 'Search Pickup Location'
      : 'Search Drop Location';

  return (
    <View style={style.container}>
      {/* Header */}
      <View style={style.header}>
        <Pressable onPress={navigation.goBack}>
          <AntIcon name="arrowleft" size={20} color={'#222'} />
        </Pressable>
        <Text style={style.headerText}>{locationText}</Text>
      </View>

      {/* Google Autocomplete */}
      <GoogleAutocomplete
        onPress={setCoordinates}
        apiKey={GOOGLE_MAPS_API_KEY}
        placeholder={placeholderText}
      />
    </View>
  );
};

export default ChooseLocation;
