import { StyleSheet } from 'react-native';
import FontSize from '../../constants/FontSize';

const style = StyleSheet.create({
    mainContainer:{
        padding:15
    },
    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.large,
        color: '#000'
    },
    headerContainer:{
        paddingLeft:10,
        paddingBottom:15
    }
});

export default style;