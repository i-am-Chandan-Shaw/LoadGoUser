import React from 'react';
import { View,Text,Pressable } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import style from './style';

const LocationInputButton = ({onPress, text, textColor, iconColor}) => {
    return (
        <View style={style.mainContainer}>
            <Pressable onPress={onPress}>
                <View style={style.container}>
                    <View style={style.inputContainer}>
                        <FAIcon name="search" size={15} color={iconColor} />
                        <Text numberOfLines={1} style={[style.textStyle,{ color: textColor }]}>{text}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
        
    )
}

export default LocationInputButton;