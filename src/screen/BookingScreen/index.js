import React,{ useState, useRef, useEffect, } from 'react';
import { View,Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import {REACT_APP_MAPS_API} from '@env';
import CustomMarker from '../../core/component/CustomMarker';
import imagePath from '../../constants/imagePath';
import style from './style';
import ChooseVehicle from '../../core/View/ChooseVehicle';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import BookingProgress from '../../core/View/BookingProgress';



const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const BookingScreen=(props)=>{

const navigation = useNavigation()
const bottomSheetRef = useRef(null)
const mapRef= useRef();
const snapPoints=[340,380];

const markerArr=[]

// const [locationArr, setLocationArr]= useState([
//     {latitude: 22.5629, longitude: 88.3196},
//     {latitude: 22.5229, longitude: 88.3462},
//     {latitude: 22.5959, longitude: 88.3262}
// ]);


const [state,setState]=useState({
    pickupCoords:{},
    dropCoords:{}
});

const [screenType, setScreenType]= useState('chooseVehicle')

useEffect(()=>{
    bottomSheetRef.current?.present();
    setState({
        pickupCoords:props.route.params.locationDetails.pickup,
        dropCoords:props.route.params.locationDetails.drop,
    })
},[])

// const setMarkers = ()=>{
//     for(let i = 0; i < locationArr.length; i++){
//         markerArr.push(
//             <View key={i}>
//                 <Marker 
//                 onPress={searchLocation}
//                 coordinate={{
//                     latitude: locationArr[i].latitude,
//                     longitude: locationArr[i].longitude,
//                     latitudeDelta: LATITUDE_DELTA,
//                     longitudeDelta: LONGITUDE_DELTA,
//                 }}>
//                 <CustomMarker  
//                     headerText={''}
//                     text={'Stop '+(i+1)} 
//                     imgSrc={imagePath.otherPin}/>
//             </Marker>
//             </View>
//         )
//     }
// }

const goBack= ()=>{
    setScreenType('chooseVehicle')
    props.navigation.goBack()
}

const cancelRide=()=>{
    navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
}

const searchLocation = () => {
    navigation.navigate('ChooseLocation', { getCoordinates: fetchValues, locationType:'drop' })
}

return (
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={goBack}>
                    <IonicIcon name="arrow-back-circle" size={40} color={'#222'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelRide}>
                    <Button mode='contained' textColor='#fff' style={{backgroundColor:'#222'}}>Cancel Ride</Button>
                </TouchableOpacity>
            </View>
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
                    coordinate={state.dropCoords}>
                    <CustomMarker  
                        headerText={''}
                        text={'Drop'} 
                        imgSrc={imagePath.dropMarker}/>
                </Marker>

                <Marker 
                    onPress={searchLocation}
                    coordinate={state.pickupCoords}>
                    <CustomMarker  
                        headerText={''}
                        text={'Pickup'} 
                        imgSrc={imagePath.pickupMarker}/>
                </Marker>


                {Object.keys(state.dropCoords).length != 0 && (<MapViewDirections
                    origin={state.pickupCoords}
                    destination={state.dropCoords}
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
                />)}
            </MapView>

            <BottomSheetModal 
                ref={bottomSheetRef}
                index={0}
                enablePanDownToClose={false}
                backgroundStyle={{borderRadius:20, borderWidth:1, borderColor:'#d6d6d6', elevation:20}}
                snapPoints={snapPoints}>
                <View style={style.bottomSheetPopup}>
                    {screenType=='chooseVehicle' && <ChooseVehicle onPress={()=>{ setScreenType('bookingProgress')}} />}
                    {screenType=='bookingProgress' && <BookingProgress onPress={()=>{ setScreenType('chooseVehicle')}} />}
                    
                </View>
            </BottomSheetModal>
        </View>
    </BottomSheetModalProvider>
</GestureHandlerRootView>
    )
}

export default BookingScreen;