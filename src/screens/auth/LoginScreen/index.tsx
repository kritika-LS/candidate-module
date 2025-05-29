import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { EmailInput } from '../../../components/common/EmailInput';
import { PasswordInput } from '../../../components/common/PasswordInput';
import { ConfirmPasswordInput } from '../../../components/common/ConfirmPasswordInput';
import { signupSchema } from '../../../validations/signupValidation';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../../components/common/Text';
import { CopyrightFooter } from '../../../components/common/CopyrightFooter';
import { ScreenNames } from '../../../utils/ScreenConstants';
import { SignInHeader } from '../../../components/features/SignInHeader';
import { TermsPolicies } from '../../../components/common/TermsPolicies';
import { SocialButtons } from '../../../components/features/SocialButtons';
import { Checkbox } from '../../../components/common/Checkbox';
import { theme } from '../../../theme';
import { LoginExtras } from '../../../components/features/LoginExtras';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';
import { loginSchema } from '../../../validations/loginValidation';
import { useAuth } from '../../../context/AuthContext';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { getAuthDetails } from '../../../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchCandidate } from '../../../store/thunk/candidate.thunk';

export const LoginScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [rememberAccount, setRememberAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRememberedCredentials = async () => {
      try {
        const remember = await AsyncStorage.getItem('@auth:rememberAccount');
        if (remember === 'true') {
          const encryptedEmail = await AsyncStorage.getItem('@auth:email');
          const encryptedPassword = await AsyncStorage.getItem('@auth:password');

          if (encryptedEmail && encryptedPassword) {
            const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, 'your-secret-key').toString(CryptoJS.enc.Utf8);
            const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'your-secret-key').toString(CryptoJS.enc.Utf8);
            setEmail(decryptedEmail);
            setPassword(decryptedPassword);
            setRememberAccount(true);
          }
        }
      } catch (error) {
        console.error("Failed to load remembered credentials:", error);
      }
    };

    loadRememberedCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password, rememberAccount);
      setLoading(false);
      if (!response?.userRegistered) navigation.navigate(ScreenNames.UploadResumeScreen);
    } catch (error: any) {
      console.log({ errorerror: error })
      setLoading(false)
      if (error.name === 'UserNotFoundException') {
        Toast.show({
          type: 'error',
          text1: 'This email address is not registered with us. Try signing up'
        })
        setErrors({ ...errors, email: 'User not found. Please sign up.' });
      } else if (error.name === 'NotAuthorizedException') {
        Toast.show({
          type: 'error',
          text1: 'Please enter a valid password'
        })
        setErrors({ ...errors, password: 'Incorrect username or password.' });
      } else {
        Toast.show({
          type: 'error',
          text1: error.message
        })
        setErrors({ ...errors, password: error.message || 'Login failed' });
      }
    }
  };


  const checkFormValidity = () => {
    try {
      loginSchema.validateSync({ email, password }, { abortEarly: false });
      return true;
    } catch {
      return false;
    }
  };

  const emailValidity = (email: string) => {
    (loginSchema.fields.email as yup.StringSchema)
      .validate(email)
      .then(() => {
        setErrors(prev => ({ ...prev, email: '' }));
      })
      .catch((err: yup.ValidationError) => {
        setErrors(prev => ({ ...prev, email: err.message }));
      });

    setEmail(email);
  };

  const passwordValidity = (password: string) => {
    (loginSchema.fields.password as yup.StringSchema)
      .validate(password)
      .then(() => {
        setErrors(prev => ({ ...prev, password: '' }));
      })
      .catch((err: yup.ValidationError) => {
        setErrors(prev => ({ ...prev, password: err.message }));
      });

    setPassword(password);
  };

  const isFormValid = checkFormValidity();

  const handleSignUpPressed = () => {
    navigation.navigate(ScreenNames.SignUpScreen);
  }

  const handleForgotPasswordPress = () => {
    navigation.navigate(ScreenNames.ForgetPasswordScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <SignInHeader
          title='Welcome Back!'
          subText='Connect with top healthcare employers, verify credentials, and advance your career.'
        />

        <EmailInput value={email} onChange={emailValidity} error={errors.email} />
        <PasswordInput
          value={password}
          onChange={passwordValidity}
          error={errors.password}
          label="Password"
          placeholder="Enter password"
        />
        <LoginExtras
          check={rememberAccount}
          setCheck={setRememberAccount}
          onForgotPasswordPress={handleForgotPasswordPress}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isFormValid ? '#347CD5' : '#ccc' }]}
          onPress={handleLogin}
        // disabled={!isFormValid}
        >
          {loading ?
            <ActivityIndicator color={'#fff'} /> :
            <TextStyle variant='bold' size={'md'} style={styles.buttonText}>Log In</TextStyle>
          }
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Don't have an account? <Text style={styles.loginLink} onPress={handleSignUpPressed}>Sign Up</Text>
        </Text>

        <View style={styles.orSection}>
          <View style={styles.semiDivider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.semiDivider} />
        </View>

        <SocialButtons />

        <View style={styles.footer}>
          <TermsPolicies />
          <CopyrightFooter />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};