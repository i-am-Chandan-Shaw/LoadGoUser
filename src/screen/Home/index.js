import React from 'react';
import {Provider as PaperProvider, BottomNavigation} from 'react-native-paper';
import Dashboard from '../Dashboard';
import Account from '../Account';
import Orders from '../Orders';
import RideHistory from '../TripHistory';
import {useTheme} from '../../constants/ThemeContext';

const Home = () => {
  const {theme} = useTheme();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'dashboard',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home',
    },
    {
      key: 'notifications',
      title: 'Orders',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
    {key: 'recents', title: 'History', focusedIcon: 'history'},
    {key: 'accounts', title: 'Account', focusedIcon: 'account'},
  ]);

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        barStyle={{backgroundColor: theme.bgLight}}
        inactiveColor={theme.bgDark}
        activeColor={theme.bgPrimary}
        theme={{colors: {secondaryContainer: 'transparent'}}}
        onIndexChange={setIndex}
        renderScene={({route, jumpTo}) => {
          switch (route.key) {
            case 'dashboard':
              return <Dashboard />;
            case 'notifications':
              return <Orders />;
            case 'recents':
              return <RideHistory />;
            case 'accounts':
              return <Account />;
            default:
              return null;
          }
        }}
      />
    </PaperProvider>
  );
};

export default Home;
