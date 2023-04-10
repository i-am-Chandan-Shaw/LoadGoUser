import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
     container:{
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#8a2be2'
     },
     image:{
        height:305, 
        width:345,
        position:'relative',
        top:'10%'
    },
    logoText:{
        position:'relative',
        top:'20%',
        fontSize:40,
        color:'#fff',
        fontWeight:'500'
    }
});

export default style;