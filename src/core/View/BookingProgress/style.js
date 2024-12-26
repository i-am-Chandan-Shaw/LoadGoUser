import {Dimensions, StyleSheet} from 'react-native';
import {lightTheme} from '../../../constants/color';
const {width} = Dimensions.get('window');
const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  secondaryButton: {
    backgroundColor: '#F44336',
    width: 150,
    elevation: 10,
    borderRadius: 20,
  },
  textContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderColor: '#CCC',
    gap: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  progressTextStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
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
    borderLeftColor: lightTheme.bgPrimary,
    borderLeftWidth: 2,
    borderStyle: 'dotted',
  },
  timeLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationText: {
    paddingHorizontal: 10,
  },
  pin: {
    width: 24,
    height: 24,
  },
  text: {
    color: '#000000',
    fontSize: 12,
  },
  shadedContainer: {
    padding: 6,
    paddingHorizontal: 8,
    backgroundColor: lightTheme.bgPrimaryLight,
    borderWidth: 1,
    borderColor: lightTheme.bgPrimary,
    borderRadius: 6,
  },

  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: -16,
  },
});

export default style;
