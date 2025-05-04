import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";
import { OtpInput } from "../../common/OtpInput";
import { OtpHeader } from "../OtpHeader";

export const OtpVerification = () => {
    return(
        <View>

            <OtpHeader
                subText={'To complete your registration, please verify your email by entering the code sent to'}
                email="email@domain.com"
            />
            {/* <View style={styles.mailSection}>
                <Image
                    source={require('../../../../assets/images/Mail.png')}
                    style={styles.mailImage}
                    resizeMode="contain"
                />
            </View>

            <TextStyle size="xs" style={styles.verifivationMsg}>
                To complete your registration, please verify your email by entering the code sent to email@domain.com
            </TextStyle> */}

            <OtpInput value={['','','','','','']} onChange={() => {}} />

            <TextStyle size="sm" style={styles.resendStatement}>
                Didn't receive code? 
                <TextStyle size="sm" style={styles.resendText}>{` Resend`}</TextStyle>
            </TextStyle>

            <TextStyle size="sm" color="#797979" style={styles.resendStatement}>
                Resend Code in 
                <TextStyle size="sm" variant="bold">{` 180 Seconds`}</TextStyle>
            </TextStyle>
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