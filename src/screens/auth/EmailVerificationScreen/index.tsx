import React, { useState } from "react";
import { Header } from "../../../components/common/Header";
import { SafeAreaView, View } from "react-native";
import { CopyrightFooter } from "../../../components/common/CopyrightFooter";
import { styles } from "./styles";
import { TermsPolicies } from "../../../components/common/TermsPolicies";
import { OtpVerification } from "../../../components/features/OtpVerification";
import { EmailVerified } from "../../../components/features/EmailVerified";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

// Define route param types for safety (optional but recommended)
type EmailVerificationRouteParams = {
  email?: string;
  password?: any
};

export const EmailVerificationScreen = () => {

  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, EmailVerificationRouteParams>, string>>();
  const email = route.params?.email;
  const password = route.params?.password;

  const [otpSent, setOtpSent] = useState(true);

  const handleCodeChange = (code: string) => {
    console.log("Entered OTP Code:", code);
    // You can validate code here or enable "Verify" button
  };

  const handleResend = () => {
    console.log("Resend OTP triggered.");
    // Call resend OTP API here
  };

  const handleBackPress = () => {
    if(password) {
      navigation.navigate("SignUpScreen");
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Email Address Verification" showBackButton onBackPress={handleBackPress} />
      <View style={styles.body}>
        {otpSent ? (
          <OtpVerification
            email={email}
            password={password}
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
