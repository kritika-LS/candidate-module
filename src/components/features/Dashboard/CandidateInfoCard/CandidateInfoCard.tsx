import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextStyle } from '../../../common/Text';
import { styles } from './styles';
import Icon from '../../../common/Icon/Icon';
import HorizontalProgressBar from '../../../common/ProgressBar/HorizontalProgressBar';
import { theme } from '../../../../theme';

interface CandidateInfoCardProps {
  firstName: string;
  lastName: string;
  profileImage?: string;
}

const CandidateInfoCard: React.FC<CandidateInfoCardProps> = ({
  firstName = 'Jane',
  lastName = 'Cooper',
  profileImage,
}) => {

	const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

	return (
		<View style={styles.card}>
			<View style={styles.candidateInfoSection}>

				{profileImage ? (
					<Image source={{ uri: profileImage }} style={styles.profilePic} />
				) : (
					<View style={styles.initialsCard}>
						<TextStyle size='md'>{initials}</TextStyle>
					</View>
				)}

				<View style={styles.candidiateInfo}>
					<TextStyle size='sm' style={styles.name}>Jane Cooper</TextStyle>
					<TextStyle size='xs' style={styles.role}>Registered Nurse</TextStyle>
					<View style={styles.contactInfo}>
						<View style={styles.contactDetails}>
							<Icon name='email-outline' size={10} color={theme.colors.primary.main} />
							<TextStyle style={styles.email}>cooper123@example.com</TextStyle>
						</View>
						<View style={styles.contactDetails}>
							<Icon name='cellphone' size={10} color={theme.colors.primary.main} />
							<TextStyle style={styles.phone}>+1-555-0120</TextStyle>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.progressBarContainer}>
				<View style={styles.progressHeading}>
					<TextStyle size='xs'>Profile Completion</TextStyle>
					<TextStyle size='xs' variant='bold'>60%</TextStyle>
				</View>
				<HorizontalProgressBar progress={60} style={{ height: 10 }} />
			</View>
			<TouchableOpacity style={styles.button}>
				<TextStyle style={styles.buttonText} size='xs'>Complete</TextStyle>
			</TouchableOpacity>
		</View>
	)
};

export default CandidateInfoCard;
