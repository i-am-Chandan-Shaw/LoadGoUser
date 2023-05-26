import { StyleSheet } from 'react-native'

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
        width: 80,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    selectedVehicle: {
        backgroundColor: '#c2e6f4',
        borderColor: '#aaa'
    },
    image: {
        height: 50,
        width: 70,
    },
    vehicleText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 10
    },
    amountText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 400,
    },
    selectedText: {
        fontWeight: 600
    }

});

export default style;