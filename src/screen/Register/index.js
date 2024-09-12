import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import style from './style';
import AppTextInput from '../../core/component/AppTextInput';

import {Snackbar, Provider, ActivityIndicator} from 'react-native-paper';
import {get, post} from '../../core/helper/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../core/helper/AppContext';

const Register = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState('Please fill all the data');
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const {globalData, setGlobalData} = useContext(AppContext);
  const [registeredData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleAlertOK = data => {
    // Logic to handle "OK" button press
    navigation.replace('Home', {data});
  };
  const showAlert = data => {
    Alert.alert(
      'Registration Successful',
      'Your have successfully registered yourself, Please press OK to continue',
      [
        {
          text: 'OK',
          onPress: () => {
            handleAlertOK(data);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const registerUser = async () => {
    setIsLoading(true);
    try {
      let payload = {
        name: registeredData.firstName + ' ' + registeredData.lastName,
        email: registeredData.email,
        phone: registeredData.phone,
        loginPin: '1234',
      };
      const data = await post(payload, 'registerUser');
      if (data) {
        console.log(data);
        setIsLoading(false);
        setUserId(data.id);
        setUserLocally(data.id);
        setGlobalData('userId', id);
      }
    } catch (error) {
      console.log('register user error =>', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValid(isDataValid);
  }, [registeredData]);
  useEffect(() => {
    setRegisterData({
      phone: route.params?.phone,
      ...registeredData,
    });
  }, []);

  // Set local storage
  const setUserId = async id => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userId', id.toString());
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const setUserLocally = async id => {
    const queryParameter = '?userId=' + id.toString();
    try {
      const data = await get('getUser', queryParameter);
      if (data) {
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        setGlobalData('userData', data);
        showAlert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateInputs = (text, type) => {
    let nameRegex = /^[a-zA-Z\s]*$/;
    if ((type == 'firstName' || type == 'lastName') && nameRegex.test(text)) {
      setRegisterData({
        ...registeredData,
        [type]: text,
      });
    } else if (type != 'firstName' || type != 'last Name') {
      setRegisterData({
        ...registeredData,
        [type]: text,
      });
    }
  };

  const isDataValid = () => {
    let isValid = true;
    for (let item in registeredData) {
      if (registeredData[item] == '') {
        isValid = false;
      }
    }
    return isValid;
  };

  const validateForm = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!isDataValid()) {
      setSnackBarText('Please fill all the data');
      setVisible(true);
    } else if (!emailRegex.test(registeredData.email)) {
      setSnackBarText('Invalid Email');
      setVisible(true);
    } else {
      registerUser();
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={style.container}>
      <Provider>
        <View style={style.mainContainer} onPress={Keyboard.dismiss}>
          <View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={style.headerText}>Create An Account</Text>
              <Text style={[style.subHeaderText]}>
                Let's get you registered !{' '}
              </Text>
            </View>
            <View>
              <AppTextInput
                onChangeText={text => validateInputs(text, 'firstName')}
                value={registeredData.firstName}
                height={50}
                placeholder="First Name"
              />
              <AppTextInput
                onChangeText={text => validateInputs(text, 'lastName')}
                value={registeredData.lastName}
                height={50}
                placeholder="Last Name"
              />
              <AppTextInput
                onChangeText={text => validateInputs(text, 'email')}
                value={registeredData.email}
                inputMode="email"
                height={50}
                placeholder="Email"
              />
            </View>
          </View>

          <TouchableOpacity
            disabled={!valid}
            style={[
              style.signInButton,
              !valid ? style.signInButtonDisabled : {},
            ]}
            onPress={validateForm}>
            <Text style={[style.signInText, {marginLeft: 30}]}>Register</Text>
            <View style={{width: 30}}>
              {isLoading && (
                <ActivityIndicator animating={true} color={'#fff'} />
              )}
            </View>
          </TouchableOpacity>
          <Snackbar
            style={style.snackBar}
            visible={visible}
            duration={4000}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'OK',
              labelStyle: {color: '#fff'},
              onPress: () => {
                // Do something
              },
            }}>
            {snackBarText}
          </Snackbar>
        </View>
      </Provider>
    </ScrollView>
  );
};

export default Register;
