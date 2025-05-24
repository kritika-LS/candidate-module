import React from "react";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import Icon from "../../common/Icon/Icon";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";
import { styles } from "./styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface ProfileScreenHeaderProps {
  headerIcon?: string;
  headerTitle: string;
  completedStatus?: boolean;
}

export const ProfileScreenHeader: React.FC<ProfileScreenHeaderProps> = ({
  headerIcon,
  headerTitle,
  completedStatus = false,
}) => {
  const navigation = useNavigation<NavigationProp<any>>(); // Replace `any` with your root stack param list if you have it

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.accordionHeader} onPress={handlePress}>
      <View style={styles.accordionTitleContainer}>
        { headerIcon && <Icon name={headerIcon} size={20} color={theme.colors.grey[800]} />}
        <TextStyle size="md" style={styles.accordionTitle}>
          {headerTitle}
        </TextStyle>
      </View>

      <View style={styles.flexRow}>
        {completedStatus ? (
          <View style={styles.flexRow}>
            <Icon
              name="checkmark-circle"
              size={18}
              color={theme.colors.status.success}
            />
            <TextStyle size="xs" color={theme.colors.status.success} style={styles.iconSpacing}>
              Completed
            </TextStyle>
          </View>
        ) : (
          <View style={styles.flexRow}>
            <Icon
              name="file-alert-outline"
              size={18}
              color={theme.colors.status.error}
            />
            <TextStyle size="xs" color={theme.colors.status.error} style={styles.iconSpacing}>
              Incomplete
            </TextStyle>
          </View>
        )}
        <Icon
          name="chevron-up"
          size={24}
          color={theme.colors.grey[500]}
          style={styles.iconSpacing}
        />
      </View>
    </TouchableOpacity>
  );
};
