import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { EmailInput } from '../../components/common/EmailInput';
import { PasswordInput } from '../../components/common/PasswordInput';
import { ConfirmPasswordInput } from '../../components/common/ConfirmPasswordInput';
import { signupSchema } from '../../validations/signupValidation';
import styles from './styles';

export const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSignUp = async () => {
    try {
			console.log({email, password, confirmPassword})
      // await signupSchema.validate({ email, password, confirmPassword }, { abortEarly: false });
      // Alert.alert(email, password);
      // Proceed further...
    } catch (validationError: any) {
      if (validationError.inner) {
        const formErrors: any = {};
        validationError.inner.forEach((error: any) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      }
    }
  };

  const checkFormValidity = () => {
    try {
      signupSchema.validateSync({ email, password, confirmPassword }, { abortEarly: false });
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = checkFormValidity();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hummingbird
      </Text>
      <Text style={styles.subtitle}>Join Hummingbird Today!</Text>

      <EmailInput value={email} onChange={setEmail} error={errors.email} />
      <PasswordInput value={password} onChange={setPassword} error={errors.password} label="Password" />
      <ConfirmPasswordInput value={confirmPassword} onChange={setConfirmPassword} error={errors.confirmPassword} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormValid ? '#347CD5' : '#ccc' }]}
        onPress={handleSignUp}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink}>Log In</Text>
      </Text>
    </View>
  );
};
