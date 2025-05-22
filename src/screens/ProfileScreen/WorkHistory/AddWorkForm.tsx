import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { theme } from '../../../theme';
import { Input } from '../../../components/common/Input';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
// import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';
import { TextStyle } from '../../../components/common/Text';
import { ProfileScreenHeader } from '../../../components/features/ProfileScreenHeader';
import { SaveButton } from '../../../components/features/SaveButton';

const AddWorkHistory: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
  });

  const defaultAddress = {
    address: '',
    city: '',
    zipCode: '',
    stateCode: '',
    countryCode: '',
  };

  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    typeofBusiness: '',
    startDate: '',
    endDate: '',
    address: { ...defaultAddress },
    mobileNumber: '',
    notes: '',
    summaryOfWork: '',
    supervisorName: '',
    numberOfFacilityBeds: '',
    numberOfBedsInUnit: '',
    employmentType: '',
    nurseToPatientRatio: '',
    shift: '',
    chargeExperience: '',
    currentlyWorking: false,
    typeofBusinessOpen: false,
    employmentTypeOpen: false,
    shiftOpen: false,
    ChartingsystemOpen: false,
    ChartingsystemItems: [
      { label: 'Epic', value: 'epic' },
      { label: 'Cerner', value: 'cerner' },
      { label: 'Meditech', value: 'meditech' },
    ],
    Chartingsystem: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Worked with/Facility Name is required'),
    middleName: Yup.string().required('Profile title profession is required'),
    lastName: Yup.string().required('Skills worked/specialty is required'),
    typeofBusiness: Yup.string().required('Type of Business/facility is required'),
    startDate: Yup.string().required('Start Date is required'),
    endDate: Yup.string().required('End Date is required'),
    address: Yup.object().shape({
      address: Yup.string().required('Address is required'),
      zipCode: Yup.string().required('Zip Code is required'),
      city: Yup.string().required('City is required'),
      stateCode: Yup.string().required('State is required'),
      countryCode: Yup.string().required('Country is required'),
    }),
    mobileNumber: Yup.string().required('Employer Mobile Number is required'),
    notes: Yup.string().required('Reason for Leaving is required'),
    summaryOfWork: Yup.string().required('Summary of work is required'),
    supervisorName: Yup.string().required('Supervisor Name is required'),
    numberOfFacilityBeds: Yup.string().required('Number of facility beds is required'),
    numberOfBedsInUnit: Yup.string().required('Number of beds in unit is required'),
    employmentType: Yup.string().required('Employment type is required'),
    nurseToPatientRatio: Yup.string().required('Nurse to patient ratio is required'),
    shift: Yup.string().required('Shift is required'),
    chargeExperience: Yup.string().required('Charge experience is required'),
  });

  const handleSave = async (values: typeof initialValues) => {
    console.log('Saving work history details:', values);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Toast.show({
        type: 'success',
        text1: 'Work history saved successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save work history',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <ProfileScreenHeader
              headerTitle='Work History'
              completedStatus={false}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.formSection}>
                  <Input
                    label="Worked with/Facility Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    placeholder="Enter facility name"
                    maxLength={128}
                    error={errors.firstName}
                    touched={touched.firstName}
                  />
                  <Input
                    label="Profile title/Profession"
                    value={values.middleName}
                    onChangeText={handleChange('middleName')}
                    onBlur={handleBlur('middleName')}
                    placeholder="Enter title/profession"
                    maxLength={128}
                    error={errors.middleName}
                    touched={touched.middleName}
                  />
                  <Input
                    label="Skills worked/Specialty"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    placeholder="Enter skills"
                    maxLength={128}
                    error={errors.lastName}
                    touched={touched.lastName}
                  />
                  <Text style={styles.label}>Type of Business/Facility</Text>
                  {/* <DropDownPicker
                    open={values.typeofBusinessOpen} // Open only when someone clicks for options
                    setOpen={(open) => setFieldValue('typeofBusinessOpen', open)}
                    items={[
                      { label: 'Hospital', value: 'hospital' },
                      { label: 'Clinic', value: 'clinic' },
                      { label: 'Other', value: 'other' },
                    ]}
                    value={values.typeofBusiness}
                    setValue={(callback) => setFieldValue('typeofBusiness', callback(values.typeofBusiness))}
                    placeholder="Select type of business"
                    searchable={true}
                    searchPlaceholder="Search type of business/facility"
                    listMode="MODAL"
                    modalProps={{ animationType: 'slide' }}
                    style={styles.dropdown}
                  /> */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker({ ...showDatePicker, startDate: true })}
                    >
                      <Text style={styles.input}>
                        {values.startDate || 'Select start date'}
                      </Text>
                    </TouchableOpacity>
                    {showDatePicker.startDate && (
                      <DateTimePicker
                        value={values.startDate ? new Date(values.startDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowDatePicker({ ...showDatePicker, startDate: false });
                          setFieldValue('startDate', selectedDate);
                        }}
                      />
                    )}
                    {touched.startDate && errors.startDate && (
                      <Text style={styles.error}>{errors.startDate}</Text>
                    )}
                  </View>

                  <View style={styles.checkboxContainer}>  {/* Added checkbox for "I am currently working here" */}
                    <TouchableOpacity
                      style={styles.squareCheckbox}
                      onPress={() => setFieldValue('currentlyWorking', !values.currentlyWorking)}
                    >
                      {values.currentlyWorking && <View style={styles.checkboxSelected} />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>I am currently working here</Text>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>End Date</Text>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker({ ...showDatePicker, endDate: true })}
                      disabled={values.currentlyWorking} // Disable End Date if currently working
                    >
                      <Text style={styles.input}>
                        {values.endDate || 'Select end date'}
                      </Text>
                    </TouchableOpacity>
                    {showDatePicker.endDate && (
                      <DateTimePicker
                        value={values.endDate ? new Date(values.endDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowDatePicker({ ...showDatePicker, endDate: false });
                          setFieldValue('endDate', selectedDate);
                        }}
                      />
                    )}
                    {touched.endDate && errors.endDate && (
                      <Text style={styles.error}>{errors.endDate}</Text>
                    )}
                  </View>
                  <Input
                    label="Address"
                    value={values.address.address}
                    onChangeText={handleChange('address.address')}
                    onBlur={handleBlur('address.address')}
                    placeholder="Enter address"
                    maxLength={80}
                    error={errors.address?.address}
                    touched={touched.address?.address}
                  />
                  <Input
                    label="Zip Code"
                    value={values.address.zipCode}
                    onChangeText={handleChange('address.zipCode')}
                    onBlur={handleBlur('address.zipCode')}
                    placeholder="Enter zip code"
                    keyboardType="numeric"
                    error={errors.address?.zipCode}
                    touched={touched.address?.zipCode}
                  />
                  <Input
                    label="City"
                    value={values.address.city}
                    onChangeText={handleChange('address.city')}
                    onBlur={handleBlur('address.city')}
                    placeholder="Enter city"
                    error={errors.address?.city}
                    touched={touched.address?.city}
                  />
                  <Input
                    label="State"
                    value={values.address.stateCode}
                    onChangeText={handleChange('address.stateCode')}
                    onBlur={handleBlur('address.stateCode')}
                    placeholder="Enter state"
                    error={errors.address?.stateCode}
                    touched={touched.address?.stateCode}
                  />
                  <Input
                    label="Country"
                    value={values.address.countryCode}
                    onChangeText={handleChange('address.countryCode')}
                    onBlur={handleBlur('address.countryCode')}
                    placeholder="Enter country"
                    error={errors.address?.countryCode}
                    touched={touched.address?.countryCode}
                  />
                  <PhoneNumberInput
                    label="Employer Mobile Number"
                    onChangeText={(value: string) => setFieldValue('mobileNumber', value)}
                    placeholder="Enter mobile number"
                    maxLength={16}
                    error={errors.mobileNumber}
                    touched={touched.mobileNumber}
                  />
                  <Input
                    label="Supervisor Name"
                    value={values.supervisorName}
                    onChangeText={handleChange('supervisorName')}
                    onBlur={handleBlur('supervisorName')}
                    placeholder="Enter supervisor name"
                    maxLength={128}
                    error={errors.supervisorName}
                    touched={touched.supervisorName}
                  />
                  <Text style={styles.label}>Reason for Leaving</Text>
                  <TextInput
                    style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Enter reason for leaving"
                    multiline
                    maxLength={1024}
                    value={values.notes}
                    onChangeText={handleChange('notes')}
                  />
                  {touched.notes && errors.notes && (
                    <Text style={styles.error}>{errors.notes}</Text>
                  )}
                  <Text style={styles.label}>Summary of work</Text>
                  <TextInput
                    style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Enter summary of work"
                    multiline
                    maxLength={1024}
                    value={values.summaryOfWork}
                    onChangeText={handleChange('summaryOfWork')}
                  />
                  {touched.summaryOfWork && errors.summaryOfWork && (
                    <Text style={styles.error}>{errors.summaryOfWork}</Text>
                  )}
                </View>
                <View style={styles.formSection}>
                  <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
                    Work detail
                  </TextStyle>
                <Input
                    label="Number of facility beds"
                    value={values.numberOfFacilityBeds}
                    onChangeText={handleChange('numberOfFacilityBeds')}
                    onBlur={handleBlur('numberOfFacilityBeds')}
                    placeholder="Enter number of facility beds"
                    maxLength={128}
                    error={errors.numberOfFacilityBeds}
                    touched={touched.numberOfFacilityBeds}
                  />
                  <Input
                    label="Number of beds in unit"
                    value={values.numberOfBedsInUnit}
                    onChangeText={handleChange('numberOfBedsInUnit')}
                    onBlur={handleBlur('numberOfBedsInUnit')}
                    placeholder="Enter number of beds in unit"
                    maxLength={128}
                    error={errors.numberOfBedsInUnit}
                    touched={touched.numberOfBedsInUnit}
                  />
                  <Text style={styles.label}>Employment type</Text>
                  {/* <DropDownPicker
                    open={values.employmentTypeOpen} // Open only when someone clicks for options
                    setOpen={(open) => setFieldValue('employmentTypeOpen', open)}
                    items={[
                      { label: 'Full-time', value: 'full-time' },
                      { label: 'Part-time', value: 'part-time' },
                      { label: 'Contract', value: 'contract' },
                    ]}
                    value={values.employmentType}
                    setValue={(callback) => setFieldValue('employmentType', callback(values.employmentType))}
                    placeholder="Select employment type"
                    searchable={true}
                    searchPlaceholder="Search employment type"
                    listMode="MODAL"
                    modalProps={{ animationType: 'slide' }}
                    style={styles.dropdown}
                  /> */}
                  <Input
                    label="Nurse to patient ratio"
                    value={values.nurseToPatientRatio}
                    onChangeText={handleChange('nurseToPatientRatio')}
                    onBlur={handleBlur('nurseToPatientRatio')}
                    placeholder="Enter nurse to patient ratio"
                    maxLength={128}
                    error={errors.nurseToPatientRatio}
                    touched={touched.nurseToPatientRatio}
                  />
                  <Text style={styles.label}>Charting system</Text>
                      {/* <DropDownPicker
                          open={values.ChartingsystemOpen}
                          setOpen={(open) => setFieldValue('ChartingsystemOpen', open)}
                          items={values.ChartingsystemItems}
                          value={values.Chartingsystem}
                          setValue={(callback) => setFieldValue('Chartingsystem', callback(values.Chartingsystem))}
                          placeholder="Select charting system"
                          searchable={true}
                          searchPlaceholder="Search charting system"
                          listMode="MODAL"
                          modalProps={{ animationType: 'slide' }}
                          onChangeSearchText={(text) => {
                              if (!values.ChartingsystemItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                                  Alert.alert('Info', 'Please choose from the list');
                              }
                          }}
                          style={styles.dropdown}
                      /> */}
                  <Text style={styles.label}>Shift</Text>
                  {/* <DropDownPicker
                    open={values.shiftOpen} // Open only when someone clicks for options
                    setOpen={(open) => setFieldValue('shiftOpen', open)}
                    items={[
                      { label: 'Day', value: 'day' },
                      { label: 'Night', value: 'night' },
                      { label: 'Rotational', value: 'rotational' },
                    ]}
                    value={values.shift}
                    setValue={(callback) => setFieldValue('shift', callback(values.shift))}
                    placeholder="Select shift"
                    searchable={true}
                    searchPlaceholder="Search shift"
                    listMode="MODAL"
                    modalProps={{ animationType: 'slide' }}
                    style={styles.dropdown}
                  /> */}
                  <View style={styles.chargeExperienceContainer}>
                    <Text style={styles.label}>Charge Experience</Text>
                    <View style={styles.checkboxGroup}>
                      <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setFieldValue('chargeExperience', 'yes')}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            values.chargeExperience === 'yes' && styles.checkboxSelected,
                          ]}
                        />
                        <Text style={styles.checkboxLabel}>Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setFieldValue('chargeExperience', 'no')}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            values.chargeExperience === 'no' && styles.checkboxSelected,
                          ]}
                        />
                        <Text style={styles.checkboxLabel}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton
          title="Save"
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddWorkHistory;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  body: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  formSection: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  inputArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
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
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  chargeExperienceContainer: {
    marginTop: 16,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#0A47E9',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  squareCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingBottom: 16
  },
});