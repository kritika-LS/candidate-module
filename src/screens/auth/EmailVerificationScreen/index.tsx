import React, { useState } from "react";
import { Header } from "../../../components/common/Header";
import { SafeAreaView, View } from "react-native";
import { CopyrightFooter } from "../../../components/common/CopyrightFooter";
import { styles } from "./styles";
import { TermsPolicies } from "../../../components/common/TermsPolicies";
import { OtpVerification } from "../../../components/features/OtpVerification";
import { EmailVerified } from "../../../components/features/EmailVerified";
import { useRoute, RouteProp } from "@react-navigation/native";

// Define route param types for safety (optional but recommended)
type EmailVerificationRouteParams = {
  email?: string;
};

export const EmailVerificationScreen = () => {
  const route = useRoute<RouteProp<Record<string, EmailVerificationRouteParams>, string>>();
  const email = route.params?.email;

  const [otpSent, setOtpSent] = useState(true);

  const handleCodeChange = (code: string) => {
    console.log("Entered OTP Code:", code);
    // You can validate code here or enable "Verify" button
  };

  const handleResend = () => {
    console.log("Resend OTP triggered.");
    // Call resend OTP API here
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Email Address Verification" showBackButton />
      <View style={styles.body}>
        {otpSent ? (
          <OtpVerification
            email={email}
            onCodeChange={handleCodeChange}
            onResend={handleResend}
			setOtpSent={setOtpSent}
          />
        ) : (
          <EmailVerified />
        )}
      </View>
      <View style={styles.footer}>
        <TermsPolicies />
        <CopyrightFooter />
      </View>
    </SafeAreaView>
  );
};
