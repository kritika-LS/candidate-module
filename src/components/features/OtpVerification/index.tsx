import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";
import { OtpInput } from "../../common/OtpInput";
import { OtpHeader } from "../OtpHeader";

const RESEND_INTERVAL = 180; // seconds

interface OtpVerificationProps {
    email?: string;
    onCodeChange?: (code: string) => void;
    onResend?: () => void;
}

export const OtpVerification = ({ email, onCodeChange, onResend }: OtpVerificationProps) => {
    const [timer, setTimer] = useState(RESEND_INTERVAL);
    const [isResendActive, setIsResendActive] = useState(false);
    const [otpCode, setOtpCode] = useState('');

    const handleResend = () => {
        if (!isResendActive) return;
        onResend();
        setTimer(RESEND_INTERVAL);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timer;

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

    const handleCodeChange = (code: string) => {
        setOtpCode(code);
        onCodeChange(code);
    };

    return (
        <View>
            <OtpHeader
                subText={'To complete your verification, please enter the code sent to'}
                email={email}
            />

            <OtpInput 
                value={otpCode} 
                onChange={handleCodeChange} 
                length={6} 
            />

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

            {!isResendActive && (
                <TextStyle size="sm" color="#797979" style={styles.resendStatement}>
                    Resend Code in{" "}
                    <TextStyle size="sm" variant="bold">
                        {formatTime(timer)}
                    </TextStyle>
                </TextStyle>
            )}
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