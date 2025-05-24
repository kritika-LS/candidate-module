import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../../theme';
import { SaveButton } from '../../../components/features/SaveButton';
import { ProfileScreenHeader } from '../../../components/features/ProfileScreenHeader';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { updateCandidatePersonalDetails } from '../../../store/thunk/candidatePersonalDetails.thunk';
import { CandidatePersonalDetailsPayload } from '../../../types/personalDetails';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { DEFAULT_VALUES } from '../../../config/constants';

interface FormValues {
  // Basic Information
  firstName: string;
  lastName: string;
  middleName: string;
  profileTitle: string;
  overallExperience: string;
  emailAddress: string;
  alternateEmailAddress: string;
  knownAs: string;
  brief: string;
  mobileNumber: string;
  countryCode: string;
  alternateMobileNumber: string;
  otherName: string;
  gender: string | null;
  nationality: string | null;
  ethnicity: string | null;
  military: string | null;
  workplacePreference: string | null;

  // Address Details
  address: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Professional Details
  profession: string | null;
  specialty: string | null;
  professionalSummary: string;

  // Job Preferences
  availabilityDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  employmentType: string | null;
  shift: string | null;
  wageExpectation: string | null;
  timeZone: string | null;

  // Submittal Information
  dateOfBirth: string;
  socialSecurityNumber: string;

  // Emergency Contact
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyRelationship: string;
  emergencyPrimaryMobile: string;
  emergencyPrimaryMobileCode: string;
  emergencySecondaryMobile: string;
  emergencySecondaryMobileCode: string;
  emergencyWorkPhone: string;
  emergencyWorkPhoneCode: string;
  emergencyAddress: string;
  emergencyAddress2: string;
  emergencyCity: string;
  emergencyState: string;
  emergencyZipCode: string;
  emergencyCountry: string;
  emergencyNotes: string;
}

const validationSchema = Yup.object().shape({
  // Basic Information Validation
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  profileTitle: Yup.string().required('Profile Title is required'),
  overallExperience: Yup.string().required('Overall Experience is required'),
  emailAddress: Yup.string().email('Invalid email').required('Email Address is required'),
  mobileNumber: Yup.string()
    .matches(/^\d{4,}$/, 'Mobile Number must be at least 4 digits')
    .required('Mobile Number is required'),

  // Address Validation
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip Code is required'),
  country: Yup.string().required('Country is required'),

  // Professional Details Validation
  profession: Yup.string().required('Profession is required'),
  specialty: Yup.string().required('Specialty is required'),

  // Job Preferences Validation
  availabilityDate: Yup.date().required('Availability date is required'),
  shiftStartTime: Yup.date().required('Shift start time is required'),
  shiftEndTime: Yup.date().required('Shift end time is required'),
  employmentType: Yup.string().required('Employment type is required'),

  // Submittal Information Validation
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  socialSecurityNumber: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format. Expected format is XXX-XX-XXXX')
    .required('Social Security Number is required'),

  // Emergency Contact Validation
  emergencyFirstName: Yup.string().required('Emergency contact first name is required'),
  emergencyLastName: Yup.string().required('Emergency contact last name is required'),
  emergencyRelationship: Yup.string().required('Relationship is required'),
  emergencyPrimaryMobile: Yup.string().required('Primary mobile number is required'),
  emergencyAddress: Yup.string().required('Emergency contact address is required'),
  emergencyCity: Yup.string().required('Emergency contact city is required'),
  emergencyState: Yup.string().required('Emergency contact state is required'),
  emergencyZipCode: Yup.string().required('Emergency contact zip code is required'),
  emergencyCountry: Yup.string().required('Emergency contact country is required'),
});

const ConsolidatedForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const candidatePersonalDetails = useAppSelector((state) => state.candidatePersonalDetails.personalDetails.responsePayload) || {};
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState({
    dateOfBirth: false,
    availabilityDate: false,
    shiftStartTime: false,
    shiftEndTime: false,
  });

  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    }
  };

  const initialValues: FormValues = {
    // Basic Information
    firstName: candidatePersonalDetails?.firstName || '',
    lastName: candidatePersonalDetails?.lastName || '',
    middleName: candidatePersonalDetails?.middleName || '',
    profileTitle: candidatePersonalDetails?.profileTitle || '',
    overallExperience: candidatePersonalDetails?.overallYearsOfExperience?.toString() || '',
    emailAddress: candidatePersonalDetails?.emailAddress || '',
    alternateEmailAddress: candidatePersonalDetails?.alternateEmailAddress || '',
    knownAs: candidatePersonalDetails?.knownAs || '',
    brief: candidatePersonalDetails?.brief || '',
    mobileNumber: candidatePersonalDetails?.mobileNumber?.split(",")?.[1]?.trim() || '',
    countryCode: candidatePersonalDetails?.mobileNumber?.split(",")?.[0]?.trim() || '',
    alternateMobileNumber: candidatePersonalDetails?.alternatePhoneNumber || '',
    otherName: candidatePersonalDetails?.otherPreviouslyUsedName || '',
    gender: candidatePersonalDetails?.gender || null,
    nationality: candidatePersonalDetails?.nationality || null,
    ethnicity: candidatePersonalDetails?.ethnicity || null,
    military: candidatePersonalDetails?.militaryStatus || null,
    workplacePreference: candidatePersonalDetails?.workplacePreference || null,

    // Address Details
    address: candidatePersonalDetails?.address?.[0]?.address || '',
    address2: candidatePersonalDetails?.address?.[0]?.address2 || '',
    city: candidatePersonalDetails?.address?.[0]?.city || '',
    state: candidatePersonalDetails?.address?.[0]?.state || '',
    zipCode: candidatePersonalDetails?.address?.[0]?.zipCode || '',
    country: candidatePersonalDetails?.address?.[0]?.country || '',

    // Professional Details
    profession: candidatePersonalDetails?.profession || null,
    specialty: candidatePersonalDetails?.specialty || null,
    professionalSummary: candidatePersonalDetails?.professionalSummary || '',

    // Job Preferences
    availabilityDate: candidatePersonalDetails?.availabilityDate || '',
    shiftStartTime: candidatePersonalDetails?.shiftStartTime || '',
    shiftEndTime: candidatePersonalDetails?.shiftEndTime || '',
    employmentType: candidatePersonalDetails?.employmentType || null,
    shift: candidatePersonalDetails?.shift || null,
    wageExpectation: candidatePersonalDetails?.wageExpectation || null,
    timeZone: candidatePersonalDetails?.timeZone || 'utc+0',

    // Submittal Information
    dateOfBirth: candidatePersonalDetails?.dateOfBirth || '',
    socialSecurityNumber: candidatePersonalDetails?.ssn || '',

    // Emergency Contact
    emergencyFirstName: candidatePersonalDetails?.emergencyContactDetails?.[0]?.firstName || '',
    emergencyLastName: candidatePersonalDetails?.emergencyContactDetails?.[0]?.lastName || '',
    emergencyRelationship: candidatePersonalDetails?.emergencyContactDetails?.[0]?.relationship || '',
    emergencyPrimaryMobile: candidatePersonalDetails?.emergencyContactDetails?.[0]?.primaryMobileNumber || '',
    emergencyPrimaryMobileCode: candidatePersonalDetails?.emergencyContactDetails?.[0]?.primaryMobileNumberCountryCode || '',
    emergencySecondaryMobile: candidatePersonalDetails?.emergencyContactDetails?.[0]?.secondaryMobileNumber || '',
    emergencySecondaryMobileCode: candidatePersonalDetails?.emergencyContactDetails?.[0]?.secondaryMobileNumberCountryCode || '',
    emergencyWorkPhone: candidatePersonalDetails?.emergencyContactDetails?.[0]?.workPhoneNumber || '',
    emergencyWorkPhoneCode: candidatePersonalDetails?.emergencyContactDetails?.[0]?.workPhoneNumberCountryCode || '',
    emergencyAddress: candidatePersonalDetails?.emergencyContactDetails?.[0]?.address?.[0]?.address || '',
    emergencyAddress2: candidatePersonalDetails?.emergencyContactDetails?.[0]?.address?.[0]?.address2 || '',
    emergencyCity: candidatePersonalDetails?.emergencyContactDetails?.[0]?.address?.[0]?.city || '',
    emergencyState: candidatePersonalDetails?.emergencyContactDetails?.[0]?.address?.[0]?.state || '',
    emergencyZipCode: candidatePersonalDetails?.emergencyContactDetails?.[0]?.address?.[0]?.zipCode || '',
    emergencyCountry: candidatePersonalDetails?.emergencyContactDetails?.[0]?.address?.[0]?.country || '',
    emergencyNotes: candidatePersonalDetails?.emergencyContactDetails?.[0]?.notes || '',
  };

  const handleSave = async (values: FormValues) => {
    try {
      const payload: CandidatePersonalDetailsPayload = {
        ...candidatePersonalDetails,
        // Basic Information
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        profileTitle: values.profileTitle,
        overallYearsOfExperience: Number(values.overallExperience),
        emailAddress: values.emailAddress,
        alternateEmailAddress: values.alternateEmailAddress,
        knownAs: values.knownAs,
        brief: values.brief,
        mobileNumber: `${values.countryCode},${values.mobileNumber}`,
        alternatePhoneNumber: values.alternateMobileNumber,
        otherPreviouslyUsedName: values.otherName,
        gender: values.gender,
        nationality: values.nationality,
        ethnicity: values.ethnicity,
        militaryStatus: values.military,
        workplacePreference: values.workplacePreference,

        // Address Details
        address: [{
          addressType: 'PRIMARY',
          address: values.address,
          address2: values.address2,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        }],

        // Professional Details
        profession: values.profession,
        specialty: values.specialty,
        professionalSummary: values.professionalSummary,

        // Job Preferences
        availabilityDate: values.availabilityDate,
        shiftStartTime: values.shiftStartTime,
        shiftEndTime: values.shiftEndTime,
        employmentType: values.employmentType,
        shift: values.shift,
        wageExpectation: values.wageExpectation,
        timeZone: values.timeZone,

        // Submittal Information
        dateOfBirth: values.dateOfBirth,
        ssn: values.socialSecurityNumber,

        // Emergency Contact
        emergencyContactDetails: [{
          firstName: values.emergencyFirstName,
          lastName: values.emergencyLastName,
          relationship: values.emergencyRelationship,
          primaryMobileNumber: values.emergencyPrimaryMobile,
          primaryMobileNumberCountryCode: values.emergencyPrimaryMobileCode,
          secondaryMobileNumber: values.emergencySecondaryMobile,
          secondaryMobileNumberCountryCode: values.emergencySecondaryMobileCode,
          workPhoneNumber: values.emergencyWorkPhone,
          workPhoneNumberCountryCode: values.emergencyWorkPhoneCode,
          notes: values.emergencyNotes,
          address: [{
            addressType: 'EMERGENCY',
            address: values.emergencyAddress,
            address2: values.emergencyAddress2,
            city: values.emergencyCity,
            state: values.emergencyState,
            zipCode: values.emergencyZipCode,
            country: values.emergencyCountry,
          }],
        }],
      };

      await dispatch(updateCandidatePersonalDetails(payload)).unwrap();
      setIsCompleted(true);
      Toast.show({
        type: 'success',
        text1: 'Personal details saved successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save personal details',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.body}>
            <ProfileScreenHeader
              headerIcon='account-circle-outline'
              headerTitle='Personal Details'
              completedStatus={isCompleted}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isValid, dirty }) => (
                <>
                  {/* Basic Information Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <Input
                      label="First Name"
                      required
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      error={errors.firstName as string}
                      touched={touched.firstName as boolean}
                    />
                    <Input
                      label="Middle Name"
                      value={values.middleName}
                      onChangeText={handleChange('middleName')}
                      onBlur={handleBlur('middleName')}
                      error={errors.middleName as string}
                      touched={touched.middleName as boolean}
                    />
                    <Input
                      label="Last Name"
                      required
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      error={errors.lastName as string}
                      touched={touched.lastName as boolean}
                    />
                    {/* Add other basic information fields */}
                  </View>

                  {/* Address Details Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Address Details</Text>
                    <Input
                      label="Address"
                      required
                      value={values.address}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      error={errors.address as string}
                      touched={touched.address as boolean}
                    />
                    {/* Add other address fields */}
                  </View>

                  {/* Professional Details Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Details</Text>
                    <Input
                      label="Profession"
                      required
                      value={values.profession || ''}
                      onChangeText={handleChange('profession')}
                      onBlur={handleBlur('profession')}
                      error={errors.profession as string}
                      touched={touched.profession as boolean}
                    />
                    {/* Add other professional details fields */}
                  </View>

                  {/* Job Preferences Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Job Preferences</Text>
                    <Input
                      label="Employment Type"
                      required
                      value={values.employmentType || ''}
                      onChangeText={handleChange('employmentType')}
                      onBlur={handleBlur('employmentType')}
                      error={errors.employmentType as string}
                      touched={touched.employmentType as boolean}
                    />
                    {/* Add other job preferences fields */}
                  </View>

                  {/* Submittal Information Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Submittal Information</Text>
                    <Input
                      label="Date of Birth"
                      required
                      value={values.dateOfBirth}
                      onChangeText={handleChange('dateOfBirth')}
                      onBlur={handleBlur('dateOfBirth')}
                      error={errors.dateOfBirth as string}
                      touched={touched.dateOfBirth as boolean}
                    />
                    <Input
                      label="Social Security Number"
                      required
                      placeholder="XXX-XX-XXXX"
                      value={values.socialSecurityNumber}
                      onChangeText={(text) => {
                        const formattedSSN = formatSSN(text);
                        setFieldValue('socialSecurityNumber', formattedSSN);
                      }}
                      onBlur={handleBlur('socialSecurityNumber')}
                      error={errors.socialSecurityNumber as string}
                      touched={touched.socialSecurityNumber as boolean}
                    />
                  </View>

                  {/* Emergency Contact Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Emergency Contact</Text>
                    <Input
                      label="First Name"
                      required
                      value={values.emergencyFirstName}
                      onChangeText={handleChange('emergencyFirstName')}
                      onBlur={handleBlur('emergencyFirstName')}
                      error={errors.emergencyFirstName as string}
                      touched={touched.emergencyFirstName as boolean}
                    />
                    {/* Add other emergency contact fields */}
                  </View>

                  <View style={styles.buttonContainer}>
                    <SaveButton
                      onPress={() => handleSubmit()}
                      disabled={!(isValid && dirty)}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: theme.colors.text.primary,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
});

export default ConsolidatedForm; 