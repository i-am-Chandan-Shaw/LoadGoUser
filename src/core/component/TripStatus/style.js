import { StyleSheet,Dimensions } from 'react-native';
import FontSize from '../../../constants/FontSize';
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        width:width,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        paddingTop:0,
        marginBottom:20
    },
    image: {
        height: 30,
        width: 50,
    },
    text:{
        color:'#000000',
        fontSize:12
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
    timeLine:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    locationContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:width-100,

    },
    locationText:{
        paddingHorizontal:10,
    },
    rightContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
    },
    leftContainer:{
        
    },
    subHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: FontSize.small,
        color: '#000'
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    }
});

export default style;