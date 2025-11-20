import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/services/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    // paddingBottom se maneja dinámicamente con insets
  },
  categorySection: {
    marginTop: spacing.xl,
  },
  categoryTitle: {
    ...typography.h3,
    marginLeft: spacing.lg,
    marginBottom: spacing.lg,
  },
  horizontalList: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
});
