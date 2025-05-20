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

const RESEND_INTERVAL = 180; // seconds

interface OtpVerificationProps {
	email?: string;
	onCodeChange?: (code: string) => void;
	onResend?: () => void;
	setOtpSent?: any;
}

const OTP_LENGTH = 6;

export const OtpVerification = ({ email, onCodeChange, setOtpSent }: OtpVerificationProps) => {

	const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

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
			let confirmationCodeString:any = otpCode;
      if (Array.isArray(otpCode)) {
        confirmationCodeString = otpCode.join('');
      } else if (typeof otpCode !== 'string') {
        // If it's not an array or a string, try to convert it to a string.
        // This handles cases where otpCode might be a number, for example.
        confirmationCodeString = String(otpCode);
      }
			const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
				username: email,
				confirmationCode: confirmationCodeString,
			});
			if (confirmSignUpNextStep.signUpStep === 'DONE') {
				navigation.navigate('UploadResumeScreen');
			}
		} catch (error) {
			console.error('Confirmation error:', error);
		}
	};

	const handleResend = async() => {
		try {
			if (!isResendActive) return;
			if (!email) {
				console.error('Email is undefined. Cannot resend code.');
				return;
			}
			await resendSignUpCode({ username: email });
			setTimer(RESEND_INTERVAL);
		} catch (error) {
			console.error('Resend code error:', error);
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
	)
}

const styles = StyleSheet.create({
	resendStatement: {
		textAlign: 'center',
		marginTop: 16,
	},
	resendText: {
		color: theme.colors.primary.main,
		fontWeight: '700'
	},
})