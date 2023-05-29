import React from 'react';
import { View, Text, Image, Pressable, Linking } from 'react-native';
import style from './style';
import imagePath from '../../../constants/imagePath';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-paper';
import AppDivider from '../AppDivider';
import { useNavigation } from '@react-navigation/native';

const CurrentOrders = ({ data }) => {


    const navigation = useNavigation()
    const trackStatus=()=>{
        navigation.navigate('LiveTracking', {details:data})
    }
    
    const callDriver=()=>{
        Linking.openURL(`tel:${data.driverNumber}`)
    }
    return (
        <View style={style.mainContainer}>
            <View style={style.leftContainer}>
                <View style={style.headerContainer}>
                    <Text style={style.subHeaderText}>WB 01 AB 1234 • {data.vehicleName}
                    </Text>
                    <View style={{ marginBottom: 2 }}>
                        <FeatherIcon name='chevron-right' size={20} />
                    </View>
                    <Text style={style.subHeaderText}> Running
                    </Text>
                </View>
                <View style={style.topContainer}>
                    <View style={style.vehicleContainer}>
                        <View style={style.vehicle}>
                            <Image style={style.image} source={imagePath[data.vehicleType]} />
                        </View>
                        <Text style={[style.subHeaderText, { lineHeight: 18 }]}>₹ {Math.floor(data.amount)} </Text>
                    </View>
                    <View >
                        <View style={[style.alignCenter, { marginBottom: 20 }]}>
                            <Avatar.Text size={24} label="AK" />
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={style.simpleText}>Arun Kumar </Text>
                            </View>
                            <AppDivider alignment={'vertical'} bgColor={'#ccc'} />
                            <View style={[{ marginHorizontal: 20, }, style.alignCenter]}>
                                <Text style={style.simpleText}>{data.driverRating} </Text>
                                <FAIcons name='star' color='#f4c430' size={13} />
                            </View>
                        </View>
                        <View style={style.bottomContainer}>
                            <Pressable onPress={callDriver} style={[style.alignCenter, { marginRight: 20 }]}>
                                <View style={{ marginTop: 2, marginRight: 5 }}>
                                    <FeatherIcon name='phone-call' size={20} />
                                </View>
                                <Text style={style.simpleSemibold}> Call Driver </Text>
                            </Pressable>
                            <Pressable onPress={trackStatus} style={[style.alignCenter, { marginRight: 20 }]}>
                                <View style={{ marginTop: 2, marginRight: 5 }}>
                                    <FeatherIcon name='send' size={20} />
                                </View>
                                <Text style={style.simpleSemibold}> View Map </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CurrentOrders;