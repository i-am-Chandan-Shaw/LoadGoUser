import { StyleSheet } from 'react-native';
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";

const Spacing = 10;
const style = StyleSheet.create({
    mainContainer: {
        height:'100%',
        padding: 20
    },
    headerContainer: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        fontFamily: 'Poppins-Bold',
        marginVertical: Spacing * 3,
    },
    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.large,
        maxWidth: "80%",
        textAlign: "center",
        color: '#333'
    },
    forgotPasswordText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.small,
        color: Colors.primary,
        alignSelf: "flex-end",
    },
    signInButton: {
        padding: Spacing * 2,
        backgroundColor: Colors.primary,
        marginVertical: Spacing * 3,
        borderRadius: Spacing,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
    },
    signInText: {
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: FontSize.large,
    },
    semiboldText: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.text,
        textAlign: "center",
        fontSize: FontSize.small,
    },
    iconsContainer: {
        marginTop: Spacing,
        flexDirection: "row",
        justifyContent: "center",
    },
    iconStyle: {
        padding: Spacing,
        backgroundColor: Colors.gray,
        borderRadius: Spacing / 2,
        marginHorizontal: Spacing,
    }
});

export default style;