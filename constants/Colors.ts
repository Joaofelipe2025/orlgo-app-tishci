
/**
 * Orlando-Inspired Modern & Premium Color Palette
 * Blue-themed color palette for the Orlando theme park guide app
 */

export const OrlGoColors = {
  // Core Colors
  primary: '#0B4D9C',              // Primary Blue - buttons, CTAs, active states, links
  primaryDark: '#083A75',          // Darker Blue
  primaryLight: '#1565C0',         // Lighter Blue
  
  secondary: '#081F3D',            // Secondary Dark Blue - headers, tab bars, navigation
  secondaryLight: '#0E2A47',       // Lighter Secondary
  
  // Backgrounds
  backgroundPrimary: '#F5F7FA',    // Main app background (light)
  backgroundSecondary: '#0E2A47',  // Sections, cards on dark mode, hero backgrounds
  
  // Accent & Energy
  accent: '#FF8A3D',               // Orange accent - icons, badges, progress, important actions
  accentDark: '#E67429',           // Darker accent
  accentLight: '#FFA366',          // Lighter accent
  
  // Neutral Scale
  textPrimary: '#0A0A0A',          // Primary text color
  textSecondary: '#6B7280',        // Secondary text color
  textOnDark: '#FFFFFF',           // Text on dark backgrounds
  textMuted: '#9CA3AF',            // Muted text
  
  borderColor: '#E5E7EB',          // Border color
  dividerColor: '#E2E8F0',         // Divider color
  
  // Wait Time Colors (Queue Status) - keeping functional colors
  queueGreen: '#10B981',           // 0-30 min (short wait)
  queueYellow: '#F59E0B',          // 31-60 min (medium wait)
  queueRed: '#EF4444',             // 61+ min (long wait)
  queueGray: '#6B7280',            // Closed/Unknown
  
  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#0B4D9C',
  
  // Card & Surface Colors
  cardLight: '#FFFFFF',
  cardDark: '#1F2937',
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

/**
 * Theme-aware colors that adapt to light/dark mode
 */
export const Colors = {
  light: {
    text: OrlGoColors.textPrimary,
    textSecondary: OrlGoColors.textSecondary,
    textMuted: OrlGoColors.textMuted,
    background: OrlGoColors.backgroundPrimary,
    backgroundSecondary: '#FFFFFF',
    card: OrlGoColors.cardLight,
    border: OrlGoColors.borderColor,
    primary: OrlGoColors.primary,
    accent: OrlGoColors.accent,
    shadow: OrlGoColors.shadow,
    overlay: OrlGoColors.overlay,
    tint: OrlGoColors.primary,
    tabIconDefault: OrlGoColors.textSecondary,
    tabIconSelected: OrlGoColors.primary,
  },
  dark: {
    text: OrlGoColors.textOnDark,
    textSecondary: OrlGoColors.textSecondary,
    textMuted: OrlGoColors.textMuted,
    background: '#111827',
    backgroundSecondary: OrlGoColors.backgroundSecondary,
    card: OrlGoColors.cardDark,
    border: '#374151',
    primary: OrlGoColors.primary,
    accent: OrlGoColors.accent,
    shadow: OrlGoColors.shadowDark,
    overlay: OrlGoColors.overlay,
    tint: OrlGoColors.primaryLight,
    tabIconDefault: OrlGoColors.textSecondary,
    tabIconSelected: OrlGoColors.accent,
  },
};

/**
 * Get wait time color based on minutes
 */
export function getWaitTimeColor(waitTime: number | null): string {
  if (waitTime === null || waitTime === undefined) {
    return OrlGoColors.queueGray;
  }
  
  if (waitTime <= 30) {
    return OrlGoColors.queueGreen;
  } else if (waitTime <= 60) {
    return OrlGoColors.queueYellow;
  } else {
    return OrlGoColors.queueRed;
  }
}

/**
 * Get wait time label
 */
export function getWaitTimeLabel(waitTime: number | null): string {
  if (waitTime === null || waitTime === undefined) {
    return 'Sem informação';
  }
  
  if (waitTime === 0) {
    return 'Sem fila';
  }
  
  return `${waitTime} min`;
}

/**
 * Get queue status text
 */
export function getQueueStatus(waitTime: number | null): 'short' | 'medium' | 'long' | 'unknown' {
  if (waitTime === null || waitTime === undefined) {
    return 'unknown';
  }
  
  if (waitTime <= 30) {
    return 'short';
  } else if (waitTime <= 60) {
    return 'medium';
  } else {
    return 'long';
  }
}

// Legacy export for backwards compatibility
export const appleBlue = OrlGoColors.primary;
export const zincColors = {
  50: '#FAFAFA',
  100: '#F4F4F5',
  200: '#E4E4E7',
  300: '#D4D4D8',
  400: '#A1A1AA',
  500: '#71717A',
  600: '#52525B',
  700: '#3F3F46',
  800: '#27272A',
  900: '#18181B',
};
