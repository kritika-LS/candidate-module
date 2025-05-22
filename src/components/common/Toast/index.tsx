import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../theme';

const { width } = Dimensions.get('window');

const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.successToast]}>
      <MaterialIcons name="check-circle" size={24} color="#28A745" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.toastTitle}>{text1}</Text>
        {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.errorToast]}>
      <MaterialIcons name="error" size={24} color="#DC3545" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.toastTitle}>{text1}</Text>
        {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

export { Toast, toastConfig };

const styles = StyleSheet.create({
  toastContainer: {
    width: width * 0.80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Keep them centered vertically
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  successToast: {
    backgroundColor: '#DFF6DD',
    borderColor: theme.colors.status.success,
  },
  errorToast: {
    backgroundColor: '#F8D7DA',
    borderColor: theme.colors.status.error,
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
  textContainer: {
    flex: 1, // Ensures text takes remaining space
  },
  toastTitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  toastMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
