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
import { TermsPolicies } from '../../../components/common/TermsPolicies';
import { SocialButtons } from '../../../components/features/SocialButtons';
import { Checkbox } from '../../../components/common/Checkbox';
import { theme } from '../../../theme';
import { LoginExtras } from '../../../components/features/LoginExtras';

export const LoginScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const [rememberAccount, setRememberAccount] = useState(false);

    const handleSignUp = async () => {
        try {
                return navigation.navigate(ScreenNames.EmailVerificationScreen);
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

				<EmailInput value={email} onChange={setEmail} error={errors.email} />
				<PasswordInput
					value={password}
					onChange={setPassword}
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
					onPress={handleSignUp}
					// disabled={!isFormValid}
				>
					<TextStyle variant='bold' size='md' style={styles.buttonText}>Log In</TextStyle>
				</TouchableOpacity>

                <Text style={styles.loginText}>
                    Don't have an account? <Text style={styles.loginLink}  onPress={handleSignUpPressed}>Sign Up</Text>
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
