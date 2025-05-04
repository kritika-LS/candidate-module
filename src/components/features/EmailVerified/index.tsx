import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";

export const EmailVerified = () => {
	return(
		<View style={styles.container}>
			<Image
				source={require('../../../../assets/images/Loader.png')}
				style={styles.loader}
			/>
			<TextStyle style={styles.title} size="xl">Email Address Verification </TextStyle>
			<TextStyle style={styles.subText} size="md">Hang tight, we're currently verifying your email address.</TextStyle>
		</View>
	)
}

const styles = StyleSheet.create({

	container: {
		flex: 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
	},
	title: {
		fontWeight: '700',
	},
	subText: {
		fontWeight: '400',
		textAlign: 'center',
		color: theme.colors.text.light,
	},
	loader: {
		height: 96,
		width: 96,
	},

})