import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import imagePath from '../../constants/imagePath';
import style from './style';
import { ActivityIndicator, Button } from 'react-native-paper';
const LocationAccess = ({onPress,isLoading}) => {
    return (
        <View style={style.mainContainer}>
            {isLoading && <View style={style.indicatorContainer}>
                <ActivityIndicator size={35} animating={true} color={'#fff'} />
            </View>}
            <Image style={{ height: 200, width: 200 }} source={imagePath.locationAccess} />
            <Text style={style.headerText}>Allow your location</Text>
            <Text style={style.subHeaderText}>We will need your location to 
                give you better experience</Text>
            <TouchableOpacity disabled={isLoading} onPress={onPress} style={style.button} > 
                <Text style={{color:'#fff', fontSize:16, fontWeight:500,}}> Enable Location Service </Text> 
                
            </TouchableOpacity>
            <Text style={style.mediumText}>To allow access go to App Info &gt; Permissions &gt; Allow Location service & try again</Text>
            
        </View>
    )
}

export default LocationAccess;