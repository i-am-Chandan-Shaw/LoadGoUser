import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import {REACT_APP_MAPS_API} from '@env';
const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;

export const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if (permissionStatus === 'granted') {
                return resolve('granted')
            }
            reject('permission not granted')
        } catch (error) {
            return reject(error)
        }
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            'title': 'Load Go ',
            'message': 'Load Go wants  to access your location ',
        }
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
        }
        return reject('Location Permission Denied')
    }).catch((error) => {
        console.log('Ask Location Permission Error', error);
        return reject(error)
    })
})


export const getCurrentLocation = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        position => {
            const cords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            resolve(cords);
        },
        error => {
            reject(error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
});

export const getAddressFromCoordinates = (latitude, longitude) => new Promise((resolve, reject) => {
    fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=' +
        GOOGLE_MAPS_API_KEY,
    )
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status === 'OK') {
                resolve(responseJson?.results?.[0]?.formatted_address);
            } else {
                reject('not found');
            }
        })
        .catch(error => {
            reject(error);
        });
});
