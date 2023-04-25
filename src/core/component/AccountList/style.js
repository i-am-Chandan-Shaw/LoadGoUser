import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
   list:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:10,
      paddingVertical:15,     
      
   },
   leftSection:{
      paddingHorizontal:10,
      flexDirection:'row',
      alignItems:'center',
   },
   rightSection:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
   },
    listIcon:{
        height:40,
        width:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#19A7CE',
        borderRadius:30,
        marginRight:15
     },
     listTitle:{
        fontSize:18,
        fontWeight:500,
        color:'#333'
     },
     listDescription:{
        fontSize:14,
        color:'#333'
     }
});

export default style;