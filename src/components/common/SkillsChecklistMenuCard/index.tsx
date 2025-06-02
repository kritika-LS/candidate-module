import React from "react";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import Icon from "../Icon/Icon";
import { theme } from "../../../theme";
import { TextStyle } from "../Text";
import { styles } from "./styles";
import Chip from "../Chip";

export type SkillsChecklistMenuCardProps = {
  title: string;
  status?: string | null;
  isDraft?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SkillsChecklistMenuCard: React.FC<SkillsChecklistMenuCardProps> = ({
  title,
  status,
  isDraft = false,
  isSelected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.menuCard,
        isDraft && styles.menuCardDraft,
        isSelected && styles.menuCardSelected,
        style,
      ]}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={[styles.iconContainer, {borderColor: isSelected ? theme.colors.primary.main : theme.colors.grey[300]}]}>
        <Icon
          size={20}
          name="file-document-outline"
          color={isDraft ? theme.colors.accent.main : theme.colors.grey[400]}
        />
      </View>
      <View style={styles.textContainer}>
        <TextStyle
          size="sm"
          color={theme.colors.text.heading}
          style={isSelected ? { color: theme.colors.primary.main } : undefined}
        >
          {title || 'xe4rctvybuhnij'}
        </TextStyle>
        <TextStyle size="xs" color={theme.colors.text.light}>
          {isDraft ? "Draft assessment" : status || "Ready to complete"}
        </TextStyle>
      </View>
      {!isDraft && (
        <Chip chipName="Draft" status="warning" />
      )}
    </TouchableOpacity>
  );
};