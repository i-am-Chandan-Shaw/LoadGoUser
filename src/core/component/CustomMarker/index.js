import React from 'react';
import { View,Text, Image } from 'react-native';
import style from './style';


const CustomMarker=({text, imgSrc, markerStyle, headerText})=>{
    const isHeader = headerText.length != 0
return (
    
    <View style={style.currentLocation}>
        <View style={[style.currentLocationText, !isHeader?{marginBottom:30,top:25}:{}]}>
            { isHeader && (<Text style={style.headerText}>{headerText} </Text>)}
            <Text numberOfLines={1} style={{color:'#fff', fontSize:13}}>{text || 'Select Pickup'}</Text>
        </View>
        <Image style={[style.img, markerStyle]} source={imgSrc} />
    </View>
    )
}

export default CustomMarker;