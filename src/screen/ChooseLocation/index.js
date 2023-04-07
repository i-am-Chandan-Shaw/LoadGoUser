import React, { Fragment }  from 'react';
import { View } from 'react-native';
import GoogleAutocomplete from '../../core/component/GoogleAutocomplete';
import {REACT_APP_MAPS_API} from '@env'






const GOOGLE_MAPS_APIKEY = REACT_APP_MAPS_API;

const ChooseLocation = (props) => {

    let selectedCoordinates = {
        pickUp: {
            lat: '',
            lng: ''
        },
        drop: {
            lat: '',
            lng: ''
        }
    }

    let selectedAddress = {
        pickUp: '',
        drop: ''
    }

    const setPickupCords = (data, details) => {
        selectedAddress.pickUp = details.formatted_address
        selectedCoordinates.pickUp.lat = details.geometry.location.lat
        selectedCoordinates.pickUp.lng = details.geometry.location.lng
        validateCoordinates()
    }

    const setDropCords = (data, details) => {
        selectedAddress.drop = details.formatted_address
        selectedCoordinates.drop.lat = details.geometry.location.lat
        selectedCoordinates.drop.lng = details.geometry.location.lng
        validateCoordinates()

    }

    const validateCoordinates = () => {
        if (selectedCoordinates.pickUp.lat != '' && selectedCoordinates.drop.lat != '') {
            props.route.params.getCoordinates(selectedCoordinates, selectedAddress);
            props.navigation.goBack()

        }
    }

    return (
            <Fragment>
                <GoogleAutocomplete apiKey={GOOGLE_MAPS_APIKEY} styles={{marginTop:10}} placeholder={'Enter Pickup Location'} onPress={setPickupCords} />
                <View>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>
                <GoogleAutocomplete apiKey={GOOGLE_MAPS_APIKEY} placeholder={'Enter Drop Location'} onPress={setDropCords}/>
            </Fragment>

    )
}

export default ChooseLocation;