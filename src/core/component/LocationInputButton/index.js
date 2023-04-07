import React from 'react';
import { View,Text, TouchableWithoutFeedback } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import style from './style';

const LocationInputButton = ({onPress, text, textColor, iconColor}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={style.container}>
                <View style={style.inputContainer}>
                    <FAIcon name="search" size={15} color={iconColor} />
                    <Text numberOfLines={1} style={[style.textStyle,{ color: textColor }]}>{text}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LocationInputButton;