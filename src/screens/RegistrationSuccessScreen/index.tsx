import React from "react";
import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { TermsPolicies } from "../../components/common/TermsPolicies";
import { CopyrightFooter } from "../../components/common/CopyrightFooter";
import { theme } from "../../theme";
import { Button } from "../../components/common/Button";
import { TextStyle } from "../../components/common/Text";

export const RegistrationASuccessScreen = () => {
	return (
		<SafeAreaView style={styles.mainScreen}>

			<View style={styles.body}>
				<ImageBackground
					source={require('../../../assets/images/successCelebration.png')} // your background image
					style={styles.backgroundImage}
					resizeMode="cover">
					<Image source={require('../../../assets/images/SuccessIcon.png')} style={styles.successImage} />
				</ImageBackground>
				<TextStyle size="md" variant="bold" style={[styles.textStyle, styles.title]}>Registration Successful</TextStyle>
				<TextStyle size="xs" style={[styles.textStyle, styles.subText]}>You have successfully registered! You can now start searching for jobs.</TextStyle>
			</View>

			<Button
				title="Search Jobs"
				onPress={() => Alert.alert("Searching...")}
				style={styles.searchJobsBtn}
			/>
			<View style={styles.footer}>
				<TermsPolicies />
				<CopyrightFooter />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	mainScreen: {
		flex: 1,
		padding: theme.spacing.md,
	},
	body: {
		flex: 0.92,
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImage: {
		width: 196,
		height: 158,
		justifyContent: 'center',
		alignItems: 'center',
	},
	successImage: {
		height: 96,
		width: 96,
	},
	textStyle: {
		marginTop: 8,
		textAlign: 'center'
	},
	title: {
		fontWeight: '600'
	},
	subText: {
		width: '65%'
	},
	searchJobsBtn: {
		borderRadius: 24,
	},
	footer: {
		position: 'absolute',
		bottom: theme.spacing.lg,
		alignSelf: 'center',
	},
})