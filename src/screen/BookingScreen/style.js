import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },
  mapContainer: {
    width: '100%',
    height: height - 280,
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
});

export default style;
