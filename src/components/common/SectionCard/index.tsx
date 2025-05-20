// components/SectionCard.tsx
import React from "react";
import { View } from "react-native";
import { TextStyle } from "../Text";
import Icon from "../Icon/Icon";
import { styles } from "./styles";
import { theme } from "../../../theme";

export const SectionCard = ({ title, children, style }: { title: string; children: React.ReactNode, style?: {} }) => (
  <View style={[styles.card, style]}>
    <TextStyle size="md" variant="bold">{title}</TextStyle>
    {children}
  </View>
);

export const CardItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.cardContent}>
    <TextStyle size="sm">{label}:</TextStyle>
    <TextStyle size="sm">{value}</TextStyle>
  </View>
);

export const IconItem = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.cardContent}>
    <Icon name={icon} size={16} color={theme.colors.text.light} />
    <TextStyle size="sm">{label}</TextStyle>
  </View>
);

export const BadgeItem = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.cardContent}>
    <Icon name={icon} size={16} color={theme.colors.text.light} />
    <View style={styles.badge}>
      <TextStyle size="sm">{text}</TextStyle>
    </View>
  </View>
);
