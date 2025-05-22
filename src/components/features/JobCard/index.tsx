import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../../../models/types/Dashboard';
import { TextStyle } from '../../common/Text';
import Icon from '../../common/Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';

interface JobCardProps {
	job: Job;
	onPress?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
	const CardContent = (
		<View style={styles.card}>
			<View style={styles.jobHeader}>
				<View style={[styles.flexRow]}>
					<TextStyle size='sm' variant='bold'>
						{job.jobTitle} 
					</TextStyle>
					{job.jobType && <TextStyle size='xs' style={styles.tag}>{job.jobType}</TextStyle>}
				</View>
				
				<View style={styles.jobHeader}>
					<TouchableOpacity>
						<Icon name='bookmark-outline' size={14} color={theme.colors.grey[500]} />
					</TouchableOpacity>
					<TouchableOpacity>
					<Icon name='share-outline' size={14} color={theme.colors.grey[500]} style={{marginLeft: 10}} />
					</TouchableOpacity>
				</View>
			</View>

			<View style={[styles.flexRow, styles.companyInfoSection]}>
				{job.facilityName && <View style={[styles.flexRow, {marginRight: theme.spacing.md}]}>
					<Icon name='hospital-building' size={14} color='green' />
					<TextStyle size='sm' color={'green'} style={styles.iconSpacing}>{job.facilityName}</TextStyle>
				</View>}
				<View style={[styles.flexRow]}>
					<Icon name='map-marker-outline' color={theme.colors.grey[800]} size={14} />
					<TextStyle size='sm' color={theme.colors.grey[800]} style={styles.iconSpacing}>{job.city ? job.city + ',' : ""} {job.state ? job.state + ',' : ""} {job.country}</TextStyle>
				</View>
			</View>

			<View style={styles.flexRow}>
				<Icon name='file-document-outline' size={12} color={theme.colors.grey[800]} />
				<TextStyle size='xs' color={theme.colors.grey[800]} style={styles.ref}>Job Reference Number: {job.jobReferenceNumber}</TextStyle>
			</View>

			<TextStyle size='sm' variant='medium' style={styles.rate}>{job.payRateMinimum} - {job.payRateMaximum} / week</TextStyle>

			<View style={styles.labels}>
				<View style={[styles.greenLabel, styles.flexRow]}>
					<Icon name='briefcase-variant-outline' size={12} color={theme.colors.green.success_100} />
					<TextStyle size='xs' color={theme.colors.green.success_100} style={styles.iconSpacing}>Experience: {job.jobExperienceLevel}</TextStyle>
				</View>
				<View style={[styles.blueLabel, styles.flexRow]}>
					<Icon name='timer-sand-empty' size={12} color={theme.colors.primary.main} />
					<TextStyle size='xs' color={theme.colors.primary.main} style={styles.iconSpacing}>Shift: {job.shiftDetails} Day</TextStyle>
				</View>
			</View>

			<View style={[styles.detailContainer]}>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>Start Date: {job.validFrom}</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>End Date: {job.validTill}</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>Duration of Work: {job.duration}</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>Openings: {job.numberOfOpenings}</TextStyle>
				</View>
			</View>


			<View style={[styles.flexRow, styles.jobCardFooter]}>
				<View style={styles.flexRow}>
					<Icon name='clock-outline' size={12} color={theme.colors.grey[500]} />
					<TextStyle size='xs' color={theme.colors.grey[500]} style={styles.iconSpacing}>Posted {job.postedOn}</TextStyle>
				</View>

				<TouchableOpacity style={styles.applyButton}>
					<TextStyle style={styles.applyText}>Apply</TextStyle>
				</TouchableOpacity>
			</View>
		</View>
	);

	if (onPress) {
		return (
			<TouchableOpacity activeOpacity={0.85} onPress={onPress}>
				{CardContent}
			</TouchableOpacity>
		);
	}
	return CardContent;
};

export default JobCard;
