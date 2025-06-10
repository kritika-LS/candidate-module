import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	TouchableOpacity,
	GestureResponderEvent,
	Animated,
	Easing,
	Image,
} from 'react-native';
import { theme } from '../../../theme'; // Adjust the path if needed
import CustomModal from '../../common/Modal';
import { TextStyle } from '../../common/Text';
import { styles } from './styles';
import Icon from '../../common/Icon/Icon';
import { keepLocalCopy, pick, types } from '@react-native-documents/picker';
import Toast from 'react-native-toast-message';

interface Props {
	isVisible: boolean;
	onClose?: () => void;
	onUpload: (file: any) => void; // Add file type
	uploading: boolean;
	uploadProgress: number; // 0 to 100
	fileName?: string;
}

const UploadFileModal: React.FC<Props> = ({
	isVisible,
	onClose,
	onUpload,
	uploading,
	uploadProgress,
	fileName,
}) => {
	const [selectedFile, setSelectedFile] = useState<any | null>(null);
	const animation = useRef(new Animated.Value(0)).current;

	// Function to handle file selection
	const handleChooseFile = async() => {
		try {
			const [result] = await pick({
				mode: 'open',
				requestLongTermAccess: true,
				type: [types.pdf, types.doc, types.docx, types.images],
			})
			console.log("tag here result", result);

			if (result?.size != null && result?.size > 10 * 1024 * 1024) {
				Toast.show({
					type: 'error',
					text1: 'File size exceeds 10MB limit',
				});
				return;
			}
			if (result.bookmarkStatus === 'success') {
				setSelectedFile(result);
				// setIsUploading(true);
				const [localCopy] = await keepLocalCopy({
					files: [
						{
							uri: result.uri,
							fileName: result.name ?? 'fallbackName',
						},
					],
					destination: 'cachesDirectory',
				});
				onUpload(localCopy);
			} else {
				console.error(result);
			}
		} catch (err) {
			console.error(err);
			// setFileName(null);
			// setIsUploading(false);
		}
	};

	// Function to handle the upload process
	const handleUpload = (e: GestureResponderEvent) => {
		if (selectedFile) {
			onUpload(selectedFile);
		}
	};

	// Animation for the water level
	useEffect(() => {
		if (uploading) {
			Animated.timing(animation, {
				toValue: uploadProgress,
				duration: 500, // Adjust for speed
				easing: Easing.linear,
				useNativeDriver: true,
			}).start();
		} else {
			animation.setValue(0);
		}
	}, [uploading, uploadProgress, animation]);

	const getWaveHeight = () => {
    const height = animation.interpolate({
      inputRange: [0, 100],
      outputRange: [-3, uploadProgress], // Start at almost empty (-3), go to almost full (70)
      extrapolate: 'clamp',
    });
    return height;
  };

	return (
		<CustomModal
			isVisible={isVisible}
			onClose={onClose}
			style={styles.modalContainer}
		//   title={uploading ? 'Uploading File...' : 'Upload File'}
		>
			<View style={styles.body}>
				{uploading ? (
					<>
						{/* Water Filling Animation */}
						<View style={styles.waterContainer}>
							<Animated.View
								style={[
									styles.water,
									{
										height: getWaveHeight(),
									},
								]}
							/>
							<View style={styles.wave} />
							<View style={styles.fileIconContainer}>
								{/* <Icon name="file-text-o" size={40} color={theme.colors.grey[700]} /> */}
							</View>
						</View>
						<TextStyle style={styles.fileName}>
							{fileName || (selectedFile ? selectedFile.name : 'No file selected')}
						</TextStyle>
						<TextStyle style={styles.processingText}>
							Please wait while the file is being processed.
						</TextStyle>
					</>
				) : (
					<>
						<View style={styles.fileIconContainer}>
							<Image
								source={require('../../../../assets/images/fileUpload.png')}
								style={styles.fileImage}
								resizeMode="contain"
							/>
						</View>
						<TouchableOpacity
							style={styles.chooseFileButton}
							onPress={handleChooseFile}>
							<TextStyle style={styles.chooseFileButtonText}>Choose a File</TextStyle>
						</TouchableOpacity>
						<TextStyle size='xs' color={theme.colors.text.light} style={styles.uploadText}>
							Please upload your latest resume. Accepted File Formats: PNG, JPEG, JPG, PDF, DOC, DOCX up to 10MB
						</TextStyle>
					</>
				)}
			</View>
		</CustomModal>
	);
};

export default UploadFileModal;