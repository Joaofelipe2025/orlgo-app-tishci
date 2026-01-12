
import { StyleSheet } from 'react-native';
import { OrlGoColors } from '@/constants/Colors';

export const colors = {
  // Core Colors
  primary: OrlGoColors.primary,
  primaryDark: OrlGoColors.primaryDark,
  primaryLight: OrlGoColors.primaryLight,
  secondary: OrlGoColors.secondary,
  secondaryLight: OrlGoColors.secondaryLight,
  
  // Accent
  accent: OrlGoColors.accent,
  accentDark: OrlGoColors.accentDark,
  accentLight: OrlGoColors.accentLight,
  
  // Text Colors
  text: OrlGoColors.textPrimary,
  textSecondary: OrlGoColors.textSecondary,
  textOnDark: OrlGoColors.textOnDark,
  textMuted: OrlGoColors.textMuted,
  
  // Backgrounds
  background: OrlGoColors.backgroundPrimary,
  backgroundSecondary: OrlGoColors.backgroundSecondary,
  
  // Card & Surface
  card: OrlGoColors.cardLight,
  cardDark: OrlGoColors.cardDark,
  
  // Borders & Dividers
  border: OrlGoColors.borderColor,
  divider: OrlGoColors.dividerColor,
  
  // Semantic Colors
  success: OrlGoColors.success,
  warning: OrlGoColors.warning,
  error: OrlGoColors.error,
  info: OrlGoColors.info,
  
  // Queue Colors
  queueGreen: OrlGoColors.queueGreen,
  queueYellow: OrlGoColors.queueYellow,
  queueRed: OrlGoColors.queueRed,
  queueGray: OrlGoColors.queueGray,
  
  // Shadow
  shadow: OrlGoColors.shadow,
  shadowDark: OrlGoColors.shadowDark,
  
  // Legacy aliases (for backwards compatibility)
  neonGreen: OrlGoColors.accent,
  neonGreenDark: OrlGoColors.accentDark,
  textLight: OrlGoColors.textOnDark,
  textGray: OrlGoColors.textSecondary,
  backgroundGray: '#F9FAFB',
  backgroundDark: OrlGoColors.backgroundSecondary,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: OrlGoColors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  glowPrimary: {
    shadowColor: OrlGoColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  // Legacy alias
  glowPurple: {
    shadowColor: OrlGoColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  cardCompact: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    ...shadows.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
  },
  textSemiBold: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
  textRegular: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.textOnDark,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.xs,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
});
