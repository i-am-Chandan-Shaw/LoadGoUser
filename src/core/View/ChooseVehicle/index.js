import React, { useEffect, useState } from 'react';
import { View ,Text,Button, Image, Pressable} from 'react-native';
import style from './style';
import ANTIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import imagePath from '../../../constants/imagePath';
import Vehicle from '../../component/Vehicle';

const ChooseVehicle=({onPress})=>{

const [vehicle, setVehicle] = useState('tataAce')
const [totalAmount,setTotalAmount]=useState(1246)

const selectPickupVehicle=(vehicleType,amount)=>{
    setVehicle(()=>{
        return vehicleType
    });

    setTotalAmount(amount)
}

const cashIcon= ()=>{
    return(
        <View style={{marginHorizontal:10}}>
            <Image style={{width:32, height:16}} source={imagePath.cash} />
        </View>
    )
}

return (
    <View style={style.container}>
        <View style={style.vehicleContainer}>
            <Vehicle 
                onPress={()=>{selectPickupVehicle('bike',749)}}
                isSelected={vehicle=='bike'}
                amount={749}
                vehicleName={'Bike'}
                imgPath={imagePath.bike}
                />
            <Vehicle 
                onPress={()=>{selectPickupVehicle('tataAce',1246)}}
                isSelected={vehicle=='tataAce'}
                amount={1246}
                vehicleName={'Tata Ace'}
                imgPath={imagePath.tataAce}
                />
            <Vehicle 
                onPress={()=>{selectPickupVehicle('bolero',928)}}
                isSelected={vehicle=='bolero'}
                amount={928}
                vehicleName={'Bolero'}
                imgPath={imagePath.bolero}
                />
        </View>
        <View style={style.confirmView}>
            <View style={style.paymentSection}>
                <View style={style.paymentOption}> 
                        <Text style={{color:'#000', fontSize:18, fontWeight:600}}>₹ {totalAmount}</Text>
                        <View style={{marginRight:10}}></View>
                    <View style={style.paymentDropdown}>
                        <Text style={{color:'#000', fontSize:18, fontWeight:600}}>Online</Text>
                        <View style={{marginRight:10}}></View>
                        <EntypoIcon name="chevron-down" size={20} color={'#000'} /> 
                    </View>
                </View>
                <View style={style.verticalBorder}></View>
                <View style={style.coupon}> 
                    <Text style={{color:'green', fontSize:18, fontWeight:600}}>Apply Coupon</Text>
                    <Image style={{width:25, height:25, marginLeft:10 }} source={imagePath.discount} />
                </View>
            </View>
            <Pressable onPress={onPress}  style={[style.confirmationButton]}> 
                <Text style={{color:'#fff', fontSize:18, fontWeight:600}}>Book Vehicle</Text> 
                <View style={{marginRight:10}}></View>
                <ANTIcon name="arrowright" size={20} color={'#fff'}/> 
            </Pressable>
        </View>
        <View style={style.pickupContainer}>
            <Text style={{color:'#000', fontSize:15, fontWeight:600}}>Pickup Contact</Text>
            <View style={{marginRight:5}}></View>
            <EntypoIcon name="chevron-right" size={20} color={'#000'} />
            <View style={{marginRight:10}}></View>
            <Text style={{color:'#000', fontSize:16, fontWeight:600}}>Chandan Shaw (8240122319)</Text>
        </View>
    </View>
    )
}

export default ChooseVehicle;