// DrawerNavigator.js
import React,{useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Share } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigation';
import HomeScreen from '../screens/HomeAndMainGame/HomeScreen';
import { DrawerItemList } from '@react-navigation/drawer';
import { rw, rh, rf } from '../Service/responsive';

import { useNavigation } from '@react-navigation/native';



// Import images for drawer icons
const ICONS = {
  home: require('../../assets/icons/HomeIcon.png'),
  funds: require('../../assets/icons/FundsIcon.png'),
  bids: require('../../assets/icons/BidsIcon.png'),
  passbook: require('../../assets/icons/PassbookIcon.png'),
  notice: require('../../assets/icons/NoticeIcon.png'),
  game: require('../../assets/icons/GameRatesIcon.png'),
  charts: require('../../assets/icons/ChartsIcon.png'),
  contact: require('../../assets/icons/ContactIcon.png'),
  share: require('../../assets/icons/setting.png'),
  mpin: require('../../assets/icons/ChangeMPINIcon.png'),
  logout: require('../../assets/icons/LogoutIcon.png'),
};

// Placeholder components for each screen
const FundsScreen = () => <View style={styles.screen}><Text>Funds Screen</Text></View>;
const MyBidsScreen = () => <View style={styles.screen}><Text>My Bids Screen</Text></View>;
const PassbookScreen = () => <View style={styles.screen}><Text>Passbook Screen</Text></View>;
// Add more screens for other drawer items...

const Drawer = createDrawerNavigator();

// Menu Data
const menuData = [
    { label: 'Home', icon: require('../../assets/icons/HomeIcon.png'), route: 'Home' },
    { label: 'Funds', icon: require('../../assets/icons/FundsIcon.png'), route: 'FundsScreen' },
    { label: 'My Bids', icon: require('../../assets/icons/BidsIcon.png'), route: 'MyBidsScreen' },
    { label: 'Passbook', icon: require('../../assets/icons/PassbookIcon.png'), route: 'PassbookScreen' },
    { label: 'Notification', icon: require('../../assets/icons/LogoutIcon.png'), route: 'Notification' },
    { label: 'Notice', icon: require('../../assets/icons/NoticeIcon.png'), route: 'NoticeScreen' },
    { label: 'Game Rates', icon: require('../../assets/icons/GameRatesIcon.png'), route: 'GamesRatesScreen' },
    { label: 'Charts', icon: require('../../assets/icons/ChartsIcon.png'), route: 'Charts' },
    { label: 'Contact Us', icon: require('../../assets/icons/ContactIcon.png'), route: 'ContactUsScreen' },
    { label: 'Setting', icon: require('../../assets/icons/setting.png'), route: 'Setting' },
    { label: 'Share Application', icon: require('../../assets/icons/ShareIcon.png'), route: 'ShareApplication' },
    { label: 'Change MPIN', icon: require('../../assets/icons/ChangeMPINIcon.png'), route: 'ChangeMPINScreen' },
    { label: 'Logout', icon: require('../../assets/icons/LogoutIcon.png'), route: 'Logout' },
];
  

