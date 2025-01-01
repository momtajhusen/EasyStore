import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../Service/responsive';
import { useTheme } from '../themes/ThemeContext';

import HomeScreen from '../screens/Home/HomeScren';
import StockScreen from '../screens/Stock/StockScreen';
import SalesScreen from '../screens/Sales/SalesScreen';
import ReportsScreen from '../screens/Reports/ReportsScreen';
import CustomersScreen from '../screens/Customers/CustomersScreen';

const Tab = createBottomTabNavigator();

const GradientHeader = ({ title }) => (
  <LinearGradient colors={['#fff', '#fff']} style={[styles.headerContainer]}>
    <View style={styles.headerLeftIconContainer}>
      <Icon name="menu" size={rf(4)} color="#888" />
    </View>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.headerRightIconContainer}>
      <Icon name="notifications" size={rf(4)} color="#888" />
    </View>
  </LinearGradient>
);

const BottomNavigator = () => {

    const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.accent,  // Active color (original)
        tabBarInactiveTintColor: "#6C6C6C",  // Inactive color (original)
        tabBarStyle: {
          backgroundColor: theme.primary,  // Tab bar background (original)
          height: rh(10),
          paddingTop: rh(1),
          borderTopWidth: 0,
          paddingBottom: rh(1),
        },
        tabBarLabelStyle: {
          fontSize: rf(1.5),
          paddingBottom: rh(1.5),
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        header: () => <GradientHeader title="Your Title" />,
        tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={rf(3.5)} color={focused ? theme.accent : "#6C6C6C"} />
          ),
        }}
      />
      <Tab.Screen
        name="Stock"
        component={StockScreen}
        options={{
          tabBarLabel: 'Stock',
          tabBarIcon: ({ focused }) => (
            <Icon name="inventory" size={rf(3.5)} color={focused ? theme.accent : "#6C6C6C"} />
          ),
        }}
      />
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          tabBarLabel: 'Sales',
          tabBarIcon: ({ focused }) => (
            <Icon name="sell" size={rf(3.5)} color={focused ? theme.accent : "#6C6C6C"} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ focused }) => (
            <Icon name="bar-chart" size={rf(3.5)} color={focused ? theme.accent : "#6C6C6C"} />
          ),
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarLabel: 'Customers',
          tabBarIcon: ({ focused }) => (
            <Icon name="people" size={rf(3.5)} color={focused ? theme.accent : "#6C6C6C"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(2),
    height: rh(9),
    paddingTop: rh(3),
  },
  headerLeftIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRightIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    flex: 2,
    textAlign: 'center',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BottomNavigator;
