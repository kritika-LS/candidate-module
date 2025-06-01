import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from '../common/Icon/Icon';
import { styles } from './styles';

const profileDrawerItems = [
  { label: 'Overview', route: 'Overview', icon: 'account-circle-outline' },
  { label: 'Personal Details', route: 'PersonalDetails', icon: 'home-outline' },
  { label: 'Work History', route: 'WorkHistory', icon: 'briefcase-outline' },
  { label: 'Education', route: 'Education', icon: 'school-outline' },
  { label: 'Professional Information', route: 'ProfessionalInformation', icon: 'tune' },
];

const ProfileDrawer = ({ navigation }: any) => {
  const handleNavigate = (route: string) => {
    navigation.closeDrawer();
    navigation.navigate('ProfileTabContent', { tab: route });
  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}> {/* White background */}
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <View style={{ padding: 24, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="account-circle-outline" size={24} color="#222" style={{ marginRight: 8 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222' }}>Profile</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          {profileDrawerItems.map(({ label, route, icon }) => (
            <TouchableOpacity
              key={route}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24 }}
              onPress={() => handleNavigate(route)}
            >
              <Icon name={icon} size={20} color="#222" style={{ marginRight: 16 }} />
              <Text style={{ fontSize: 16, color: '#222' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default ProfileDrawer; 