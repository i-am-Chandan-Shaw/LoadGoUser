import {get, patch} from './services';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
const calculateFare = async (totalDistance, totalTime) => {
  const fareData = await getFareDetails();

  const baseFare = parseInt(fareData?.baseFare || 0, 10);
  const perKmCharge = parseInt(fareData?.perKm || 0, 10) * totalDistance;
  const perTimeCharge = parseInt(fareData?.afterAnHour || 0, 10) * totalTime;

  console.log('fare=======>', baseFare, perKmCharge, perTimeCharge);

  const calculatedFare = baseFare + perKmCharge + perTimeCharge;

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

export const initializeFareAmount = (distance, time) => {
  return calculateFare(distance, time);
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
  const appType = 'user';
  let responseData = null;

  console.log(`Current Version: ${CURRENT_VERSION}`);

  try {
    // Make API call first to check if an update is required
    const queryParameter = `?appType=${appType}&currentVersion=${CURRENT_VERSION}`;
    const response = await get('getVersion', queryParameter);

    if (response) {
      responseData = response;

      // Handle mandatory update
      if (response.mandatoryUpdate) {
        Alert.alert(
          'Update Required',
          response.message ||
            'A mandatory update is required to continue using the app.',
          [
            {
              text: 'Update Now',
              onPress: () => Linking.openURL(response.updateUrl),
            },
          ],
          {cancelable: false}, // Prevent dismissing the alert
        );
        return responseData; // Return early as app shouldn't proceed with mandatory update
      }

      // Handle optional update
      if (response.nonMandatoryUpdate) {
        Alert.alert(
          'Update Available',
          response.message ||
            'A new version is available with exciting features.',
          [
            {
              text: 'Later',
              onPress: () => console.log('User chose to update later'),
            },
            {
              text: 'Update Now',
              onPress: () => Linking.openURL(response.updateUrl),
            },
          ],
        );
      }
    }

    // Handle version storage after checking updates
    const storedVersion = await AsyncStorage.getItem('app_version');

    if (!storedVersion) {
      await AsyncStorage.setItem('app_version', CURRENT_VERSION);
      console.log('Stored current version as it was not found previously.');
    } else if (storedVersion !== CURRENT_VERSION) {
      await clearCache();
      await AsyncStorage.setItem('app_version', CURRENT_VERSION);
      console.log('Updated stored version and cleared cache.');
    }

    return responseData;
  } catch (error) {
    console.error('Failed to check app version:', error);
    // Return null to allow app initialization in case of error
    return null;
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
