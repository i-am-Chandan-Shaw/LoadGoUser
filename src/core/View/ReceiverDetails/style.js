import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
   container:{
      paddingHorizontal:10,
      paddingVertical:5
   },
     selfContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
     },
     inputStyle:{
        backgroundColor:'#fff', 
        borderColor:'#333',
        
     },
     confirmationButton:{
        backgroundColor:'#0047ab', 
        width:'100%',
     }
});

export default style;