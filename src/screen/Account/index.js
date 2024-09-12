import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import style from './style';
import AccountList from '../../core/component/AccountList';
import { AppContext } from '../../core/helper/AppContext';

const Account = () => {
    const { globalData, setGlobalData } = useContext(AppContext)
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (globalData?.userData)
            setUserData(globalData?.userData[0])
    }, [])
    return (
        <View>
            <View style={style.headerContainer}>
                <Avatar.Icon size={50} icon="account" color='#fff' style={{ backgroundColor: '#858f9e' }} />
                <View style={style.headerTextContainer}>
                    <Text numberOfLines={1} style={style.nameText}> {userData?.name} </Text>
                    <View style={style.subHeaderTextContainer}>
                        <Text style={style.phoneText}>+91-{userData?.phone}</Text>
                        <View style={style.editContainer}>
                            {/* <FeatherIcon name='edit' size={16} color='#000' /> */}
                        </View>
                    </View>
                    {/* <Text style={style.emailText}>chandanshaw@gmail.com</Text> */}
                </View>
            </View>
            <AccountList userData={userData} />
        </View>
    )
}

export default Account;