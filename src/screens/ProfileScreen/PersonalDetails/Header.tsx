import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Icon from "../../../components/common/Icon/Icon";
import { TextStyle } from "../../../components/common/Text";
import { theme } from "../../../theme";
import { pick, types, isCancel } from '@react-native-documents/picker';
import Toast from "react-native-toast-message";

export const Header = () => {

  	const [document, setDocument] = useState<any>(null);

		const handleDocumentUpload = async () => {
			try {
				const res = await pick({
					type: [types.images],
				});
				setDocument(res[0]);
			} catch (err) {
				if (isCancel(err)) { 
					Toast.show({
						type: 'error',
						text1: 'Failed to pick document',
					})
				// User cancelled the picker
				} else {
					Toast.show({
						type: 'error',
						text1: 'Failed to pick document',
					})
				}
			}
		};

	return (
		<View style={[styles.flexRow, styles.uploadSection]}>

			<View style={styles.profilepic}>
			{document ? (
				<Image
					source={{ uri: document.uri }}
					style={styles.profilePicImage}
					resizeMode="cover"
				/>
				) : (
				<View style={styles.profilePicIcon}>
					<Icon name="account-outline" size={30} color={theme.colors.grey[500]} />
				</View>
			)}

			</View>

			<View style={styles.uploadProfilePic}>
				<TouchableOpacity style={[styles.flexRow, styles.uploadBtn]} onPress={handleDocumentUpload}>
					<Icon name="tray-arrow-up" size={16} color={theme.colors.primary.main} />
					<TextStyle size="xs" color={theme.colors.primary.main} style={styles.iconSpacing}>Upload Picture</TextStyle>
				</TouchableOpacity>
				<TextStyle style={styles.subTitle}>Accepted File Formats: PNG, JPEG, JPG up to 10 MB</TextStyle>
			</View>
		</View>
	);
}