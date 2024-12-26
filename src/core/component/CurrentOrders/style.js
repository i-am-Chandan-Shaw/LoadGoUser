import {StyleSheet, Dimensions} from 'react-native';
import FontSize from '../../../constants/FontSize';
import {lightTheme} from '../../../constants/color';
const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
  },
  vehicle: {
    borderWidth: 1,
    width: 73,
    height: 73,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: lightTheme.bgPrimary,
    backgroundColor: lightTheme.bgPrimaryLight,
  },

  vehicleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  bottomContainer: {
    alignItems: 'flex-end',
    gap: 22,
  },
});

export default style;
