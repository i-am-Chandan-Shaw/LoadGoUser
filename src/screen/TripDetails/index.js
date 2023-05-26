import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image,Linking } from 'react-native';
import style from './style';
import imagePath from '../../constants/imagePath';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppDivider from '../../core/component/AppDivider';
import { Button } from 'react-native-paper';
const TripDetails = (props) => {

    const [data, setData] = useState('')

    useEffect(() => {
        setData(props.route.params.tripDetails);
    })

    const callSupport=()=>{
        Linking.openURL(`tel:${3361218798}`)
        
    }

    return (
        <ScrollView>
            <View style={style.mainContainer}>
                <View style={{ flexGrow: 1 }}>
                    <View style={style.topContainer}>
                        <View >
                            <View >
                                <Text style={style.subHeaderText}>{data.date}, {data.time}</Text>
                            </View>
                            <View>
                                <Text style={style.secondarySemibold}>CRN {data.tripId}</Text>
                            </View>
                        </View>
                        <View>
                            <Button style={{ borderColor: '#d6d6d6'}} onPress={callSupport} buttonColor='#1F41BB'  textColor='#fff' mode='contained'>Contact Support</Button>
                        </View>
                    </View>
                    <AppDivider bgColor={'#d6d6d6'} />
                    <View style={style.middleContainer}>
                        <View style={style.leftContent}>
                            <Image style={[style.image, { marginRight: 20 }]} source={imagePath[data.vehicleType]} />
                            <Text style={style.subHeaderText}>{data.vehicleName}</Text>
                        </View>
                        <View style={style.rightContent}>
                            <MaterialIcons name="cash" color={'green'} size={40} />
                            <Text style={[style.subHeaderText,{marginLeft:10, marginTop:4}]}>₹ {data.amount}</Text>
                        </View>
                    </View>
                    <AppDivider bgColor={'#d6d6d6'} />
                    <View style={style.locationContainer}>
                        <View style={style.locationText}>
                            <Text numberOfLines={1} style={[style.text]}>12:54 PM</Text>
                            <View style={{ height: 17 }}></View>
                            <Text numberOfLines={1} style={[style.text]}>{data.time}</Text>
                        </View>
                        <View style={style.timeLine}>
                            <View style={style.circle}></View>
                            <View style={style.dottedLine}></View>
                            <View style={[style.circle, { backgroundColor: '#568203' }]}></View>
                        </View>
                        <View style={style.locationText}>
                            <Text numberOfLines={1} style={[style.text]}>{data.pickup}</Text>
                            <View style={{ height: 17 }}></View>
                            <Text numberOfLines={1} style={[style.text]}>{data.drop}</Text>
                        </View>
                    </View>
                    <AppDivider bgColor={'#d6d6d6'} />
                    <View style={style.billDetailsContainer}>
                        <Text style={style.subHeaderText}>Bill Details</Text>
                        <View style={style.billRow}>
                            <Text style={[style.text, {fontSize:15}]}>Your Trip</Text>
                            <Text style={[style.text, {fontSize:15}]}>₹ {data.amount}</Text>
                        </View>
                        <View style={style.billRow}>
                            <Text style={[style.text, {fontSize:15}]}>Wait Time</Text>
                            <Text style={[style.text, {fontSize:15}]}>₹ 0</Text>
                        </View>
                        <View style={style.billRow}>
                            <Text style={[style.text, {fontSize:15}]}>Taxes</Text>
                            <Text style={[style.text, {fontSize:15}]}>₹ 78.12</Text>
                        </View>
                        <View style={[style.billRow, {borderBottomWidth:0}]}>
                            <Text style={style.subHeaderText}>Total Payable</Text>
                            <Text style={[style.text, {fontSize:15}]}>₹ {data.amount}</Text>
                        </View>

                        <View style={[style.billRow, {borderBottomWidth:0}]}>
                            <Text style={style.subHeaderText}>Payment Method</Text>
                            <Text style={[style.subHeaderText]}>Cash</Text>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default TripDetails;