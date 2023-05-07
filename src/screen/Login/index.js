import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppTextInput from "../../core/component/AppTextInput";
import style from "./style";

const Login = () => {
    const Spacing = 10;
    return (
        <SafeAreaView>
            <View style={style.mainContainer}>
                <View style={style.headerContainer} >
                    <Text style={style.headerText}>
                        Login here
                    </Text>
                    <Text style={style.subHeaderText} >
                        Welcome back you've been missed!
                    </Text>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <AppTextInput placeholder="Email"/>
                    <AppTextInput placeholder="Password" secureTextEntry={true} />
                </View>

                <View>
                    <Text style={style.forgotPasswordText}>
                        Forgot your password ?
                    </Text>
                </View>

                <TouchableOpacity style={style.signInButton} >
                    <Text style={style.signInText} >
                        Sign in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("Register")}
                    style={{ padding: 10 }} >
                    <Text style={style.semiboldText} >
                        Create new account
                    </Text>
                </TouchableOpacity>

                <View style={{ marginVertical: 30 }} >
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
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login