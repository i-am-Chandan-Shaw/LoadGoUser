import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    topContainer:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
     numberPlateContainer:{
        borderColor:'#ddd',
        borderWidth:1,
        alignSelf:'flex-start',
        padding:7,
        borderRadius:5,
        marginTop:10
     },
     alignCenter:{
        flexDirection:'row',
        alignItems:'center'
     },
     bottomContainer:{
        padding:10,
        paddingVertical:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#f8f8f8',
        marginTop:10
     },
     phoneContainer:{
        alignSelf:'flex-start',
        padding:9,
        elevation:3,
        backgroundColor:'#77dd77',
        borderRadius:8
     }
});

export default style;