import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";
import { OtpHeader } from "../OtpHeader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types/navigation";
import { OTPInput } from "../../common/OtpInput";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { SaveButton } from "../SaveButton";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchCandidate } from "../../../store/thunk/candidate.thunk";
import { ScreenNames } from "../../../utils/ScreenConstants";
import Toast from "react-native-toast-message";

const RESEND_INTERVAL = 180; // seconds

interface OtpVerificationProps {
	email?: string;
	onCodeChange?: (code: string) => void;
	onResend?: () => void;
	setOtpSent?: any;
	password: any
}

const OTP_LENGTH = 6;

export const OtpVerification = ({ email, onCodeChange, setOtpSent, password }: OtpVerificationProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	const { login } = useAuth();
	const dispatch = useAppDispatch();

	const [timer, setTimer] = useState(RESEND_INTERVAL);
	const [isResendActive, setIsResendActive] = useState(false);
	const [otpCode, setOtpCode] = useState(Array(OTP_LENGTH).fill(''));

	const formatTime = (seconds: number) => `${seconds} Seconds`;

	const handleCodeChange = (index: number, text: string) => {
		setOtpCode(prev => {
			const updated = [...prev];
			updated[index] = text;
			const fullCode = updated.join('');
			onCodeChange?.(fullCode);
			return updated;
		});
	};

	const verifySignUp = async () => {
		try {
			if (!email) {
				console.error('Email is undefined. Cannot verify sign up.');
				return;
			}
			let confirmationCodeString: any = otpCode;
			if (Array.isArray(otpCode)) {
				confirmationCodeString = otpCode.join('');
			} else if (typeof otpCode !== 'string') {
				confirmationCodeString = String(otpCode);
			}
			const response = await confirmSignUp({
				username: email,
				confirmationCode: confirmationCodeString,
			});
			if (response?.nextStep?.signUpStep === "DONE" && password) {
				await login(email, password);
				
				// Check candidate authorization
				try {
					const candidateResponse = await dispatch(fetchCandidate()).unwrap();
					// Check if the response has a status key and it's not 401
					if (candidateResponse?.status && candidateResponse.status !== 401) {
						navigation.navigate(ScreenNames.HomeScreen);
					} else {
						navigation.navigate(ScreenNames.UploadResumeScreen);
					}
				} catch (error: any) {
					// If API call fails or returns 401, navigate to upload resume screen
					navigation.navigate(ScreenNames.UploadResumeScreen);
					Toast.show({
						type: 'error',
						text1: 'Please complete your profile by uploading your resume'
					});
				}
			}
		} catch (error) {
			console.error('Confirmation error:', error);
			Toast.show({
				type: 'error',
				text1: 'Failed to verify OTP. Please try again.'
			});
		}
	};

	const handleResend = async () => {
		try {
			if (!isResendActive) return;
			if (!email) {
				console.error('Email is undefined. Cannot resend code.');
				return;
			}
			await resendSignUpCode({ username: email });
			setTimer(RESEND_INTERVAL);
			Toast.show({
				type: 'success',
				text1: 'OTP resent successfully'
			});
		} catch (error) {
			console.error('Resend code error:', error);
			Toast.show({
				type: 'error',
				text1: 'Failed to resend OTP'
			});
		}
	};

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;

		if (timer > 0) {
			setIsResendActive(false);
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else {
			setIsResendActive(true);
		}

		return () => clearInterval(interval);
	}, [timer]);

	return (
		<View>
			<OtpHeader
				subText={'To complete your registration, please verify your email by entering the code sent to '}
				email={email}
			/>

			<OTPInput
				value={otpCode}
				onChange={handleCodeChange}
			/>

			{isResendActive ?
				<TextStyle size="sm" style={styles.resendStatement}>
					Didn't receive code?
					<TextStyle
						size="sm"
						style={[styles.resendText, { opacity: isResendActive ? 1 : 0.5 }]}
						onPress={handleResend}
					>
						{` Resend`}
					</TextStyle>
				</TextStyle>
				:
				<TextStyle size="sm" color="#797979" style={styles.resendStatement}>
					Resend Code in{" "}
					<TextStyle size="sm" variant="bold">
						{formatTime(timer)}
					</TextStyle>
				</TextStyle>
			}

			<SaveButton onPress={verifySignUp} title="Verify" />
		</View>
	);
};

const styles = StyleSheet.create({
	resendStatement: {
		textAlign: 'center',
		marginTop: 16,
	},
	resendText: {
		color: theme.colors.primary.main,
		fontWeight: '700'
	},
});