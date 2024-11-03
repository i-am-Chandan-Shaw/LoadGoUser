// commonStyles.js
import { StyleSheet } from 'react-native';
import Colors from './Colors';
import FontSize from './FontSize';

const commonStyles = StyleSheet.create({

    // Button Css Starts
    btnPrimary: {
        padding: 15,
        backgroundColor: Colors.bgPrimary,
        borderRadius: 8,
        width: '100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    btnOutline: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: Colors.bgLight,
        borderColor: Colors.bgPrimary,
        width: '100%'
    },

    btnDisabled: {
        padding: 15,
        backgroundColor: Colors.bgPrimary,
        borderRadius: 8,
        opacity: 0.5,
        width: '100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    // Button Css Ends


    w50: {
        width: '50%'
    },
    w100p: {
        width: '100%'
    },

    // Fonts starts

    fnt12Regular:{
        fontSize: FontSize.xSmall,
        fontFamily: 'Poppins',
        color: '#000',
        lineHeight: 18
    },

    fnt16Regular: {
        fontSize: FontSize.medium,
        fontFamily: 'Poppins',
        color: '#000',
        lineHeight: 24
    },
    fnt14Medium: {
        fontSize: FontSize.small,
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        lineHeight: 23
    },


    fnt16Medium: {
        fontSize: FontSize.medium,
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        lineHeight: 23
    },

   
    fnt24Medium: {
        fontSize: FontSize.xLarge,
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        lineHeight: 30
    },
    fnt24Bold: {
        fontSize: FontSize.xLarge,
        fontFamily: 'Poppins-Bold',
        color: '#000',
        lineHeight: 30
    },
    

    // Fonts ends
    textCenter: {
        textAlign: 'center'
    },
    textWhite: {
        color: Colors.bgLight
    },
    textPrimary: {
        color: Colors.textPrimary
    },
    textSecondary: {
        color: Colors.textSecondary
    },
    textTertiary: {
        color: Colors.textTertiary
    },
    textDisabled: {
        color: Colors.textDisabled
    },
    textInfo: {
        color: Colors.textInfo
    },


    // Spacing and Margin starts


    p16: {
        padding: 16
    },
    px30: {
        paddingStart: 30,
        paddingEnd: 30
    },

    py30: {
        paddingTop: 30,
        paddingBottom: 30
    },
    pt40: {
        paddingTop: 40
    },
    pb40: {
        paddingBottom: 40
    },
    pb12: {
        paddingBottom: 12
    },

    // Margin

    mt10: {
        margiTop: 10
    },
    mt12: {
        margiTop: 12
    },
    mt16: {
        margiTop: 16
    },
    mt30: {
        margiTop: 30
    },
    mt24: {
        margiTop: 24
    },

    mb10: {
        marginBottom: 10
    },
    mb12: {
        marginBottom: 12
    },
    mb16: {
        marginBottom: 16
    },
    mb30: {
        marginBottom: 30
    },
    mb24: {
        marginBottom: 24
    },

    // Spacing and Margin ends;

    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        flex: 1
    },
    rowFlex: {
        flexDirection: 'row'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    columnCenter: {
        alignItems: 'center'
    },


    mainContainer: {
        backgroundColor: Colors.bgLight,
        flex: 1
    }

});

export default commonStyles;
