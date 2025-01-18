import {get, patch} from './services';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
const calculateFare = async totalDistance => {
  const fareData = await getFareDetails();

  const baseFare = parseInt(fareData?.baseFare || 0, 10);
  const perKmCharge = parseInt(fareData?.perKm || 0, 10) * totalDistance;

  if (isNaN(baseFare) || isNaN(perKmCharge)) {
    console.warn('Invalid fare data received. Using fallback fare.');
    return 200;
  }

  const calculatedFare = baseFare + perKmCharge;

  return Math.ceil(calculatedFare);
};

const getFareDetails = async () => {
  try {
    const data = await get('getFare');
    if (data) {
      return data;
    } else {
      throw new Error('No fare data received from the API.');
    }
  } catch (error) {
    console.error('Error fetching fare details:', error);

    return {
      baseFare: 300,
      perKm: 70,
    };
  }
};

export const initializeFareAmount = distance => {
  return calculateFare(distance);
};

export const updateDriverPushToken = async (driverId, pushToken) => {
  const payload = {
    id: driverId,
    pushToken,
  };

  try {
    const response = await patch(payload, 'patchDriver');
    return response;
  } catch (fetchError) {
    console.error('Error patching access token:', fetchError);
    return null;
  }
};

export const checkAppVersion = async () => {
  const CURRENT_VERSION = DeviceInfo.getVersion();

  try {
    const storedVersion = await AsyncStorage.getItem('app_version');

    if (!storedVersion) {
      await AsyncStorage.setItem('app_version', CURRENT_VERSION);
      console.log('Stored current version as it was not found previously.');
      return;
    }

    if (storedVersion !== CURRENT_VERSION) {
      await AsyncStorage.setItem('app_version', CURRENT_VERSION);
      await clearCache();
    }
  } catch (error) {
    console.error('Failed to check app version:', error);
  }
};

const clearCache = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Cache cleared successfully.');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Enable notifications to stay updated with nearby rides.',

          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
        Alert.alert(
          'Permission Needed',
          'You have permanently denied notification access. Please enable it manually in the app settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    console.log(
      'Notification permission not required for this Android version.',
    );
  }
};
