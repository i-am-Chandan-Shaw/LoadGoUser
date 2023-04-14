import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    currentLocation:{
        flexDirection:'column',
        alignItems:'center',
        height:92,
        maxWidth:200,
     },
     headerText:{
        backgroundColor:'#333',
        color:'#ddd',
        fontSize:10,
        verticalAlign:'middle'
     },
     currentLocationText:{
        backgroundColor:'#333',
        color:'#fff',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10,
        elevation:20,
        marginBottom:10
     },
     img:{ 
        height: 35, 
        width: 35 
    }
});

export default style;