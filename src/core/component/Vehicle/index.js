import React from 'react';
import { View,Image,Text, Pressable } from 'react-native';
import style from './style';


const Vehicle=({imgPath,styles,onPress, amount, isSelected, vehicleName})=>{
return (
    <View style={style.container}>
        <Text style={[style.vehicleText,
            isSelected?style.selectedText:{} ]}>
            {vehicleName}</Text>
        <Pressable  
            onPress={onPress} 
            style={[style.vehicle, isSelected?style.selectedVehicle:{}]}>
            <Image style={style.image} source={imgPath}/>
        </Pressable>
        <Text style={[style.amountText,
            isSelected?style.selectedText:{} ]}>₹ {amount}</Text>
    </View>
    )
}

export default Vehicle;