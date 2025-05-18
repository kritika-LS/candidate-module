import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import ProfileScreen from '../screens/ProfileScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomScreen';
import { DrawerParamList } from '../types/navigation';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { ScreeningsScreen } from '../screens/ScreeningsScreen';
import { SkillsChecklistScreen } from '../screens/SkillsChecklistScreen';
import { ReferencesScreen } from '../screens/ReferencesScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import BottomTabs from './BottomTabs/BottomTabs';
import { StyleSheet, Text, View } from 'react-native';
import DrawerHeader from '../components/CustomDrawer/DrawerHeader';


const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <DrawerHeader />,
      headerTitle: '',
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ title: '' }} />
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="ScreeningsScreen" component={ScreeningsScreen} />
    <Drawer.Screen name="SkillsChecklistScreen" component={SkillsChecklistScreen} />
    <Drawer.Screen name="ReferencesScreen" component={ReferencesScreen} />
    <Drawer.Screen name="DocumentsScreen" component={DocumentsScreen} />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
