import React, { useState } from "react";
import { Header } from "../../../components/common/Header";
import { Image, SafeAreaView, View } from "react-native";
import { CopyrightFooter } from "../../../components/common/CopyrightFooter";
import { styles } from "./styles";
import { TextStyle } from "../../../components/common/Text";
import { OtpInput } from "../../../components/common/OtpInput";
import { TermsPolicies } from "../../../components/common/TermsPolicies";
import { OtpVerification } from "../../../components/features/OtpVerification";
import { EmailVerified } from "../../../components/features/EmailVerified";

export const EmailVerificationScreen = () => {

	const [otpSent, setOtpSent] = useState(false);

	return(
		<SafeAreaView style={styles.mainContainer}>
			<Header title="Email Address Verification" showBackButton />
			<View style={styles.body}>
				{ otpSent ?
					<OtpVerification />
					:
					<EmailVerified />
				}
			</View>
			<View style={styles.footer}>
				<TermsPolicies />
				<CopyrightFooter />
			</View>
		</SafeAreaView>
	)
}