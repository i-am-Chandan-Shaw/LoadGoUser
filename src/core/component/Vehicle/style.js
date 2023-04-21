import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        width:100
    },
    vehicle:{
        borderWidth: 1,
        width: 75,
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#d6d6d6',
        overflow: 'hidden',
    },
    selectedVehicle: {
        backgroundColor: '#c2e6f4',
        borderColor: '#666'
    },
    image:{
        height:50, 
        width:70
    },
    vehicleText:{
        color:'#333',
        fontSize:16, 
        fontWeight:400,
        marginBottom:10
    },
    amountText:{
        color:'#333',
        fontSize:18, 
        fontWeight:400,
    },
    selectedText:{
        fontWeight:600
    }

});

export default style;