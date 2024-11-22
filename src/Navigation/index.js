import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import ChooseLocation from '../screen/ChooseLocation';
import SplashScreen from '../screen/SplashScreen';
import BookingScreen from '../screen/BookingScreen';
import Login from '../screen/Login';
import TripDetails from '../screen/TripDetails';
import LiveTracking from '../screen/LiveTracking';
import Register from '../screen/Register';
import {AppContext} from '../core/helper/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingScreen from '../screen/RatingScreen';
import TermsAndConditions from '../screen/TermsAndConditions';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {globalData, setGlobalData} = useContext(AppContext);
  useEffect(() => {
    getDataFromStorage('userId');
    getDataFromStorage('userData');
  }, []);

  const getDataFromStorage = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setGlobalData(key, JSON.parse(value));
      } else {
        console.log(key, 'Data not found!');
        return false;
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
      return false;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="LiveTracking" component={LiveTracking} />
        <Stack.Screen
          name="TermsAndConditions"
          options={{headerShown: true, title: 'Terms & Conditions'}}
          component={TermsAndConditions}
        />
        <Stack.Screen
          name="Rating"
          component={RatingScreen}
          options={{
            headerShown: true,
            headerLeft: () => {
              return null;
            },
            title: 'Rating & Review',
          }}
        />
        <Stack.Screen
          name="TripDetails"
          options={{headerShown: true, title: 'Trip Details'}}
          component={TripDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
