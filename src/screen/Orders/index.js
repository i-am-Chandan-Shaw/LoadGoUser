import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';
import CurrentOrders from '../../core/component/CurrentOrders';
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from '../../core/helper/services';
import AppLoader from '../../core/component/AppLoader';
import { useTheme } from "../../constants/ThemeContext";
import useFontStyles from "../../constants/fontStyle";

const Orders = () => {
  const {theme} = useTheme();
  const fontStyles = useFontStyles();

  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [tripId, setTripId] = useState(null);
  let tripStatusInterval;
  useEffect(() => {
    fetchTripId();
  }, []);

  useEffect(() => {
    tripStatusInterval = setInterval(async () => {
      try {
        let trip = await getTripStatus(tripId);
        if (trip) {
          setIsLoading(false);
          if (trip.status == 2 || trip.status == 4) {
            let data = {
              ...trip,
              pickupCoords: {
                latitude: Number(trip.pickUpCoords.pickUpLat),
                latitudeDelta: 0.0122,
                longitude: Number(trip.pickUpCoords.pickUpLng),
                longitudeDelta: 0.0061627689429373245,
              },
              dropCoords: {
                latitude: Number(trip.dropCoords.dropLat),
                latitudeDelta: 0.0122,
                longitude: Number(trip.dropCoords.dropLng),
                longitudeDelta: 0.0061627689429373245,
              },
            };
            setOrderData(data);
          } else {
            clearInterval(tripStatusInterval);
            setOrderData(null);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => clearInterval(tripStatusInterval);
  }, [tripData]);

  const fetchTripId = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('tripId');
      if (value != null) {
        setTripId(value);
        let trip = await getTripStatus(value);
        setTripData(trip);
      } else {
        console.log(key, 'Data not found!');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log('Error retrieving fetchTripId data:', error);

      setIsLoading(false);
      return false;
    }
  };

  const getTripStatus = async id => {
    if (id == null) return null;

    const queryParameter = '?tripId=' + id.toString();
    try {
      if (tripData == null) setIsLoading(true);
      const data = await get('getRequestVehicle', queryParameter);
      if (data) {
        return data[0];
      }
    } catch (error) {
      console.log('getTripStatus', error);
      clearInterval(tripStatusInterval);
      setIsLoading(false);
    }
  };

  return (
    <View style={style.mainContainer}>
      {isLoading && <AppLoader style={style.loader} />}
      <View style={style.headerContainer}>
        <Text style={style.subHeaderText}>Orders</Text>
      </View>
      {orderData && (
        <View style={style.orderContainer}>
          <CurrentOrders data={orderData} />
        </View>
      )}
      {!orderData && (
        <View style={style.noDataContainer}>
          <Image source={imagePath.noDataFound} style={style.icon} />
          <Text style={[{color:theme.bgDark}, fontStyles.fnt16Medium]}>No Active Orders</Text>
        </View>
      )}
    </View>
  );
};

export default Orders;
