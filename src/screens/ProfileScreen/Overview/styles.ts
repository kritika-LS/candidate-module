import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#f3f4f6',
      flex: 1,
    },
    card: {
      backgroundColor: '#fff', // bg-white
      borderRadius: 8, // rounded-lg
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      padding: 16,
      marginBottom: 16,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start', // changed from center to flex-start
      marginVertical: 4,
    },
      cardContentSection: {
      marginVertical: 8,
    },
    label: {
      color: '#6b7280', // text-gray-600
      marginRight: 8,
    },
    value: {
      color: '#1f2937', // text-gray-900
      fontWeight: 'medium',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'medium',
      color: '#1f2937',
      marginTop: 8,
      marginBottom: 4,
    },
    badge: {
      backgroundColor: '#e5e7eb', // bg-gray-200
      borderRadius: 16,       // rounded-full (approximated)
      paddingHorizontal: 12,  // px-3
      paddingVertical: 4,    // py-1
      alignSelf: 'flex-start',
    },
    badgeText: {
      color: '#1f2937', // text-gray-900
    },
  });