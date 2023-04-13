import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    currentLocation:{
        flexDirection:'column',
        alignItems:'center',
        height:75,
        maxWidth:150,
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