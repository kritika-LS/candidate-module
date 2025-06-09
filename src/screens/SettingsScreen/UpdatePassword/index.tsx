import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PasswordInput } from '../../../components/common/PasswordInput';
import { theme } from '../../../theme';
import { SaveButton } from '../../../components/features/SaveButton';
import { TextStyle } from '../../../components/common/Text';
import { updatePassword } from 'aws-amplify/auth';
import { useAuth } from '../../../context/AuthContext';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords do not match. Please enter the same password')
    .required('Confirm password is required'),
});

export const UpdatePassword = () => {

  const {logout} = useAuth();

  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePasswordSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setServerError('');
    setLoading(true);
    try {
      await updatePassword({
        oldPassword: values?.currentPassword,
        newPassword: values?.newPassword,
      });
      Toast.show({
        type: 'success',
        text1: 'Password updated successfully.'
      });
      await logout();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Failed to update password.'
      })
      console.error('Password update error:', error);
      setServerError(error.message || 'An error occurred while updating the password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleUpdatePasswordSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.container}>
          <TextStyle style={styles.heading}>Update Password</TextStyle>
          <PasswordInput
            label="Current Password"
            value={values.currentPassword}
            onChange={handleChange('currentPassword')}
            error={touched.currentPassword && errors.currentPassword ? errors.currentPassword : ''}
            placeholder="Enter current password"
          />
          <PasswordInput
            label="New Password"
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            error={touched.newPassword && errors.newPassword ? errors.newPassword : ''}
            placeholder="Enter new password"
          />
          <PasswordInput
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
            placeholder="Confirm new password"
          />
          <SaveButton
            onPress={handleSubmit as any}
            disabled={!isValid}
            title="Update Password"
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: theme.colors.text.primary,
  },
  button: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.grey[300],
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
