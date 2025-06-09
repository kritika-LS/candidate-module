import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({

  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10,
  },
  tabItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  icon: {
    marginBottom: 4,
  },
  activeIndicator: {
    height: 2,
    marginTop: 6,
    width: '100%',
    backgroundColor: theme.colors.primary.main,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: theme.spacing.xs,
  },

  // DND Section styles
  

})