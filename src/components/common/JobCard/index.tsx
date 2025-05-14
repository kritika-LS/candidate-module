import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../../../models/types/Dashboard';
import { TextStyle } from '../Text';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
	
	return (
		<View style={styles.card}>
			<TextStyle style={styles.title}>{job.title} <TextStyle style={styles.tag}>{job.type}</TextStyle></TextStyle>
			<TextStyle style={styles.location}>{job.location}</TextStyle>
			<TextStyle style={styles.ref}>Ref#: {job.reference}</TextStyle>
			<TextStyle style={styles.rate}>{job.rate} / week</TextStyle>
			<View style={styles.labels}>
				<TextStyle style={styles.label}>Experience: {job.experience}</TextStyle>
				<TextStyle style={styles.label}>Shift: {job.shift}</TextStyle>
			</View>
			<TextStyle style={styles.details}>Openings: {job.openings}</TextStyle>
			<TextStyle style={styles.details}>Start Date: {job.startDate} | End Date: {job.endDate}</TextStyle>
			<TextStyle style={styles.details}>Duration of Work: {job.duration}</TextStyle>
			<TextStyle style={styles.posted}>Posted {job.postedAgo}</TextStyle>
			<TouchableOpacity style={styles.applyButton}>
				<TextStyle style={styles.applyText}>Apply</TextStyle>
			</TouchableOpacity>
		</View>
	)
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		padding: 16,
		marginVertical: 10,
		borderRadius: 12,
		elevation: 2,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	tag: {
		fontSize: 12,
		color: '#8e24aa',
		backgroundColor: '#f3e5f5',
		padding: 4,
		borderRadius: 6,
	},
	location: {
		fontSize: 13,
		marginVertical: 4,
	},
	ref: {
		fontSize: 12,
		marginBottom: 6,
	},
	rate: {
		fontWeight: 'bold',
		marginVertical: 4,
	},
	labels: {
		flexDirection: 'row',
		gap: 12,
	},
	label: {
		fontSize: 12,
		backgroundColor: '#e0f2f1',
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
	},
	details: {
		fontSize: 12,
		marginTop: 4,
	},
	posted: {
		fontSize: 11,
		color: '#999',
		marginTop: 4,
	},
	applyButton: {
		backgroundColor: '#3f51b5',
		paddingVertical: 8,
		marginTop: 10,
		borderRadius: 6,
	},
	applyText: {
		color: '#fff',
		textAlign: 'center',
	},
});

export default JobCard;
