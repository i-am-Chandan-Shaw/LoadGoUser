import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {locationPermission} from '../../core/helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../../constants/commonStyle';
import {useTheme} from '../../constants/ThemeContext';

const SplashScreen = ({navigation}) => {
  const {theme} = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      getLiveLocation();
      checkAuthentication();
    }, 1000);
  }, []);

  const checkAuthentication = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
        console.log('Data not found!');
        return false;
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
      return false;
    }
  };

  // Getting Location Access

  const getLiveLocation = async () => {
    try {
      const status = await locationPermission();
      if (status) {
        console.log('Permission Granted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[commonStyles.flexCenter]}>
      <Image
        style={{width: '40%', height: undefined, aspectRatio: 470 / 347}}
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
