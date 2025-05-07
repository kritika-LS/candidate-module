import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Image, SafeAreaView, ScrollView } from 'react-native';
import { EmailInput } from '../../../components/common/EmailInput';
import { PasswordInput } from '../../../components/common/PasswordInput';
import { ConfirmPasswordInput } from '../../../components/common/ConfirmPasswordInput';
import { signupSchema } from '../../../validations/signupValidation';
import styles from './styles';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../../components/common/Text';
import { CopyrightFooter } from '../../../components/common/CopyrightFooter';
import { ScreenNames } from '../../../utils/ScreenConstants';
import { SignInHeader } from '../../../components/features/SignInHeader';
import { SocialButtons } from '../../../components/features/SocialButtons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';
import { signUp } from 'aws-amplify/auth';

export const SignUpScreen = () => {

	const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSignUp = async () => {
	console.log("Sign up button pressed:", { email, password, confirmPassword });
  
	try {
		const { nextStep: signUpNextStep } = await signUp({
			username: email,
			password: password, 
			options: {
			userAttributes: {
				email: email,
			},
			},
		});
  
	  console.log("Sign up successful!", signUpNextStep);
  
	  navigation.navigate(ScreenNames.EmailVerificationScreen, {
		email: email,
		password: password
	  });
	} catch (error) {
	  console.log("Sign up error caught:", error);
	  Alert.alert("Sign Up Failed", error?.message || "Unknown error");
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
		<ScrollView contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>

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
				disabled={!isFormValid}
			>
				<TextStyle variant='bold' size='md' style={styles.buttonText}>Get Started</TextStyle>
			</TouchableOpacity>

			<Text style={styles.loginText}>
				Already have an account? <Text style={styles.loginLink}  onPress={handleLoginPressed}>Log In</Text>
			</Text>

			<View style={styles.orSection}>
				<View style={styles.semiDivider} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.semiDivider} />
			</View>

			<SocialButtons />

			<View style={styles.footer}>
				<CopyrightFooter />
			</View>
		</ScrollView>
    </SafeAreaView>
  );
};
