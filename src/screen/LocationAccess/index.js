import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../constants/ThemeContext';
import imagePath from '../../constants/imagePath';
import useFontStyles from '../../constants/fontStyle';
import commonStyles from '../../constants/commonStyle';

const LocationAccess = ({ onPress }) => {
    const { theme } = useTheme();
    const fontStyles = useFontStyles();

    return (
        <View style={styles.container}>
            <Image style={[styles.image, commonStyles.mb16]} source={imagePath.locationAccess} />
            <Text style={[fontStyles.fnt16Medium, commonStyles.mb16, { color: theme.bgDark }]}>
                Allow your location
            </Text>
            <Text style={[fontStyles.fnt12Regular, commonStyles.mb30, commonStyles.textCenter, { color: theme.bgDark }]}>
                We will need your location to give you a better experience
            </Text>
            <Button 
                mode="contained" 
                onPress={onPress}  
                buttonColor={theme.bgPrimary} 
                style={[styles.button, commonStyles.mb16]}
            >
                Enable Location Service
            </Button>
            <Text style={[fontStyles.fnt12Regular, commonStyles.mb30, commonStyles.textCenter, { color: theme.bgDark }]}>
                To allow access, go to App Info &gt; Permissions &gt; Allow Location service & try again
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    image: {
        height: 100,
        width: 100,
    },
    button: {
        padding: 2,
        borderRadius: 70,
    },
});

export default LocationAccess;
