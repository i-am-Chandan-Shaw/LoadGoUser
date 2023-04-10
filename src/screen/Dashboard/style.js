import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
   container:{
      height:'100%',
      width:'100%'
   },
   bottomContainer:{
      borderTopRightRadius:30,
      borderTopLeftRadius:30,
      zIndex:100,
      position:'absolute',
      bottom:0,
      width:'100%',
      backgroundColor:'#fff',
      height:height/4
   },
   onCenterContainer:{
      position:'absolute',
      bottom:height/4,
      right:0
   },
   mapContainer:{
      width: '100%', 
      height: height/1.4
   }
   
});

export default style;