import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Share, Alert, Linking} from 'react-native';
import style from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../../constants/ThemeContext';
import useFontStyles from '../../../constants/fontStyle';

const AccountList = ({userData}) => {
  const {theme} = useTheme();
  const fontStyles = useFontStyles();
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const callSupport = () => {
    Linking.openURL(`tel:${8240687723}`);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Deliver your goods at the best price, at the fastest time possible. Book your first service at Flat 200 Rs Off..! Download Now: https://play.google.com/store/apps/details?id=com.loadgo&pcampaignid=web_share',
      });
      if (result.action === Share.dismissedAction) {
        // Handle dismissal case
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const navigateToScreen = screen => {
    navigation.navigate(screen);
  };

  const listItems = [
    {
      id: 0,
      title: 'Email',
      description: data?.email,
      icon: 'mail',
      iconColor: '#fff',
      backgroundColor: '#19A7CE',
      buttonText: '',
      buttonType: '',
      buttonColor: '',
      nextPage: false,
    },
    {
      id: 1,
      title: 'Invite',
      description: `Invite Code is ${data?.inviteCode}`,
      icon: 'gift',
      backgroundColor: '#EBB02D',
      buttonText: 'Invite',
      buttonType: 'outlined',
      buttonColor: '',
      nextPage: false,
      onPress: onShare,
    },
    {
      id: 2,
      title: 'Support',
      description: 'For queries and help',
      icon: 'message-circle',
      backgroundColor: '#57C5B6',
      buttonText: 'Call',
      buttonType: 'outlined',
      buttonColor: '#0047ab',
      nextPage: false,
      onPress: callSupport,
    },
    {
      id: 3,
      title: 'Terms & Conditions',
      icon: 'alert-circle',
      backgroundColor: '#62CDFF',
      buttonText: '',
      buttonType: '',
      buttonColor: '',
      nextPage: true,
      onPress: () => navigateToScreen('TermsAndConditions'),
    },
    {
      id: 4,
      title: 'Logout',
      icon: 'power',
      backgroundColor: '#FF6969',
      buttonText: '',
      buttonType: '',
      buttonColor: '',
      nextPage: false,
      onPress: logout,
    },
  ];

  const renderIcon = item => {
    const IconComponent = item.iconComponent || FeatherIcon;
    return <IconComponent name={item.icon} color="#fff" size={18} />;
  };

  const renderListItems = listItems.map(item => (
    <View key={item.id}>
      <Pressable
        onPress={item.onPress}
        android_ripple={{color: '#eee', borderless: false}}>
        <View style={style.list}>
          <View style={style.leftSection}>
            <View
              style={[style.listIcon, {backgroundColor: item.backgroundColor}]}>
              {renderIcon(item)}
            </View>
            <View>
              <Text style={[{color: theme.bgDark}, fontStyles.fnt16Regular]}>
                {item.title}
              </Text>
              {item.description && (
                <Text style={[{color: theme.bgDark}, fontStyles.fnt12Regular]}>
                  {item.description}
                </Text>
              )}
            </View>
          </View>
          <View style={style.rightSection}>
            {item.buttonText && (
              <View style={style.button} activeOpacity={0.7}>
                <Text style={{color: theme.bgDark}}>{item.buttonText}</Text>
              </View>
            )}
            {item.nextPage && (
              <FeatherIcon
                name="chevron-right"
                color={theme.bgDark}
                size={18}
              />
            )}
          </View>
        </View>
      </Pressable>
    </View>
  ));

  return <View>{renderListItems}</View>;
};

export default AccountList;
