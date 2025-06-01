import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Alert,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet
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
import { fetchCandidatePersonalDetails } from '../../store/thunk/candidatePersonalDetails.thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { submitOnboarding } from '../../store/slices/onboarding.slice';
import { ScreenNames } from '../../utils/ScreenConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { RootState } from '../../store/store';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import RNFetchBlob from 'react-native-blob-util';

// Types
interface ParentScreenRef {
  submitPersonalDetails: () => void;
}

interface Route {
  key: string;
  title: string;
  icon: string;
  hasError: boolean;
}

interface FormData {
  personal: {
    firstName: string;
    lastName: string;
    alternateEmail: string;
    mobileNumber: string;
  };
  address: {
    addressDetails: {
      address: string;
      zipCode: string;
      country: string;
      state: string;
      city: string;
      stateCode?: string;
      countryCode?: string;
    };
    isCurrent: boolean;
    isPermanent: boolean;
    isBothSame: boolean;
    addressType?: string;
  };
  professional: {
    experience: number;
    profession: string;
    specialty: string[];
  };
  jobPref: {
    employmentType: string;
    availabilityDate: string;
    shift: string;
    selectedStates: string;
  };
}

interface FormErrors {
  personal: Record<string, string>;
  address: Record<string, any>;
  professional: Record<string, string>;
  jobPref: Record<string, string>;
}

interface FormTouch {
  personal: Record<string, boolean>;
  address: Record<string, boolean>;
  professional: Record<string, boolean>;
  jobPref: Record<string, boolean>;
}

interface OnboardingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Constants
const screenWidth = Dimensions.get('window').width;

// Component Props
interface PersonalDetailsProps {
  data: FormData['personal'];
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setTouched: (data: Record<string, boolean>) => void;
  onSubmit: () => void;
}

interface AddressDetailsProps {
  data: FormData['address'];
  onChange: (data: FormData['address']) => void;
  errors: Record<string, any>;
  touched: Record<string, boolean>;
  setTouched: (data: Record<string, boolean>) => void;
}

interface ProfessionalDetailsProps {
  data: FormData['professional'];
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setTouched: (data: Record<string, boolean>) => void;
}

interface JobPreferencesProps {
  data: FormData['jobPref'];
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setTouched: (data: Record<string, boolean>) => void;
}

// Step Components
const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  data,
  onChange,
  errors,
  touched,
  setTouched,
  onSubmit
}) => (
  <PersonalDetailsSection
    data={data}
    onChange={onChange}
    errors={errors}
    touched={touched}
    setTouched={setTouched}
    onSubmit={onSubmit}
  />
);

const AddressDetails: React.FC<AddressDetailsProps> = ({
  data,
  onChange,
  errors,
  touched,
  setTouched
}) => (
  <AddressInfoScreen
    data={data}
    onChange={onChange}
    errors={errors}
    touched={touched}
    setTouched={setTouched}
  />
);

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({
  data,
  onChange,
  errors,
  touched,
  setTouched
}) => (
  <ProfessionalDetailsForm
    data={data}
    onChange={onChange}
    errors={errors}
    touched={touched}
    setTouched={setTouched}
  />
);

const JobPreferences: React.FC<JobPreferencesProps> = ({
  data,
  onChange,
  errors,
  touched,
  setTouched
}) => (
  <JobPreferenceForm
    data={data}
    onChange={onChange}
    errors={errors}
    touched={touched}
    setTouched={setTouched}
  />
);

