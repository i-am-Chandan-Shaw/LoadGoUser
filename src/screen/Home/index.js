import React from "react";
import { Provider as PaperProvider, BottomNavigation,Text } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from "react-native";
import Dashboard from "../Dashboard";
import Account from "../Account";
import Login from "../Login";

const MusicRoute = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return(
        <ScrollView>
            <Searchbar style={{marginTop:20}}
            keyboardType="decimal-pad"
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            />
        </ScrollView>
    )
}

const AccountRoute = () => <Account/>;

const RecentsRoute = () => <Account/>;

const NotificationsRoute = () => <Text>Notifications</Text>;



const Home=()=>{
    const [index, setIndex] = React.useState(0);
    
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
        { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline', badge:1 },
        { key: 'recents', title: 'Recents', focusedIcon: 'history' },
        { key: 'albums', title: 'Account', focusedIcon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: Dashboard,
        albums: AccountRoute,
        recents: RecentsRoute,
        notifications: NotificationsRoute,
        
  });
    return(
        <PaperProvider>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                />
        </PaperProvider>
    )
}

export default Home