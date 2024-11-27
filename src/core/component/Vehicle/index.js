import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import style from './style';

const Vehicle = ({
  imgPath,
  styles,
  discount,
  onPress,
  offerApplied,
  amount,
  isSelected,
  vehicleName,
  isDisabled,
}) => {
  const totalDiscount = discount ? discount : 0;
  return (
    <View style={style.container}>
      <Text style={[style.vehicleText, isSelected ? style.selectedText : {}]}>
        {vehicleName}
      </Text>
      <Pressable
        onPress={onPress}
        style={[style.vehicle, isSelected ? style.selectedVehicle : {}]}>
        <Image style={style.image} source={imgPath} />
        {isDisabled && <View style={style.overlay} />}
      </Pressable>
      <View style={style.amountContainer}>
        <Text
          style={[
            style.amountText,
            isSelected ? style.selectedText : {},
            offerApplied ? style.strikeThrough : {},
          ]}>
          ₹ {amount - totalDiscount}
        </Text>
        {offerApplied && (
          <Text
            style={[style.amountText, isSelected ? style.selectedText : {}]}>
            ₹ {amount - totalDiscount}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Vehicle;
