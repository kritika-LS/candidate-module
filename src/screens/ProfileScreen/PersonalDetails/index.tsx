import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import PortfolioScreen from './Portfolio';
import ProfessionalDetailsScreen from './ProfessionalDetails';
import SubmittalInformationScreen from './SubmittalInformation';
import AddressDetailsScreen from './Address';
import EmergencyContactAddressScreen from './EmergencyContactAndAddress';
import JobPreferencesForm from './JobPreferences';
import BasicInformationScreen from './BasicInformationScreen';
import {SaveButton} from '../../../components/features/SaveButton';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINTS} from '../../../api/endPoints';
import {ENV} from '../../../config/env';
import {useAppSelector} from '../../../hooks/useAppDispatch';
import Toast from 'react-native-toast-message';

interface PersonalDetailsProps {}

export const PersonalDetails: React.FC<PersonalDetailsProps> = () => {
  const candidatePersonalDetails =
    useAppSelector(
      state =>
        state?.candidatePersonalDetails?.personalDetails?.responsePayload,
    ) || {};
  
  const currentAddressDetails = candidatePersonalDetails?.address?.find(e=>e?.addressType === 'current') || {};
  const permanentAddressDetails = candidatePersonalDetails?.address?.find(e=>e?.addressType === 'permanent') || {};
  const emergencyContactDetails = candidatePersonalDetails?.emergencyContactDetails?.[0] || {};
  const emergencyAddress = emergencyContactDetails?.address?.[0] || {};



  const [initialValues, setInitialValues] = useState({
    basicInformation: {
      firstName: candidatePersonalDetails?.firstName || '',
      lastName: candidatePersonalDetails?.lastName || '',
      middleName: candidatePersonalDetails?.middleName || '',
      profileTitle: candidatePersonalDetails?.profileTitle || '',
      overallExperience:
        candidatePersonalDetails?.overallYearsOfExperience?.toString() || '',
      emailAddress: candidatePersonalDetails?.emailAddress || '',
      alternateEmailAddress:
        candidatePersonalDetails?.alternateEmailAddress || '',
      knownAs: candidatePersonalDetails?.knownAs || '',
      brief: candidatePersonalDetails?.brief || '',
      mobileNumber:
        candidatePersonalDetails?.mobileNumber?.split(',')?.[1]?.trim() || candidatePersonalDetails?.mobileNumber || '',
      countryCode:
        candidatePersonalDetails?.mobileNumber?.split(',')?.[0]?.trim() || '',
      alternateMobileNumber:
        candidatePersonalDetails?.alternatePhoneNumber || '',
      otherName: candidatePersonalDetails?.otherPreviouslyUsedName || '',
      gender: candidatePersonalDetails?.gender || null,
      nationality: candidatePersonalDetails?.nationality || null,
      ethnicity: candidatePersonalDetails?.ethnicity || null,
      military: candidatePersonalDetails?.militaryStatus || null,
      workplacePreference:
        candidatePersonalDetails?.workplacePreference || null,
    },
    addressDetails: {
      permanentAddress: {    
        address: permanentAddressDetails?.address || '',
        city: permanentAddressDetails?.city || '',
        zipCode: permanentAddressDetails?.zipCode || '',
        stateCode: permanentAddressDetails?.state || '',
        countryCode: permanentAddressDetails?.country || '',
        addressNotes: permanentAddressDetails?.addressNotes || '',
      },
      currentAddress: {    
        address: currentAddressDetails?.address || '',
        city: currentAddressDetails?.city || '',
        zipCode: currentAddressDetails?.zipCode || '',
        stateCode: currentAddressDetails?.state || '',
        countryCode: currentAddressDetails?.country || '',
        addressNotes: currentAddressDetails?.addressNotes || '',
      },
      isSamePermanent: false,
    },
    ProfessionalDetails:{
      professionValue: candidatePersonalDetails?.[0]?.professionalTitle || '',
      primarySpecialtyValue:
        candidatePersonalDetails?.[0]?.specialties || '',
      summary: candidatePersonalDetails?.brief || '',
      totalExperience:
        candidatePersonalDetails?.resumes?.[0]?.overallYearsOfExperience || 0,
      resume: candidatePersonalDetails?.[0]?.summary || [],
    },
    jobPreferences: {
      availabilityDate: candidatePersonalDetails?.availableFrom || '',
      shiftStartTime:candidatePersonalDetails?.shiftStartTime || '',
      shiftEndTime: candidatePersonalDetails?.shiftEndTime || '',
      shiftValue: candidatePersonalDetails?.preferredShift ||'',
      wageExpectationValue: candidatePersonalDetails?.wageExpectationCategory || '',
      employmentTypeValue: candidatePersonalDetails?.workTypePreference ||'',
      timeZoneValue: candidatePersonalDetails?.shiftTimezone || 'utc+0',
    },
    submittalInformation: {
      dateOfBirth: candidatePersonalDetails?.dateOfBirth || '',
      socialSecurityNumber: candidatePersonalDetails?.ssn || '',
    },
    emergencyContact: {
      firstName: emergencyContactDetails?.firstName || '',
      lastName: emergencyContactDetails?.lastName || '',
      relationship: emergencyContactDetails?.relationship || '',
      primaryMobileNumber: emergencyContactDetails?.primaryMobileNumber || '',
      primaryMobileNumberCountryCode:
        emergencyContactDetails?.primaryMobileNumberCountryCode || '',
      secondaryMobileNumber:
        emergencyContactDetails?.secondaryMobileNumber || '',
      secondaryMobileNumberCountryCode:
        emergencyContactDetails?.secondaryMobileNumberCountryCode || '',
      workPhoneNumber: emergencyContactDetails?.workPhoneNumber || '',
      workPhoneNumberCountryCode:
        emergencyContactDetails?.workPhoneNumberCountryCode || '',
      address: emergencyAddress?.address || '',
      city: emergencyAddress?.city || '',
      zipCode: emergencyAddress?.zipCode || '',
      state: emergencyAddress?.state || '',
      country: emergencyAddress?.country || '',
      notes: emergencyAddress?.addressNotes || '',
    },
    portfolio: {
      portfolioUrl1: candidatePersonalDetails?.portfolioUrl1 || '',
      portfolioUrl2: candidatePersonalDetails?.portfolioUrl2 || '',
      portfolioUrl3: candidatePersonalDetails?.portfolioUrl3 || '',
      portfolioUrl4: candidatePersonalDetails?.portfolioUrl4 || '',
    },
  });

  const updateBasicInformation = (updatedValues: any) => {
    console.log('tag values 1', updatedValues);
    setInitialValues(prevValues => ({
      ...prevValues,
      basicInformation: {...prevValues.basicInformation, ...updatedValues},
    }));
  };

  const updateAddressDetails = (updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      addressDetails: {...prevValues.addressDetails, ...updatedValues},
    }));
  };

  const updateProfessionalDetails = (updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      ProfessionalDetails: {...prevValues.ProfessionalDetails, ...updatedValues},
    }));
  };
  const updateJobPreferences = (updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      jobPreferences: {...prevValues.jobPreferences, ...updatedValues},
    }));
  };

  const updateSubmittalInformation = (updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      submittalInformation: {
        ...prevValues.submittalInformation,
        ...updatedValues,
      },
    }));
  };

  const updateEmergencyContact = (updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      emergencyContact: {...prevValues.emergencyContact, ...updatedValues},
    }));
  };

  const updatePortfolio = (updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      portfolio: {...prevValues.portfolio, ...updatedValues},
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.personalDetails}`;
      const headers = {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const body = JSON.stringify({
        candidateId: '26640abb-a24b-4b73-bf93-f2f94ba6a5fe',
        emailAddress: 'kumar.akshay@lancesoft.com',
        firstName: 'John',
        middleName: '',
        lastName: 'Doe',
        mediaFile:
          '',
        mediaFilePresignedUrl:
          '',
        profileTitle: 'LPN/LVN',
        brief: "tell me something i don't know",
        overallYearsOfExperience: 90,
        alternateEmailAddress: 'alternate@gmail.com',
        mobileNumber: '9897132897',
        alternatePhoneNumber: '7888888888',
        knownAs: 'someone',
        otherPreviouslyUsedName: 'other',
        gender: 'Male',
        nationality: 'India',
        ethnicity: 'Asian',
        militaryStatus: 'No',
        workplacePreference: 'O',
        address: [
          {
            addressId: '0a6b279e-b3ab-49f6-a94b-11c2625d1318',
            addressType: 'current',
            address: 'A2',
            zipCode: '250401',
            city: 'Attaura',
            state: 'UP',
            country: 'IN',
            addressNotes: 'behind lake view park',
          },
          {
            addressId: '0b5cce0c-5c39-4a7d-a2b6-18bb2cc780e4',
            addressType: 'permanent',
            address: 'A2',
            zipCode: '250401',
            city: 'Attaura',
            state: 'UP',
            country: 'IN',
            addressNotes: 'behind lake view park',
            latitude: 0,
            longitude: 0,
          },
        ],
        resumes: [
          {
            resumeId: '092ef9fb-c3b7-42fa-9f3a-ea3789a38c63',
            professionalTitle: 'LPN/LVN',
            specialties: 'Acute Rehab',
            summary: 'Skilled enough',
            overallYearsOfExperience: 90,
            resumePhysicalPath: '',
            resumeSignedUrl: '',
            parsedData: '',
          },
        ],
        portfolioUrl1: 'https://sdncjsd@github.com',
        portfolioUrl2: 'https://jcnewjcweiu@codewar.com',
        portfolioUrl3: null,
        portfolioUrl4: null,
        workTypePreference: 'Permanent',
        preferredShift: 'day',
        availableFrom: '2025-05-23',
        preferredLocation:
          'Virginia,Haryana,Delhi Division,California,Uttar Pradesh',
        currency: '',
        wageExpectationCategory: 'DA',
        shiftStartTime: '0204',
        shiftEndTime: '1700',
        shiftTimezone: '-06:00',
        dateOfBirth: '2000-01-21',
        ssn: '111-11-1111',
        emergencyContactDetails: [
          {
            emergencyContactDetailId: '6c3e3cf9-f828-45a0-8e1f-a3437e9f061c',
            firstName: 'father',
            middleName: 'and',
            lastName: 'mother',
            relationship: 'guardian',
            primaryMobileNumber: '9888888888',
            secondaryMobileNumber: '9666666666',
            workPhoneNumber: '7263764567',
            workPhoneExtensionNumber: '8765674567',
            address: [
              {
                address: 'mn hjyvufyr',
                zipCode: '122002',
                city: 'Gurugram',
                state: 'Haryana',
                country: 'India',
                addressNotes: 'jhbuyb',
              },
            ],
          },
        ],
        profileCompletionPercentage: 100,
      });

      const response = await fetch(apiUrl, {method: 'PUT', headers, body});
      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to update:', data);
        Toast.show({
          type: 'error',
          text1: data?.message || 'An error occurred',
        })
      } else {
        console.log('Success:', data);
        Toast.show({
          type: 'success',
          text1: data?.message || 'Personal details updated successfully',
        })
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      })
    }
  };

  console.log('initialValues', initialValues);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.personalDetailsContainer}>
        <BasicInformationScreen
          initialValues={initialValues.basicInformation}
          updateValues={updateBasicInformation}
        />
        <AddressDetailsScreen
          initialValues={initialValues.addressDetails}
          updateValues={updateAddressDetails}
        />
        <ProfessionalDetailsScreen
          initialValues={initialValues.ProfessionalDetails}
          updateValues={updateProfessionalDetails}
         />
        <PortfolioScreen
          initialValues={initialValues.portfolio}
          updateValues={updatePortfolio}
        />
        <JobPreferencesForm
          initialValues={initialValues.jobPreferences}
          updateValues={updateJobPreferences}
        />
        <SubmittalInformationScreen
          initialValues={initialValues.submittalInformation}
          updateValues={updateSubmittalInformation}
        />
        <EmergencyContactAddressScreen
          initialValues={initialValues.emergencyContact}
          updateValues={updateEmergencyContact}
        />
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton title="Save" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};
