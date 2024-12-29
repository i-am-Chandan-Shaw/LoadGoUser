/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Navigation from './src/Navigation';
import {AppProvider} from './src/core/helper/AppContext';
import {ThemeProvider} from './src/constants/ThemeContext';
import {
  checkAppVersion,
  requestNotificationPermission,
} from './src/core/helper/apiHelper';

function App() {
  useEffect(() => {
    checkAppVersion();
    requestNotificationPermission();
  }, []);
  return (
    <ThemeProvider>
      <AppProvider>
        <Navigation />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
