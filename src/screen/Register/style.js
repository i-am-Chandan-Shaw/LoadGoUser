import {StyleSheet, Dimensions} from 'react-native';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
const {width, height} = Dimensions.get('window');

const Spacing = 10;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height,
  },
  headerText: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: 'Poppins-Bold',
    marginTop: Spacing * 3,
  },
  subHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FontSize.large,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  labelText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FontSize.medium,
    color: '#666',
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: 'flex-end',
  },
  signInButton: {
    padding: 12,
    backgroundColor: '#B31312',
    borderRadius: Spacing * 3,
    shadowColor: '#B31312',
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signInButtonDisabled: {
    opacity: 0.5,
  },
  signInText: {
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large,
    marginRight: 10,
  },
  inputStyle: {
    fontSize: FontSize.medium,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    height: 50,
    marginVertical: 10,
  },
  noteText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 9,
    marginTop: 10,
  },
  snackBar: {
    marginHorizontal: 20,
    width: '100%',
  },
});

export default style;
