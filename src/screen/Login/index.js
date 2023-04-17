import React, { useState, useEffect } from 'react';
import { Button, TextInput,View ,Text} from 'react-native';
import auth from '@react-native-firebase/auth';

  

const Login=()=>{


    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
  
    const handleSendCode = async () => {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setVerificationId(confirmation.verificationId);
        console.log('Verification code sent to your phone');
      } catch (error) {
        console.log('Error sending verification code: ', error);
      }
    };
  
    const handleVerifyCode = async () => {
      try {
        const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
        await auth().signInWithCredential(credential);
        console.log('Phone authentication successful');
      } catch (error) {
        console.log('Error verifying verification code: ', error);
      }
    };
  
    return (
      <View>
        <Text>Enter your phone number:</Text>
        <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
        <Button title="Send verification code" onPress={handleSendCode} />
        <Text>Enter verification code:</Text>
        <TextInput value={verificationCode} onChangeText={setVerificationCode} />
        <Button title="Verify code" onPress={handleVerifyCode} />
      </View>
    );
}

export default Login