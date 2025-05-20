import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../components/common/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import { PhoneNumberInput } from '../../../../components/common/PhoneInput';

interface ReferenceFormValues {
  fullName: string;
  workedWithFacilityName: string;
  emailAddress: string;
  universityName: string;
  mobileNumber: string;
  isContactAllowed: boolean;
}

const Reference = () => {

  const initialValues: ReferenceFormValues = {
    fullName: '',
    workedWithFacilityName: '',
    emailAddress: '',
    universityName: '',
    mobileNumber: '', 
    isContactAllowed: false,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    workedWithFacilityName: Yup.string().required('Worked with/facility name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    universityName: Yup.string().required('University name is required'),
    mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number'), // Added validation for mobileNumber
  });

  const handleSave = (values: ReferenceFormValues) => {
    console.log('Reference details:', values);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled">
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
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <Input
                label="Full Name"
                required
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={errors.fullName}
                touched={errors.fullName}
                placeholder="Enter full name"
              />

              <Input
                label="Worked with/Facility Name"
                required
                value={values.workedWithFacilityName}
                onChangeText={handleChange('workedWithFacilityName')}
                onBlur={handleBlur('workedWithFacilityName')}
                error={errors.workedWithFacilityName}
                touched={errors.workedWithFacilityName}
                placeholder="Enter worked with/facility name"
              />

              <Input
                label="Email Address"
                required
                value={values.emailAddress}
                onChangeText={handleChange('emailAddress')}
                onBlur={handleBlur('emailAddress')}
                error={errors.emailAddress}
                touched={errors.emailAddress}
                placeholder="Enter email address"
              />

              <Input
                label="University Name"
                required
                value={values.universityName}
                onChangeText={handleChange('universityName')}
                onBlur={handleBlur('universityName')}
                error={errors.universityName}
                touched={errors.universityName}
                placeholder="Enter university name"
              />
               <PhoneNumberInput
                  label="Mobile Number"
                  onChangeText={(value) => setFieldValue('mobileNumber', value)}
                  placeholder="Enter mobile number"
                  maxLength={16}
                  error={errors.mobileNumber}
                  touched={errors.mobileNumber}
                />
              <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={() => setFieldValue('isContactAllowed', !values.isContactAllowed)}>
                  {values.isContactAllowed && <View style={styles.checkboxInner} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Is it ok to contact the reference?</Text>
              </View>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
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
    fontSize: 14,
    marginTop: 4,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  uploadGroup: {
    alignItems: 'center',
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
  },
  uploadBtnText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#0A47E9',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#0A47E9',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
  },
});

export default Reference;
