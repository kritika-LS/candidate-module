import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "../Icon/Icon";
import { TextStyle } from "../Text";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { styles } from "./styles";
import { theme } from "../../../theme";

// Define the menu item type
interface MenuItem {
  icon: string;
  title: string;
  ScreenName: string;
  completed?: boolean;
}

// Define the component props
interface PrimaryMenuProps {
  menuItems: MenuItem[];
}

export const PrimaryMenu: React.FC<PrimaryMenuProps> = ({ menuItems }) => {
  const navigation = useNavigation<NavigationProp<any>>(); // Replace `any` with your stack type if available

  return (
    <View style={styles.accordionItem}>
      {menuItems.map((item, index) => {
        const handlePress = () => {
          navigation.navigate(item.ScreenName);
        };

        return (
          <TouchableOpacity
            key={index}
            style={styles.accordionHeader}
            onPress={handlePress}
          >
            <View style={styles.accordionTitleContainer}>
              <Icon name={item.icon} size={18} color={theme.colors.grey[500]} />
              <TextStyle size="sm" style={styles.accordionTitle}>
                {item.title}
              </TextStyle>
            </View>

            <View style={styles.flexRow}>
              {!item.completed && (
                <Icon
                  name="file-alert-outline"
                  size={12}
                  color={theme.colors.status.error}
                />
              )}
              <Icon
                name="chevron-down"
                size={20}
                color={theme.colors.grey[500]}
                style={styles.iconSpacing}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
