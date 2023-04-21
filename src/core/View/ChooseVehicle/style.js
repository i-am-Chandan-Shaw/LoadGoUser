import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
   container: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 10
   },
   confirmView: {

   },
   confirmationButton: {
      backgroundColor: '#0047ab',
      width: '100%',
      borderRadius: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50
   },
   paymentOption: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      // backgroundColor:'red',
      marginHorizontal:10
   },
   paymentDropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'flex-end',
      alignSelf:'flex-end'
   },
   coupon: {
      width: '50%',
      borderRightWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paymentSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 70,
      paddingHorizontal:10
   },
   pickupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      marginTop: 20
   },
   vehicleContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 150,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
   },
   verticalBorder:{
      width:2,
      height:30,
      backgroundColor:'#d6d6d6'
   }
});

export default style;