import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
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

interface PersonalDetailsProps {}

export const PersonalDetails: React.FC<PersonalDetailsProps> = () => {
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const candidatePersonalDetails =
    useAppSelector(
      state =>
        state?.candidatePersonalDetails?.personalDetails?.responsePayload,
    ) || {};

  const currentAddressDetails =
    candidatePersonalDetails?.address?.find(
      e => e?.addressType === 'current',
    ) || {};

  const permanentAddressDetails =
    candidatePersonalDetails?.address?.find(
      e => e?.addressType === 'permanent',
    ) || {};

  const emergencyContactDetails =
    candidatePersonalDetails?.emergencyContactDetails?.[0] || {};

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
        candidatePersonalDetails?.mobileNumber?.split(',')?.[1]?.trim() ||
        candidatePersonalDetails?.mobileNumber ||
        '',
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
    ProfessionalDetails: {
      professionValue: candidatePersonalDetails?.resumes?.[0]?.professionalTitle || '',
      primarySpecialtyValue: candidatePersonalDetails?.resumes?.[0]?.specialties || '',
      summary: candidatePersonalDetails?.resumes?.[0]?.summary || '',
      totalExperience:
        candidatePersonalDetails?.resumes?.[0]?.overallYearsOfExperience?.toString() || 0,
      resume: candidatePersonalDetails?.resumes?.[0]?.resumeSignedUrl || [],
    },
    jobPreferences: {
      availabilityDate: candidatePersonalDetails?.availableFrom || '',
      shiftStartTime: candidatePersonalDetails?.shiftStartTime || '',
      shiftEndTime: candidatePersonalDetails?.shiftEndTime || '',
      shiftValue: candidatePersonalDetails?.preferredShift || '',
      workplacePreferenceValue:
        candidatePersonalDetails?.wageExpectationCategory || '',
      employmentTypeValue: candidatePersonalDetails?.workTypePreference || '',
      timeZoneValue: candidatePersonalDetails?.shiftTimezone || 'utc+0',
      searchStates: '',
      selectedStates:
        candidatePersonalDetails?.preferredLocation?.split(',') || [],
      currency:
        candidatePersonalDetails?.currency || '',
    },
    submittalInformation: {
      dateOfBirth: candidatePersonalDetails?.dateOfBirth || '',
      socialSecurityNumber: candidatePersonalDetails?.ssn || '',
    },
    emergencyContact: {
      firstName: emergencyContactDetails?.firstName || '',
      middleName: emergencyContactDetails?.middleName || '',
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
      workPhoneExtensionNumber:
        emergencyContactDetails?.workPhoneExtensionNumber || '',
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

  const [errors, setErrors] = useState({
    basicInformation: {},
    addressDetails: {},
    ProfessionalDetails: {},
    jobPreferences: {},
    submittalInformation: {},
    emergencyContact: {},
    portfolio: {},
  });

  const [touched, setTouched] = useState({
    basicInformation: {},
    addressDetails: {},
    ProfessionalDetails: {},
    jobPreferences: {},
    submittalInformation: {},
    emergencyContact: {},
    portfolio: {},
  });

  const updateErrors = (section: string, updatedErrors: any) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [section]: {...prevErrors[section], ...updatedErrors},
    }));
  };

  const updateTouched = (section: string, updatedTouched: any) => {
    setTouched(prevTouched => ({
      ...prevTouched,
      [section]: {...prevTouched[section], ...updatedTouched},
    }));
  };

  const updateSection = (sectionName: string, updatedValues: any) => {
    setInitialValues(prevValues => ({
      ...prevValues,
      [sectionName]: {
        ...prevValues[sectionName],
        ...updatedValues,
      },
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: any = {};
    const newTouched: any = {};

    const fieldToValidate = [
      initialValues.basicInformation.firstName,
      initialValues.basicInformation.lastName,
      initialValues.basicInformation.emailAddress,
      initialValues.basicInformation.profileTitle,
      initialValues.basicInformation.overallExperience,
      initialValues.basicInformation.mobileNumber,
      initialValues.addressDetails.currentAddress.address,
      initialValues.addressDetails.currentAddress.city,
      initialValues.addressDetails.currentAddress.zipCode,
      initialValues.addressDetails.currentAddress.stateCode,
      initialValues.addressDetails.currentAddress.countryCode,
      initialValues.ProfessionalDetails.professionValue,
      initialValues.ProfessionalDetails.primarySpecialtyValue,
      initialValues.ProfessionalDetails.totalExperience,
      initialValues.jobPreferences.employmentTypeValue,
      initialValues.jobPreferences.availabilityDate,
      initialValues.submittalInformation.dateOfBirth,
      initialValues.submittalInformation.socialSecurityNumber,
    ];

    fieldToValidate.forEach((value, index) => {
      if (value === '' || value === null) {
        newErrors[index] = `Field ${index + 1} is required`;
        newTouched[index] = true;
        isValid = false;
      } else {
        newTouched[index] = false;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);
    setIsSubmitActive(!isValid);
  };

  useEffect(() => {
    validateForm();
  }, [initialValues]);

  console.log({candidatePersonalDetails})

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
        candidateId: candidatePersonalDetails?.candidateId || '',
        emailAddress: initialValues.basicInformation.emailAddress,
        firstName: initialValues.basicInformation.firstName,
        middleName: initialValues.basicInformation.middleName,
        lastName: initialValues.basicInformation.lastName,
        mediaFile:
          'candidates/26640abb-a24b-4b73-bf93-f2f94ba6a5fe/profile-pictures/2151100226.jpg',
        mediaFilePresignedUrl:
          'https://lancesoft-dev-gen.s3.amazonaws.com/candidates/26640abb-a24b-4b73-bf93-f2f94ba6a5fe/profile-pictures/2151100226.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLWVhc3QtMSJIMEYCIQCPQdZ9x%2FiRCkOHQztrPm6jADKMovRxdn9nu6tHy41JvwIhAOAvFpTbI4SrtmguhfA6v9Iy09T%2FZsrvgF4qfQsaiZ8%2BKvoDCPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNTA5Mzk5NjI5NTQ2IgykV2BpALEF0%2BjrQVQqzgPN6aOLg1wFLEFGNbVUkwOey9%2BP4FaKGuOtaCsUo4jsJqzqWYNR%2BI8oV2skLw%2BZ%2BTSWb3F5JhsaCRAicXEWmMTgBB9SjKoiXE4R0c9nIp7zUM2iEBM1%2FJ4h7%2BFNEzIFAD%2F41BkrkI8DDzCgMfbL%2FKGlchKBHAiQ%2BlegfGYZMXJC4q7rGpAe9rR%2B598MbpsvPWh6cSu%2FHymIhjOil%2Fb9UGVhz1k8lJFBDwn1AjFU5a87Gtjm0hmfzWUXYDaKCs4Sr%2F9O5RK658p3gzbAbbVtv4hAnPlUfi23D5%2FGK3xR9ZRZrJiXde%2FQCSX6eUeAzpNinDvVA7jk9X0GhRtx7oQ9gYT3mwurRtdsP0jMgg2eTsi1wIOMK1%2BNcVPcqtEu85tF6SxuCWcZVoCuSBrsIH2GrLE6fOXdsEk1eBJeY5ilJjPpL9zNyRaSn1byKJ6r%2BnBe7tSni0TDrpL7VJ0QguH5MMzZKozfd52sIVIdIGbzqBzjGY8n6Mm9bDPybNtUj2GeAWPLcfUsz484%2FpSiJXI4%2FD5uXb%2B6osFGj5oP5iYQminYRLXGSNwwyWKeVlol2FN3kZOFvE%2B4z9RPSNZQCAk%2Fwzjp6K0hCGqXIFA7ks7cbi4wx7X3wQY6pAEuuItaWtugZCCKMm8UXUkOvW6DnxkZ%2BUSTCsS4SonPWzwClLiKD%2Br7RUTbnP%2FDR4bnXpPmMxakv2R7zYRjO5W2Oh06tx5QSlfzfCu1%2BBC%2Fur9Id7imA6%2BztDFTbuwRoUYAelf9frk7Qd8igobrgjfKX1OsuD5EPDlEKXh05jtGSbJNXIvq4purKU60odyM0DIovCqIAYtxUjWnl%2FSf4cKgfsOqHQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250602T172950Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAXNGUVP3VPL25WWEJ%2F20250602%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Expires=7200&X-Amz-Signature=984094cc7cdaaf9a0d186f25d8fa2de570d9f6ed41ee234b7281c31f203a54e6',
        profileTitle: initialValues.basicInformation.profileTitle,
        brief: initialValues.basicInformation.brief,
        overallYearsOfExperience: initialValues.basicInformation.overallExperience,
        alternateEmailAddress: initialValues.basicInformation.alternateEmailAddress,
        mobileNumber: initialValues.basicInformation.mobileNumber,
        alternatePhoneNumber: initialValues.basicInformation.alternateMobileNumber,
        knownAs: initialValues.basicInformation.knownAs,
        otherPreviouslyUsedName: initialValues.basicInformation.otherName,
        gender: initialValues.basicInformation.gender,
        nationality: initialValues.basicInformation.nationality,
        ethnicity: initialValues.basicInformation.ethnicity,
        militaryStatus: initialValues.basicInformation.military,
        workplacePreference: initialValues.basicInformation.workplacePreference,
        address: [
          {
            addressId: currentAddressDetails?.addressId || '',
            addressType: 'current',
            address: initialValues.addressDetails.currentAddress.address,
            zipCode: initialValues.addressDetails.currentAddress.zipCode,
            city: initialValues.addressDetails.currentAddress.city,
            state: initialValues.addressDetails.currentAddress.stateCode,
            country: initialValues.addressDetails.currentAddress.countryCode,
            addressNotes: initialValues.addressDetails.currentAddress.addressNotes,
          },
          {
            addressId: permanentAddressDetails?.addressId || '',
            addressType: 'permanent',
            address: initialValues.addressDetails.permanentAddress.address,
            zipCode: initialValues.addressDetails.permanentAddress.zipCode,
            city: initialValues.addressDetails.permanentAddress.city,
            state: initialValues.addressDetails.permanentAddress.stateCode,
            country: initialValues.addressDetails.permanentAddress.countryCode,
            addressNotes: initialValues.addressDetails.permanentAddress.addressNotes,
            latitude: 0,
            longitude: 0,
          },
        ],
        resumes: [
          {
            resumeId: candidatePersonalDetails?.resumes?.[0]?.resumeId,
            professionalTitle: initialValues.ProfessionalDetails.professionValue,
            specialties: initialValues.ProfessionalDetails.primarySpecialtyValue,
            summary: initialValues.ProfessionalDetails.summary,
            overallYearsOfExperience: initialValues.ProfessionalDetails.totalExperience,
            resumePhysicalPath: '',
            resumeSignedUrl: '',
            parsedData: '',
          },
        ],
        portfolioUrl1: initialValues.portfolio.portfolioUrl1,
        portfolioUrl2: initialValues.portfolio.portfolioUrl2,
        portfolioUrl3: initialValues.portfolio.portfolioUrl3,
        portfolioUrl4: initialValues.portfolio.portfolioUrl4,
        workTypePreference: initialValues.jobPreferences.employmentTypeValue,
        preferredShift: initialValues.jobPreferences.shiftValue,
        availableFrom: initialValues.jobPreferences.availabilityDate,
        preferredLocation:
          initialValues.jobPreferences.selectedStates.join(','),
        currency: initialValues.jobPreferences.currency,
        wageExpectationCategory: initialValues.jobPreferences.workplacePreferenceValue,
        shiftStartTime: initialValues.jobPreferences.shiftStartTime,
        shiftEndTime: initialValues.jobPreferences.shiftEndTime,
        shiftTimezone: initialValues.jobPreferences.timeZoneValue,
        dateOfBirth: initialValues.submittalInformation.dateOfBirth,
        ssn: initialValues.submittalInformation.socialSecurityNumber,
        emergencyContactDetails: [
          {
            emergencyContactDetailId: candidatePersonalDetails?.emergencyContactDetails?.[0]?.emergencyContactDetailId,
            firstName: initialValues.emergencyContact.firstName,
            middleName: initialValues.emergencyContact.middleName || '',
            lastName: initialValues.emergencyContact.lastName,
            relationship: initialValues.emergencyContact.relationship,
            primaryMobileNumber: initialValues.emergencyContact.primaryMobileNumber,
            secondaryMobileNumber: initialValues.emergencyContact.secondaryMobileNumber,
            workPhoneNumber: initialValues.emergencyContact.workPhoneNumber,
            workPhoneExtensionNumber: initialValues.emergencyContact.workPhoneExtensionNumber,
            address: [
              {
                address: initialValues.emergencyContact.address,
                zipCode: initialValues.emergencyContact.zipCode,
                city: initialValues.emergencyContact.city,
                state: initialValues.emergencyContact.state,
                country: initialValues.emergencyContact.country,
                addressNotes: initialValues.emergencyContact.notes,
              },
            ],
          },
        ],
        profileCompletionPercentage: candidatePersonalDetails?.profileCompletionPercentage,
      });

      const response = await fetch(apiUrl, {method: 'PUT', headers, body});
      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to update:', data);
        Alert.alert('Failed', data?.message || 'An error occurred');
      } else {
        console.log('Success:', data);
        Alert.alert('Success', 'Personal details updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  console.log('initialValues', initialValues);
  console.log('errors', errors);
  console.log('touched', touched);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.personalDetailsContainer}>
        <BasicInformationScreen
          initialValues={initialValues.basicInformation}
          updateValues={(updatedValues: any) =>
            updateSection('basicInformation', updatedValues)}
          errors={errors.basicInformation}
          touched={touched.basicInformation}
          updateErrors={updatedErrors => updateErrors('basicInformation', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('basicInformation', updatedTouched)}
        />
        <AddressDetailsScreen
          initialValues={initialValues.addressDetails}
          updateValues={(updatedValues: any) =>
            updateSection('addressDetails', updatedValues)}
          errors={errors.addressDetails}
          touched={touched.addressDetails}
          updateErrors={updatedErrors => updateErrors('addressDetails', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('addressDetails', updatedTouched)}
        />
        <ProfessionalDetailsScreen
          initialValues={initialValues.ProfessionalDetails}
          updateValues={(updatedValues: any) =>
            updateSection('ProfessionalDetails', updatedValues)}
          errors={errors.ProfessionalDetails}
          touched={touched.ProfessionalDetails}
          updateErrors={updatedErrors => updateErrors('ProfessionalDetails', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('ProfessionalDetails', updatedTouched)}
        />
        <PortfolioScreen
          initialValues={initialValues.portfolio}
          updateValues={(updatedValues: any) =>
            updateSection('portfolio', updatedValues)}
          errors={errors.portfolio}
          touched={touched.portfolio}
          updateErrors={updatedErrors => updateErrors('portfolio', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('portfolio', updatedTouched)}
        />
        <JobPreferencesForm
          initialValues={initialValues.jobPreferences}
          updateValues={(updatedValues: any) =>
            updateSection('jobPreferences', updatedValues)}
          errors={errors.jobPreferences}
          touched={touched.jobPreferences}
          updateErrors={updatedErrors => updateErrors('jobPreferences', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('jobPreferences', updatedTouched)}
        />
        <SubmittalInformationScreen
          initialValues={initialValues.submittalInformation}
          updateValues={(updatedValues: any) =>
            updateSection('submittalInformation', updatedValues)}
          errors={errors.submittalInformation}
          touched={touched.submittalInformation}
          updateErrors={updatedErrors => updateErrors('submittalInformation', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('submittalInformation', updatedTouched)}
        />
        <EmergencyContactAddressScreen
          initialValues={initialValues.emergencyContact}
          updateValues={(updatedValues: any) =>
            updateSection('emergencyContact', updatedValues)}
          errors={errors.emergencyContact}
          touched={touched.emergencyContact}
          updateErrors={updatedErrors => updateErrors('emergencyContact', updatedErrors)}
          updateTouched={updatedTouched => updateTouched('emergencyContact', updatedTouched)}
        />
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton title="Save" disabled={isSubmitActive} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};
