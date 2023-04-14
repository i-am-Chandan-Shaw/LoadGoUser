import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1
    },
    header: {
        padding: 10,
        height: 50,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        color: '#333',
        fontSize: 18,
        marginLeft: 20,
        fontWeight:'500'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:5
    },
    
    
});

export default style;