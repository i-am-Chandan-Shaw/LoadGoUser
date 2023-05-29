import {
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import AppTextInput from "../../core/component/AppTextInput";
import style from "./style";
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [phone, setPhone] = useState(null)
    const [valid, setValid] = useState(null)
    const [count, setCount] = useState(120)
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isChecking, setIsChecking]= useState(false)


    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const navigateToHome = () => {
        navigation.replace('Home')
    }

    useEffect(() => {
        checkAuthentication()
        
    }, []);

    const checkAuthentication = async () => {
        setIsChecking(false);
        try {
            const value = await AsyncStorage.getItem('isLoggedIn');
            if (value !== null) {
                console.log('Retrieved data:', value);
                if(value=='true'){
                    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
                    return subscriber; // unsubscribe on unmount
                    setIsChecking(false);
                }
                else{
                    setIsChecking(false);
                    return false
                }
            } else {
                console.log('Data not found!');
                setIsChecking(false);
                return false
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
            setIsChecking(false);
            return false
        }
    }

    const handleResendOTP = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setCount((count) => {
                    count = count - 1
                    if (count == 0) {
                        clearInterval(id);
                        setIntervalId(null);
                    }
                    if (count < 0) {
                        return 120
                    }
                    return count;
                });
            }, 1000);
        }

    };
    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    // Handle login
    function onAuthStateChanged(user) {
        if (user) {
            console.log(user);
            setAuthenticated()
            navigateToHome();
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }



    // Set local storage
    const setAuthenticated = async () => {
        try {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            console.log('Data saved successfully!');
        } catch (error) {
            console.log('Error saving data:', error);
        }
    }

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        try {
            // Handling disabled state of the button
            console.log(phoneNumber);
            setValid(false)
            setCode(null)
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
            if (confirmation) {
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    async function confirmCode() {
        setLoading(true);
        try {
            let confirmation = await confirm.confirm(code);
            // On successful verification
            if (confirmation) {
                auth().onAuthStateChanged(onAuthStateChanged);
                setLoading(false);
            }
            return subscriber;
        } catch (error) {
            setLoading(false);
            onToggleSnackBar();
            console.log('Invalid code.');
        }
    }




    const validateInputs = (text, type) => {
        if (type == 'phone') {
            setPhone(() => { return text.replace(/[^0-9]/g, '') })
        } else {
            setCode(() => { return text.replace(/[^0-9]/g, '') })
        }

        if ((type == 'phone' && text.length == 10) || (type == 'otp' && text.length == 6)) {
            setValid(true)
        } else {
            setValid(false)
        }

    }

    const editPhone = () => {
        setPhone(null);
        setConfirm(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={style.mainContainer}>
            {isChecking && <View style={style.loadingContainer}>
                <ActivityIndicator animating={isChecking} color={'#0047ab'} />
            </View>}
                <View style={style.headerContainer} >
                    <Text style={style.headerText}>
                        Login here
                    </Text>
                    <Text style={style.subHeaderText} >
                        Welcome back you've been missed!
                    </Text>
                    {confirm && <View style={style.editPhone}>
                        <Text style={[style.subHeaderText, { marginRight: 5 }]} >
                            {phone}
                        </Text>
                        <TouchableOpacity onPress={editPhone}>
                            <FeatherIcon name='edit' size={16} color='#000' />
                        </TouchableOpacity>
                    </View>}
                </View>
                <View style={{ marginVertical: 20 }}>
                    {!confirm && (<AppTextInput
                        onChangeText={(text) => validateInputs(text, 'phone')}
                        value={phone}
                        maxLength={10}
                        minLength={10}
                        type={phone}
                        keyboardType="decimal-pad"
                        placeholder="Mobile No" />)}
                    {confirm && (<AppTextInput
                        onChangeText={(text) => validateInputs(text, 'otp')}
                        value={code}
                        maxLength={6}
                        minLength={6}
                        type={code}
                        keyboardType="decimal-pad"
                        placeholder="OTP" />)}
                </View>
                <TouchableOpacity
                    disabled={!valid}
                    onPress={() => !confirm ? signInWithPhoneNumber('+91' + phone) && handleResendOTP() : confirmCode()}
                    style={valid ? style.signInButton : style.signInButtonDisabled} >
                    <Text style={style.signInText} >
                        {!confirm ? 'Send OTP' : 'Verify OTP'}
                    </Text>
                    {loading && <ActivityIndicator animating={true} color={'#fff'} />}
                </TouchableOpacity>
                {confirm &&
                    <>
                        {count != 0 ?
                            <View
                                style={{ paddingTop: 30 }} >
                                <Text style={style.semiboldText} >
                                    Resend OTP in {count} sec
                                </Text>
                            </View> :
                            <TouchableOpacity
                                onPress={() => { signInWithPhoneNumber('+91' + phone); handleResendOTP() }}
                                style={{ paddingTop: 30 }} >
                                <Text style={style.activeText} >
                                    Resend OTP
                                </Text>
                            </TouchableOpacity>}
                    </>

                }

                <Snackbar
                    style={{ backgroundColor: '#c62828', width: '100%' }}
                    visible={visible}
                    duration={2000}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'OK',
                        labelStyle: { color: '#fff' },
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    Invalid Code
                </Snackbar>

                {/* <View style={{ marginVertical: 30 }} >
                        <Text style={[style.semiboldText, { color: Colors.primary }]} >
                            Or continue with
                        </Text>

                        <View style={style.iconsContainer} >
                            <TouchableOpacity style={style.iconStyle} >
                                <Ionicons
                                    name="logo-google"
                                    color={Colors.text}
                                    size={Spacing * 2}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={style.iconStyle} >
                                <Ionicons
                                    name="logo-apple"
                                    color={Colors.text}
                                    size={Spacing * 2}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={style.iconStyle} >
                                <Ionicons
                                    name="logo-facebook"
                                    color={Colors.text}
                                    size={Spacing * 2}
                                />
                            </TouchableOpacity>
                        </View>
                    </View> */}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login