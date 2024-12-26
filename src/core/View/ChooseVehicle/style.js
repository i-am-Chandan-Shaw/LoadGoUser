import {StyleSheet} from 'react-native';
import FontSize from '../../../constants/FontSize';
import Colors from '../../../constants/Colors';

const style = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 10,
  },
  confirmView: {},
  confirmationButton: {
    backgroundColor: '#0047ab',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  paymentOption: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:'red',
    marginHorizontal: 10,
  },
  paymentDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignSelf: 'flex-end',
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
    paddingHorizontal: 10,
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
  },
  vehicleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 130,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  verticalBorder: {
    width: 2,
    height: 30,
    backgroundColor: '#d6d6d6',
  },
  inputStyle: {
    fontSize: FontSize.medium,
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    height: 50,
    marginTop: 10,
  },
  fnt16Bold: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000',
  },
  strikeThrough: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#555',
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
