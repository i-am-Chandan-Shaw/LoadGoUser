import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import RideStatus from '../../core/component/TripStatus';
import style from './style';
import {AppContext} from '../../core/helper/AppContext';
import {get} from '../../core/helper/services';

const RideHistory = () => {
  const {globalData, setGlobalData} = useContext(AppContext);

  useEffect(() => {
    if (globalData?.userData) getRideData(globalData.userData[0].id);
  }, []);

  const [rideData, setRideData] = useState([]);

  const getRideData = async id => {
    console.log(id);
    const queryParameter = '?userId=' + id.toString();
    try {
      const data = await get('getAllRides', queryParameter);
      if (data) {
        setRideData(data);
      }
    } catch (error) {
      console.log('getRideData', error);
    }
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.headerContainer}>
        <Text style={style.subHeaderText}>Trip History</Text>
      </View>
      {rideData.length > 0 && (
        <FlatList
          data={rideData}
          renderItem={({item}) => <RideStatus data={item} />}
          keyExtractor={item => item.tripId}
        />
      )}
      {rideData.length == 0 && (
        <View style={style.noDataContainer}>
          <Text style={style.message}>No History Found</Text>
        </View>
      )}
    </View>
  );
};

export default RideHistory;
