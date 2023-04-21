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
        height: height - 320
     },
     header:{
      position:'absolute',
      zIndex:10,
      margin:5,
     }
});

export default style;