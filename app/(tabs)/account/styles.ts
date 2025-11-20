import { StyleSheet } from 'react-native';
import { colors, spacing, radii, typography, shadows } from '@/services/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    padding: spacing.xl,
    paddingTop: spacing.xl,
    // paddingBottom se maneja dinámicamente con insets
  },
  iconContainer: {
    marginBottom: spacing.xl,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.badgeSoft,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: spacing.xl,
    lineHeight: 24,
    maxWidth: 300,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    gap: spacing.lg,
  },
  benefitItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  benefitIcon: {
    color: colors.primary,
  },
  benefitText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 80,
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl + spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radii.md,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
    ...shadows.button,
  },
  loginButtonIcon: {
    color: colors.background,
  },
  loginButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: spacing.xxl + spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radii.md,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  registerButtonIcon: {
    color: colors.primary,
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  authenticatedContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom se maneja dinámicamente con insets
  },
  userHeader: {
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userIconContainer: {
    marginBottom: spacing.lg,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.badgeSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    color: colors.primary,
  },
  userName: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  optionsContainer: {
    marginTop: spacing.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.badgeSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  optionIcon: {
    color: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  chevronIcon: {
    color: colors.muted,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.card,
    gap: spacing.sm,
    ...shadows.card,
  },
  logoutButtonIcon: {
    color: colors.danger,
  },
  logoutButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
