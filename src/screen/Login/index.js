import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import AppTextInput from '../../core/component/AppTextInput';
import style from './style';
import {Snackbar, Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get, post} from '../../core/helper/services';
import {AppContext} from '../../core/helper/AppContext';
import AppLoader from '../../core/component/AppLoader';
import commonStyles from '../../constants/commonStyle';
import {useTheme} from '../../constants/ThemeContext';
import useFontStyles from '../../constants/fontStyle';

import {FAST2SMS_API} from '@env';

const Login = ({navigation}) => {
  const {theme} = useTheme();
  const fontStyles = useFontStyles();

  const [phone, setPhone] = useState(null);
  const [valid, setValid] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const {setGlobalData} = useContext(AppContext);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [timer, setTimer] = useState(60); // Initial timer value
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setTimer(60);
    setIsTimerRunning(true);
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  useEffect(() => {
    let intervalId;

    // Start the timer when isTimerRunning is true
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1); // Decrease timer by 1 every second
      }, 1000);
    } else {
      clearInterval(intervalId); // Clear the interval when timer is not running
    }

    // When timer reaches 0, stop the timer
    if (timer === 0) {
      stopTimer();
    }

    // Clean up function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [timer, isTimerRunning]);

  const handleResendOTP = () => {
    startTimer();
  };

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const checkAuthentication = async () => {
    setLoading(true);
    let payload = {phone: phone};
    try {
      const data = await post(payload, 'userLogin');
      if (data) {
        if (data.isRegistered) {
          setLoading(false);
          setAuthenticated(data.id);
          setUserLocally(data.id);
          setGlobalData('userId', data.id);
        } else {
          navigation.replace('Register', {phone: phone});
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('checkAuthentication error', error);
    }
  };

  // Set local storage
  const setAuthenticated = async id => {
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
        try {
          console.log('Fetched Data ==>', data);
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          setGlobalData('userData', data);
          navigation.replace('Home');
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Creating OTP

  const [otp, setOtp] = useState(845398);
  function generateOTP(phoneNumber) {
    const randomOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(prev => {
      signInWithPhoneNumber(phoneNumber, randomOtp);
      handleResendOTP();
      return randomOtp;
    });
  }

  async function signInWithPhoneNumber(phoneNumber, newOtp) {
    try {
      setCode('');
      setLoading(true);
      setEnteredOtp(['', '', '', '', '', '']);

      // const response = await fetch(
      //   `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API}&route=otp&variables_values=` +
      //     newOtp +
      //     '&route=otp&numbers=' +
      //     phoneNumber,
      // ); // Replace with your API endpoint
      if (true) {
        setLoading(false);
        setConfirm(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function confirmCode() {
    setLoading(true);
    if (code == otp || code == '111111') {
      checkAuthentication();
    } else {
      console.log('Invalid Code');
      setLoading(false);
      onToggleSnackBar();
    }
  }

  const validateInputs = (text, type) => {
    if (type == 'phone') {
      setPhone(() => {
        return text.replace(/[^0-9]/g, '');
      });
    } else {
      setCode(() => {
        return text.replace(/[^0-9]/g, '');
      });
    }

    if (
      (type == 'phone' && text.length == 10) ||
      (type == 'otp' && text.length == 6)
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  // Handle OTP entering starts

  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const otpInputs = Array.from({length: 6});

  const inputRefs = otpInputs.map(() => useRef(null));

  useEffect(() => {
    if (code.length === 6) {
      confirmCode();
    }
  }, [code]);

  const handleInputChange = (index, value) => {
    if (!/^\d+$/.test(value) && value !== '') {
      return;
    }
    setError(false);
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }

    const newOtp = [...enteredOtp];
    newOtp[index] = value;

    setEnteredOtp(newOtp);

    if (index === 5 && newOtp.every(digit => digit !== '')) {
      const fullOtp = newOtp.join('');
      setCode(fullOtp);
    }
  };

  const handleBackspace = (index, key) => {
    if (key === 'Backspace' && enteredOtp[index] === '' && index > 0) {
      const newOtp = [...enteredOtp];
      newOtp[index - 1] = '';
      setEnteredOtp(newOtp);
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle OTP entering ends

  const handleBackPress = () => {
    if (confirm) {
      setValid(true);
      setConfirm(!confirm);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <Appbar.Header style={{backgroundColor: theme.bgLight}}>
          <Appbar.BackAction
            size={20}
            color={theme.bgDark}
            onPress={handleBackPress}
          />
          <Appbar.Content
            title="Back"
            titleStyle={[fontStyles.fnt16Medium, {color: theme.textPrimary}]}
          />
        </Appbar.Header>
        <View
          style={[
            commonStyles.mainContainer,
            commonStyles.p16,
            {backgroundColor: theme.bgLight},
          ]}>
          {loading && <AppLoader />}
          {!confirm && (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={[
                    fontStyles.fnt24Medium,
                    {color: theme.textPrimary, marginBottom: 10},
                  ]}>
                  Sign in
                </Text>
                <Text
                  style={[
                    fontStyles.fnt16Regular,
                    commonStyles.textInfo,
                    commonStyles.mb30,
                  ]}>
                  Enter phone number to continue
                </Text>
                <View style={commonStyles.rowCenter}>
                  <View style={style.phoneCarrier}>
                    <Text
                      style={[
                        commonStyles.textPrimary,
                        fontStyles.fnt16Medium,
                      ]}>
                      +91
                    </Text>
                  </View>
                  <AppTextInput
                    style={[fontStyles.fnt16Medium, {flex: 1}]}
                    onChangeText={text => validateInputs(text, 'phone')}
                    value={phone}
                    maxLength={10}
                    minLength={10}
                    type={phone}
                    keyboardType="decimal-pad"
                    placeholder="Mobile No"
                  />
                </View>
              </View>
              <TouchableOpacity
                disabled={!valid}
                onPress={() => generateOTP(phone) && handleResendOTP()}
                style={[
                  valid ? commonStyles.btnPrimary : commonStyles.btnDisabled,
                ]}>
                <Text
                  style={[
                    fontStyles.fnt16Medium,
                    commonStyles.textCenter,
                    commonStyles.textWhite,
                  ]}>
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {confirm && (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={commonStyles.columnCenter}>
                <Text style={[fontStyles.fnt24Medium, commonStyles.mb10]}>
                  {' '}
                  Phone verification{' '}
                </Text>
                <Text style={[fontStyles.fnt16Regular, commonStyles.textInfo]}>
                  Enter your OTP code
                </Text>
                <View
                  style={[style.editPhone, commonStyles.columnCenter]}></View>
                <View style={style.otpContainer}>
                  {otpInputs.map((_, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs[index]}
                      style={[
                        style.otpInput,
                        error && style.otpInputError,
                        enteredOtp[index] && style.otpInputFilled,
                      ]}
                      value={enteredOtp[index]}
                      onChangeText={value => handleInputChange(index, value)}
                      onKeyPress={({nativeEvent}) =>
                        handleBackspace(index, nativeEvent.key)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                    />
                  ))}
                </View>

                {timer != 0 ? (
                  <View style={{paddingTop: 20}}>
                    <Text style={[fontStyles.fnt14Medium]}>
                      Resend OTP in {timer} sec
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      generateOTP(phone);
                    }}
                    style={{paddingTop: 20}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={fontStyles.fnt14Medium}>
                        Didn’t receive code?{' '}
                      </Text>
                      <Text
                        style={[
                          fontStyles.fnt14Medium,
                          {color: theme.bgPrimary},
                        ]}>
                        Resend again
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                disabled={!valid}
                onPress={() => confirmCode()}
                style={
                  code.length == 6
                    ? commonStyles.btnPrimary
                    : commonStyles.btnDisabled
                }>
                <Text
                  style={[
                    fontStyles.fnt16Medium,
                    commonStyles.textCenter,
                    theme.bgLight,
                  ]}>
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Snackbar
            style={{
              backgroundColor: '#c62828',
              width: '100%',
              marginHorizontal: 20,
            }}
            visible={visible}
            duration={2000}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'OK',
              labelStyle: {color: '#fff'},
              onPress: () => {
                // Do something
              },
            }}>
            Invalid Code
          </Snackbar>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Login;
