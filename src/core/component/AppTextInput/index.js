import {  TextInput, } from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";


const AppTextInput = ({ style,type, height, ...otherProps }) => {
    const Spacing=10;
    const [focused, setFocused] = useState(false);
    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            style={[
                {
                    fontSize: type? FontSize.xLarge: FontSize.medium,
                    paddingVertical: height? Spacing : Spacing * 2,
                    paddingHorizontal:Spacing *2,
                    backgroundColor: Colors.lightPrimary,
                    borderRadius: Spacing,
                    marginVertical: Spacing,
                    borderWidth: height? 1 : 3,
                    borderColor:'#d6d6d6',
                    height:height? height:80,
                },
                focused && {
                    borderWidth: height? 1 : 3,
                    borderColor: Colors.primary,
                    shadowOffset: { width: 4, height: Spacing },
                    shadowColor: Colors.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: Spacing,
                    height:height? height:80,
                    fontWeight:'600'
                    
                },
                style
            ]}
            {...otherProps}
        />
    )
}

export default AppTextInput;