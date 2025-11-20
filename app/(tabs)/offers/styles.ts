import { StyleSheet } from 'react-native';
import { colors, spacing, radii, typography, shadows } from '@/services/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  header: {
    padding: spacing.xl,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.card,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerIcon: {
    color: colors.primary,
    marginRight: spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.badgeSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    ...shadows.card,
  },
  offerBadgeIcon: {
    color: colors.primary,
  },
  offerBadgeText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: spacing.xs + 2,
  },
  listContent: {
    padding: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  cardWrapper: {
    width: '48%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.backgroundSoft,
  },
  emptyIcon: {
    color: colors.primary,
  },
  emptyTitle: {
    ...typography.h2,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
});
