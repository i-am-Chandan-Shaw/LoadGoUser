import React,{ useState, useRef, useEffect, } from 'react';
import { View,Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  useNavigation } from '@react-navigation/native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import {REACT_APP_MAPS_API} from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import ReceiverDetails from '../../core/View/ReceiverDetails';
import imagePath from '../../constants/imagePath';
import style from './style';


const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const BookingScreen=()=>{


const navigation = useNavigation()
const bottomSheetRef = useRef(null)
const mapRef= useRef();
const snapPoints=[270];

const [locationArr, setLocationArr]= useState([
    {latitude: 22.5629, longitude: 88.3196},
    {latitude: 22.5229, longitude: 88.3462},
    {latitude: 22.5959, longitude: 88.3262}
]);

var markerArr=[]

useEffect(()=>{
    setMarkers()
},[locationArr])

const setMarkers = ()=>{
    for(let i = 0; i < locationArr.length; i++){
        console.log('dasd');
        markerArr.push(
            <View key={i}>
                <Marker 
                onPress={searchLocation}
                coordinate={{
                    latitude: locationArr[i].latitude,
                    longitude: locationArr[i].longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
                <CustomMarker  
                    headerText={''}
                    text={'Stop '+(i+1)} 
                    imgSrc={imagePath.otherPin}/>
            </Marker>
            </View>
        )
    }
}


const searchLocation = () => {
    // navigation.navigate('ChooseLocation', { getCoordinates: fetchValues, locationType:'drop' })
}


return (
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
        <View style={style.container}>
            <MapView ref={mapRef} style={style.mapContainer}
                initialRegion={{
                    latitude: 22.5629,
                    longitude: 88.3962,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                toolbarEnabled={false}
                loadingEnabled={false}
                showsUserLocation={false}
                mapType={'terrain'}
                showsMyLocationButton={false} >
                    

                {markerArr}

                <Marker 
                    onPress={searchLocation}
                    coordinate={{
                        latitude: 22.5229,
                        longitude: 88.3362,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    <CustomMarker  
                        headerText={''}
                        text={'Drop'} 
                        imgSrc={imagePath.dropMarker}/>
                </Marker>

                <Marker 
                    onPress={searchLocation}
                    coordinate={{ 
                        latitude: 22.5929, 
                        longitude: 88.3062,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA, }}>
                    <CustomMarker  
                        headerText={''}
                        text={'Pickup'} 
                        imgSrc={imagePath.pickupMarker}/>
                </Marker>


                <MapViewDirections
                    origin={
                        {
                            latitude: 22.5929, 
                            longitude: 88.3062,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }
                    }
                    destination={
                        {
                            latitude: 22.5229,
                            longitude: 88.3362,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }
                    }
                    waypoints={locationArr}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor='#666'
                    optimizeWaypoints={true}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)

                        mapRef.current.fitToCoordinates(result.coordinates, {
                            
                        });
                    }}
                />
            </MapView>

            <BottomSheetModal 
                ref={bottomSheetRef}
                index={0}
                enablePanDownToClose={true}
                backgroundStyle={{borderRadius:20, borderWidth:1, borderColor:'#d6d6d6', elevation:20}}
                snapPoints={snapPoints}>
                <View style={style.bottomSheetPopup}>
                    <ReceiverDetails/>
                </View>
            </BottomSheetModal>
        </View>
    </BottomSheetModalProvider>
</GestureHandlerRootView>
    )
}

export default BookingScreen;