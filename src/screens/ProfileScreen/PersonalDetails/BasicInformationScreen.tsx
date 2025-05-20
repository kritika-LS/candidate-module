import React from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../../theme';
import { Button } from '../../../components/common/Button';
import { DEFAULT_VALUES } from '../../../config/constants';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../../../hooks/useAppDispatch';
import { Header } from './Header';

const BasicInformationScreen: React.FC = () => {

  const candidatePersonalDetails = useAppSelector((state) => state.candidatePersonalDetails.personalDetails.responsePayload);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        middleName: Yup.string().required('Middle Name is required'),
        profileTitle: Yup.string().required('Profile Title is required'),
        overallExperience: Yup.string().required('Overall Experience is required'),
        emailAddress: Yup.string().email('Invalid email').required('Email Address is required'),
        mobileNumber: Yup.string()
            .matches(/^\d{4,}$/, 'Mobile Number must be at least 4 digits')
            .required('Mobile Number is required'),
    });

    const initialValues={
        firstName: candidatePersonalDetails?.firstName || '',
        lastName: candidatePersonalDetails?.lastName || '',
        middleName: candidatePersonalDetails?.middleName || '',
        profileTitle: candidatePersonalDetails?.profileTitle || '',
        overallExperience: candidatePersonalDetails?.overallYearsOfExperience || '',
        emailAddress: candidatePersonalDetails?.emailAddress || '', 
        alternateEmailAddress: candidatePersonalDetails?.alternateEmailAddress || '',
        knownAs: candidatePersonalDetails?.knownAs || '',
        brief: candidatePersonalDetails?.brief || '',
        mobileNumber: candidatePersonalDetails?.mobileNumber || '',
        alternateMobileNumber: candidatePersonalDetails?.alternatePhoneNumber || '',
        otherName: '',
        genderOpen: false,
        genderItems: DEFAULT_VALUES.genderItems,
        gender: candidatePersonalDetails?.gender || null,
        nationalityOpen: false,
        nationalityItems: DEFAULT_VALUES.nationalityItems,
        nationality: candidatePersonalDetails?.nationality || null,
        ethnicityOpen: false,
        ethnicityItems: DEFAULT_VALUES.ethnicityItems,
        ethnicity: candidatePersonalDetails?.ethnicity || null,
        militaryOpen: false,
        militaryItems: DEFAULT_VALUES.militaryItems,
        military: candidatePersonalDetails?.militaryStatus || null,
        workplacePreferenceOpen: false,
        workplacePreferenceItems: DEFAULT_VALUES.workplacePreferenceItems,
        workplacePreference: candidatePersonalDetails?.workplacePreference || null,
    };

    const handleSave = async (values: typeof initialValues) => {
        console.log('Saving basic details:', values);
        try {
          // Simulate API call (replace with your actual save logic)
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
          console.log('Saved values:', values);
          Toast.show({
            type: 'success',
            text1: 'details saved successfully',
          });
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Failed to save details information',
          });
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
        <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.select({ ios: 'padding', android: undefined })}
            >
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSave}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => {
                console.log("errors", errors);
                return (
                <>
                <View style={styles.container}>
                    <Input
                        label="First Name"
                        required
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        error={errors.firstName}
                        touched={touched.firstName}
                    />
                    <Input
                        label="Middle Name"
                        required
                        placeholder="Enter middle name"
                        value={values.middleName}
                        onChangeText={handleChange('middleName')}
                        onBlur={handleBlur('middleName')}
                        error={errors.middleName}
                        touched={touched.middleName}
                    />
                    <Input
                        label="Profile Title"
                        required
                        value={values.profileTitle}
                        onChangeText={handleChange('profileTitle')}
                        onBlur={handleBlur('profileTitle')}
                        error={errors.profileTitle}
                        touched={touched.profileTitle}
                    />
                    <Input
                        label="Overall Experience"
                        required
                        value={values.overallExperience}
                        onChangeText={handleChange('overallExperience')}
                        onBlur={handleBlur('overallExperience')}
                        error={errors.overallExperience}
                        touched={touched.overallExperience}
                    />
                    <Input
                        label="Email Address"
                        required
                        value={values.emailAddress}
                        onChangeText={handleChange('emailAddress')}
                        onBlur={handleBlur('emailAddress')}
                        error={errors.emailAddress}
                        touched={touched.emailAddress}
                    />
                    <Input
                        label="Alternate Email Address"
                        placeholder="Enter alternate email address"
                        value={values.alternateEmailAddress}
                        onChangeText={handleChange('alternateEmailAddress')}
                        onBlur={handleBlur('alternateEmailAddress')}
                        error={errors.alternateEmailAddress}
                    />
                    <PhoneNumberInput
                        label="Mobile Number"
                        required
                        vallue={values.mobileNumber}
                        onChangeText={(value) => setFieldValue('mobileNumber', value)}
                        error={errors.mobileNumber}
                        touched={touched.mobileNumber}
                    />
                    <PhoneNumberInput
                        label="Alternate Mobile Number"
                        onChangeText={(value) => setFieldValue('alternateMobileNumber', value)}
                    />
                    <Input
                        label="Known as"
                        placeholder="Enter known as"
                        value={values.knownAs}
                        onChangeText={handleChange('knownAs')}
                        onBlur={handleBlur('knownAs')}
                        error={errors.knownAs}
                    />
                    <Input
                        label="Other Previously Used Name"
                        placeholder="Enter other previously used name"
                        value={values.otherName}
                        onChangeText={handleChange('otherName')}
                        onBlur={handleBlur('otherName')}
                        error={errors.otherName}
                    />

                    <Text style={styles.label}>Gender</Text>
                    <DropDownPicker
                        open={values.genderOpen}
                        setOpen={(open) => setFieldValue('genderOpen', open)}
                        items={values.genderItems}
                        value={values.gender}
                        setValue={(callback) => setFieldValue('gender', callback(values.gender))}
                        placeholder="Search gender"
                        searchable={true}
                        searchPlaceholder="Search..."
                        listMode="MODAL"
                        modalProps={{ animationType: 'slide' }}
                        onChangeSearchText={(text) => {
                            if (!values.genderItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                                Alert.alert('Info', 'Please choose from the list');
                            }
                        }}
                        style={styles.dropdown}
                    />

                    <Text style={styles.label}>Nationality</Text>
                    <DropDownPicker
                        open={values.nationalityOpen}
                        setOpen={(open) => setFieldValue('nationalityOpen', open)}
                        items={values.nationalityItems}
                        value={values.nationality}
                        setValue={(callback) => setFieldValue('nationality', callback(values.nationality))}
                        placeholder="Search nationality"
                        searchable={true}
                        searchPlaceholder="Search..."
                        listMode="MODAL"
                        modalProps={{ animationType: 'slide' }}
                        onChangeSearchText={(text) => {
                            if (!values.nationalityItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                                Alert.alert('Info', 'Please choose from the list');
                            }
                        }}
                        style={styles.dropdown}
                    />

                    <Text style={styles.label}>Ethnicity</Text>
                    <DropDownPicker
                        open={values.ethnicityOpen}
                        setOpen={(open) => setFieldValue('ethnicityOpen', open)}
                        items={values.ethnicityItems}
                        value={values.ethnicity}
                        setValue={(callback) => setFieldValue('ethnicity', callback(values.ethnicity))}
                        placeholder="Search ethnicity"
                        searchable={true}
                        searchPlaceholder="Search..."
                        listMode="MODAL"
                        modalProps={{ animationType: 'slide' }}
                        onChangeSearchText={(text) => {
                            if (!values.ethnicityItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                                Alert.alert('Info', 'Please choose from the list');
                            }
                        }}
                        style={styles.dropdown}
                    />

                    <Text style={styles.label}>Military Status</Text>
                    <DropDownPicker
                        open={values.militaryOpen}
                        setOpen={(open) => setFieldValue('militaryOpen', open)}
                        items={values.militaryItems}
                        value={values.military}
                        setValue={(callback) => setFieldValue('military', callback(values.military))}
                        placeholder="Select military status"
                        searchable={true}
                        searchPlaceholder="Search..."
                        listMode="MODAL"
                        modalProps={{ animationType: 'slide' }}
                        onChangeSearchText={(text) => {
                            if (!values.militaryItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                                Alert.alert('Info', 'Please choose from the list');
                            }
                        }}
                        style={styles.dropdown}
                    />

                    <Text style={styles.label}>Workplace Preference</Text>
                    <DropDownPicker
                        open={values.workplacePreferenceOpen}
                        setOpen={(open) => setFieldValue('workplacePreferenceOpen', open)}
                        items={values.workplacePreferenceItems}
                        value={values.workplacePreference}
                        setValue={(callback) => setFieldValue('workplacePreference', callback(values.workplacePreference))}
                        placeholder="Select workplace preference"
                        searchable={true}
                        searchPlaceholder="Search..."
                        listMode="MODAL"
                        modalProps={{ animationType: 'slide' }}
                        onChangeSearchText={(text) => {
                            if (!values.workplacePreferenceItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                                Alert.alert('Info', 'Please choose from the list');
                            }
                        }}
                        style={styles.dropdown}
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
                <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit as any}>
                    <Text style={styles.saveBtnText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
                </TouchableOpacity>
                </>
            )}}
        </Formik>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    label: {
        marginTop: 16,
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
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
      saveButton: {
        marginLeft: theme.spacing.md,
      },
      saveBtn: {
        marginTop: 24,
        backgroundColor: '#0A47E9',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
      },
      saveBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
      },
});

export default BasicInformationScreen;