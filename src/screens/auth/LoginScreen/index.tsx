import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Image, SafeAreaView, ScrollView } from 'react-native';
import { EmailInput } from '../../../components/common/EmailInput';
import { PasswordInput } from '../../../components/common/PasswordInput';
import { ConfirmPasswordInput } from '../../../components/common/ConfirmPasswordInput';
import { signupSchema } from '../../../validations/signupValidation';
import styles from './styles';
import { signIn, signUp } from 'aws-amplify/auth';
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

export const LoginScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const { login } = useAuth(); // ✅ Destructured correctly

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: ''});
    const [rememberAccount, setRememberAccount] = useState(false);

    const handleLogin = async () => {
        try {
            await login(email, password, rememberAccount);
        } catch (error: any) {
            if (error.name === 'UserNotFoundException') {
                setErrors({...errors, email: 'User not found. Please sign up.'});
            } else if (error.name === 'NotAuthorizedException') {
                setErrors({...errors, password: 'Incorrect username or password.'});
            } else {
                setErrors({...errors, password: error.message || 'Login failed'});
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
					<TextStyle variant='bold' size={'md'} style={styles.buttonText}>Log In</TextStyle>
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
