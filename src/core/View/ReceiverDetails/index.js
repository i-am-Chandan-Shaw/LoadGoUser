import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Checkbox, Button} from 'react-native-paper';
import styles from './style'; // Renamed `style` to `styles` for clarity and convention
import {AppContext} from '../../helper/AppContext';
import commonStyles from '../../../constants/commonStyle';
import {useTheme} from '../../../constants/ThemeContext';

const ReceiverDetails = ({onSubmit}) => {
  const {theme} = useTheme();
  const {globalData} = useContext(AppContext);

  const [isSelf, setIsSelf] = useState(true);
  const [receiverDetails, setReceiverDetails] = useState({
    name: '',
    phone: '',
  });

  const handleConfirm = () => {
    if (onSubmit) onSubmit(receiverDetails);
  };

  const toggleSelfDetails = () => {
    setIsSelf(prevState => !prevState);
    if (!isSelf) {
      const user = globalData.userData?.[0] || {};
      setReceiverDetails({
        name: user.name || '',
        phone: user.phone || '',
      });
    } else {
      setReceiverDetails({
        name: '',
        phone: '',
      });
    }
  };

  useEffect(() => {
    const user = globalData.userData?.[0] || {};
    setReceiverDetails({
      name: user.name || '',
      phone: user.phone || '',
    });
  }, [globalData]);

  const isFormValid =
    receiverDetails.name.trim() && receiverDetails.phone.trim();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="never">
      {/* Header */}
      <Text style={[commonStyles.fnt16Medium, commonStyles.textCenter]}>
        Receiver Details
      </Text>

      {/* Name Input */}
      <TextInput
        label="Name *"
        outlineColor="#000"
        value={receiverDetails.name}
        onChangeText={name =>
          setReceiverDetails(prevState => ({...prevState, name}))
        }
        style={styles.inputStyle}
      />

      {/* Phone Number Input */}
      <TextInput
        label="Phone Number *"
        keyboardType="number-pad"
        outlineColor="#000"
        maxLength={10}
        value={receiverDetails.phone}
        onChangeText={phone =>
          setReceiverDetails(prevState => ({
            ...prevState,
            phone: phone.replace(/[^0-9]/g, ''), // Ensures only numbers
          }))
        }
        style={styles.inputStyle}
      />

      {/* Checkbox: Use Self Details */}
      <View style={styles.selfContainer}>
        <Checkbox
          status={isSelf ? 'checked' : 'unchecked'}
          onPress={toggleSelfDetails}
        />
        <Text>Self</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        disabled={!isFormValid}
        onPress={handleConfirm}
        style={
          isFormValid ? commonStyles.btnPrimary : commonStyles.btnDisabled
        }>
        <Text
          style={[
            commonStyles.fnt16Medium,
            commonStyles.textCenter,
            {color: theme.white},
          ]}>
          Save Details
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReceiverDetails;
