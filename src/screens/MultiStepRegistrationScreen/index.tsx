import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
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
import { TermsPolicies } from '../../components/common/TermsPolicies';
import { CopyrightFooter } from '../../components/common/CopyrightFooter';
import { Button } from '../../components/common/Button';
import AddressInfoScreen from './Address';
import ProfessionalDetailsForm from './ProfessionalDetails';
import { JobPreferenceForm } from './JobPreference';
import PersonalDetailsSection from './PersonalDetailsSection';
import { personalDetailsSchema } from '../../validations/personalDetailValidation';
import { professionalDetailsSchema } from '../../validations/professionalDetailValidation';
import { jobPreferenceSchema } from '../../validations/jobPreferenceValidation';

export interface ParentScreenRef {
  submitPersonalDetails: () => void;
}


const screenWidth = Dimensions.get('window').width;

// ----- Type Definitions -----
type Route = {
  key: string;
  title: string;
  icon: string;
};

type FormData = {
  personal: { firstName?: string; lastName?: string, alternateEmail?:string };
  address: { street?: string; city?: string };
  professional: { experience?:string, profession?: string, specialty?:string };
  jobPref: { employmentType?: string; availabilityDate?: string, shift?: string, selectedStates?:string };
};

const professionsList = ['Software Engineer', 'Designer'];
const specialtiesMap = {
  'Software Engineer': ['Frontend', 'Backend'],
  'Designer': ['UI', 'UX']
};

// ----- Step Components -----
interface PersonalDetailsProps {
  data: FormData['personal'];
  onChange: (data: FormData['personal']) => void;
  errors: Record<string, string>;
}

const PersonalDetails : React.FC<PersonalDetailsProps> = ({
  data,
  onChange,
  errors
  }: {
    data: FormData['personal'];
    onChange: (data: FormData['personal']) => void;
  }) => { 
    return(
    <PersonalDetailsSection data={data} onChange={onChange} errors={errors} />
)};

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
    errors,
  }: {
    data: FormData['professional'];
    onChange: (data: FormData['professional']) => void;
    errors:any
  }) => (
    
    <ProfessionalDetailsForm 
       data={data}
       onChange={onChange}
       errors={errors}
       professionsList={professionsList}
       specialtiesMap={specialtiesMap}
    />
);

const JobPreferences = ({
    data,
    onChange,
    errors
  }: {
    data: FormData['jobPref'];
    onChange: (data: FormData['jobPref']) => void;
    errors:any
  }) => (
    <JobPreferenceForm
      data={data}
      onChange={onChange}
      errors={errors}
     />
);

// ----- Main Component -----

const MultiStepRegistrationScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    address: {},
    professional: {},
    jobPref: {}
  });
  const [formErrors, setFormErrors] = useState({
    personal: {},
    address: {},
    professional: {},
    jobPref: {}
  });
  const [index, setIndex] = useState(0);

	// const [routes] = useState<Route[]>([
  //   { key: 'personal', title: 'Personal Details', icon: 'account-circle-outline' },
  //   { key: 'address', title: 'Address', icon: 'home-outline' },
  //   { key: 'professional', title: 'Professional Details', icon: 'briefcase-outline' },
  //   { key: 'jobPref', title: 'Job Preferences', icon: 'tune' }
  // ]);

  // const validateForm = () => {
  //   const allValid = Object.values(formData).every(section =>
  //     Object.values(section).every(value => value?.trim() !== '')
  //   );
  //   if (!allValid) {
  //     Alert.alert('Validation Error', 'Please complete all fields before submitting.');
  //     return false;
  //   }
  //   return true;
  // };

  const routes = useMemo(() => [
    {
      key: 'personal',
      title: 'Personal Details',
      icon: 'account-circle-outline',
      hasError: Object.keys(formErrors.personal).length > 0
    },
    {
      key: 'address',
      title: 'Address',
      icon: 'home-outline',
      hasError: Object.keys(formErrors.address).length > 0
    },
    {
      key: 'professional',
      title: 'Professional Details',
      icon: 'briefcase-outline',
      hasError: Object.keys(formErrors.professional).length > 0
    },
    {
      key: 'jobPref',
      title: 'Job Preferences',
      icon: 'tune',
      hasError: Object.keys(formErrors.jobPref).length > 0
    }
  ], [formErrors]);

  const validatePersonalDetails = async () => {
    try { 
      await personalDetailsSchema.validate(formData.personal, { abortEarly: false });
      setFormErrors(prev => ({ ...prev, personal: {} }));
      return true;
    } catch (err: any) {
      const errorObj: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        errorObj[e.path] = e.message;
      });
      setFormErrors(prev => ({ ...prev, personal: errorObj }));
      return false;
    }
  };

  const validateProfessionalDetails = async () => {
    try {
      await professionalDetailsSchema.validate(formData.professional, { abortEarly: false });
      setFormErrors(prev => ({ ...prev, professional: {} }));
      return true;
    } catch (err: any) {
      const errorObj: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        errorObj[e.path] = e.message;
      });
      setFormErrors(prev => ({ ...prev, professional: errorObj }));
      return false;
    }
  };

  const validateJobPreference = async () => {
    try {
      await jobPreferenceSchema.validate(formData.jobPref, { abortEarly: false });
      setFormErrors((prev: any) => ({ ...prev, jobPreference: {} }));
      return true;
    } catch (err: any) {
      const errorObj: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        errorObj[e.path] = e.message;
      });
      setFormErrors((prev: any) => ({ ...prev, jobPref: errorObj }));
      return false;
    }
  };
  // const handleSubmit = async() => {
  //   // if (validateForm()) {
  //   //   console.log('Submitted Data:', formData);
  //   //   Alert.alert('Success', 'Registration complete!');
  //   // }
  //   console.log('Valid data:', formData.professional);

  //     let isValid = await validatePersonalDetails();
  //     console.log(7,isValid)
  //     if (isValid) {
  //       // proceed
  //       console.log('Valid data:', formData.personal);
  //       Alert.alert('Success', 'Registration Personal complete!');
  //     }
  //     isValid = await validateProfessionalDetails();
  //     if (isValid) {
  //       // proceed
  //       console.log('Valid data:', formData.professional);
  //       Alert.alert('Success', 'Registration Professional complete!');
  //     }
  // };
  const handleSubmit = async () => {
    console.log('Submitted Data:', formData);

    const isPersonalValid = await validatePersonalDetails();  
    const isProfessionalValid = await validateProfessionalDetails();
    const isJobPrefValid = await validateJobPreference();

    if (isPersonalValid && isProfessionalValid && isJobPrefValid) {
      Alert.alert('Success', 'Registration complete!');
    } else {
      console.log('Validation failed');
    }
  };

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'personal':
        return (
          <PersonalDetails
          data={formData.personal}
          onChange={data => setFormData(prev => ({ ...prev, personal: data }))}
          errors={formErrors.personal}
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
            errors={formErrors.professional}
          />
        );
      case 'jobPref':
        return (
          <JobPreferences
            data={formData.jobPref}
            onChange={data => setFormData(prev => ({ ...prev, jobPref: data }))}
            errors={formErrors.jobPref}
          />
        );
      default:
        return null;
    }
  };
  

	// const tabCompletion = {
	// 	personal: formData.personal.name && formData.personal.phone,
	// 	address: formData.address.street && formData.address.city,
	// 	professional: formData.professional.occupation && formData.professional.experience,
	// 	jobPref: formData.jobPref.jobTitle && formData.jobPref.location
	// };

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
            <Text style={[styles.tabText, { color }]}>
              {route.title}
              {route.hasError && <Icon name={'alert-circle'} size={18} color={'red'} style={styles.icon} />}
              </Text>
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