import React from "react";
import { Provider as PaperProvider, BottomNavigation } from 'react-native-paper';
import Dashboard from "../Dashboard";
import Account from "../Account";
import Orders from "../Orders";
import RideHistory from "../TripHistory";



const AccountRoute = () => <Account/>;
const Recents = () => <RideHistory/>;
const Notification = () => <Orders/>;



const Home=()=>{
    const [index, setIndex] = React.useState(0);


    
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
        { key: 'notifications', title: 'Orders', focusedIcon: 'bell', unfocusedIcon: 'bell-outline', badge:2 },
        { key: 'recents', title: 'History', focusedIcon: 'history' },
        { key: 'accounts', title: 'Account', focusedIcon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: Dashboard,
        accounts: AccountRoute,
        recents: Recents,
        notifications: Notification,
        
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