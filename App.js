import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { ThemeProvider } from './src/themes/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
