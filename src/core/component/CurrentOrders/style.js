import { StyleSheet,Dimensions } from 'react-native';
import FontSize from '../../../constants/FontSize';
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    mainContainer:{
        marginBottom:20,
        flexDirection:'row',
        borderColor:'#d6d6d6',
        borderBottomWidth:1,
    },
    leftContainer:{
        // backgroundColor:'red',
        width:width-70
    },
    rightContainer:{
        // backgroundColor:'blue',
        flexDirection:'row',
        alignItems:'center'
    },
    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.small,
        color: '#000',
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        marginBottom:10
    },
    simpleText: {
        fontSize: 13,
        color:'#000'
    },
    simpleSemibold:{
        fontSize: 15,
        color:'#000',
        fontWeight:600
    },
    image:{
        height:30,
        width:40,
    },
    vehicle: {
        borderWidth: 1,
        width: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#aaa',
        overflow: 'hidden',
        backgroundColor:'#c2e6f4',
        marginRight:10,
        marginBottom:15
    },
    topContainer:{
        flexDirection:'row',
        width:width-130,
        alignItems:'center',
        marginBottom:20
    },
    alignCenter:{
        flexDirection:'row',
        alignItems:'center'
    },
    vehicleContainer:{
        flexDirection:'column', 
        justifyContent:'center',
        width:80,
        alignItems:'center',
    },
    bottomContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:5
    }
});


export default style;