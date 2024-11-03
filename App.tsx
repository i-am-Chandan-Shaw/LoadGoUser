/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/Navigation';
import {AppProvider} from './src/core/helper/AppContext';
import {ThemeProvider} from './src/constants/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Navigation />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
