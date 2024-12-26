import {Dimensions, StyleSheet} from 'react-native';
import {lightTheme} from '../../constants/color';
const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  mapContainer: {
    width: '100%',
    height: height,
  },
  header: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',
    top: height - 175 - 85,
    right: 0,
  },
  vehicleImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  showLocationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  vehicleImageContainer: {
    padding: 4,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.bgPrimaryLight,
    borderColor: lightTheme.bgPrimary,
    borderWidth: 1,
  },
});

export default style;
