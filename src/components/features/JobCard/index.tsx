import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
	const formatLocation = () => {
		const parts = [];
		if (job.city) parts.push(job.city);
		if (job.state) parts.push(job.state);
		if (job.country) parts.push(job.country);
		return parts.length > 0 ? parts.join(', ') : '-';
	};

	const formatPayRate = () => {
		if (!job.payRateMinimum && !job.payRateMaximum) return '-';
		return `${job.payRateMinimum || '-'} - ${job.payRateMaximum || '-'} / week`;
	};

	const CardContent = (
		<View style={styles.card}>
			<View style={styles.jobHeader}>
				<View style={styles.jobTitleContainer}>
					<TextStyle size='sm' variant='bold' numberOfLines={2}>
						{job.jobTitle || '-'} 
					</TextStyle>
					{job.jobType && <TextStyle size='xs' style={styles.tag}>{job.jobType}</TextStyle>}
				</View>
				
				<View style={styles.actionButtons}>
					<TouchableOpacity>
						<Icon name='bookmark-outline' size={14} color={theme.colors.grey[500]} />
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon name='share-outline' size={14} color={theme.colors.grey[500]} />
					</TouchableOpacity>
				</View>
			</View>

			<View style={[styles.flexRow, styles.companyInfoSection]}>
				{job.facilityName && (
					<View style={[styles.flexRow, {marginRight: theme.spacing.md}]}>
						<Icon name='hospital-building' size={14} color='green' />
						<TextStyle size='sm' color={'green'} style={styles.iconSpacing} numberOfLines={1}>
							{job.facilityName}
						</TextStyle>
					</View>
				)}
				<View style={styles.locationContainer}>
					<Icon name='map-marker-outline' color={theme.colors.grey[800]} size={14} />
					<TextStyle size='sm' color={theme.colors.grey[800]} style={styles.iconSpacing} numberOfLines={1}>
						{formatLocation()}
					</TextStyle>
				</View>
			</View>

			<View style={styles.flexRow}>
				<Icon name='file-document-outline' size={12} color={theme.colors.grey[800]} />
				<TextStyle size='xs' color={theme.colors.grey[800]} style={styles.ref} numberOfLines={1}>
					Job Reference Number: {job.jobReferenceNumber || '-'}
				</TextStyle>
			</View>

			<TextStyle size='sm' variant='medium' style={styles.rate} numberOfLines={1}>
				{formatPayRate()}
			</TextStyle>

			<View style={styles.labels}>
				<View style={styles.greenLabel}>
					<View style={styles.labelContent}>
						<Icon name='briefcase-variant-outline' size={12} color={theme.colors.green.success_100} />
						<TextStyle size='xs' color={theme.colors.green.success_100} style={styles.labelText} numberOfLines={1}>
							Experience: {job.jobExperienceLevel || '-'}
						</TextStyle>
					</View>
				</View>
				<View style={styles.blueLabel}>
					<View style={styles.labelContent}>
						<Icon name='timer-sand-empty' size={12} color={theme.colors.primary.main} />
						<TextStyle size='xs' color={theme.colors.primary.main} style={styles.labelText} numberOfLines={1}>
							Shift: {job.shiftDetails ? `${job.shiftDetails} Day` : '-'}
						</TextStyle>
					</View>
				</View>
			</View>

			<View style={styles.detailContainer}>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
						Start Date: {job.validFrom || '-'}
					</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
						End Date: {job.validTill || '-'}
					</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
						Duration: {job.duration || '-'}
					</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
						Openings: {job.numberOfOpenings || '-'}
					</TextStyle>
				</View>
			</View>

			<View style={styles.jobCardFooter}>
				<View style={styles.flexRow}>
					<Icon name='clock-outline' size={12} color={theme.colors.grey[500]} />
					<TextStyle size='xs' color={theme.colors.grey[500]} style={styles.iconSpacing} numberOfLines={1}>
						Posted {job.postedOn || '-'}
					</TextStyle>
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
