import { StyleSheet,Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    backdrop: { 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#000000aa' 
    },
    modalContainer:{ 
        backgroundColor: '#fff', 
        width: width*0.8, 
        maxHeight: 400, 
        borderRadius: 10,
        height:'100%'
        
    },
    modalHeader:{
        paddingBottom:10,
        paddingTop:15,
        paddingHorizontal:20,
        borderBottomColor:'#d6d6d6',
        borderBottomWidth:1,
    },
    modalFooter:{
        borderTopColor:'#d6d6d6',
        // borderTopWidth:1,
        width:'100%',
        paddingTop:10,
        paddingBottom:15,
        paddingHorizontal:20,
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    modalBody:{
        flex:1,
        padding:20,
    },
    buttonPrimary:{
        backgroundColor: '#0047ab',
        borderRadius: 4,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    buttonSecondary:{
        backgroundColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    }
});

export default style;