import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {TextInput, Checkbox, Button} from 'react-native-paper';
import style from './style';
import {AppContext} from '../../helper/AppContext';

const ReceiverDetails = ({passDetails}) => {
  const {globalData, setGlobalData} = useContext(AppContext);
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
      <Text>Receiver Details</Text>
      <TextInput
        label="Name *"
        outlineColor="#333"
        color="#333"
        value={receiverData.name}
        onChangeText={text => setReceiverData({...receiverData, name: text})}
        style={style.inputStyle}
      />
      <TextInput
        label="Phone Number *"
        keyboardType="number-pad"
        outlineColor="#333"
        maxLength={10}
        onChangeText={text =>
          setReceiverData({
            ...receiverData,
            phoneNo: text.replace(/[^0-9]/g, ''),
          })
        }
        value={receiverData.phoneNo}
        color="#333"
        style={style.inputStyle}
      />
      <View style={style.selfContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={sendToSelf}
        />
        <Text>Self</Text>
      </View>
      <Button
        mode="contained"
        disabled={!isValid}
        style={[
          style.confirmationButton,
          {backgroundColor: isValid ? '#0047ab' : '#d6d6d6'},
        ]}
        onPress={confirmDetails}>
        {' '}
        Confirm & Proceed{' '}
      </Button>
    </ScrollView>
  );
};

export default ReceiverDetails;
