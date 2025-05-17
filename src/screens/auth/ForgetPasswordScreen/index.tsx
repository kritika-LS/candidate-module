import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Alert } from "react-native";
import { Header } from "../../../components/common/Header";
import { OtpHeader } from "../../../components/features/OtpHeader";
import { styles } from "./styles";
import { EmailInput } from "../../../components/common/EmailInput";
import { Button } from "../../../components/common/Button";
import { TermsPolicies } from "../../../components/common/TermsPolicies";
import { CopyrightFooter } from "../../../components/common/CopyrightFooter";
import { OtpVerification } from "../../../components/features/OtpVerification";
import { PasswordInput } from "../../../components/common/PasswordInput";
import { ConfirmPasswordInput } from "../../../components/common/ConfirmPasswordInput";
import { TextStyle } from "../../../components/common/Text";
import { ScreenNames } from "../../../utils/ScreenConstants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types/navigation";
import { useAuth } from "../../../context/AuthContext";

export const ForgetPasswordScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { forgotPassword, resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });

    const handleSendCode = async () => {
        try {
            if (!email) {
                setErrors({...errors, email: 'Email is required'});
                return;
            }

            await forgotPassword(email);
            setStep('verify');
        } catch (error) {
            console.error('Error sending reset code:', error);
            Alert.alert('Error', 'Failed to send verification code. Please try again.');
        }
    };

    const handleResetPassword = async () => {
        let valid = true;
        const newErrors = {
            password: '',
            confirmPassword: ''
        };

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            valid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            valid = false;
        } else if (confirmPassword.length < 8) {
            newErrors.confirmPassword = 'Password must be at least 8 characters long';
            valid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match. Please enter the same password';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        try {
            
            await resetPassword(email,otp,password);

            Alert.alert(
                'Success',
                'Your password has been updated successfully. Please use your new password to log in.',
                [{
                    text: 'OK',
                    onPress: () => navigation.navigate(ScreenNames.LoginScreen, { email })
                }]
            );
        } catch (error) {
            console.error('Error resetting password:', error);
            Alert.alert('Error', 'Failed to reset password. Please try again.');
        }
    };

    useEffect(() => {
        if(otp.length === 6) setStep('reset');
    }, [otp]);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Header title="Forgot Password" showBackButton onBackPress={() => {
                if (step === 'verify') setStep('email');
                else if (step === 'reset') {
                    handleSendCode();
                    setStep('verify');
                }
                else navigation.goBack()
            }} />

            <View style={styles.mainContainer}>
                {step === 'email' ? (
                    <>
                        <OtpHeader
                            subText="Enter your registered email to receive a verification code"
                        />
                        <EmailInput 
                            value={email} 
                            onChange={(text) => {
                                setEmail(text);
                                setErrors({...errors, email: ''});
                            }} 
                            error={errors.email} 
                        />
                        <Button 
                            title="Send Code" 
                            onPress={handleSendCode} 
                            style={styles.verifyButton} 
                        />
                    </>
                ) : step === 'verify' ? (
                    <>
                        <OtpVerification 
                            email={email}
                            onCodeChange={(code) => setOtp(code)}
                            onResend={handleSendCode}
                        />
                    </>
                ) : (
                    <>
                        <TextStyle style={styles.confirmPasswordTitle} size="lg" variant="bold">
                            Update Password
                        </TextStyle>
                        <PasswordInput 
                            label="New Password" 
                            value={password} 
                            onChange={(text) => {
                                setPassword(text);
                                setErrors({...errors, password: ''});
                            }}
                            error={errors.password}
                        />
                        <ConfirmPasswordInput 
                            value={confirmPassword} 
                            onChange={(text) => {
                                setConfirmPassword(text);
                                setErrors({...errors, confirmPassword: ''});
                            }}
                            error={errors.confirmPassword}
                        />
                        <Button 
                            title="Reset Password" 
                            onPress={handleResetPassword} 
                            style={styles.verifyButton} 
                        />
                    </>
                )}
                <View style={styles.footer}>
                    <TermsPolicies />
                    <CopyrightFooter />
                </View>
            </View>
        </SafeAreaView>
    )
}