import {TextInput} from 'react-native';
import React, {useState} from 'react';
import FontSize from '../../../constants/FontSize';
import {useTheme} from '../../../constants/ThemeContext';

const AppTextInput = ({
  style,
  type,
  height,
  characterLimit,
  uppercase,
  ...otherProps
}) => {
  const {theme} = useTheme();

  const Spacing = 10;
  const [focused, setFocused] = useState(false);
  const handleTextChange = text => {
    let modifiedText = text;

    // Apply character limit if specified
    if (characterLimit) {
      modifiedText = text.slice(0, characterLimit);
    }

    // Convert to uppercase if uppercase prop is true
    if (uppercase) {
      modifiedText = modifiedText.toUpperCase();
    }

    // Call the original onChangeText if it exists
    if (otherProps.onChangeText) {
      otherProps.onChangeText(modifiedText);
    }
  };

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      maxLength={characterLimit}
      onChangeText={handleTextChange}
      placeholderTextColor={theme.textInfo}
      autoCapitalize={uppercase ? 'characters' : 'none'}
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
          textTransform: uppercase ? 'uppercase' : 'none',
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
