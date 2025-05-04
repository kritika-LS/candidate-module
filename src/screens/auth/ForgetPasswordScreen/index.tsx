import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
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

export const ForgetPasswordScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verified, setVerified] = useState(false);

    return(
        <SafeAreaView style={styles.safeAreaContainer}>

            <Header title="Forgot Password" showBackButton />

            <View style={styles.mainContainer}>

                { verified ?
                    ( email ?
                        <>
                            <OtpHeader
                                email={email ? email : ""}
                                subText="A link will be sent to the below email address to reset your password"
                            />
                            <EmailInput value="" onChange={() => {}} error="" />
                            <Button title="Verify" onPress={() => {}} style={styles.verifyButton} />
                        </>
                        :
                        <OtpVerification />
                    )
                    :
                    (
                        <>
                            <TextStyle style={styles.confirmPasswordTitle} size="lg" variant="bold">Update Password</TextStyle>
                            <PasswordInput label="New Password" value={password} onChange={setPassword} />
                            <ConfirmPasswordInput value={confirmPassword} onChange={setConfirmPassword} />
                            <Button title="Verify" onPress={() => {}} style={styles.verifyButton} />
                        </>
                    )
                }
                <View style={styles.footer}>
                    <TermsPolicies />
                    <CopyrightFooter />
                </View>

            </View>

        </SafeAreaView>
    )
}