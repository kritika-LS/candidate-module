import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from '../../common/Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';
import { TextStyle } from '../../common/Text';
import { Text } from 'react-native-gesture-handler';
import Chip from '../../common/Chip';

interface HistoryListCardProps {
	title: string;
	subtitle1?: string;
	subtitle2?: string;
	workSpaceName: string;
	ratio?: string;
	startDate: string;
	endDate: string;
	location: string;
	onEdit?: () => void; // Optional edit action
	onDelete?: () => void; // Optional delete action
	listIcon?: string; // Optional SVG URL
	pillText?: string; // Optional pill text
}

const HistoryListCard: React.FC<HistoryListCardProps> = ({
	title,
	subtitle1,
	subtitle2,
	workSpaceName,
	ratio,
	startDate,
	endDate,
	location,
	onEdit,
	onDelete,
	listIcon,
	pillText,
}) => {

	const EndDate = endDate.toLowerCase();

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				{listIcon ? (

					<View style={styles.defaultIcon}>
						<Icon
							name={listIcon}
							size={20}
							color={theme.colors.text.white}
						/>
					</View>
				) : (
					<View style={styles.defaultIcon}>
						{/* You can replace this with a default icon or leave it empty */}
						<TextStyle style={styles.defaultIconText}>🏥</TextStyle>
					</View>
				)}
				<View style={styles.titleContainer}>

					<View style={[styles.flexRow]}>
						<TextStyle size='sm' color={theme.colors.text.heading} variant='bold' style={styles.title}>{title}</TextStyle>
						{ pillText && 
						<Chip chipName={pillText} status='success' />
						// <View style={styles.pillContainer}>
						// 	<TextStyle size='xs' color={theme.colors.text.white}>{pillText}</TextStyle>
						// </View>
						}
					</View>

					{subtitle1 && <TextStyle size='sm' color={theme.colors.text.heading}>{subtitle1}</TextStyle>}
					{subtitle2 && <TextStyle size='xs' color={theme.colors.text.light}>{subtitle2}</TextStyle>}

					<TextStyle size='sm' color={theme.colors.green.accent}>{workSpaceName}</TextStyle>

					{ratio && 
						<TextStyle size='xs' color={theme.colors.text.light} style={styles.ratio}>
							Nurse to Patient Ratio: <TextStyle size='xs'>{ratio}</TextStyle>
						</TextStyle>
					}

					<View style={styles.flexRow}>
						<Icon name='calendar-outline' size={12} color={theme.colors.text.light} style={styles.iconSpacing} />
						<TextStyle 
							size='xs'
							color={EndDate !== 'present' ? theme.colors.text.heading : theme.colors.text.light}
						>
							{startDate} to <TextStyle size='xs' variant={EndDate !== 'present' ? 'regular' : 'bold'}>{endDate}</TextStyle>
						</TextStyle>
					</View>

					<View style={styles.flexRow}>
						<Icon name='map-marker-outline' size={12} color={theme.colors.text.light} style={styles.iconSpacing} />
						<TextStyle size='xs' color={theme.colors.text.heading}>{location}</TextStyle>
					</View>
					
				</View>
			</View>

			{(onEdit || onDelete) && (
				<View style={styles.actions}>
					{onEdit && (
						<TouchableOpacity style={styles.actionButton} onPress={onEdit}>
							<Icon name='square-edit-outline' size={20} color={theme.colors.text.light} />
						</TouchableOpacity>
					)}
					{onDelete && (
						<TouchableOpacity style={styles.actionButton} onPress={onDelete}>
							<Icon name='trash-can-outline' size={20} color="#dc3545" />
						</TouchableOpacity>
					)}
				</View>
			)}
		</View>
	);
};

export default HistoryListCard;
