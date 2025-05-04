import React from "react";
import { Linking, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextStyle } from "../Text";
import { colors } from "../../../theme/colors";

export const TermsPolicies = () => {

    const handlePress = () => {
        Linking.openURL('https://dev-onboarding.thehummingbird.solutions/terms-and-conditions/?tab=terms-and-conditions')
    }

	return(
		<SafeAreaView style={ styles.container}>
			<TouchableOpacity onPress={handlePress}>
                <TextStyle variant="regular" size="sm" style={styles.termsText}>Terms & Policies</TextStyle>
            </TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        bottom: 8
    },
    termsText: {
        color: colors.primary.main,
        fontWeight: '500'
    },

})