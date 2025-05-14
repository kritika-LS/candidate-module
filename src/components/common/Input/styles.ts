import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {theme} from '../../../theme';

type Styles = {
  container: ViewStyle;
  label: TextStyle;
  labelDisabled: TextStyle;
  asterisk: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  inputWithIcon: TextStyle;
  inputError: TextStyle;
  inputDisabled: TextStyle;
  errorText: TextStyle;
  rightIconContainer: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.primary,
  },
  labelDisabled: {
    color: theme.colors.text.disabled,
  },
  asterisk: {
    color: theme.colors.status.error,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.paper,
  },
  inputWithIcon: {
    paddingRight: theme.spacing.xl * 2,
  },
  inputError: {
    borderColor: theme.colors.status.error,
  },
  inputDisabled: {
    backgroundColor: theme.colors.grey[100],
    borderColor: theme.colors.grey[300],
    color: theme.colors.text.disabled,
  },
  errorText: {
    color: theme.colors.status.error,
    marginTop: theme.spacing.xs,
  },
  rightIconContainer: {
    position: 'absolute',
    right: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
