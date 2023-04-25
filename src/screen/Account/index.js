import React  from 'react';
import { View, Text} from 'react-native';
import { Avatar } from 'react-native-paper';
import style from './style';
import AccountList from '../../core/component/AccountList';
import FeatherIcon from 'react-native-vector-icons/Feather';



const Account=()=>{
    


return (
    <View>
        <View style={style.headerContainer}>
            <Avatar.Icon size={50} icon="account" color='#fff' style={{backgroundColor:'#858f9e'}}  />
            <View style={style.headerTextContainer}>
                <Text numberOfLines={1} style={style.nameText}>Chandan Kumar Shaw</Text>
                <View style={style.subHeaderTextContainer}>
                    <Text style={style.phoneText}>+91 9874771340</Text>
                    <View style={style.editContainer}>
                        <FeatherIcon name='edit' size={16} color='#000' />
                    </View>
                </View>
                {/* <Text style={style.emailText}>chandanshaw@gmail.com</Text> */}
            </View>
        </View>
        <AccountList/>
    </View>
    )
}

export default Account;