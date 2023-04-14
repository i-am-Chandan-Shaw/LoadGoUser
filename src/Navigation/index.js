import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import ChooseLocation from '../screen/ChooseLocation';
import SplashScreen from '../screen/SplashScreen';


const Stack = createNativeStackNavigator();

const Navigation=()=>{
return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Intro" options={{headerShown:false}} component={SplashScreen} />
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="ChooseLocation" options={{title:'Choose Location'}}  component={ChooseLocation} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Navigation;