import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    mainContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    progressContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:20
    },
    secondaryButton:{
        backgroundColor:'#ccc',
        width:200,
        elevation:10,
    },
    textContainer:{
        height:60,
        marginVertical:20,
        width:'80%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    progressTextStyle:{
        textAlign:'center',
        color:'#333',
        fontSize:18
    }
});

export default style;