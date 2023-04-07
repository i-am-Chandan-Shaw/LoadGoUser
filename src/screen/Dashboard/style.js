import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
   bottomContainer:{
      borderRadius:50,
      backgroundColor:'red',
      flex:1,
      zIndex:10000,
   },
   loaderContainer:{
      position:'absolute',
      zIndex:10,
      top:height/3,
      left:width/2

      
   }
   
});

export default style;