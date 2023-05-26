import { StyleSheet } from 'react-native';
import FontSize from '../../constants/FontSize';

const style = StyleSheet.create({
    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.large,
        color: '#000'
    },
    headerContainer:{
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
    }
});

export default style;