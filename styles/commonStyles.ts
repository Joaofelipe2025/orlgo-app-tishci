
import { StyleSheet } from 'react-native';
import { OrlGoColors } from '@/constants/Colors';

export const colors = {
  // Base Colors
  white: OrlGoColors.white,
  primaryText: OrlGoColors.primaryText,
  
  // Royal Blue System
  primary: OrlGoColors.royalBlue,
  primaryPressed: OrlGoColors.royalBluePressed,
  primarySoft: OrlGoColors.royalBlueSoft,
  
  // Neutral Greys
  lightBackground: OrlGoColors.lightBackground,
  sectionBackground: OrlGoColors.sectionBackground,
  border: OrlGoColors.borderColor,
  secondaryText: OrlGoColors.secondaryText,
  
  // Semantic Colors
  success: OrlGoColors.success,
  warning: OrlGoColors.warning,
  error: OrlGoColors.error,
  
  // Queue Colors
  queueGreen: OrlGoColors.queueGreen,
  queueYellow: OrlGoColors.queueYellow,
  queueRed: OrlGoColors.queueRed,
  queueGray: OrlGoColors.queueGray,
  
  // Legacy aliases (for backwards compatibility)
  text: OrlGoColors.primaryText,
  textSecondary: OrlGoColors.secondaryText,
  textOnDark: OrlGoColors.white,
  background: OrlGoColors.white,
  backgroundSecondary: OrlGoColors.lightBackground,
  card: OrlGoColors.white,
  shadow: 'rgba(0, 0, 0, 0.08)',
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
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardCompact: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
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
    color: colors.secondaryText,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
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
