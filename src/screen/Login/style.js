import { StyleSheet } from 'react-native';
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";

const Spacing = 10;
const styles = StyleSheet.create({
   
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        marginBottom: 10,
        width: '100%',
        maxWidth: 248,
        gap: 10,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: Colors.bgInfo,
        width: 50,
        height: 48,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
        fontWeight: 'bold'
    },
    otpInputFilled: {
        borderColor: Colors.bgPrimary,
        backgroundColor: Colors.bgPrimaryLight
    },
    phoneCarrier: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        paddingLeft: 12,
        borderRadius: Spacing,
        borderWidth: 1,
        borderColor: Colors.bgInfo,
        alignItems: 'center',
        marginRight: 10,
        justifyContent: 'center'
    },

    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.large,
        maxWidth: "100%",
        textAlign: "center",
        color: '#000',
    },

});

export default styles;