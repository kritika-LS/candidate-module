import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
  
    topBars: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      marginTop: 20,
      marginBottom: 10,
    },
    bar: {
      flex: 1,
      height: 4,
      marginHorizontal: 4,
      borderRadius: 2,
    },
  
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 30,
    },
    arrowWrapper: {
      height: 48,
      width: 48,
      borderRadius: 50 ,
      backgroundColor: '#347CD5',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    arrow: {
      fontSize: 24,
      color: '#fff',
      fontWeight: '600',
    },
    arrowPlaceholder: {
      width: 48,
      height: 48,
    },
    ctaButton: {
      flex: 1,
      marginLeft: 16,
      backgroundColor: '#3A7DFF',
      paddingVertical: 12,
      borderRadius: 24,
      alignItems: 'center',
    },
    ctaText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
    },
});

export default styles;