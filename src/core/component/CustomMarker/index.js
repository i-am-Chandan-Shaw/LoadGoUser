import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';
import commonStyles from '../../../constants/commonStyle';
import {lightTheme} from '../../../constants/color';

const CustomMarker = ({text, imgSrc, markerStyle, headerText}) => {
  return (
    <View style={style.markerContainer}>
      {headerText?.length && (
        <View style={style.textContainer}>
          <Text
            numberOfLines={1}
            style={[
              commonStyles.fnt12Regular,
              {width: 100, color: lightTheme.white},
            ]}>
            {headerText}
          </Text>
        </View>
      )}
      <Image style={[style.img, markerStyle]} source={imgSrc} />
    </View>
  );
};

export default CustomMarker;
