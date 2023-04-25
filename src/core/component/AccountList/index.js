import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import style from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-paper';

const AccountList = () => {

    const listItemDetails = [
        {
            id: 0,
            title: 'Email',
            description: 'chandan.shaw2023@gmail.com',
            icon: 'mail',
            iconColor: '#fff',
            backgroundColor: '#19A7CE',
            buttonText: '',
            buttonType: '',
            buttonColor: '',
            nextPage:true
        },
        {
            id: 1,
            title: 'Invite',
            description: 'Invite Code is CRYTXH',
            icon: 'gift',
            iconColor: '#fff',
            backgroundColor: '#EBB02D',
            buttonText: 'Invite',
            buttonType: 'outlined',
            buttonColor: '',
            nextPage:false
        },
        {
            id: 2,
            title: 'Support',
            description: 'For queries and help',
            icon: 'message-circle',
            iconColor: '#fff',
            backgroundColor: '#57C5B6',
            buttonText: '',
            buttonType: '',
            buttonColor: '#0047ab',
            nextPage:true
        },
        {
            id: 3,
            title: 'Terms & Conditions',
            description: '',
            icon: 'alert-circle',
            iconColor: '#fff',
            backgroundColor: '#62CDFF',
            buttonText: '',
            buttonType: '',
            buttonColor: '',
            nextPage:true
        },
        {
        id: 4,
        title: 'Logout',
        description: '',
        icon: 'power',
        iconColor: '#fff',
        backgroundColor: '#FF6969',
        buttonText: '',
        buttonType: '',
        buttonColor: '',
        nextPage:false
    },
    ]
    let listArr = listItemDetails.map(item => (
        <View key={item.id}>
            <View style={style.list}>
                <View style={style.leftSection}>
                <View style={[style.listIcon, { backgroundColor: item.backgroundColor }]} >
                    <FeatherIcon name={item.icon} color="#fff" size={21} />
                </View>
                <View>
                    <Text style={style.listTitle}>{item.title}</Text>
                    {item.description && (<Text style={style.listDescription}>{item.description}</Text>)}
                </View>
                </View>
                <View style={style.rightSection}>
                    {item.buttonText && (<Button style={{ borderColor: '#d6d6d6'}}  textColor='#0047ab' mode={item.buttonType} >{item.buttonText} </Button>)}
                    {item.nextPage && <FeatherIcon name='chevron-right' size={22} />}
                </View>
            </View>
        </View>
    ))


    return (
        <View style={{ marginTop: 20 }}>
            {listArr}
        </View>
    )
}

export default AccountList;