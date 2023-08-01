import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import style from './style';
import { locationPermission } from '../../core/helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen=({navigation})=>{

    useEffect(()=>{
        const timeout = setTimeout(() => {
            getLiveLocation();
            checkAuthentication()
        }, 500);
    },[])

    const checkAuthentication = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            if (value !== null) {
                if(value=='true'){
                    navigation.replace('Home')
                }
                else{
                    navigation.replace('Login')
                    return false
                }
            } else {
                navigation.replace('Login')
                console.log('Data not found!');
                return false
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
            return false
        }
    }

    // Getting Location Access

    const getLiveLocation = async () => {
        try{
            const status = await locationPermission()
            if (status) {
                console.log('Permission Granted');
            }
        }catch(error){
            console.log(error);
            
        }
       
    }

    

return (
    <View style={style.container}>
        <Image style={style.image} source={require('../../assets/illustrations/delivery.png')} />
        {/* <Text style={style.logoText}>LOAD GO</Text> */}
    </View>
    )
}

export default SplashScreen;