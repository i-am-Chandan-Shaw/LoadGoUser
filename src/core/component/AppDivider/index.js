import React from 'react';
import { View } from 'react-native';
import style from './style';

const AppDivider=({bgColor,alignment})=>{
return (
    <View 
    style={[alignment=='vertical'? style.verticalLine:style.horizontalLine, 
    {backgroundColor:bgColor}]}>

    </View>
    )
}

export default AppDivider;