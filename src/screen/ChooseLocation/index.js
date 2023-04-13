import React, { Fragment }  from 'react';
import { View } from 'react-native';
import GoogleAutocomplete from '../../core/component/GoogleAutocomplete';
import {REACT_APP_MAPS_API} from '@env'

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


    return (
        <View>
            <GoogleAutocomplete 
                onPress={setCoordinates}
                apiKey={GOOGLE_MAPS_API_KEY} 
                styles={{marginTop:10}} 
                placeholder={props.route.params.locationType=='pickup'?'Enter Pickup Location':'Enter Drop Location'} 
                />
        </View>
    )
}

export default ChooseLocation;