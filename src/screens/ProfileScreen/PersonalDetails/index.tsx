import React, { useState } from "react";
import { TextStyle } from "../../../components/common/Text";
import { AccordionItem } from "../../../types/profile";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "../../../components/common/Icon/Icon";
import { theme } from "../../../theme";
import { styles } from "./styles";
import { Header } from "./Header";
import PersonalDetailsForm from "./PersonalDetailsForm";
import PortfolioScreen from "./Portfolio";
import ProfessionalDetailsScreen from "./ProfessionalDetails";
import SubmittalInformationScreen from "./SubmittalInformation";

interface PersonalDetailsProps {
	expandedItem: string | null;
	setExpandedItem: any;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ expandedItem, setExpandedItem }) => {

	const accordionItems: AccordionItem[] = [
		{
			title: 'Basic Information',
			icon: 'account-circle-outline',
			completed: false,
			content: (
				<View style={styles.accordionContent}>
					
					<Header />

					<PersonalDetailsForm />

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>First Name *</TextStyle>
						<TextInput
							style={styles.input}
							value="Alex"
						/>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Middle Name</TextStyle>
						<TextInput
							style={styles.input}
							placeholder="Enter middle name"
						/>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Profile Title *</TextStyle>
						<TextInput
							style={styles.input}
							value="Registered Nurse"
						/>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Overall Experience *</TextStyle>
						<TextInput
							style={styles.input}
							value="2"
						/>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Email Address *</TextStyle>
						<TextInput
							style={styles.input}
							value="Janecooper@example.com"
						/>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Alternate Email Address</TextStyle>
						<TextInput
							style={styles.input}
							placeholder="Enter alternate email address"
						/>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Mobile Number *</TextStyle>
						<View style={styles.phoneInput}>
							<View style={styles.countryCode}>
								<TextStyle>US (+1)</TextStyle>
							</View>
							<TextInput
								style={[styles.input, { flex: 1 }]}
								placeholder="Enter mobile number"
							/>
						</View>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Alternate Mobile Number</TextStyle>
						<View style={styles.phoneInput}>
							<View style={styles.countryCode}>
								<TextStyle>US (+1)</TextStyle>
							</View>
							<TextInput
								style={[styles.input, { flex: 1 }]}
								placeholder="Enter mobile number"
							/>
						</View>
					</View>

					<View style={styles.formGroup}>
						<TextStyle style={styles.label}>Known As</TextStyle>
						<TextInput
							style={styles.input}
							placeholder="Enter known as"
						/>
					</View>
				</View>
			)
		},
		{
			title: 'Address Details',
			icon: 'home-edit-outline',
			completed: false,
			content: (<View style={styles.accordionContent}><TextStyle>Address Details Form</TextStyle></View>)
		},
		{
			title: 'Professional Details',
			icon: 'book-edit-outline',
			completed: false,
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
			content: <View style={styles.accordionContent}><TextStyle>Job Preferences Form</TextStyle></View>
		},
		{
			title: 'Submittal Information',
			icon: 'clipboard-text-outline',
			completed: true,
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
			content: <View style={styles.accordionContent}><TextStyle>Emergency Contact Form</TextStyle></View>
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

			{accordionItems.map((item, index) => (
				<View key={index} style={styles.accordionItem}>
					<TouchableOpacity
						style={styles.accordionHeader}
						onPress={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
					>
						<View style={styles.accordionTitleContainer}>
							{/* {item.completed ? (
                                <Icon name="check-circle" size={20} color={theme.colors.status.success} />
                            ) : (
                                <View style={styles.incompleteCircle} />
                            )} */}
							<Icon name={item.icon} size={18} color={theme.colors.grey[500]} />
							<TextStyle size="sm" style={styles.accordionTitle}>{item.title}</TextStyle>
						</View>

						<View style={styles.flexRow}>
							{!item.completed ?
								<Icon name="file-alert-outline" size={12} color={theme.colors.status.error} />
								: null
							}
							<Icon
								name={expandedItem === item.title ? "chevron-up" : "chevron-down"}
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
}