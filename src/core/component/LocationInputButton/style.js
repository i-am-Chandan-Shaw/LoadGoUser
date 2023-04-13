import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    mainContainer:{
        zIndex:10,
    },
    container:{
        zIndex:10,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    inputContainer: { 
        marginTop: 10, 
        position: 'absolute', 
        top: 0, 
        width:'95%',
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        height:50,
        borderRadius:30,
        paddingHorizontal:20,
        elevation:10,
        
     },
     textStyle:{
        paddingStart:10,
        fontSize:15,
     }
});

export default style;