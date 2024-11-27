import React from 'react';
import {View, Text, Pressable} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import style from './style';

const LocationInputButton = ({onPress, text, textColor, iconColor, styles}) => {
  return (
    <Pressable style={[style.mainContainer, styles]} onPress={onPress}>
      <View style={style.container}>
        <View style={style.inputContainer}>
          <FAIcon name="search" size={12} color={iconColor} />
          <Text numberOfLines={1} style={[style.textStyle, {color: textColor}]}>
            {text}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default LocationInputButton;
