import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

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
  },
  squareContainer: {
    borderRadius: 8,
  },
  errorStyles: {
    borderColor: 'red',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderLeftWidth: 0.5,
    borderColor: theme.colors.text.light,
    paddingVertical: 0,
  },
  errorTextContainer: {
    borderColor: 'red',
  },
  textStyle: {
    fontSize: 14,
    color: theme.colors.text.primary, // Updated to use primary color for better contrast
    fontWeight: '400',
  },
  labelStyle: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: theme.colors.status.error,
    marginTop: theme.spacing.xs,
  },
});
