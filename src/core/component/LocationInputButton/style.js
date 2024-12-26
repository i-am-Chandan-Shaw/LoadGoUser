import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  mainContainer: {
    zIndex: 100,
  },
  container: {
    zIndex: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  textStyle: {
    paddingStart: 10,
    fontSize: 12,
    maxWidth: '98%',
  },
});

export default style;
