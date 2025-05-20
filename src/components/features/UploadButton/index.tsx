import React from 'react';
import { StyleSheet, TouchableOpacity, View, GestureResponderEvent, Image } from 'react-native';
import Icon from '../../common/Icon/Icon';
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';

interface UploadButtonProps {
  buttonTitle: string;
  subText: string;
  handleUpload: (event: GestureResponderEvent) => void;
	fileName?: string | null;
	handleDelete?: (event: GestureResponderEvent) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  buttonTitle,
  subText,
  handleUpload,
	fileName,
	handleDelete,
}) => {
  return (
    <View>
			{ fileName &&
				<View style={styles.uploadedFileSection}>

					<View style={styles.flexRow}>
						<Image
							source={require('../../../../assets/images/fileUpload.png')}
							style={{ width: 36, height: 45 }}
							resizeMode="contain"
						/>

						<View style={{ marginLeft: 16 }}>
							<TextStyle size="sm">
								{fileName}
							</TextStyle>
							<TextStyle size="xs" color={theme.colors.text.light}>
								Uploaded on 
							</TextStyle>
						</View>
					</View>
					<View style={styles.flexRow}>
						<TouchableOpacity onPress={handleDelete}>
							<Icon
								name="trash-can-outline"
								size={20}
								color={theme.colors.status.error}
							/>
						</TouchableOpacity>
						<TouchableOpacity>
							<Icon
								name="eye-outline"
								size={20}
								color={theme.colors.text.light}
								style={{ marginLeft: 10 }}
							/>
						</TouchableOpacity>
					</View>
				</View>
			}

			<View style={styles.uploadGroup}>
				<TouchableOpacity onPress={handleUpload} style={styles.uploadBtn}>
					<Icon name="file-upload-outline" size={20} color={theme.colors.blue.light} />
					<TextStyle
						size="md"
						color={theme.colors.blue.light}
						style={styles.uploadBtnTextStyle}
					>
						{buttonTitle}
					</TextStyle>
				</TouchableOpacity>

				<TextStyle size="xs" color={theme.colors.text.light} style={styles.note}>
					{subText}
      </TextStyle>
			</View>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadGroup: {
    alignItems: 'center',
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: theme.colors.blue.light,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadBtnTextStyle: {
    marginLeft: 10,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
  note: {
    marginTop: 5,
  },
	uploadedFileSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
		borderWidth: 1,
		borderColor: theme.colors.grey[300],
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},

});
