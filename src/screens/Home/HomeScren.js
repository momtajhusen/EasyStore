//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../themes/ThemeContext';

// create a component
const HomeScreen = () => {
    
  const { theme } = useTheme();

    return (
        <View style={[styles.container, {backgroundColor:theme.primary}]}>
            <Text>HomeScreen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default HomeScreen;
