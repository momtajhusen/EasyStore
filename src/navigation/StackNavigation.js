//import liraries
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from '../navigation/BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from '../screens/Auth/SplashScreen';

const Stack = createNativeStackNavigator();

// create a component
const StackNavigation = () => {
    
    const navigation = useNavigation();
    return (
     <Stack.Navigator> 
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
     </Stack.Navigator>
    );
};

//make this component available to the app
export default StackNavigation;
