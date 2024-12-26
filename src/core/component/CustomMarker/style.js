import {StyleSheet} from 'react-native';
import {lightTheme} from '../../../constants/color';

const style = StyleSheet.create({
  img: {
    height: 25,
    width: 19,
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 10,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.black,
    marginBottom: 5,
  },
});

export default style;
