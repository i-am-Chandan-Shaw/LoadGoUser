import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../constants/ThemeContext';
import imagePath from '../../constants/imagePath';
import useFontStyles from '../../constants/fontStyle';
import commonStyles from '../../constants/commonStyle';

const LocationAccess = ({onPress}) => {
  const {theme} = useTheme();
  const fontStyles = useFontStyles();

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, commonStyles.mb16]}
        source={imagePath.locationAccess}
      />
      <Text
        style={[
          fontStyles.fnt16Medium,
          commonStyles.mb16,
          {color: theme.bgDark},
        ]}>
        Enable your location
      </Text>
      <Text
        style={[
          fontStyles.fnt12Regular,
          commonStyles.mb30,
          commonStyles.textCenter,
          {color: theme.bgDark},
        ]}>
        Choose your location to start find the request around you
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[commonStyles.btnPrimary, commonStyles.mb30]}>
        <Text
          style={[
            commonStyles.fnt16Medium,
            commonStyles.textCenter,
            commonStyles.textWhite,
          ]}>
          Use my location
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          fontStyles.fnt12Regular,
          commonStyles.mb30,
          commonStyles.textCenter,
          {color: theme.bgDark},
        ]}>
        To allow access, go to App Info &gt; Permissions &gt; Allow Location
        service & try again
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
