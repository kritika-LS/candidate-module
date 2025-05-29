import React, { useEffect, useRef } from "react";
import { ScrollView, View, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import BasicInformationScreen from "./BasicInformationScreen";
import AddressDetailsScreen from "./Address";
import ProfessionalDetailsScreen from "./ProfessionalDetails";
import PortfolioScreen from "./Portfolio";
import JobPreferencesForm from "./JobPreferences";
import SubmittalInformationScreen from "./SubmittalInformation";
import EmergencyContactAddressScreen from "./EmergencyContactAndAddress";
import { styles } from "./styles";

export const PersonalDetailsScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const route = useRoute();
  const sectionToScroll: string = (route.params as any)?.section;

  const sectionRefs = {
    BasicInformationScreen: useRef<View>(null),
    AddressDetailsScreen: useRef<View>(null),
    ProfessionalDetailsScreen: useRef<View>(null),
    PortfolioScreen: useRef<View>(null),
    JobPreferencesScreen: useRef<View>(null),
    SubmittalInformationScreen: useRef<View>(null),
    EmergencyContactAddressScreen: useRef<View>(null),
  };

  const scrollToSection = (sectionKey: keyof typeof sectionRefs) => {
    const node = sectionRefs[sectionKey].current;
    if (node && scrollViewRef.current) {
      node.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (_x, y) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        (error) => {
          console.warn("measureLayout error:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (sectionToScroll && sectionRefs[sectionToScroll as keyof typeof sectionRefs]) {
      setTimeout(() => scrollToSection(sectionToScroll as keyof typeof sectionRefs), 500); // delay for layout
    }
  }, [sectionToScroll]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.personalDetailsContainer}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View ref={sectionRefs.BasicInformationScreen}>
            <BasicInformationScreen />
          </View>

          <View ref={sectionRefs.AddressDetailsScreen}>
            <AddressDetailsScreen />
          </View>

          <View ref={sectionRefs.ProfessionalDetailsScreen}>
            <ProfessionalDetailsScreen />
          </View>

          <View ref={sectionRefs.PortfolioScreen}>
            <PortfolioScreen />
          </View>

          <View ref={sectionRefs.JobPreferencesScreen}>
            <JobPreferencesForm />
          </View>

          <View ref={sectionRefs.SubmittalInformationScreen}>
            <SubmittalInformationScreen />
          </View>

          <View ref={sectionRefs.EmergencyContactAddressScreen}>
            <EmergencyContactAddressScreen />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
