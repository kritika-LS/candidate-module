import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Icon from "../../../components/common/Icon/Icon";
import { TextStyle } from "../../../components/common/Text";
import { theme } from "../../../theme";

export const Header = () => {
	return (
		<View style={[styles.flexRow, styles.uploadSection]}>

			<View style={styles.profilepic}>
				<View style={styles.profilePicIcon}>
					<Icon name="account-outline" size={30} color={theme.colors.grey[500]} />
				</View>
			</View>

			<View style={styles.uploadProfilePic}>
				<TouchableOpacity style={[styles.flexRow, styles.uploadBtn]}>
					<Icon name="tray-arrow-up" size={16} color={theme.colors.primary.main} />
					<TextStyle size="xs" color={theme.colors.primary.main} style={styles.iconSpacing}>Upload Picture</TextStyle>
				</TouchableOpacity>
				<TextStyle style={styles.subTitle}>Accepted File Formats: PNG, JPEG, JPG up to 10 MB</TextStyle>
			</View>
		</View>
	);
}