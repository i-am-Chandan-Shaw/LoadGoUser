import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  numberPlateContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: 7,
    borderRadius: 5,
  },
  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  phoneContainer: {
    alignSelf: 'flex-start',
    padding: 9,
    elevation: 3,
    backgroundColor: '#77dd77',
    borderRadius: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d6d6d6',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default style;
