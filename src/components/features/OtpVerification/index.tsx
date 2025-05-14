import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";
import { OtpHeader } from "../OtpHeader";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../../utils/ScreenConstants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types/navigation";
import { OTPInput } from "../../common/OtpInput";

const RESEND_INTERVAL = 180; // seconds

interface OtpVerificationProps {
    email?: string;
    onCodeChange?: (code: string) => void;
    onResend?: () => void;
    setOtpSent?: any;
}

const OTP_LENGTH = 6;

export const OtpVerification = ({ email, onCodeChange, onResend, setOtpSent }: OtpVerificationProps) => {

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const [timer, setTimer] = useState(RESEND_INTERVAL);
    const [isResendActive, setIsResendActive] = useState(false);
    const [otpCode, setOtpCode] = useState(Array(OTP_LENGTH).fill(''));

    const handleResend = () => {
        if (!isResendActive) return;
        onResend?.();
        setTimer(RESEND_INTERVAL);
    };

    const formatTime = (seconds: number) => `${seconds} Seconds`;

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

    const handleCodeChange = (index: number, text: string) => {
        const updated = [...otpCode];
        updated[index] = text;
        setOtpCode(updated);
        onCodeChange?.(updated.join(''));
        // setOtpSent(false);
        // navigation.navigate(ScreenNames.UploadResumeScreen)
    };

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

            {   isResendActive ?
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