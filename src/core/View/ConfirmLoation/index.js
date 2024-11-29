import React from 'react';
import {Text, View} from 'react-native';
import commonStyles from '../../../constants/commonStyle';

const ConfirmLocation = ({passDetails}) => {
  return (
    <>
      <Text style={[commonStyles.fnt16Medium, commonStyles.textCenter]}>
        Confirm Location
      </Text>
      <View></View>
    </>
  );
};

export default ConfirmLocation;
