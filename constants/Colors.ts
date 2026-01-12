
/**
 * OrlGo Brand Colors
 * Purple-themed color palette for the Orlando theme park guide app
 */

export const OrlGoColors = {
  // Primary Brand Colors
  primary: '#6A00F5',           // Primary Purple
  primaryDark: '#5500C7',       // Darker Purple
  primaryLight: '#8A33FF',      // Lighter Purple
  
  // Accent Colors
  neonGreen: '#C6FF00',         // Neon Green (CTAs, highlights)
  neonGreenDark: '#A8D900',     // Darker Neon Green
  
  // Gradients
  gradientStart: '#6A00F5',     // Purple gradient start
  gradientEnd: '#9A00FF',       // Purple gradient end
  gradientGreen: '#C6FF00',     // Green gradient accent
  
  // Wait Time Colors (Queue Status)
  queueGreen: '#C6FF00',        // 0-30 min (short wait)
  queueYellow: '#FFC300',       // 31-60 min (medium wait)
  queueRed: '#FF3C38',          // 61+ min (long wait)
  queueGray: '#8E8E93',         // Closed/Unknown
  
  // Semantic Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Text Colors (Light Mode)
  textLight: '#FFFFFF',
  textDark: '#1A1A1A',
  textGray: '#8E8E93',
  textMuted: '#C7C7CC',
  
  // Background Colors (Light Mode)
  backgroundLight: '#FFFFFF',
  backgroundGray: '#F2F2F7',
  backgroundDark: '#1C1C1E',
  
  // Card & Surface Colors
  cardLight: '#FFFFFF',
  cardDark: '#2C2C2E',
  
  // Border Colors
  border: '#E5E5EA',
  borderDark: '#38383A',
  
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
    text: OrlGoColors.textDark,
    textSecondary: OrlGoColors.textGray,
    textMuted: OrlGoColors.textMuted,
    background: OrlGoColors.backgroundLight,
    backgroundSecondary: OrlGoColors.backgroundGray,
    card: OrlGoColors.cardLight,
    border: OrlGoColors.border,
    primary: OrlGoColors.primary,
    accent: OrlGoColors.neonGreen,
    shadow: OrlGoColors.shadow,
    overlay: OrlGoColors.overlay,
    tint: OrlGoColors.primary,
    tabIconDefault: OrlGoColors.textGray,
    tabIconSelected: OrlGoColors.primary,
  },
  dark: {
    text: OrlGoColors.textLight,
    textSecondary: OrlGoColors.textGray,
    textMuted: OrlGoColors.textMuted,
    background: OrlGoColors.backgroundDark,
    backgroundSecondary: '#000000',
    card: OrlGoColors.cardDark,
    border: OrlGoColors.borderDark,
    primary: OrlGoColors.primary,
    accent: OrlGoColors.neonGreen,
    shadow: OrlGoColors.shadowDark,
    overlay: OrlGoColors.overlay,
    tint: OrlGoColors.primaryLight,
    tabIconDefault: OrlGoColors.textGray,
    tabIconSelected: OrlGoColors.neonGreen,
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
