import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../../../models/types/Dashboard';
import { TextStyle } from '../../common/Text';
import Icon from '../../common/Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {

	return (
		<View style={styles.card}>

			<View style={styles.jobHeader}>
				<TextStyle size='sm' variant='bold'>{job.title} <View><TextStyle size='xs' style={styles.tag}>{job.type}</TextStyle></View></TextStyle>
				
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
				<View style={styles.flexRow}>
					<Icon name='hospital-building' size={14} color='green' />
					<TextStyle size='sm' color={'green'} style={styles.iconSpacing}>{job.companyName}</TextStyle>
				</View>
				<View style={[styles.flexRow, {marginLeft: theme.spacing.md}]}>
					<Icon name='map-marker-outline' color={theme.colors.grey[800]} size={14} />
					<TextStyle size='sm' color={theme.colors.grey[800]} style={styles.iconSpacing}>{job.location}</TextStyle>
				</View>
			</View>

			<View style={styles.flexRow}>
				<Icon name='file-document-outline' size={12} color={theme.colors.grey[800]} />
				<TextStyle size='xs' color={theme.colors.grey[800]} style={styles.ref}>Ref#: {job.reference}</TextStyle>
			</View>

			<TextStyle size='sm' variant='medium' style={styles.rate}>{job.rate} / week</TextStyle>

			<View style={styles.labels}>
				<View style={[styles.greenLabel, styles.flexRow]}>
					<Icon name='briefcase-variant-outline' size={12} color={theme.colors.green.success_100} />
					<TextStyle size='xs' color={theme.colors.green.success_100} style={styles.iconSpacing}>Experience: {job.experience}</TextStyle>
				</View>
				<View style={[styles.blueLabel, styles.flexRow]}>
					<Icon name='timer-sand-empty' size={12} color={theme.colors.primary.main} />
					<TextStyle size='xs' color={theme.colors.primary.main} style={styles.iconSpacing}>Shift: {job.shift}</TextStyle>
				</View>
			</View>

			<View style={[styles.detailContainer]}>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>Start Date: {job.startDate}</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>End Date: {job.endDate}</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>Duration of Work: {job.duration}</TextStyle>
				</View>
				<View style={styles.detailPill}>
					<TextStyle size="xs" color={theme.colors.grey[800]}>Openings: {job.openings}</TextStyle>
				</View>
			</View>


			<View style={[styles.flexRow, styles.jobCardFooter]}>
				<View style={styles.flexRow}>
					<Icon name='clock-outline' size={12} color={theme.colors.grey[500]} />
					<TextStyle size='xs' color={theme.colors.grey[500]} style={styles.iconSpacing}>Posted {job.postedAgo}</TextStyle>
				</View>

				<TouchableOpacity style={styles.applyButton}>
					<TextStyle style={styles.applyText}>Apply</TextStyle>
				</TouchableOpacity>
			</View>
		</View>
	)
};

export default JobCard;