// Custom Drawer Content
const CustomDrawerContent = (props) => {

    const [activeMenuItem, setActiveMenuItem] = useState(0); // Home is active by default
    const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for logout popup

    const { navigation } = props; 

    const handleNavigation = (routeName, index) => {
        if (routeName === 'Logout') {
          setShowLogoutPopup(true); 
        }
        else if(routeName === 'ShareApplication'){
          shareApp();
        }
        else if(routeName === 'Charts'){
          console.log('Charts');
        }
        else {
            navigation.closeDrawer();  
            navigation.navigate(routeName); 
        }
        // setActiveMenuItem(index); 
    };

    const handleLogout = () => {
        setShowLogoutPopup(false);
        navigation.closeDrawer(); 
        console.log('User logged out!');
        navigation.navigate("LoginScreen"); 

    };

    // Share Functionality
    const shareApp = async () => {
      try {
        const result = await Share.share({
          message: 'Hey! Check out this amazing app: Sky General',
          title: 'Share Application',
        });

        if (result.action === Share.sharedAction) {
          console.log('App Shared Successfully');
        } else if (result.action === Share.dismissedAction) {
          console.log('Share Dialog Dismissed');
        }
      } catch (error) {
        console.error('Error sharing the app:', error.message);
      }
    };

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/icons/ProfilePlaceholder.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Aman Mishra</Text>
          <Text style={styles.profileNumber}>+91 8756453680</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.closeDrawer()} style={styles.closeButton}>
          <Image
            source={require('../../assets/icons/CloseIcon.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>

                {/* Menu Items */}
                <View style={styles.menuItems}>
          {menuData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                activeMenuItem === index && styles.activeMenuItem,
              ]}
              onPress={() => handleNavigation(item.route, index)} // Handle navigation
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={item.icon} style={styles.menuIcon} />
                <Text
                  style={StyleSheet.flatten([
                    styles.menuText,
                    activeMenuItem === index && styles.activeMenuText,
                  ])}
                >
                  {item.label}
                </Text>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={rf(2)}
                style={[
                  { color: '#A4A4A4' },
                  activeMenuItem === index && styles.activeMenuText,
                ]}
              />
            </TouchableOpacity>
          ))}

                {/* Logout Confirmation Modal */}
                <Modal transparent visible={showLogoutPopup} animationType="fade">
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Confirm Logout</Text>
                      <Text style={styles.modalMessage}>
                        You are about to log out of your account. Any unsaved changes will
                        be lost. Do you want to proceed with logging out?
                      </Text>
                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() => setShowLogoutPopup(false)}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.logoutButton}
                          onPress={handleLogout}
                        >
                          <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
        </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

// Main Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />} 
      screenOptions={{ 
        drawerStyle: { backgroundColor: '#FFF9E5', width: rw(75) },
        headerShown: false,
        drawerActiveBackgroundColor: '#FFFBEB',
        drawerActiveTintColor: '#FFA500',
        drawerInactiveTintColor: '#000',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={BottomNavigator}
        options={{
          drawerIcon: () => <Image source={ICONS.home} style={styles.icon} />,
          drawerItemStyle: { height: 0, opacity: 0 }, 
        }} 
        style={styles.menuItem}
      />
      {/* Add other screens similarly */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// Styles
const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        paddingBottom: rh(2),
        paddingTop: rh(2),
      },
      profileImage: {
        width: rw(15),
        height: rw(15),
        borderRadius: rw(7.5),
        marginBottom: rh(1),
      },
      profileName: {
        fontSize: rf(2.5),
        fontWeight: 'bold',
        color: '#333',
      },
      profileNumber: {
        fontSize: rf(2),
        color: '#666',
      },
      closeButton: {
        position: 'absolute',
        top: rh(4),
        right: rw(5),
      },
      closeIcon: {
        width: rw(6),
        height: rw(6),
      },
      menuItems: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: rw(4),
        paddingVertical: rh(2),
        borderRadius: 10,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: rh(1),
        paddingHorizontal: rw(3),
        marginBottom: rh(1),
        borderRadius: rw(2),
      },
      menuIcon: {
        width: rw(6),
        height: rw(6),
        marginRight: rw(3),
      },
      menuText: {
        fontSize: rf(2.2),
        color: '#141414',
      },
      activeMenuItem: {
        backgroundColor: '#fff9e5',
        borderWidth: 0.4,
        borderColor: '#fab029',
      },
      activeMenuText: {
        color: '#fab029',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        width: '85%',
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: rf(2.5),
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign:"center"
      },
      modalMessage: {
        fontSize: rf(2),
        color: '#666',
        marginBottom: 20,
        textAlign:"center"
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      cancelButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal:rw(10)
      },
      cancelButtonText: {
        color: '#333',
        fontWeight:"bold"
      },
      logoutButton: {
        padding: 10,
        backgroundColor: '#fab029',
        borderRadius: 20,
        paddingHorizontal:rw(10)
      },
      logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontWeight:"bold"
      },
});
