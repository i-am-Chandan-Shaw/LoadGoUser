import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
   headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#eaf4fe',
      height: 140,
      elevation: 10
   },
   headerTextContainer: {
      width: '80%'
   },
   subHeaderTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   editContainer:{
      marginLeft:10,
      flexDirection: 'row',
      alignItems: 'center',
   },
   nameText: {
      fontSize: 18,
      fontWeight: 700,
      color: '#333',
      marginBottom: 5
   },
   editText: {
      fontSize: 12,
      fontWeight: '500'
   },
   phoneText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
   },
   listIcon: {
      height: 50,
      width: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#19A7CE',
      borderRadius: 30,
      marginRight: 15
   },
   list: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20
   },
   listTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: '#333'
   },
   listDescription: {
      fontSize: 14,
      color: '#333'
   }
});

export default style;