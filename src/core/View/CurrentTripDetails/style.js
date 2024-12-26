import {StyleSheet, Dimensions} from 'react-native';
import {lightTheme} from '../../../constants/color';
const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  driverDetailsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  durationContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 4,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  imageContainer: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverMetaDataContainer: {
    width: width - 180,
  },
  vehicleImage: {
    height: 55,
    width: 55,
  },
  paymentContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 0,
    gap: 8,
  },
  showLocationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },

  circularContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: lightTheme.bgPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addressContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  timeLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  locationText: {
    paddingHorizontal: 10,
  },
  text: {
    color: '#000000',
    fontSize: 12,
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: '#D21F3C',
    borderRadius: 4,
  },
  dottedLine: {
    width: 1,
    flex: 1,
    borderLeftColor: '#778899',
    borderLeftWidth: 2,
    borderStyle: 'dotted',
  },
  tripStatusBtn: {
    width: width - 160,
  },
});

export default style;
