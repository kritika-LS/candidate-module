import {StyleSheet, Platform, StatusBar} from 'react-native';
import {theme} from '../../../theme';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.primary.main,
    paddingTop: STATUSBAR_HEIGHT,
  },
  container: {
    height: 56,
    backgroundColor: theme.colors.primary.main,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  backButton: {
    height: 26,
    width: 26,
    borderWidth: 1.33,
    borderColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: theme.spacing.md,
  },
  logo: {
    height: 32,
    width: 150,
  },
  title: {
    flex: 1,
    color: theme.colors.text.white,
    marginLeft: theme.spacing.md,
  },
});
