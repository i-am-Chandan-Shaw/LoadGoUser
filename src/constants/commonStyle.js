// commonStyles.js
import {StyleSheet} from 'react-native';
import Colors from './Colors';
import FontSize from './FontSize';
import {lightTheme} from './color';

const commonStyles = StyleSheet.create({
  // Button Css Starts
  btnPrimary: {
    padding: 15,
    backgroundColor: Colors.bgPrimary,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnOutline: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.bgLight,
    borderColor: Colors.bgPrimary,
    width: '100%',
  },
  btnDanger: {
    padding: 15,
    backgroundColor: lightTheme.danger,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSuccess: {
    padding: 15,
    backgroundColor: lightTheme.success,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnDisabled: {
    padding: 15,
    backgroundColor: Colors.bgPrimary,
    borderRadius: 8,
    opacity: 0.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Button Css Ends

  inputPlaceholder: {
    flex: 1,
    maxWidth: '100%',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },

  w50: {
    width: '50%',
  },
  w100p: {
    width: '100%',
  },

  // Fonts starts
  fnt10Regular: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: '#000',
    lineHeight: 16,
  },

  fnt12Medium: {
    fontSize: FontSize.xSmall,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  fnt12Regular: {
    fontSize: FontSize.xSmall,
    fontFamily: 'Poppins',
    color: '#000',
    lineHeight: 18,
  },

  fnt16Regular: {
    fontSize: FontSize.medium,
    fontFamily: 'Poppins',
    color: '#000',
    lineHeight: 24,
  },

  fnt14Regular: {
    fontSize: FontSize.small,
    fontFamily: 'Poppins',
    color: '#000',
    lineHeight: 24,
  },

  fnt14Medium: {
    fontSize: FontSize.small,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    lineHeight: 23,
  },

  fnt16Medium: {
    fontSize: FontSize.medium,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    lineHeight: 23,
  },

  fnt24Medium: {
    fontSize: FontSize.xLarge,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    lineHeight: 30,
  },
  fnt24Bold: {
    fontSize: FontSize.xLarge,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    lineHeight: 30,
  },

  // Fonts ends
  textCenter: {
    textAlign: 'center',
  },
  textWhite: {
    color: Colors.bgLight,
  },
  textPrimary: {
    color: Colors.textPrimary,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },
  textTertiary: {
    color: Colors.textTertiary,
  },
  textDisabled: {
    color: Colors.textDisabled,
  },
  textInfo: {
    color: Colors.textInfo,
  },

  // Spacing and Margin starts

  p16: {
    padding: 16,
  },
  px30: {
    paddingStart: 30,
    paddingEnd: 30,
  },

  py30: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  pt20: {
    paddingTop: 20,
  },
  pt40: {
    paddingTop: 40,
  },
  pb40: {
    paddingBottom: 40,
  },
  pb12: {
    paddingBottom: 12,
  },

  // Margin

  mt10: {
    marginTop: 10,
  },
  mt12: {
    marginTop: 12,
  },
  mt16: {
    marginTop: 16,
  },
  mt30: {
    marginTop: 30,
  },
  mt100: {
    marginTop: 100,
  },
  mt24: {
    marginTop: 24,
  },

  mb10: {
    marginBottom: 10,
  },
  mb12: {
    marginBottom: 12,
  },
  mb16: {
    marginBottom: 16,
  },
  mb30: {
    marginBottom: 30,
  },
  mb24: {
    marginBottom: 24,
  },

  // Spacing and Margin ends;

  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  gap1: {
    gap: 4,
  },
  gap2: {
    gap: 8,
  },
  gap4: {
    gap: 16,
  },
  columnCenterFit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default commonStyles;
