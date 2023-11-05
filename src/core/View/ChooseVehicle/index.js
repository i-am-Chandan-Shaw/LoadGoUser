import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Image, Pressable } from 'react-native';
import style from './style';
import ANTIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import imagePath from '../../../constants/imagePath';
import Vehicle from '../../component/Vehicle';
import { Picker } from '@react-native-picker/picker';


const ChooseVehicle = ({ onPress, amount,discountReceived, selectGoods, paymentMode, changeMethod, receiverData: receiverData }) => {

    const [selectedGoods, setSelectedGoods] = useState('Loose Goods');
    const [offerApplied, setOfferApplied] = useState(false)
    const [discount, setDiscount] = useState(0)
    const applyCoupon = () => {
        setOfferApplied(true);
        setDiscount(300)
        discountReceived(300)
        Alert.alert("Hooray ! You got flat ₹ 300 discount on this trip.")
    }


    const [vehicle, setVehicle] = useState('tataAce');
    const [totalAmount, setTotalAmount] = useState(amount.tataAce);


    const selectPickupVehicle = (vehicleType, amount) => {
        setVehicle(() => {
            return vehicleType
        });

        setTotalAmount(amount)
    }

    const selectGoodsType = (value) => {
        setSelectedGoods(value);
        selectGoods(value);
    }

    const cashIcon = () => {
        return (
            <View style={{ marginHorizontal: 10 }}>
                <Image style={{ width: 32, height: 16 }} source={imagePath.cash} />
            </View>
        )
    }

    return (
        <View style={style.container}>
            <View style={style.vehicleContainer}>
                {/* <Vehicle 
                isDisabled={true}
                onPress={()=>{selectPickupVehicle('bike',amount.bike)}}
                isSelected={vehicle=='bike'}
                amount={amount.bike}
                vehicleName={'Bike'}
                imgPath={imagePath.bike}
                /> */}
                <Vehicle
                    offerApplied={offerApplied}
                    discount={discount}
                    onPress={() => { selectPickupVehicle('tataAce', amount.tataAce) }}
                    isSelected={vehicle == 'tataAce'}
                    amount={amount.tataAce}
                    vehicleName={'Tata Ace'}
                    imgPath={imagePath.tataAce}
                />
                {/* <Vehicle
                    offerApplied={offerApplied}
                    discount={discount}
                    isDisabled={true}
                    onPress={() => { selectPickupVehicle('bolero', amount.bolero) }}
                    isSelected={vehicle == 'bolero'}
                    amount={amount.bolero}
                    vehicleName={'Bolero'}
                    imgPath={imagePath.bolero}
                /> */}
            </View>

            <View style={style.confirmView}>
                <View style={style.paymentSection}>
                    <View style={style.paymentOption}>
                        <View style={style.amountContainer}>
                            <Text style={[style.fnt16Bold, offerApplied ? style.strikeThrough : {}]}>₹ {totalAmount}</Text>
                            {offerApplied && <Text style={style.fnt16Bold}>₹ {totalAmount - 300}</Text>}
                        </View>
                        <View style={{ marginRight: 10 }}></View>
                        <Pressable onPress={changeMethod}>
                            <View style={style.paymentDropdown}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 600 }}>{paymentMode}</Text>
                                <View style={{ marginRight: 10 }}></View>
                                <EntypoIcon name="chevron-down" size={18} color={'#000'} />
                            </View>
                        </Pressable>
                    </View>
                    <View style={style.verticalBorder}></View>
                    <Pressable style={style.coupon} onPress={applyCoupon}>
                        <Text style={{ color: 'green', fontSize: 16, fontWeight: 600 }}>Apply Offer</Text>
                        <Image style={{ width: 25, height: 25, marginLeft: 10 }} source={imagePath.discount} />
                    </Pressable>
                </View>
                <Pressable onPress={onPress} style={[style.confirmationButton]}>
                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>Book Vehicle</Text>
                    <View style={{ marginRight: 10 }}></View>
                    <ANTIcon name="arrowright" size={20} color={'#fff'} />
                </Pressable>
            </View>
            <View>
                <View style={style.inputStyle}>
                    <Picker
                        selectedValue={selectedGoods}
                        onValueChange={(itemValue, itemIndex) => selectGoodsType(itemValue)
                        }>
                        <Picker.Item label="Loose Goods" value="looseGoods" />
                        <Picker.Item label="General" value="general" />
                        <Picker.Item label="Textile" value="textile" />
                        <Picker.Item label="Electronics/Home Appliance" value="catering" />
                        <Picker.Item label="Catering/Restaurant" value="restaurant" />
                        <Picker.Item label="Books/Stationery/Toys" value="stationary" />
                        <Picker.Item label="Machines/Equipments/Metals" value="machines" />
                        <Picker.Item label="Furniture" value="furniture" />
                    </Picker>
                </View>
                <View style={style.pickupContainer}>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 600 }}>Pickup Contact</Text>
                    <View style={{ marginRight: 5 }}></View>
                    <EntypoIcon name="chevron-right" size={20} color={'#000'} />
                    <View style={{ marginRight: 10 }}></View>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 600 }}> {receiverData.name} ({receiverData.phoneNo})</Text>
                </View>
            </View>
        </View>
    )
}

export default ChooseVehicle;