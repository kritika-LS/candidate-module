import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header } from './Header';
import { ProfileScreenHeader } from '../../../components/features/ProfileScreenHeader';
import { genderOptions } from '../../../constants/gender';
import { countryList } from '../../../constants/country';
import { ethnicityOptions } from '../../../constants/ethnicity';
import { militaryStatusOptions } from '../../../constants/militaryStatus';
import { workTypePreference } from '../../../constants/workTypePreference';

const BasicInformationScreen: React.FC<{
  initialValues: any;
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
}> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [selectGenderOpen, setSelectGenderOpen] = useState(false);
  const [selectNationalityOpen, setSelectNationalityOpen] = useState(false);
  const [selectEthnicityOpen, setSelectEthnicityOpen] = useState(false);
  const [selectMilitaryOpen, setSelectMilitaryOpen] = useState(false);
  const [selectWorkplacePreferenceOpen, setSelectWorkplacePreferenceOpen] = useState(false);

  const validateField = (fieldName: string, value: any) => {
    let error = '';
    switch (fieldName) {
      case 'firstName':
        if (!value) error = 'First Name is required';
        break;
      case 'lastName':
        if (!value) error = 'Last Name is required';
        break;
      case 'profileTitle':
        if (!value) error = 'Profile Title is required';
        break;
      case 'overallExperience':
        if (!value) error = 'Overall Experience is required';
        break;
      case 'emailAddress':
        if (!value) error = 'Email Address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
        break;
      case 'mobileNumber':
        if (!value) error = 'Mobile Number is required';
        else if (!/^\d{4,}$/.test(value)) error = 'Mobile Number must be at least 4 digits';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (fieldName: string, value: any) => {
    const updatedValues = { ...initialValues, [fieldName]: value };
    updateValues(updatedValues);
    if (touched?.[fieldName]) {
      const error = validateField(fieldName, value);
      updateErrors({ [fieldName]: error });
    }
  };

  const handleBlur = (fieldName: string) => {
    updateTouched({ [fieldName]: true });
    const error = validateField(fieldName, initialValues?.[fieldName]);
    updateErrors({ [fieldName]: error });
  };

  useEffect(() => {
    const allFieldsCompleted = Object.keys(initialValues).every(
      (key) => initialValues?.[key] && !errors?.[key]
    );
    setIsCompleted(allFieldsCompleted);
  }
  , [initialValues]);
  
  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon="account-circle-outline"
        headerTitle="Basic Information"
        completedStatus={isCompleted}
      />
      <Header />
      <View style={styles.container}>
        <Input
          label="First Name"
          required
          value={initialValues.firstName}
          onChangeText={(value) => handleChange('firstName', value)}
          onBlur={() => handleBlur('firstName')}
          error={errors?.firstName}
          touched={touched?.firstName}
        />
        <Input
          label="Middle Name"
          placeholder="Enter middle name"
          value={initialValues.middleName}
          onChangeText={(value) => handleChange('middleName', value)}
          onBlur={() => handleBlur('middleName')}
          error={errors?.middleName}
          touched={touched?.middleName}
        />
        <Input
          label="Last Name"
          required
          value={initialValues.lastName}
          onChangeText={(value) => handleChange('lastName', value)}
          onBlur={() => handleBlur('lastName')}
          error={errors?.lastName}
          touched={touched?.lastName}
        />
        <Input
          label="Profile Title"
          required
          value={initialValues.profileTitle}
          onChangeText={(value) => handleChange('profileTitle', value)}
          onBlur={() => handleBlur('profileTitle')}
          error={errors?.profileTitle}
          touched={touched?.profileTitle}
        />
        <Input
          label="Overall Experience"
          required
          value={initialValues.overallExperience}
          onChangeText={(value) => handleChange('overallExperience', value)}
          onBlur={() => handleBlur('overallExperience')}
          error={errors?.overallExperience}
          touched={touched?.overallExperience}
        />
        <Input
          label="Email Address"
          required
          value={initialValues.emailAddress}
          onChangeText={(value) => handleChange('emailAddress', value)}
          onBlur={() => handleBlur('emailAddress')}
          error={errors?.emailAddress}
          touched={touched?.emailAddress}
        />
        <Input
          label="Alternate Email Address"
          placeholder="Enter alternate email address"
          value={initialValues.alternateEmailAddress}
          onChangeText={(value) => handleChange('alternateEmailAddress', value)}
          onBlur={() => handleBlur('alternateEmailAddress')}
          error={errors?.alternateEmailAddress}
          touched={touched?.alternateEmailAddress}
        />
        <PhoneNumberInput
          label="Mobile Number"
          required
          value={initialValues.mobileNumber}
          defaultCode={initialValues.countryCode?.replace('+', '') || 'US'}
          onChangeText={(value) => handleChange('mobileNumber', value)}
          onChangeCountry={(country) =>
            handleChange('countryCode', `+${country?.callingCode[0]}`)
          }
          error={errors?.mobileNumber}
          touched={touched?.mobileNumber}
        />
        <PhoneNumberInput
          label="Alternate Mobile Number"
          defaultCode={initialValues.countryCode?.replace('+', '') || 'US'}
          value={initialValues.alternateMobileNumber}
          onChangeText={(value) => handleChange('alternateMobileNumber', value)}
        />
        <Input
          label="Known as"
          placeholder="Enter known as"
          value={initialValues.knownAs}
          onChangeText={(value) => handleChange('knownAs', value)}
          onBlur={() => handleBlur('knownAs')}
          error={errors?.knownAs}
          touched={touched?.knownAs}
        />
        <Input
          label="Other Previously Used Name"
          placeholder="Enter other previously used name"
          value={initialValues.otherName}
          onChangeText={(value) => handleChange('otherName', value)}
          onBlur={() => handleBlur('otherName')}
          error={errors?.otherName}
          touched={touched?.otherName}
        />

        <Text style={styles.label}>Gender</Text>
        <DropDownPicker
          open={selectGenderOpen}
          setOpen={(open) => setSelectGenderOpen(open)}
          items={genderOptions}
          value={initialValues.gender?.toLowerCase()}
          setValue={(callback) => handleChange('gender', callback(initialValues.gender))}
          placeholder="Search gender"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: initialValues.genderOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <Text style={styles.label}>Nationality</Text>
        <DropDownPicker
          open={selectNationalityOpen}
          setOpen={(open) => setSelectNationalityOpen(open)}
          items={countryList}
          value={initialValues?.nationality}
          setValue={(callback) => handleChange('nationality', callback(initialValues.nationality))}
          placeholder="Search nationality"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: initialValues?.nationalityOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <Text style={styles.label}>Ethnicity</Text>
        <DropDownPicker
          open={selectEthnicityOpen}
          setOpen={(open) => setSelectEthnicityOpen(open)}
          items={ethnicityOptions}
          value={initialValues.ethnicity?.toLowerCase()}
          setValue={(callback) => handleChange('ethnicity', callback(initialValues.ethnicity))}
          placeholder="Search ethnicity"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: initialValues?.ethnicityOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <Text style={styles.label}>Military Status</Text>
        <DropDownPicker
          open={selectMilitaryOpen}
          setOpen={(open) => setSelectMilitaryOpen(open)}
          items={militaryStatusOptions}
          value={initialValues.military?.toLowerCase()}
          setValue={(callback) => handleChange('military', callback(initialValues.military))}
          placeholder="Select military status"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: initialValues?.militaryOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <Text style={styles.label}>Workplace Preference</Text>
        <DropDownPicker
          open={selectWorkplacePreferenceOpen}
          setOpen={(open) => setSelectWorkplacePreferenceOpen(open)}
          items={workTypePreference}
          value={initialValues.workplacePreference?.replace(/^,/, '')}
          setValue={(callback) => handleChange('workplacePreference', callback(initialValues.workplacePreference))}
          placeholder="Select workplace preference"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: initialValues?.workplacePreferenceOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />
        <Text style={styles.label}>Brief</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter brief"
          multiline
          maxLength={1024}
          value={initialValues.brief}
          onChangeText={(value) => handleChange('brief', value)}
          onBlur={() => handleBlur('brief')}
        />
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
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