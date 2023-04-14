import React from 'react';
import { View,Text, Image } from 'react-native';
import style from './style';

const SplashScreen=({navigation})=>{

    setTimeout(() => {
        navigation.replace('Home')
    }, 1000);

return (
    <View style={style.container}>
        <Image style={style.image} source={require('../../assets/illustrations/delivery.png')} />
        {/* <Text style={style.logoText}>LOAD GO</Text> */}
    </View>
    )
}

export default SplashScreen;