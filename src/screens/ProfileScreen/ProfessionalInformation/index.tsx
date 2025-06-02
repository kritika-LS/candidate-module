import React from 'react';
import { TextStyle } from '../../../components/common/Text';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Icon from '../../../components/common/Icon/Icon';
import { theme } from '../../../theme';
import { styles } from './styles';
import Certificate from './Certificate';
import License from './License';
import ChartingSystem from './ChartingSystem';
import BackgroundInformation from './BackgroundInformation';
import { SaveButton } from '../../../components/features/SaveButton';

interface ProfessionalInformationProps {
}

export const ProfessionalInformation: React.FC<ProfessionalInformationProps> = () => {

	const handleSubmit = () => {
		console.log('Form submitted');
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView style={styles.ProfessionalInformationContainer}>
				<View style={[styles.flexRow, styles.sectionHeader]}>
					<TextStyle size='md' variant='bold'>Professional Information</TextStyle>
					<View style={styles.flexRow}>
						<Icon name='file-alert-outline' size={12} color={theme.colors.status.error} />
						<TextStyle size='xs' color={theme.colors.status.error} style={styles.iconSpacing}>Incomplete</TextStyle>
					</View>
				</View>

				<Certificate />
				<License />
				<ChartingSystem />
				<BackgroundInformation />

			</ScrollView>

			<View style={styles.saveButton}>
				<SaveButton
					title="Save"
					onPress={handleSubmit}
				// disabled={!isValid || !dirty}
				/>
			</View>
		</SafeAreaView>
	);
};