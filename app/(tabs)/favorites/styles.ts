import { StyleSheet } from 'react-native';
import { colors, spacing, radii, typography, shadows } from '@/services/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    padding: spacing.xl,
  },
  iconContainer: {
    backgroundColor: colors.badgeSoft,
    borderRadius: radii.pill,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.card,
  },
  icon: {
    color: colors.primary,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xxl,
    maxWidth: 300,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    gap: spacing.xl,
  },
  featureItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  featureIcon: {
    color: colors.primary,
  },
  featureText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    gap: spacing.sm,
    ...shadows.card,
  },
  exploreButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

