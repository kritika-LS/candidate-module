import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { DEFAULT_VALUES } from '../../../config/constants';
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from '../../../hooks/useAppDispatch';
import { Header } from './Header';
import { ProfileScreenHeader } from '../../../components/features/ProfileScreenHeader';
import { updateCandidatePersonalDetails } from '../../../store/thunk/candidatePersonalDetails.thunk';
import { CandidatePersonalDetailsPayload } from '../../../types/personalDetails';

interface FormValues {
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
  genderOpen: boolean;
  genderItems: Array<{ label: string; value: string }>;
  gender: string | null;
  nationalityOpen: boolean;
  nationalityItems: Array<{ label: string; value: string }>;
  nationality: string | null;
  ethnicityOpen: boolean;
  ethnicityItems: Array<{ label: string; value: string }>;
  ethnicity: string | null;
  militaryOpen: boolean;
  militaryItems: Array<{ label: string; value: string }>;
  military: string | null;
  workplacePreferenceOpen: boolean;
  workplacePreferenceItems: Array<{ label: string; value: string }>;
  workplacePreference: string | null;
}

const BasicInformationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const candidatePersonalDetails = useAppSelector((state) => state?.candidatePersonalDetails?.personalDetails?.responsePayload) || {};
  const [isCompleted, setIsCompleted] = React.useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    middleName: Yup.string(),
    profileTitle: Yup.string().required('Profile Title is required'),
    overallExperience: Yup.string().required('Overall Experience is required'),
    emailAddress: Yup.string().email('Invalid email').required('Email Address is required'),
    mobileNumber: Yup.string()
      .matches(/^\d{4,}$/, 'Mobile Number must be at least 4 digits')
      .required('Mobile Number is required'),
  });

  const initialValues: FormValues = {
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
    otherName: '',
    genderOpen: false,
    genderItems: DEFAULT_VALUES.genderItems || [],
    gender: candidatePersonalDetails?.gender || null,
    nationalityOpen: false,
    nationalityItems: DEFAULT_VALUES.nationalityItems || [],
    nationality: candidatePersonalDetails?.nationality || null,
    ethnicityOpen: false,
    ethnicityItems: DEFAULT_VALUES.ethnicityItems || [],
    ethnicity: candidatePersonalDetails?.ethnicity || null,
    militaryOpen: false,
    militaryItems: DEFAULT_VALUES.militaryItems || [],
    military: candidatePersonalDetails?.militaryStatus || null,
    workplacePreferenceOpen: false,
    workplacePreferenceItems: DEFAULT_VALUES.workplacePreferenceItems || [],
    workplacePreference: candidatePersonalDetails?.workplacePreference || null,
  };

  const handleSave = async (values: FormValues) => {
    try {
      const payload: CandidatePersonalDetailsPayload = {
        ...candidatePersonalDetails,
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
      };

      await dispatch(updateCandidatePersonalDetails(payload)).unwrap();
      setIsCompleted(true);
      Toast.show({
        type: 'success',
        text1: 'Basic information saved successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save basic information',
      });
    }
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
          <View style={styles.body}>
            <ProfileScreenHeader
              headerIcon='account-circle-outline'
              headerTitle='Basic Information'
              completedStatus={isCompleted}
            />
            <Header />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isValid, dirty }) => (
                <>
                  <View style={styles.container}>
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
                      placeholder="Enter middle name"
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
                    <Input
                      label="Profile Title"
                      required
                      value={values.profileTitle}
                      onChangeText={handleChange('profileTitle')}
                      onBlur={handleBlur('profileTitle')}
                      error={errors.profileTitle as string}
                      touched={touched.profileTitle as boolean}
                    />
                    <Input
                      label="Overall Experience"
                      required
                      value={values.overallExperience}
                      onChangeText={handleChange('overallExperience')}
                      onBlur={handleBlur('overallExperience')}
                      error={errors.overallExperience as string}
                      touched={touched.overallExperience as boolean}
                    />
                    <Input
                      label="Email Address"
                      required
                      value={values.emailAddress}
                      onChangeText={handleChange('emailAddress')}
                      onBlur={handleBlur('emailAddress')}
                      error={errors.emailAddress as string}
                      touched={touched.emailAddress as boolean}
                    />
                    <Input
                      label="Alternate Email Address"
                      placeholder="Enter alternate email address"
                      value={values.alternateEmailAddress}
                      onChangeText={handleChange('alternateEmailAddress')}
                      onBlur={handleBlur('alternateEmailAddress')}
                      error={errors.alternateEmailAddress as string}
                      touched={touched.alternateEmailAddress as boolean}
                    />
                    <PhoneNumberInput
                      label="Mobile Number"
                      required
                      value={values.mobileNumber}
                      defaultCode={values.countryCode?.replace('+', '') || 'US'}
                      onChangeText={(value: string) => setFieldValue('mobileNumber', value)}
                      onChangeCountry={(country: { callingCode: string[] }) => setFieldValue('countryCode', `+${country?.callingCode[0]}`)}
                      error={errors.mobileNumber as string}
                      touched={touched.mobileNumber as boolean}
                    />
                    <PhoneNumberInput
                      label="Alternate Mobile Number"
                      onChangeText={(value: string) => setFieldValue('alternateMobileNumber', value)}
                    />
                    <Input
                      label="Known as"
                      placeholder="Enter known as"
                      value={values.knownAs}
                      onChangeText={handleChange('knownAs')}
                      onBlur={handleBlur('knownAs')}
                      error={errors.knownAs as string}
                      touched={touched.knownAs as boolean}
                    />
                    <Input
                      label="Other Previously Used Name"
                      placeholder="Enter other previously used name"
                      value={values.otherName}
                      onChangeText={handleChange('otherName')}
                      onBlur={handleBlur('otherName')}
                      error={errors.otherName as string}
                      touched={touched.otherName as boolean}
                    />

                    <Text style={styles.label}>Gender</Text>
                    <DropDownPicker
                      open={values.genderOpen}
                      setOpen={(open) => setFieldValue('genderOpen', open)}
                      items={values.genderItems}
                      value={values.gender}
                      setValue={(callback) => setFieldValue('gender', callback(values.gender))}
                      placeholder="Search gender"
                      searchable={false}
                      listMode="SCROLLVIEW"
                      style={[styles.dropdown, { zIndex: values.genderOpen ? 10 : 1 }]}
                      dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                    />

                    <Text style={styles.label}>Nationality</Text>
                    <DropDownPicker
                      open={values.nationalityOpen}
                      setOpen={(open) => setFieldValue('nationalityOpen', open)}
                      items={values.nationalityItems}
                      value={values.nationality}
                      setValue={(callback) => setFieldValue('nationality', callback(values.nationality))}
                      placeholder="Search nationality"
                      searchable={false}
                      listMode="SCROLLVIEW"
                      style={[styles.dropdown, { zIndex: values.nationalityOpen ? 10 : 1 }]}
                      dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                    />

                    <Text style={styles.label}>Ethnicity</Text>
                    <DropDownPicker
                      open={values.ethnicityOpen}
                      setOpen={(open) => setFieldValue('ethnicityOpen', open)}
                      items={values.ethnicityItems}
                      value={values.ethnicity}
                      setValue={(callback) => setFieldValue('ethnicity', callback(values.ethnicity))}
                      placeholder="Search ethnicity"
                      searchable={false}
                      listMode="SCROLLVIEW"
                      style={[styles.dropdown, { zIndex: values.ethnicityOpen ? 10 : 1 }]}
                      dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                    />

                    <Text style={styles.label}>Military Status</Text>
                    <DropDownPicker
                      open={values.militaryOpen}
                      setOpen={(open) => setFieldValue('militaryOpen', open)}
                      items={values.militaryItems}
                      value={values.military}
                      setValue={(callback) => setFieldValue('military', callback(values.military))}
                      placeholder="Select military status"
                      searchable={false}
                      listMode="SCROLLVIEW"
                      style={[styles.dropdown, { zIndex: values.militaryOpen ? 10 : 1 }]}
                      dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                    />

                    <Text style={styles.label}>Workplace Preference</Text>
                    <DropDownPicker
                      open={values.workplacePreferenceOpen}
                      setOpen={(open) => setFieldValue('workplacePreferenceOpen', open)}
                      items={values.workplacePreferenceItems}
                      value={values.workplacePreference}
                      setValue={(callback) => setFieldValue('workplacePreference', callback(values.workplacePreference))}
                      placeholder="Select workplace preference"
                      searchable={false}
                      listMode="SCROLLVIEW"
                      style={[styles.dropdown, { zIndex: values.workplacePreferenceOpen ? 10 : 1 }]}
                      dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                    />
                    <Text style={styles.label}>Brief</Text>
                    <TextInput
                      style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                      placeholder="Enter brief"
                      multiline
                      maxLength={1024}
                      value={values.brief}
                      onChangeText={handleChange('brief')}
                      onBlur={handleBlur('brief')}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  body: {
    flex: 1,
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default BasicInformationScreen;