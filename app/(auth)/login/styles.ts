import { StyleSheet } from 'react-native';
import { colors, spacing, radii, typography, shadows } from '@/services/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.badgeSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.xl,
    ...shadows.card,
  },
  generalErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: spacing.md,
    borderRadius: radii.sm,
    marginBottom: spacing.lg,
  },
  generalErrorText: {
    fontSize: 14,
    color: colors.danger,
    marginLeft: spacing.sm,
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  inputWrapperError: {
    borderColor: colors.danger,
    backgroundColor: '#FFEBEE',
  },
  inputIcon: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  eyeIcon: {
    padding: spacing.xs,
  },
  errorText: {
    fontSize: 13,
    color: colors.danger,
    marginTop: spacing.xs + 2,
    marginLeft: spacing.xs,
  },
  loginButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radii.md,
    marginTop: spacing.md,
    height: 48,
    ...shadows.button,
  },
  loginButtonDisabled: {
    backgroundColor: '#A5C5FF',
    ...shadows.card,
  },
  loginButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 15,
    color: colors.textSecondary,
    marginRight: spacing.xs + 2,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.secondary,
  },
});
