import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Image, SafeAreaView, ScrollView } from 'react-native';
import { EmailInput } from '../../../components/common/EmailInput';
import { PasswordInput } from '../../../components/common/PasswordInput';
import { ConfirmPasswordInput } from '../../../components/common/ConfirmPasswordInput';
import { signupSchema } from '../../../validations/signupValidation';
import styles from './styles';
import { signUp } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../../components/common/Text';
import { CopyrightFooter } from '../../../components/common/CopyrightFooter';
import { ScreenNames } from '../../../utils/ScreenConstants';
import { SignInHeader } from '../../../components/features/SignInHeader';
import { SocialButtons } from '../../../components/features/SocialButtons';

export const SignUpScreen = () => {

	const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSignUp = async () => {
    try {
			return navigation.navigate(ScreenNames.UploadResumeScreen);
			console.log({email, password, confirmPassword});
      const result = await signUp({
        username: email,
        password: password, 
        options: {
          userAttributes: {
            email: email,
          },
        },
      });
  
      console.log('Sign up successful!', result);
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

	const handleLoginPressed = () => {
		navigation.navigate(ScreenNames.LoginScreen);
	}

  const isFormValid = checkFormValidity();

  return (
    <SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>

				<SignInHeader
					title='Join Hummingbird Today!'
					subText='Connect with top healthcare employers, verify credentials, and advance your career.'
				/>

				<EmailInput value={email} onChange={setEmail} error={errors.email} />
				<PasswordInput
					value={password}
					onChange={setPassword}
					error={errors.password}
					label="Password"
					placeholder="Enter password"
				/>
				<ConfirmPasswordInput
					value={confirmPassword}
					onChange={setConfirmPassword}
					error={errors.confirmPassword}
					placeholder="Enter password"
				/>

				<Text style={styles.termsText}>
					By signing up, you agree to our <Text style={styles.linkText} onPress={() => Linking.openURL('https://dev-onboarding.thehummingbird.solutions/terms-and-conditions/?tab=terms-and-conditions')}>Terms & Policies</Text>.
				</Text>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: isFormValid ? '#347CD5' : '#ccc' }]}
					onPress={handleSignUp}
					// disabled={!isFormValid}
				>
					<TextStyle variant='bold' size='md' style={styles.buttonText}>Get Started</TextStyle>
				</TouchableOpacity>

				{/* <TouchableOpacity onPress={() => {console.log('Login Pressed!!!!')}}> */}
					<Text style={styles.loginText}>
						Already have an account? <Text style={styles.loginLink}  onPress={handleLoginPressed}>Log In</Text>
					</Text>
				{/* </TouchableOpacity> */}

				<View style={styles.orSection}>
					<View style={styles.semiDivider} />
					<Text style={styles.orText}>OR</Text>
					<View style={styles.semiDivider} />
				</View>

				<SocialButtons />
				
				<CopyrightFooter />
			</ScrollView>
    </SafeAreaView>
  );
};
