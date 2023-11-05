import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    loaderContainer: {
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        zIndex: 100,
        alignSelf: 'center',
        top: ((height - 80) /2)
    },
});

export default style;