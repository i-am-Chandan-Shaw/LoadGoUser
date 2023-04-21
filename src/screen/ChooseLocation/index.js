import React, { Fragment }  from 'react';
import { View,Text, Pressable } from 'react-native';
import GoogleAutocomplete from '../../core/component/GoogleAutocomplete';
import {REACT_APP_MAPS_API} from '@env'
import AntIcon from 'react-native-vector-icons/AntDesign'
import style from './style';


const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;

const ChooseLocation = (props) => {

    let selectedCoordinates = {
        locationType:'',
        lat: '',
        lng: '',
        selectedAddress:''
    }

    const setCoordinates = (data,details)=>{
        selectedCoordinates.locationType=props.route.params.locationType;
        selectedCoordinates.selectedAddress=details.formatted_address;
        selectedCoordinates.lat = details.geometry.location.lat;
        selectedCoordinates.lng = details.geometry.location.lng;
        props.route.params.getCoordinates(selectedCoordinates);
        props.navigation.goBack()
        
    }

    const goBack=()=>{
        props.navigation.goBack()
    }


    return (
        <View style={style.container}>
            <View style={style.header}>
                <Pressable onPress={goBack}>
                    <AntIcon name="arrowleft" size={25} color={'#222'}/>
                </Pressable>
                <Text style={style.headerText}>{props.route.params.locationType=='pickup'?'Your Pickup Location':'Your Drop Location'}</Text>
            </View>
            <GoogleAutocomplete 
                onPress={setCoordinates}
                apiKey={GOOGLE_MAPS_API_KEY} 
                placeholder={props.route.params.locationType=='pickup'?'Search Pickup Location':'Search Drop Location'} 
                />
        </View>
    )
}

export default ChooseLocation;