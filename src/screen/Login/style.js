import {StyleSheet} from 'react-native';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';

const Spacing = 10;
const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: 'Poppins-Bold',
    marginVertical: Spacing * 3,
  },
  subHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FontSize.large,
    maxWidth: '80%',
    textAlign: 'center',
    color: '#333',
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: 'flex-end',
  },
  signInButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInButtonDisabled: {
    opacity: 0.5,
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large,
    marginRight: 10,
  },
  semiboldText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  activeText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'green',
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  iconsContainer: {
    marginTop: Spacing,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    padding: Spacing,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
  editPhone: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    padding: 20,
    elevation: 5,
    opacity: 1,
    zIndex: 100,
    borderRadius: 8,
  },
});

export default style;
