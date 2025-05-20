import React from 'react';
import { TextStyle } from '../../../components/common/Text';
import { AccordionItem } from '../../../types/profile';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/common/Icon/Icon';
import { theme } from '../../../theme';
import { styles } from './styles';
import Certificate from './Certificate';
import License from './License';
import Reference from './Reference';
import ChartingSystem from './ChartingSystem';
import BackgroundInformation from './BackgroundInformation';

interface ProfessionalInformationProps {
	expandedItem: string | null;
	setExpandedItem: (item: string | null) => void;
}

export const ProfessionalInformation: React.FC<ProfessionalInformationProps> = ({ expandedItem, setExpandedItem }) => {

	const accordionItems: AccordionItem[] = [
		{
			title: 'Certificate',
			icon: 'certificate-outline',
			completed: false,
			content: <View style={styles.accordionContent}><Certificate /></View>,
		},
		{
			title: 'License',
			icon: 'card-account-details-outline',
			completed: false,
			content: <View style={styles.accordionContent}><License /></View>,
		},
		{
			title: 'Reference',
			icon: 'account-arrow-right-outline',
			completed: false,
			content: <View style={styles.accordionContent}><Reference /></View>,
		},
		{
			title: 'Charting System',
			icon: 'chart-bar-outline',
			completed: false,
			content: <View style={styles.accordionContent}><ChartingSystem /></View>,
		},
		{
			title: 'Background Information',
			icon: 'shield-check-outline',
			completed: false,
			content: <View style={styles.accordionContent}><BackgroundInformation /></View>,
		},
	];

	return (
		<ScrollView style={styles.ProfessionalInformationContainer}>
			<View style={[styles.flexRow, styles.sectionHeader]}>
				<TextStyle size='md' variant='bold'>Professional Information</TextStyle>
				<View style={styles.flexRow}>
					<Icon name='file-alert-outline' size={12} color={theme.colors.status.error} />
					<TextStyle size='xs' color={theme.colors.status.error} style={styles.iconSpacing}>Incomplete</TextStyle>
				</View>
			</View>

			{accordionItems.map((item, index) => (
				<View key={index} style={styles.accordionItem}>
					<TouchableOpacity
						style={styles.accordionHeader}
						onPress={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
					>
						<View style={styles.accordionTitleContainer}>
							<Icon name={item.icon} size={18} color={theme.colors.grey[600]} />
							<TextStyle size='sm' style={styles.accordionTitle}>{item.title}</TextStyle>
						</View>

						<View style={styles.flexRow}>
							{!item.completed ?
								<Icon name='file-alert-outline' size={12} color={theme.colors.status.error} />
								: null
							}
							<Icon
								name={expandedItem === item.title ? 'chevron-up' : 'chevron-down'}
								size={20}
								color={theme.colors.grey[500]}
								style={styles.iconSpacing}
							/>
						</View>
					</TouchableOpacity>

					{expandedItem === item.title && item.content}
				</View>
			))}
		</ScrollView>
	);
};