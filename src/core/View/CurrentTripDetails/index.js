import React, { useEffect } from 'react';
import { View, Text, Linking, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import style from './style';
const CurrentTripDetails = ({ data }) => {
    const callDriver = () => {
        Linking.openURL(`tel:${data.driverPhone}`)
    }



    return (
        <View>
            <View style={style.topContainer}>
                <Text style={{ fontSize: 16, color: '#000' }}>Tata Ace (Mini Truck)</Text>
                <View style={style.otpContainer}>
                    <Text style={{ fontSize: 16, color: '#000' }}>OTP: </Text>
                    <Text style={{ fontSize: 18,fontWeight:'bold', color: 'green' }}>{data?.otp}</Text>
                </View>
            </View>
            <View style={style.topContainer}>
                <View style={style.numberPlateContainer}>
                    <Text style={{ fontSize: 14, color: '#000' }}>{data?.vehicleNumber}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{ fontSize: 14, color: '#000' }}>Est. Amount : </Text>
                    <Text style={{ fontSize: 14,fontWeight:'bold', color: 'green' }}>₹ {data?.amount}</Text>
                </View>
            </View>
            <View style={style.bottomContainer}>
                <View style={style.alignCenter}>
                    <View style={{ marginRight: 15 }}></View>
                    <Avatar.Text size={34} label="AK" />
                    <View style={{ marginRight: 10 }}></View>
                    <Text style={{ fontSize: 16, color: '#000' }}>{data?.driverName} ,</Text>
                    <View style={{ marginRight: 20 }}></View>
                    <Text style={{ fontSize: 16, color: '#000' }}>{data?.driverTotalRating} </Text>
                    <FAIcons name='star' color='#f4c430' size={13} />
                </View>
                <Pressable onPress={callDriver} style={[style.alignCenter, { marginRight: 20 }]}>
                    <View style={style.phoneContainer}>
                        <FeatherIcon name='phone-call' color='#333' size={20} />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default CurrentTripDetails;