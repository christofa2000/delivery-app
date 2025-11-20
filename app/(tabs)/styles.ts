import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/services/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
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
