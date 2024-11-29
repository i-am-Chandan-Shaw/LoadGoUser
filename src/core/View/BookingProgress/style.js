import {StyleSheet} from 'react-native';

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
    height: 60,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
  },
});

export default style;
