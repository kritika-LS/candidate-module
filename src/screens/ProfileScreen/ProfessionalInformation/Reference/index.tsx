import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../components/common/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import { PhoneNumberInput } from '../../../../components/common/PhoneInput';
import styles from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { TextStyle } from '../../../../components/common/Text';
import { SaveButton } from '../../../../components/features/SaveButton';
import { Checkbox } from '../../../../components/common/Checkbox';

interface ReferenceFormValues {
  fullName: string;
  workedWithFacilityName: string;
  emailAddress: string;
  universityName: string;
  mobileNumber: string;
  isContactAllowed: boolean;
}

interface ReferenceProps {
  setShowForm?: any;
}

const ReferenceSection:React.FC<ReferenceProps> = ({setShowForm}) => {

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
                  <Checkbox
                    checked={values.isContactAllowed}
                    onChange={() => setFieldValue('isContactAllowed', !values.isContactAllowed)}
                    label="Is it ok to contact the reference?"
                  />
                </View>
              </View>
            )}
          </Formik>
            <View style={styles.saveButton}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
                <TextStyle>Cancel</TextStyle>
              </TouchableOpacity>
              <SaveButton title="Save" onPress={handleSave} />
            </View>
        </View>
  );
};

export default ReferenceSection;
