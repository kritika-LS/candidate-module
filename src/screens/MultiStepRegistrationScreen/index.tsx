import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState, useEffect } from 'react';
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
import { addressValidationSchema } from '../../validations/addressValidation';

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
  personal: { firstName?: string; lastName?: string, alternateEmail?:string,mobileNumber?: string };
  address: {
    physicalAddress: {
      address?: string;
      city?: string;
      stateCode?: string;
      zipCode?: string;
      countryCode?: string;
    };
    mailingAddress: {
      address?: string;
      city?: string;
      stateCode?: string;
      zipCode?: string;
      countryCode?: string;
    };
    isSamePhysical?: boolean;
  };
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
  touched: Record<string, boolean>;
  setTouched: (data: Record<string, boolean>) => void;
}

const PersonalDetails : React.FC<PersonalDetailsProps> = ({
  data,
  onChange,
  errors,
  touched,
  setTouched
  }: {
    data: FormData['personal'];
    onChange: (data: FormData['personal']) => void;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    setTouched: (data: Record<string, boolean>) => void;
  }) => { 
    return(
    <PersonalDetailsSection data={data} onChange={onChange} errors={errors} touched={touched} setTouched={setTouched}/>
)};

const AddressDetails = ({
  data,
  onChange,
  errors,
  touched,
  setTouched
  }: {
    data: FormData['address'];
    onChange: (data: FormData['address']) => void;
    errors: any;
    touched: any;
    setTouched: (data: any) => void;
  }) => (
    <AddressInfoScreen data={data} onChange={onChange} errors={errors} touched={touched} setTouched={setTouched} />
);

const ProfessionalDetails = ({
    data,
    onChange,
    errors,
    touched,
    setTouched
  }: {
    data: FormData['professional'];
    onChange: (data: FormData['professional']) => void;
    errors:any;
    touched: any;
    setTouched: (data: any) => void;
  }) => (
    
    <ProfessionalDetailsForm 
       data={data}
       onChange={onChange}
       errors={errors}
       professionsList={professionsList}
       specialtiesMap={specialtiesMap}
       touched={touched} 
       setTouched={setTouched}
    />
);

const JobPreferences = ({
    data,
    onChange,
    errors,
    touched,
    setTouched
  }: {
    data: FormData['jobPref'];
    onChange: (data: FormData['jobPref']) => void;
    errors:any;
    touched: any;
    setTouched: (data: any) => void;
  }) => (
    <JobPreferenceForm
      data={data}
      onChange={onChange}
      errors={errors}
      touched={touched} 
      setTouched={setTouched}
     />
);

// ----- Main Component -----

const MultiStepRegistrationScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    address: {
      physicalAddress: {
        address: '',
        city: '',
        stateCode: '',
        zipCode: '',
        countryCode: ''
      },
      mailingAddress: {
        address: '',
        city: '',
        stateCode: '',
        zipCode: '',
        countryCode: ''
      },
      isSamePhysical: false
    },
    professional: {},
    jobPref: {}
  });
  const [formErrors, setFormErrors] = useState({
    personal: {},
    address: {
    },
    professional: {},
    jobPref: {}
  });
  const [formTouch, setFormTouch] = useState({
    personal: {},
    address: {},
    professional: {},
    jobPref: {}
  });
  const [index, setIndex] = useState(0);
  const [isAllValid, setIsAllValid] = useState(false);

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

  const validateAddressInfo = async () => {
    try {
      await addressValidationSchema.validate(formData.address, { abortEarly: false });
      setFormErrors((prev) => ({ ...prev, address: {} }));
      return true;
    } catch (err: any) {
      const errorObj: Record<string, any> = {};
  
      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach((e: any) => {
          if (!e.path) return;
  
          const pathParts = e.path.split('.'); // e.g., ['physicalAddress', 'city']
          let current = errorObj;
  
          pathParts.forEach((part: string, index: number) => {
            if (index === pathParts.length - 1) {
              current[part] = e.message;
            } else {
              if (!current[part]) current[part] = {};
              current = current[part];
            }
          });
        });
      }
  
      console.error('Address validation errors:', errorObj);
      setFormErrors((prev) => ({ ...prev, address: errorObj }));
      return false;
    }
  };
  
  const validateAll = async () => {
    const isPersonalValid = await validatePersonalDetails();
    const isProfessionalValid = await validateProfessionalDetails();
    const isAddressValid = await validateAddressInfo();
    const isJobPrefValid = await validateJobPreference();

    setIsAllValid(isPersonalValid && isProfessionalValid && isAddressValid && isJobPrefValid);
  };

  useEffect(() => {
    validateAll();
  }, [formData]);
  
  console.log("tag errore",formErrors)
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
  console.log("formData",formData,formTouch)
  const handleSubmit = async () => {
    console.log('Submitted Data:', formData);

    const isPersonalValid = await validatePersonalDetails();  
    const isProfessionalValid = await validateProfessionalDetails();
    const isAddressValid = await validateAddressInfo();
    const isJobPrefValid = await validateJobPreference();

    if (isPersonalValid && isProfessionalValid && isJobPrefValid && isAddressValid) {
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
          onChange={data => {
            setFormData(prev => ({ ...prev, personal: data }));
            validatePersonalDetails();
          }}
          errors={formErrors.personal}
          touched={formTouch.personal}
          setTouched={data => setFormTouch(prev => ({ ...prev, personal: data }))}
          />
        );
      case 'address':
        return (
          <AddressDetails
            data={formData.address}
            onChange={data => {
              setFormData(prev => ({ ...prev, address: data }));
              validateAddressInfo();
            }}
            errors={formErrors.address}
            touched={formTouch.address}
            setTouched={data => setFormTouch(prev => ({ ...prev, address: data }))}
          />
        );
      case 'professional':
        return (
          <ProfessionalDetails
            data={formData.professional}
            onChange={data => {
              setFormData(prev => ({ ...prev, professional: data }));
              validateProfessionalDetails();
            }}
            errors={formErrors.professional}
            touched={formTouch.professional}
            setTouched={data => setFormTouch(prev => ({ ...prev, professional: data }))}
          />
        );
      case 'jobPref':
        return (
          <JobPreferences
            data={formData.jobPref}
            onChange={data => {
              setFormData(prev => ({ ...prev, jobPref: data }));
              validateJobPreference();
            }}
            errors={formErrors.jobPref}
            touched={formTouch.jobPref}
            setTouched={data => setFormTouch(prev => ({ ...prev, jobPref: data }))}
          />
        );
      default:
        return null;
    }
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
            <Text style={[styles.tabText, { color }]}>
              {route.title}
              {route.hasError && <Icon name={'alert-circle'} size={10} color={'red'} />}
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
        <Button title="Register" style={styles.registerBtn} onPress={handleSubmit} disabled={!isAllValid} />
    </View>
      <TermsPolicies />
      <CopyrightFooter />
  </View>
</SafeAreaView>
)
};

export default MultiStepRegistrationScreen;