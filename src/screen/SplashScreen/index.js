import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Linking, Pressable, Text} from 'react-native';
import {locationPermission} from '../../core/helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../../constants/commonStyle';
import {UserEnum} from '../../constants/enums';
import {get} from '../../core/helper/services';
import {AppContext} from '../../core/helper/AppContext';
import {useNavigation} from '@react-navigation/native';
import {checkAppVersion} from '../../core/helper/apiHelper';
import AppLoader from '../../core/component/AppLoader';

const SplashScreen = () => {
  const {setGlobalData} = useContext(AppContext);
  const navigation = useNavigation();
  const [versionDetails, setVersionDetails] = useState({
    mandatoryUpdate: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkVersionValidation();
  }, []);

  const checkVersionValidation = async () => {
    try {
      setIsLoading(true);
      const versionData = await checkAppVersion();

      if (versionData) {
        setVersionDetails(versionData);
        // Only initialize if there's no mandatory update
        if (!versionData.mandatoryUpdate) {
          await initializeApp();
        }
      } else {
        // If no version data (including error cases), proceed with initialization
        await initializeApp();
      }
    } catch (error) {
      console.error('Version validation error:', error);
      // Consider showing an error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const updateApp = () => {
    const url = versionDetails.updateUrl;
    console.log(url);

    Linking.openURL(url);
  };

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
    <>
      {isLoading && <AppLoader />}
      <View
        style={[
          commonStyles.columnCenterFit,
          commonStyles.p16,
          commonStyles.gap2,
          {height: '100%'},
        ]}>
        <Image
          style={{width: '40%', height: undefined, aspectRatio: 470 / 347}}
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
        />
        {versionDetails?.mandatoryUpdate && (
          <View
            style={[
              commonStyles.mt24,
              commonStyles.columnCenter,
              commonStyles.gap4,
            ]}>
            <Text style={[commonStyles.fnt12Regular, {textAlign: 'center'}]}>
              The version is outdated, please update to use the app
            </Text>
            <Pressable
              onPressIn={updateApp}
              style={[commonStyles.btnSuccess, {width: 150}]}>
              <Text
                style={[
                  commonStyles.fnt16Medium,
                  commonStyles.textCenter,
                  commonStyles.textWhite,
                ]}>
                Update App
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
};

export default SplashScreen;
