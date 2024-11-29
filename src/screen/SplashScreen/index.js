import React, {useContext, useEffect} from 'react';
import {View, Image} from 'react-native';
import {locationPermission} from '../../core/helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../../constants/commonStyle';
import {UserEnum} from '../../constants/enums';
import {get} from '../../core/helper/services';
import {AppContext} from '../../core/helper/AppContext';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const {setGlobalData} = useContext(AppContext);
  const navigation = useNavigation();

  // Initialize the application
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await initializeApp();
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, []);

  const initializeApp = async () => {
    try {
      await Promise.all([checkUserAuthentication(), getLiveLocation()]);
    } catch (error) {
      console.error('Error during app initialization:', error);
    }
  };

  const checkUserAuthentication = async () => {
    try {
      const userId = await AsyncStorage.getItem(UserEnum.USER_ID);
      if (userId) {
        await initializeGlobalData(userId);
      } else {
        console.warn('User ID not found, redirecting to login.');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving user ID from storage:', error);
      navigation.replace('Login');
    }
  };

  const initializeGlobalData = async userId => {
    if (!userId) {
      console.error('Invalid user ID');
      return;
    }

    try {
      const queryParameter = `?userId=${userId}`;
      const userData = await get('getUser', queryParameter);

      if (userData) {
        setGlobalData(UserEnum.USER_DATA, userData);
        console.log('User data saved in global context!');
        navigation.replace('Home');
      } else {
        console.warn('No user data returned from API, redirecting to login.');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error fetching user data from API:', error);
      navigation.replace('Login');
    }
  };

  // Request live location access
  const getLiveLocation = async () => {
    try {
      const status = await locationPermission();
      if (status) {
        console.log('Location permission granted.');
      } else {
        console.warn('Location permission denied.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
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
