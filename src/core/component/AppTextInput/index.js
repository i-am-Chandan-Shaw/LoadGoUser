import {TextInput} from 'react-native';
import React, {useState} from 'react';
import FontSize from '../../../constants/FontSize';
import {useTheme} from '../../../constants/ThemeContext';

const AppTextInput = ({style, type, height, ...otherProps}) => {
  const {theme} = useTheme();

  const Spacing = 10;
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={theme.textInfo}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          fontSize: FontSize.medium,
          paddingVertical: 15,
          paddingHorizontal: Spacing * 2,
          backgroundColor: theme.bgLight,
          borderRadius: Spacing,
          borderWidth: 1,
          borderColor: theme.borderColor,
          textAlignVertical: 'center',
          width: '100%',
          lineHeight: 23,
          color: theme.bgDark,
        },
        // eslint-disable-next-line react-native/no-inline-styles
        focused && {
          borderWidth: 1,
          borderColor: theme.bgPrimary,
          shadowOffset: {width: 4, height: Spacing},
          shadowColor: theme.bgPrimary,
          shadowOpacity: 0.2,
          shadowRadius: Spacing,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;
