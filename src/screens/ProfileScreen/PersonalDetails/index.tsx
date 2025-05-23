import React, { useState } from "react";
import { TextStyle } from "../../../components/common/Text";
import { AccordionItem } from "../../../types/profile";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "../../../components/common/Icon/Icon";
import { theme } from "../../../theme";
import { styles } from "./styles";
import { Header } from "./Header";
import PortfolioScreen from "./Portfolio";
import ProfessionalDetailsScreen from "./ProfessionalDetails";
import SubmittalInformationScreen from "./SubmittalInformation";
import AddressDetailsScreen from "./Address";
import EmergencyContactAddressScreen from "./EmergencyContactAndAddress";
import JobPreferencesForm from "./JobPreferences";
import { useNavigation } from "@react-navigation/native";
import BasicInformationScreen from "./BasicInformationScreen";
import { PrimaryMenu } from "../../../components/common/PrimaryMenu";

interface PersonalDetailsProps {
	expandedItem: string | null;
	setExpandedItem: any;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ expandedItem, setExpandedItem }) => {

	const navigation = useNavigation();

	const accordionItems: AccordionItem[] = [
		{
			title: 'Basic Information',
			icon: 'account-circle-outline',
			completed: false,
			ScreenName: 'BasicInformationScreen',
			content: (
				<View style={styles.accordionContent}>
					
					<Header />

					<BasicInformationScreen />
					
				</View>
			)
		},
		{
			title: 'Address Details',
			icon: 'home-edit-outline',
			completed: false,
			ScreenName: 'AddressDetailsScreen',
			content: (
				<View style={styles.accordionContent}>
					<AddressDetailsScreen />
				</View>
			)
		},
		{
			title: 'Professional Details',
			icon: 'book-edit-outline',
			completed: false,
			ScreenName: 'ProfessionalDetailsScreen',
			content: (
				<View style={styles.accordionContent}>
					<ProfessionalDetailsScreen />
				</View>
			)
		},
		{
			title: 'Portfolio',
			icon: 'web',
			completed: true,
			ScreenName: 'PortfolioScreen',
			content: (
				<View style={styles.accordionContent}>
					<PortfolioScreen />
				</View>

			)
		},
		{
			title: 'Job Preferences',
			icon: 'cog-outline',
			completed: false,
			ScreenName: 'JobPreferencesScreen',
			content: <View style={styles.accordionContent}><JobPreferencesForm /></View>
		},
		{
			title: 'Submittal Information',
			icon: 'clipboard-text-outline',
			completed: true,
			ScreenName: 'SubmittalInformationScreen',
			content: (
				<View style={styles.accordionContent}>
					<SubmittalInformationScreen />
				</View>
			)
		},
		{
			title: 'Emergency Contact and Address',
			icon: 'shield-alert-outline',
			completed: true,
			ScreenName: 'EmergencyContactAddressScreen',
			content: <View style={styles.accordionContent}>
				<EmergencyContactAddressScreen />
			</View>
		}
	];

	return (
		<ScrollView style={styles.personalDetailsContainer}>
			<View style={[styles.flexRow, styles.sectionHeader]}>
				<TextStyle size="md" variant="bold">Personal Details</TextStyle>
				<View style={styles.flexRow}>
					<Icon name="file-alert-outline" size={12} color={theme.colors.status.error} />
					<TextStyle size="xs" color={theme.colors.status.error} style={styles.iconSpacing}>Incomplete</TextStyle>
				</View>
			</View>

			<PrimaryMenu
				menuItems={accordionItems}
			/>
			
		</ScrollView>
	);
}