import React from "react";
import { ScrollView, View } from "react-native";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { styles } from "./styles";

import {
  SectionCard,
  CardItem,
  IconItem,
  BadgeItem
} from "../../../components/common/SectionCard"; // Update path
import { TextStyle } from "../../../components/common/Text";
import { capitalize } from "../../../utils/textUtils";

export const OverviewSection = () => {
  const candidateData = useAppSelector((state) => state?.candidatePersonalDetails?.personalDetails?.responsePayload) || {};
  const {
    emailAddress,
    mobileNumber,
    alternatePhoneNumber,
    alternateEmailAddress,
    profileTitle,
    resumes = [],
    overallYearsOfExperience,
    workTypePreference,
    preferredLocation,
    preferredShift,
    shiftStartTime,
    shiftEndTime,
    ratePerHour,
    currency,
  } = candidateData || {};

  return (
    <ScrollView style={styles.container}>
      <SectionCard title="Professional Details">
        <CardItem label="Role" value={`${profileTitle} - ${resumes[0]?.specialties || "-"}`} />
        <CardItem label="Experience" value={`${overallYearsOfExperience || "-"} Years`} />
      </SectionCard>

      <SectionCard title="Contact Information">
        <View style={styles.cardContentSection}>
          <TextStyle style={styles.sectionTitle}>Primary</TextStyle>
          <CardItem label="Phone" value={mobileNumber || "Not updated"} />
          <CardItem label="Email" value={emailAddress || "Not updated"} />
        </View>

        <View style={styles.cardContentSection}>
          <TextStyle style={styles.sectionTitle}>Alternate</TextStyle>
          <CardItem label="Phone" value={alternatePhoneNumber || "Not updated"} />
          <CardItem label="Email" value={alternateEmailAddress || "Not updated"} />
        </View>
      </SectionCard>

      <SectionCard title="Job Preferences" style={{marginBottom: 30}}>
        <BadgeItem icon="watch-import-variant" text={shiftStartTime && shiftEndTime ? `${shiftStartTime} - ${shiftEndTime}` : "-"} />
        <BadgeItem icon="weather-sunset-up" text={capitalize(preferredShift) || '-'} />
        <BadgeItem icon="map-marker-outline" text={preferredLocation || '-'} />
        <IconItem icon="file-clock-outline" label={workTypePreference || '-'} />
        <IconItem icon="currency-usd" label={currency || '-'} />
        <IconItem icon="cash-multiple" label={ratePerHour || '-'} />
      </SectionCard>
    </ScrollView>
  );
};
