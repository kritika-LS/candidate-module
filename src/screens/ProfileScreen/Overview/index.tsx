import React from "react";
import { ScrollView, View } from "react-native";
import { TextStyle } from "../../../components/common/Text";
import { styles } from "./styles";

export const OverviewSection = () => {
    return (
        <ScrollView style={styles.container}>
          {/* <TextStyle style={styles.title}>Overview</TextStyle> */}
    
          <View style={styles.card}>
            <TextStyle size="md" variant="bold">Professional Details</TextStyle>
            <View style={styles.cardContent}>
              <TextStyle size="sm">Role:</TextStyle>
              <TextStyle size="sm">RN - Behavioral Health</TextStyle>
            </View>
            <View style={styles.cardContent}>
              <TextStyle size="sm">Experience:</TextStyle>
              <TextStyle size="sm">3 Years</TextStyle>
            </View>
          </View>
    
          <View style={styles.card}>
            <TextStyle size="md" variant="bold">Contact Information</TextStyle>
            <View style={styles.cardContentSection}>
              <TextStyle style={styles.sectionTitle}>Primary</TextStyle>
              <View style={styles.cardContent}>
                <TextStyle size="sm">Phone:</TextStyle>
                <TextStyle size="sm">+1 54265589262</TextStyle>
              </View>
              <View style={styles.cardContent}>
                <TextStyle size="sm">Email:</TextStyle>
                <TextStyle size="sm">Kritika.J@lancesoft.com</TextStyle>
              </View>
            </View>
            <View style={styles.cardContentSection}>
              <TextStyle style={styles.sectionTitle}>Alternate</TextStyle>
              <View style={styles.cardContent}>
                <TextStyle size="sm">Phone:</TextStyle>
                <TextStyle size="sm">Not updated</TextStyle>
              </View>
              <View style={styles.cardContent}>
                <TextStyle size="sm">Email:</TextStyle>
                <TextStyle size="sm">Not updated</TextStyle>
              </View>
            </View>
          </View>
    
          <View style={styles.card}>
            <TextStyle size="md" variant="bold">Job Preferences</TextStyle>
            <View style={styles.cardContent}>
              <TextStyle size="sm">Day:</TextStyle>
              <View style={styles.badge}>
                <TextStyle size="sm">Day</TextStyle>
              </View>
            </View>
            <View style={styles.cardContent}>
                <TextStyle size="sm">MH:</TextStyle>
                 <View style={styles.badge}>
                <TextStyle size="sm">MH</TextStyle>
              </View>
            </View>
            <View style={styles.cardContent}>
              <TextStyle size="sm">Travel:</TextStyle>
              <TextStyle size="sm">-</TextStyle>
            </View>
          </View>
        </ScrollView>
      );
}