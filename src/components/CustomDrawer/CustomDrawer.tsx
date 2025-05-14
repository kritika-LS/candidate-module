// src/components/CustomDrawer.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import Icon from '../common/Icon/Icon';
import { useAuth } from '../../context/AuthContext';

const drawerItems = [
  { label: 'My Screenings', icon: 'account-search-outline', route: 'My Screenings' },
  { label: 'Skills Checklist', icon: 'format-list-checks', route: 'SkillsChecklistScreen' },
  // { label: 'References', icon: 'person-add', route: 'References' },
  // { label: 'Documents', icon: 'assignment', route: 'Documents' },
  { label: 'Settings', icon: 'cog-outline', route: 'Settings' },
];

const CustomDrawer = ({ navigation }: any) => {

  const { logout } = useAuth(); // Get logout function from AuthContext

  const handleNavigate = (route: string) => {
    navigation.navigate(route);
  }

  const handleLogout = async() => {
    try {
      await logout();
      console.log("Successfuly signed out....")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        {/* Brand */}
        <View style={styles.header}>
          <Text style={styles.brand}>
            Humming
            <Text style={styles.highlight}>bird</Text>
          </Text>
        </View>

        {/* Drawer Menu */}
        <View style={styles.menu}>
          {drawerItems.map(({ label, icon, route }) => (
            <DrawerItem
              key={route}
              label={label}
              labelStyle={styles.label}
              icon={() => <Icon name={icon} size={20} color="#fff" />}
              onPress={() => handleNavigate(route)}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.timestamp}>Last Active: Apr 22, 2025 15:31:49</Text>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;


