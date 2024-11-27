import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  vehicle: {
    borderWidth: 1,
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: '#ddd',
    overflow: 'hidden',
    marginBottom: 5,
  },
  selectedVehicle: {
    backgroundColor: '#F2F2F2',
    borderColor: '#aaa',
  },
  image: {
    height: 30,
    width: 50,
  },
  vehicleText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 10,
  },
  amountText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 600,
  },
  selectedText: {
    fontWeight: 600,
  },
  strikeThrough: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default style;
