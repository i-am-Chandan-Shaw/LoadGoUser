import React from 'react';
import { View,Text, Image } from 'react-native';
import style from './style';

const CustomMarker=({text, imgSrc, markerStyle})=>{
return (
    <View style={style.currentLocation}>
        <View style={style.currentLocationText}>
            <Text numberOfLines={1} style={{color:'#fff', fontSize:11}}>{text || 'Select Pickup'}</Text>
        </View>
        <Image style={[style.img, markerStyle]} source={imgSrc} />
    </View>
    )
}

export default CustomMarker;