// Main Component
export const MultiStepRegistrationScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  // const { loading } = useAppSelector((state: any) => state?.onboarding as OnboardingState);

  const route = useRoute();
  const resumeData = (route?.params as any)?.responseData || {};
  const resumeFile = (route?.params as any)?.resumeFile;

  console.log({route})

  // State
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      firstName: resumeData?.firstName || '',
      lastName: resumeData?.lastName || '',
      alternateEmail: resumeData?.alternateEmailAddress || '',
      mobileNumber: resumeData?.mobileNumber || '',
    },
    address: {
      addressDetails: {
        address: resumeData?.address?.[0]?.address || '',
        zipCode: resumeData?.address?.[0]?.zipCode || '',
        country: resumeData?.address?.[0]?.country || '',
        state: resumeData?.address?.[0]?.state || '',
        city: resumeData?.address?.[0]?.city || '',
      },
      isCurrent: true,
      isPermanent:false,
      isBothSame:false,
    },
    professional: {
      experience: resumeData?.resumes?.[0]?.overallYearsOfExperience || 0,
      profession: resumeData?.resumes?.[0]?.professionalTitle || '',
      specialty: resumeData?.resumes?.[0]?.specialties || [],
    },
    jobPref: {
      employmentType: resumeData?.workTypePreference || '',
      availabilityDate: resumeData?.firstName || '',
      shift: '',
      selectedStates: '',
    },
  });
  console.log({formData})

  const [formErrors, setFormErrors] = useState<FormErrors>({
    personal: {},
    address: {},
    professional: {},
    jobPref: {}
  });

  const [formTouch, setFormTouch] = useState<FormTouch>({
    personal: {},
    address: {},
    professional: {},
    jobPref: {}
  });

  // Memoized Routes
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

  // Validation Functions
  const validatePersonalDetails = useCallback(async () => {
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
  }, [formData.personal]);

  const validateProfessionalDetails = useCallback(async () => {
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
  }, [formData.professional]);

  const validateJobPreference = useCallback(async () => {
    try {
      await jobPreferenceSchema.validate(formData.jobPref, { abortEarly: false });
      setFormErrors(prev => ({ ...prev, jobPref: {} }));
      return true;
    } catch (err: any) {
      const errorObj: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        errorObj[e.path] = e.message;
      });
      console.log({errorObj})
      setFormErrors(prev => ({ ...prev, jobPref: errorObj }));
      return false;
    }
  }, [formData.jobPref]);

  const validateAddressInfo = useCallback(async () => {
    try {
      await addressValidationSchema.validate(formData.address, { abortEarly: false });
      setFormErrors(prev => ({ ...prev, address: {} }));
      return true;
    } catch (err: any) {
      const errorObj: Record<string, any> = {};
      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach((e: any) => {
          if (!e.path) return;
          const pathParts = e.path.split('.');
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
      setFormErrors(prev => ({ ...prev, address: errorObj }));
      return false;
    }
  }, [formData.address]);

  // Form Validation
  const validateAll = useCallback(async () => {
    const [isPersonalValid, isProfessionalValid, isAddressValid, isJobPrefValid] = await Promise.all([
      validatePersonalDetails(),
      validateProfessionalDetails(),
      validateAddressInfo(),
      validateJobPreference()
    ]);
    return isPersonalValid && isProfessionalValid && isAddressValid && isJobPrefValid;
  }, [validatePersonalDetails, validateProfessionalDetails, validateAddressInfo, validateJobPreference]);

  // Effects
  useEffect(() => {
    validateAll();
  }, [formData, validateAll]);

  useEffect(() => {
    dispatch(fetchCandidatePersonalDetails());
  }, [dispatch]);

  // Form Submission
  const handleRegister = useCallback(async () => {
    const isValid = await validateAll();
    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all mandatory fields'
      })
      return;
    }

    try {
      console.log("-------------")
      const onboardingFormData = new FormData();
      console.log({formData});
      const onboardingDetails = {
        firstName: formData.personal.firstName,
        lastName: formData.personal.lastName,
        alternateEmailAddress: formData.personal.alternateEmail,
        mobileNumber: formData.personal.mobileNumber.slice(2),
        address: [
          {
            addressType: formData.address.isPermanent ? 'permanent' : formData.address.isCurrent ? 'current' : 'both',
            address: formData.address.addressDetails.address,
            addressNotes: "",
            zipCode: formData.address.addressDetails.zipCode,
            country: formData.address.addressDetails.country,
            state: formData.address.addressDetails.state,
            city: formData.address.addressDetails.city,
            latitude: 0,
            longitude: 0
          }
        ],
        overallYearsOfExperience: formData.professional.experience,
        profileTitle: formData.professional.profession,
        workTypePreference: formData.jobPref.employmentType,
        availableFrom: moment(formData.jobPref.availabilityDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
        preferredShift: formData.jobPref.shift,
        preferredLocation: formData.jobPref.selectedStates,
        skillData: (resumeData.skills || []).map((keyword: string) => ({ keyword, lastUsed: null })),
        resumes: [
          {
            professionalTitle: formData.professional.profession,
            specialties: formData.professional.specialty,
            parsedData: JSON.stringify(formData.professional),
            overallYearsOfExperience: formData.professional.experience,
          }
        ],
      };
      console.log({onboardingDetails})
      onboardingFormData.append('onboardingDetails', JSON.stringify(onboardingDetails));
      console.log({resumeFile})
      if (resumeFile) {
        onboardingFormData.append('resume', {
          uri: resumeFile.uri,
          type: resumeFile.type || 'application/pdf',
          name: resumeFile.name || 'resume.pdf',
        });
      }
      await dispatch(submitOnboarding(onboardingFormData)).unwrap();
      navigation.navigate(ScreenNames.RegistrationASuccessScreen);
    } catch (error: any) {
      console.error('Error', error.message || 'Failed to submit registration');
      Toast.show({
        type: 'error',
        text1: error.message || 'Failed to submit registration'
      })
    }
  }, [formData, validateAll, dispatch, navigation, resumeFile]);

  // Render Functions
  const renderScene = useCallback(({ route }: { route: Route }) => {
    switch (route.key) {
      case 'personal':
        return (
          <PersonalDetailsSection
            data={formData.personal}
            onChange={(field: string, value: any) => {
              setFormData(prev => ({
                ...prev,
                personal: { ...prev.personal, [field]: value }
              }));
              validatePersonalDetails();
            }}
            errors={formErrors.personal}
            touched={formTouch.personal}
            setTouched={data => setFormTouch(prev => ({ ...prev, personal: data }))}
            onSubmit={validatePersonalDetails}
          />
        );
      case 'address':
        return (
          <AddressDetails
            data={formData.address}
            onChange={(updatedAddress: FormData['address']) => {
              setFormData(prev => ({ ...prev, address: updatedAddress }));
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
            onChange={(data: any) => {
              setFormData(prev => ({
                ...prev,
                professional: data
              }));
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
            onChange={(data: any) => {
              console.log("tag here 12345",data);
              setFormData(prev => ({
                ...prev,
                jobPref: data
              }));
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
  }, [formData, formErrors, formTouch, validatePersonalDetails, validateAddressInfo, validateProfessionalDetails, validateJobPreference]);

  const renderTabBar = useCallback((props: any) => {
    const { navigationState, jumpTo } = props;

    return (
      <View style={styles.tabBarContainer}>
        {navigationState.routes.map((route: Route, index: number) => {
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
                {route.hasError && <Icon name="alert-circle" size={12} color="red" />}
              </Text>
              {focused && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Registration" showBackButton />
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index: activeTab, routes }}
          renderScene={renderScene}
          onIndexChange={setActiveTab}
          initialLayout={{ width: screenWidth }}
          renderTabBar={renderTabBar}
        />
        <View style={styles.footer}>
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={Object.values(formErrors).some(errorObj => Object.keys(errorObj).length > 0)}
            style={Object.values(formErrors).some(errorObj => Object.keys(errorObj).length > 0) ? styles.disabledButton : styles.registerButton}
            textStyle={Object.values(formErrors).some(errorObj => Object.keys(errorObj).length > 0) ? {color: '#fff'} : {}}
          />
        </View>
        <TermsPolicies />
        <CopyrightFooter />
      </View>
    </SafeAreaView>
  );
};

export default MultiStepRegistrationScreen;