import {Dimensions, StyleSheet} from 'react-native';
import {lightTheme} from '../../constants/color';
import fontSizes from '../../constants/fonts';
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
  showLocationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  inputPickerStyle: {
    fontSize: fontSizes.medium,
    backgroundColor: lightTheme.lightPrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    height: 50,
    justifyContent: 'center',
    flex: 1,
  },
  bottomSheetModal: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    elevation: 20,
  },
  selectedVehicleContainer: {
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: lightTheme.bgPrimaryLight,
    borderWidth: 1,
    borderColor: lightTheme.bgPrimary,
    borderRadius: 6,
    alignItems: 'center',
    // alignSelf: 'flex-start',
  },
  waitingContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiverDetailsContainer: {
    padding: 6,
    paddingHorizontal: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleImage: {
    height: 30,
    width: 40,
  },
  mapContainer: {
    width: '100%',
    height: height - 310,
  },
  image: {
    height: 100,
    width: 100,
  },
  mainView: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    paddingTop: 16,
    gap: 12,
    height: 360,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: lightTheme.white,
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },
  bottomSheetPopup: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    elevation: 20,
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
  homeScreenImg: {
    height: 230,
    width: 300,
  },
});

export default style;
