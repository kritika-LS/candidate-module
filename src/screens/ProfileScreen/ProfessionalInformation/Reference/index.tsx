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
import styles from './styles';
import { SaveButton } from '../../../../components/features/SaveButton';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

interface ReferenceFormValues {
  fullName: string;
  workedWithFacilityName: string;
  emailAddress: string;
  universityName: string;
  mobileNumber: string;
  isContactAllowed: boolean;
}

const ReferenceSection = () => {

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
        <View style={styles.body}>
          <ProfileScreenHeader
            headerIcon='account-arrow-right-outline'
            headerTitle='Reference'
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
              </View>
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

export default ReferenceSection;
