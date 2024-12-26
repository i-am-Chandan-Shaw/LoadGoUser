import {StyleSheet} from 'react-native';
import FontSize from '../../constants/FontSize';

const style = StyleSheet.create({
  mainCOntainer: {
    flex: 1,
  },
  subHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: FontSize.large,
    color: '#000',
  },
  headerContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  orderContainer: {
    backgroundColor: '#fff',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: '#000',
  },
  loader: {
    top: '4%',
  },
});

export default style;
