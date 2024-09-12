import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { REACT_APP_MAPS_API } from '@env';
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

// Function to get status value by ID
export function getStatusValueById(id) {
    let statuses = [
        { "id": 1, "value": "Requested" },
        { "id": 2, "value": "Accepted" },
        { "id": 3, "value": "Revoked" },
        { "id": 4, "value": "Started" },
        { "id": 5, "value": "Completed" },
        { "id": 6, "value": "Cancelled By User" },
        { "id": 7, "value": "Cancelled By Driver" },
        { "id": 8, "value": "Request Timeout" }
    ];

    for (let status of statuses) {
        if (status.id === parseInt(id)) {
            return status.value;
        }
    }
    return null; // Return null if the provided ID doesn't match any status
}

export function convertTo12HourFormat(time24h) {
    // Splitting the time string into hours, minutes, and seconds
    let [hours, minutes, seconds] = time24h.split(':').map(Number);

    // Determining AM/PM
    let period = hours < 12 ? 'AM' : 'PM';

    // Converting to 12-hour format
    hours = hours % 12 || 12;

    // Formatting the time string
    let time12h = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;

    return time12h;
}