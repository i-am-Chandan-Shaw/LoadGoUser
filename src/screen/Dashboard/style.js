import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    top: 5,
  },
  bottomContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 100,
    position: 'absolute',
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    bottom: 10,
    width: '100%',
  },
  bottomSheetPopup: {
    padding: 10,
    paddingTop: 0,
  },
  mapContainer: {
    width: '100%',
    height: height,
  },


  orderNavContainer: {
    padding: 10,
    paddingHorizontal: 12,
    margin: 10,
    position: 'absolute',
    zIndex: 100,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 128, 0,1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  viewButton: {
    backgroundColor: '#d6d6d6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  img: {
    height: 35,
    width: 35,
  },
});

export default style;
