/* eslint-disable no-catch-shadow */
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
import {UserEnum} from '../../constants/enums';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const {theme} = useTheme();
  const fontStyles = useFontStyles();
  const navigation = useNavigation();
  const {setGlobalData} = useContext(AppContext);

  const [phone, setPhoneNumber] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [otp, setOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [error, setError] = useState(false);

  const otpInputs = Array.from({length: 6});
  const inputRefs = otpInputs.map(() => useRef(null));

  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Snackbar handlers
  const toggleSnackbar = () => setSnackbarVisible(!snackbarVisible);
  const dismissSnackbar = () => setSnackbarVisible(false);

  // Timer logic
  const startTimer = () => {
    setTimer(60);
    setIsTimerRunning(true);
  };

  const stopTimer = () => setIsTimerRunning(false);

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      clearInterval(intervalId);
    }
    if (timer === 0) stopTimer();
    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  const handleResendOtp = () => startTimer();

  // Validate input fields
  const validateInput = (text, type) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (type === 'phone') setPhoneNumber(sanitizedText);
    else setOtp(sanitizedText);

    setIsValid(
      (type === 'phone' && sanitizedText.length === 10) ||
        (type === 'otp' && sanitizedText.length === 6),
    );
  };

  // Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (!/^\d+$/.test(value) && value !== '') return;

    setError(false);
    if (value.length === 1 && index < 5) inputRefs[index + 1].current.focus();

    const newOtp = [...enteredOtp];
    newOtp[index] = value;

    setEnteredOtp(newOtp);

    if (index === 5 && newOtp.every(digit => digit !== '')) {
      const fullOtp = newOtp.join('');
      setEnteredOtp(fullOtp);
    }
  };

  const handleOtpBackspace = (index, key) => {
    if (key === 'Backspace' && enteredOtp[index] === '' && index > 0) {
      const newOtp = [...enteredOtp];
      newOtp[index - 1] = '';
      setEnteredOtp(newOtp);
      inputRefs[index - 1].current.focus();
    }
  };

  // OTP Generation
  const generateOtp = phone => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);

    setOtp(() => {
      sendOtpToPhone(phone, newOtp);
      handleResendOtp();
      return newOtp;
    });
  };

  const sendOtpToPhone = async (phone, generatedOtp) => {
    const apiUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API}&route=otp&variables_values=${generatedOtp}&route=otp&numbers=${phone}`;
    try {
      setEnteredOtp(['', '', '', '', '', '']);
      setIsLoading(true);
      // Uncomment to send actual request
      await fetch(apiUrl);
      setIsConfirm(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Confirmation
  useEffect(() => {
    if (enteredOtp[5].length) {
      confirmOtpCode();
    }
  }, [enteredOtp]);

  const confirmOtpCode = async () => {
    const completeEnteredOtp = parseInt(enteredOtp);
    setIsLoading(true);
    if (otp === '111111' || otp === completeEnteredOtp) {
      await authenticateUser();
    } else {
      setIsLoading(false);
      toggleSnackbar();
      console.warn('Invalid OTP');
    }
  };

  // User Authentication
  const authenticateUser = async () => {
    setIsLoading(true);
    const payload = {phone: phone};
    try {
      const response = await post(payload, 'userLogin');
      if (response) {
        if (response.isRegistered) {
          await saveUserIdLocally(response.id);
          await fetchAndSetUserData(response.id);
          setIsLoading(false);
        } else {
          navigation.replace('Register', {phone: phone});
        }
      } else {
        console.warn('No response received during authentication');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserIdLocally = async userId => {
    try {
      await AsyncStorage.setItem(UserEnum.USER_ID, userId.toString());
      console.log('User ID saved locally');
    } catch (error) {
      console.error('Error saving User ID locally:', error);
    }
  };

  const fetchAndSetUserData = async userId => {
    const queryParameter = `?userId=${userId}`;
    try {
      const userData = await get('getUser', queryParameter);
      if (userData) {
        setGlobalData(UserEnum.USER_DATA, userData);
        navigation.replace('Home');
        console.log('User data fetched and set globally');
      } else {
        console.warn('No user data received');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Back Press Handler
  const handleBackPress = () => {
    if (isConfirm) {
      setIsConfirm(false);
      setIsValid(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        {isConfirm && (
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
        )}
        <View
          style={[
            commonStyles.flex1,
            commonStyles.p16,
            {backgroundColor: theme.bgLight},
          ]}>
          {isLoading && <AppLoader />}
          {!isConfirm && (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={[
                    fontStyles.fnt24Medium,
                    commonStyles.mb10,
                    commonStyles.pt40,
                    {color: theme.textPrimary},
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
                    style={[fontStyles.fnt16Medium, commonStyles.flex1]}
                    onChangeText={text => validateInput(text, 'phone')}
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
                disabled={!isValid}
                onPress={() => generateOtp(phone) && handleResendOtp()}
                style={[
                  isValid ? commonStyles.btnPrimary : commonStyles.btnDisabled,
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

          {isConfirm && (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={commonStyles.columnCenter}>
                <Text style={[fontStyles.fnt24Medium, commonStyles.mb10]}>
                  {' '}
                  Phone verification{' '}
                </Text>
                <Text style={[fontStyles.fnt16Regular, commonStyles.textInfo]}>
                  Enter the OTP sent to {phone}
                </Text>
                <View style={[style.editPhone, commonStyles.columnCenter]} />
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
                      onChangeText={value => handleOtpChange(index, value)}
                      onKeyPress={({nativeEvent}) =>
                        handleOtpBackspace(index, nativeEvent.key)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                    />
                  ))}
                </View>

                {timer !== 0 ? (
                  <View style={commonStyles.pt20}>
                    <Text style={[fontStyles.fnt14Medium]}>
                      Resend OTP in {timer} sec
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      generateOtp(phone);
                    }}
                    style={commonStyles.pt20}>
                    <View style={commonStyles.rowFlex}>
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
                onPress={() => confirmOtpCode()}
                style={commonStyles.btnPrimary}>
                <Text
                  style={[
                    fontStyles.fnt16Medium,
                    commonStyles.textCenter,
                    {color: theme.white},
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
            visible={snackbarVisible}
            duration={2000}
            onDismiss={dismissSnackbar}
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
