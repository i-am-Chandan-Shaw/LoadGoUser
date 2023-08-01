/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/Navigation';
import { AppProvider } from './src/core/helper/AppContext';


function App() {
    return (
        <AppProvider>
            <Navigation />
        </AppProvider>);
}



export default App;
