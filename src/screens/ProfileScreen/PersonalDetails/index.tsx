import React, { useState } from "react";
import { TextStyle } from "../../../components/common/Text";
import { AccordionItem } from "../../../types/profile";
import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
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
import { SaveButton } from "../../../components/features/SaveButton";

interface PersonalDetailsProps {
	expandedItem: string | null;
	setExpandedItem: any;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ expandedItem, setExpandedItem }) => {

	const navigation = useNavigation();
	
	const handleSubmit = () => {
		console.log('Form submitted');
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView style={styles.personalDetailsContainer}>

				<BasicInformationScreen />
				<AddressDetailsScreen />
				<ProfessionalDetailsScreen />
				<PortfolioScreen />
				<JobPreferencesForm />
				<SubmittalInformationScreen />
				<EmergencyContactAddressScreen />

				{/* <PrimaryMenu
					menuItems={accordionItems}
				/> */}
				
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
}