import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';
import CurrentOrders from '../../core/component/CurrentOrders';
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from '../../core/helper/services';
import AppLoader from '../../core/component/AppLoader';
import {useTheme} from '../../constants/ThemeContext';
import useFontStyles from '../../constants/fontStyle';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../../constants/commonStyle';

const Orders = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [tripData, setTripData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetchTripId(isMounted);

    return () => {
      isMounted = false;
      clearInterval(intervalRef.current);
    };
  }, []);

  const fetchTripId = async isMounted => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('tripId');
      if (value) {
        fetchTripStatus(value, isMounted);
        startPolling(value, isMounted);
      }
    } catch (error) {
      console.error('Error retrieving trip ID:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTripStatus = async (id, isMounted) => {
    if (!id) return;

    const queryParameter = `?tripId=${id}`;
    try {
      const data = await get('getRequestVehicle', queryParameter);
      if (data) {
        const status = parseInt(data[0].status, 10);
        if (isMounted && (status === 2 || status === 4)) {
          console.log(data[0]);

          setTripData(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching trip status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = (tripId, isMounted) => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      fetchTripStatus(tripId, isMounted);
    }, 5000);
  };

  const openLiveTracking = () => {
    navigation.replace('LiveTracking', {tripData});
  };

  return (
    <View style={style.mainContainer}>
      {isLoading && <AppLoader style={style.loader} />}
      <View style={style.headerContainer}>
        <Text style={style.subHeaderText}>Orders</Text>
      </View>
      {tripData && (
        <View style={style.orderContainer}>
          <CurrentOrders data={tripData} trackTripStatus={openLiveTracking} />
        </View>
      )}
      {!tripData && (
        <View style={style.noDataContainer}>
          <Image source={imagePath.noDataFound} style={style.icon} />
          <Text style={[commonStyles.fnt16Medium, {color: theme.bgDark}]}>
            No Active Orders
          </Text>
        </View>
      )}
    </View>
  );
};

export default Orders;
