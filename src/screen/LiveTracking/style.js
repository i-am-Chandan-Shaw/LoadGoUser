import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        position:'relative',
     },
     mapContainer:{
        width: '100%', 
        height: height 
     },
     header:{
      position:'absolute',
      zIndex:10,
      padding:10,
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',

     },
     radioItem:{
      flexDirection:'row',
      alignItems:'center',
      paddingBottom:10
     },
     bottomContainer:{
      position:'absolute',
      top:height - 175 - 85,
      right:0
     }
});

export default style;