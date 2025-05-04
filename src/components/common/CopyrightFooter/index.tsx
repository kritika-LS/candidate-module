import React from "react";
import { SafeAreaView, View } from "react-native";
import { TextStyle } from "../Text";
import styles from "./styles";

interface HeaderProps {
	showBackButton?: boolean;
	title?: string;
}

export const CopyrightFooter: React.FC<HeaderProps> = () => {
	return(
		<SafeAreaView style={ styles.copyrightAlignment}>
			<TextStyle variant="regular" size="xs">© 2025 Hummingbird. All rights reserved.</TextStyle>
		</SafeAreaView>
	)
}