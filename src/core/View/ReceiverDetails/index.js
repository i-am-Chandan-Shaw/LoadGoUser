import React, {useContext, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Checkbox, Button} from 'react-native-paper';
import style from './style';
import {AppContext} from '../../helper/AppContext';
import commonStyles from '../../../constants/commonStyle';
import {useTheme} from '../../../constants/ThemeContext';

const ReceiverDetails = ({passDetails}) => {
  const {theme} = useTheme();
  const {globalData} = useContext(AppContext);
  const [checked, setChecked] = useState(false);
  const [receiverData, setReceiverData] = useState({
    name: '',
    phoneNo: '',
  });

  const confirmDetails = () => {
    passDetails(receiverData);
  };

  const sendToSelf = () => {
    setChecked(!checked);
    let user = globalData.userData[0];
    if (!checked) {
      setReceiverData({
        name: user?.name,
        phoneNo: user?.phone,
      });
    } else {
      setReceiverData({
        name: '',
        phoneNo: '',
      });
    }
  };
  let isValid =
    receiverData.name.length != 0 && receiverData.phoneNo.length != 0;

  return (
    <ScrollView style={style.container} keyboardShouldPersistTaps="never">
      <Text style={[commonStyles.fnt16Medium, commonStyles.textCenter]}>
        Receiver Details
      </Text>
      <TextInput
        label="Name *"
        outlineColor="#000"
        color="#000"
        value={receiverData.name}
        onChangeText={text => setReceiverData({...receiverData, name: text})}
        style={style.inputStyle}
      />
      <TextInput
        label="Phone Number *"
        keyboardType="number-pad"
        outlineColor="#000"
        maxLength={10}
        onChangeText={text =>
          setReceiverData({
            ...receiverData,
            phoneNo: text.replace(/[^0-9]/g, ''),
          })
        }
        value={receiverData.phoneNo}
        color="#000"
        style={style.inputStyle}
      />
      <View style={style.selfContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={sendToSelf}
        />
        <Text>Self</Text>
      </View>
      <TouchableOpacity
        disabled={!isValid}
        onPress={confirmDetails}
        style={isValid ? commonStyles.btnPrimary : commonStyles.btnDisabled}>
        <Text
          style={[
            commonStyles.fnt16Medium,
            commonStyles.textCenter,
            {color: theme.white},
          ]}>
          Confirm Details
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReceiverDetails;
