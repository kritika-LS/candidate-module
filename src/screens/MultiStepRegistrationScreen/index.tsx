import React, { useState } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Alert,
  Text,
  SafeAreaView,
  Pressable
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { styles } from './styles';
import { Header } from '../../components/common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import PersonalDetailsSection from './PersonalDetailsSection';
import { TermsPolicies } from '../../components/common/TermsPolicies';
import { CopyrightFooter } from '../../components/common/CopyrightFooter';
import { Button } from '../../components/common/Button';
import AddressInfoScreen from './Address';
import ProfessionalDetailsForm from './ProfessionalDetails';
import { JobPreferenceForm } from './JobPreference';

const screenWidth = Dimensions.get('window').width;

// ----- Type Definitions -----
type Route = {
  key: string;
  title: string;
  icon: string;
};

type FormData = {
  personal: { name?: string; phone?: string };
  address: { street?: string; city?: string };
  professional: { occupation?: string; experience?: string };
  jobPref: { jobTitle?: string; location?: string };
};

const professionsList = ['Software Engineer', 'Designer'];
const specialtiesMap = {
  'Software Engineer': ['Frontend', 'Backend'],
  'Designer': ['UI', 'UX']
};

// ----- Step Components -----
const PersonalDetails = ({
  data,
  onChange,
  handleSubmit,
  }: {
    data: FormData['personal'];
    onChange: (data: FormData['personal']) => void;
    handleSubmit: () => void;
  }) => (
    <PersonalDetailsSection onSubmit={handleSubmit} />
);

const AddressDetails = ({
  data,
  onChange
  }: {
    data: FormData['address'];
    onChange: (data: FormData['address']) => void;
  }) => (
    <AddressInfoScreen />
);

const ProfessionalDetails = ({
    data,
    onChange,
    handleSubmit
  }: {
    data: FormData['professional'];
    onChange: (data: FormData['professional']) => void;
    handleSubmit: () => void;
  }) => (
    <ProfessionalDetailsForm 
      onSubmit={handleSubmit} 
      professionsList={professionsList}
      specialtiesMap={specialtiesMap}
    />
);

const JobPreferences = ({
    data,
    onChange
  }: {
    data: FormData['jobPref'];
    onChange: (data: FormData['jobPref']) => void;
  }) => (
    <JobPreferenceForm />
);

// ----- Main Component -----

const MultiStepRegistrationScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    address: {},
    professional: {},
    jobPref: {}
  });

  const [index, setIndex] = useState(0);

	const [routes] = useState<Route[]>([
    { key: 'personal', title: 'Personal Details', icon: 'account-circle-outline' },
    { key: 'address', title: 'Address', icon: 'home-outline' },
    { key: 'professional', title: 'Professional Details', icon: 'briefcase-outline' },
    { key: 'jobPref', title: 'Job Preferences', icon: 'tune' }
  ]);

  const validateForm = () => {
    const allValid = Object.values(formData).every(section =>
      Object.values(section).every(value => value?.trim() !== '')
    );
    if (!allValid) {
      Alert.alert('Validation Error', 'Please complete all fields before submitting.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Submitted Data:', formData);
      Alert.alert('Success', 'Registration complete!');
    }
  };

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'personal':
        return (
          <PersonalDetails
            data={formData.personal}
            onChange={data => setFormData(prev => ({ ...prev, personal: data }))}
            handleSubmit={handleSubmit}
          />
        );
      case 'address':
        return (
          <AddressDetails
            data={formData.address}
            onChange={data => setFormData(prev => ({ ...prev, address: data }))}
          />
        );
      case 'professional':
        return (
          <ProfessionalDetails
            data={formData.professional}
            onChange={data => setFormData(prev => ({ ...prev, professional: data }))}
            handleSubmit={handleSubmit}
          />
        );
      case 'jobPref':
        return (
          <JobPreferences
            data={formData.jobPref}
            onChange={data => setFormData(prev => ({ ...prev, jobPref: data }))}
          />
        );
      default:
        return null;
    }
  };
  

	const tabCompletion = {
		personal: formData.personal.name && formData.personal.phone,
		address: formData.address.street && formData.address.city,
		professional: formData.professional.occupation && formData.professional.experience,
		jobPref: formData.jobPref.jobTitle && formData.jobPref.location
	};

const renderScrollableTabBar = (props:any) => {
  const { navigationState, jumpTo } = props;

  return (
    <View style={styles.tabBarContainer}>
      {navigationState.routes.map((route:any, index: number) => {
        const focused = navigationState.index === index;
        const color = focused ? theme.colors.primary.main : theme.colors.text.light;

        return (
          <Pressable
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={styles.tabItem}
          >
            <Icon name={route.icon} size={20} color={color} style={styles.icon} />
            <Text style={[styles.tabText, { color }]}>{route.title}</Text>
            {focused && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}
    </View>
  );
};

return (
  <SafeAreaView style={{ flex: 1 }}>
  <Header title="Registration" showBackButton />
  <View style={{ flex: 1 }}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: screenWidth }}
      renderTabBar={renderScrollableTabBar}
    />

    <View style={{ padding: 16 }}>
        <Button title="Register" style={styles.registerBtn} onPress={handleSubmit} />
    </View>
      <TermsPolicies />
      <CopyrightFooter />
  </View>
</SafeAreaView>
)
};

export default MultiStepRegistrationScreen;