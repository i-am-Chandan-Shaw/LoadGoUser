import { StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import FontSize from '../../constants/FontSize';


const style = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#fff',
        flexDirection:'column',
        height:height,
        padding:15,
        paddingTop:0
    },
    timeLine:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    locationContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:width - 100,
        paddingVertical:20
    },
    locationText:{
        paddingHorizontal:10,
    },
    text:{
        color:'#000000',
        fontSize:13
    },
    circle:{
        width:8,
        height:8,
        backgroundColor:'#D21F3C',
        borderRadius:4
    },
    dottedLine:{
        width:1,
        height:28,
        borderLeftColor:'#778899',
        borderLeftWidth:2,
        borderStyle:'dotted',
    },
    image: {
        height: 40,
        width: 50,
    },
    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.medium,
        color: '#000'
    },
    secondarySemibold:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.small,
    },
    leftContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'50%',
        borderRightColor:'#ccc',
        borderRightWidth:1
    },
    rightContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'50%',
    },
    topContainer:{
        flexDirection:'row',
        paddingVertical:20,
        justifyContent:'space-between'
    },
    middleContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:20,
    },
    billDetailsContainer:{
        padding:10,
        paddingVertical:15
    },
    billRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:15,
        borderBottomColor:'#d6d6d6',
        borderBottomWidth:1
    }
});

export default style;