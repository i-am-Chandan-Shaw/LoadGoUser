import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors";
import Font from "../../../constants/Font";
import FontSize from "../../../constants/FontSize";


const AppTextInput = ({ type, ...otherProps }) => {
    const Spacing=10;
    const [focused, setFocused] = useState(false);
    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            style={[
                {
                    fontFamily: Font["poppins-regular"],
                    fontSize: type? FontSize.xLarge: FontSize.medium,
                    padding: Spacing * 2,
                    backgroundColor: Colors.lightPrimary,
                    borderRadius: Spacing,
                    marginVertical: Spacing,
                    borderWidth: 3,
                    borderColor:'transparent',
                    height:80
                },
                focused && {
                    borderWidth: 3,
                    borderColor: Colors.primary,
                    shadowOffset: { width: 4, height: Spacing },
                    shadowColor: Colors.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: Spacing,
                    height:80
                },
            ]}
            {...otherProps}
        />
    )
}

export default AppTextInput;