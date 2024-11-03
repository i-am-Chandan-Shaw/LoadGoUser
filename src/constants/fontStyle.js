import { StyleSheet } from 'react-native';
import fontSizes from './fonts';
import { useTheme } from './ThemeContext';


const useFontStyles = () => {
  const { theme } = useTheme();

  const createTextStyle = (fontSizeKey, fontFamilyKey, lineHeight) => {
    const fontSize = fontSizes[fontSizeKey];
    const fontFamily = fontFamilyKey || 'Poppins';
    
    return {
      fontSize,
      fontFamily,
      color: theme.textPrimary,
      lineHeight: lineHeight || fontSize * 1.5,
    };
  };

  return StyleSheet.create({
    fnt12Regular: createTextStyle('xSmall', 'Poppins', 18),
    fnt16Regular: createTextStyle('medium', 'Poppins', 24),
    fnt14Medium: createTextStyle('small', 'Poppins-SemiBold', 23),
    fnt16Medium: createTextStyle('medium', 'Poppins-SemiBold', 23),
    fnt24Medium: createTextStyle('xLarge', 'Poppins-SemiBold', 30),
    fnt24Bold: createTextStyle('xLarge', 'Poppins-Bold', 30),
  });
};

export default useFontStyles;
