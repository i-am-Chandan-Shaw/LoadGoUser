import React, { useEffect } from 'react';
import { View,Text, Image } from 'react-native';
import style from './style';
import { locationPermission } from '../../core/helper/helper';

const SplashScreen=({navigation})=>{

    useEffect(()=>{
        setTimeout(() => {
            getLiveLocation();
        }, 1000);
        
    },[])

    // Getting Location Access

    const getLiveLocation = async () => {
        try{
            const status = await locationPermission()
            if (status) {
                console.log('Permission Granted');
                navigation.replace('Login')
            }
        }catch(error){
            console.log(error);
            navigation.replace('Login')
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