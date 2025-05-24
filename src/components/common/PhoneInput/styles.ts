import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

// In your styles.ts file
export const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 8,
  },
  containerStyle: {
    width: '100%',
    borderRadius: 8,
    borderColor: theme.colors.grey[400],
    borderWidth: 1,
    height: 50,
    backgroundColor: theme.colors.text.white,
    // Add any padding or margin adjustments here for the overall container
  },
  squareContainer: {
    borderRadius: 8,
  },
  errorStyles: {
    borderColor: 'red',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    // borderLeftWidth: 0.5, // Remove or set to 0 if you want to remove the separator line
    borderColor: theme.colors.text.light,
    paddingVertical: 0,
    // Adjust padding here if needed to align text better
  },
  errorTextContainer: {
    borderColor: 'red',
  },
  textStyle: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '400',
    // Adjust padding or margin here if the text input itself needs fine-tuning
  },
  labelStyle: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: theme.colors.status.error,
    marginTop: theme.spacing.xs,
  },
  // You might need to add/adjust styles for the country button part if needed
  // countryPickerButtonStyle: {
  //   borderRightWidth: 0, // Example: to remove right border of country picker
  //   backgroundColor: 'transparent',
  // },
});
