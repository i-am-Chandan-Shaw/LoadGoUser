import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import AppTextInput from '../../core/component/AppTextInput';
import {Snackbar, Appbar} from 'react-native-paper';
import {get, post} from '../../core/helper/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../core/helper/AppContext';
import AppLoader from '../../core/component/AppLoader';
import commonStyles from '../../constants/commonStyle';
import styles from './style';
import {UserEnum} from '../../constants/enums';
import {useTheme} from '../../constants/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const Register = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState('Please fill all the data');
  const [isLoading, setIsLoading] = useState(false);
  const {setGlobalData} = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: route.params?.phone || '',
  });

  const showAlert = () => {
    Alert.alert(
      'Registration Successful',
      'Your have successfully registered yourself, Please press OK to continue',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Home');
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
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        loginPin: '1234',
      };
      console.log(payload);

      const data = await post(payload, 'registerUser');
      if (data) {
        console.log(data);
        setIsLoading(false);
        saveToLocalStorage(data.id);
      }
    } catch (error) {
      console.log('register user error =>', error);
      setIsLoading(false);
    }
  };

  const saveToLocalStorage = async id => {
    if (!id) {
      console.error('Invalid user ID');
      return false;
    }
    const queryParameter = `?userId=${id.toString()}`;
    try {
      await AsyncStorage.setItem(UserEnum.USER_ID, id.toString());
      const data = await get('getUser', queryParameter);

      if (data) {
        setGlobalData(UserEnum.USER_DATA, data);
        showAlert();
        console.log('User data saved in global context!');
        return true;
      } else {
        console.warn('No user data returned from API');
        return false;
      }
    } catch (error) {
      console.error('Error handling user data:', error);
      return false;
    }
  };

  const validateInputs = (text, type) => {
    const isValidFullName = /^[a-zA-Z\s]*$/.test(text);
    if (type === 'fullName' ? isValidFullName : true) {
      setFormData(prevState => ({
        ...prevState,
        [type]: text,
      }));
    }
  };

  const isDataValid = () =>
    Object.values(formData).every(value => value !== '');

  const validateForm = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!isDataValid()) {
      setSnackBarText('Please fill all the data');
      setVisible(true);
    } else if (!emailRegex.test(formData.email)) {
      setSnackBarText('Invalid Email');
      setVisible(true);
    } else {
      registerUser();
    }
  };

  const onDismissSnackBar = () => setVisible(false);
  const handleBackPress = () => {
    navigation.replace('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={commonStyles.flex1}>
        <Appbar.Header style={{backgroundColor: theme.bgLight}}>
          <Appbar.BackAction
            size={20}
            color={theme.bgDark}
            onPress={handleBackPress}
          />
          <Appbar.Content
            title="Back"
            titleStyle={[commonStyles.fnt16Medium, {color: theme.textPrimary}]}
          />
        </Appbar.Header>
        <View
          style={[
            commonStyles.flex1,
            {backgroundColor: theme.bgLight},
            commonStyles.p16,
          ]}>
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View>
              {isLoading && <AppLoader />}
              <View>
                <Text
                  style={[
                    commonStyles.fnt24Medium,
                    commonStyles.mb30,
                    {color: theme.textPrimary},
                  ]}>
                  Sign up
                </Text>

                <View style={{gap: 20}}>
                  <AppTextInput
                    onChangeText={text => validateInputs(text, 'fullName')}
                    value={formData.fullName}
                    height={50}
                    placeholder="Full Name"
                  />
                  <AppTextInput
                    onChangeText={text => validateInputs(text, 'email')}
                    value={formData.email}
                    inputMode="email"
                    height={50}
                    placeholder="Email"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={commonStyles.btnPrimary}
            onPress={validateForm}>
            <Text
              style={[
                commonStyles.fnt16Medium,
                commonStyles.textCenter,
                commonStyles.textWhite,
              ]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          style={styles.snackBar}
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
    </TouchableWithoutFeedback>
  );
};

export default Register;
