import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import imagePath from '../../../constants/imagePath';
import style from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { getStatusValueById, convertTo12HourFormat } from '../../helper/helper';


const RideStatus = ({ data }) => {
    const navigation = useNavigation()
    const showTripDetails = () => {
        navigation.navigate('TripDetails', { tripDetails: data });
    }

   
    return (
        <Pressable onPress={showTripDetails}>
            <View style={style.container}>
                <View style={style.leftContainer}>
                    <View style={style.headerContainer}>
                        <Text style={[style.subHeaderText]} >{data.requestDate}, {convertTo12HourFormat(data.requestTime)}  </Text>
                        <View style={{ marginBottom: 2 }}>
                            <FeatherIcon name='chevron-right' size={20} />
                        </View>
                        <View>
                            <Text style={[style.subHeaderText]} >{getStatusValueById(data.status)} </Text>
                        </View>
                    </View>
                    <View style={style.locationContainer}>
                        <View style={style.timeLine}>
                            <View style={style.circle}></View>
                            <View style={style.dottedLine}></View>
                            <View style={[style.circle, { backgroundColor: '#568203' }]}></View>
                        </View>
                        <View style={style.locationText}>
                            <Text numberOfLines={1} style={[style.text]}>{data.pickUpLocation}</Text>
                            <View style={{ height: 17 }}></View>
                            <Text numberOfLines={1} style={[style.text]}>{data.dropLocation}</Text>
                        </View>
                    </View>
                </View>
                <View style={style.rightContainer}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image style={style.image} source={imagePath['tataAce']} />
                        <Text style={style.text}>{data.vehicleName}</Text>
                    </View>
                    <View>
                        <Text style={[style.subHeaderText]} > ₹ {data.amount} </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RideStatus;