
/**
 * Clean, Flat, Minimalist Color Palette
 * White base with Royal Blue accents - NO GRADIENTS
 */

export const OrlGoColors = {
  // Base Colors
  white: '#FFFFFF',
  primaryText: '#0B0F19',
  
  // Royal Blue System
  royalBlue: '#1E2BFF',
  royalBluePressed: '#1620CC',
  royalBlueSoft: '#E8EBFF',
  
  // Neutral Greys
  lightBackground: '#F6F7FB',
  sectionBackground: '#EEF1F6',
  borderColor: '#E3E7EF',
  secondaryText: '#6B7280',
  
  // Semantic States
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Queue Colors (functional - keep for wait times)
  queueGreen: '#16A34A',
  queueYellow: '#F59E0B',
  queueRed: '#EF4444',
  queueGray: '#6B7280',
};

/**
 * Theme-aware colors that adapt to light/dark mode
 */
export const Colors = {
  light: {
    text: OrlGoColors.primaryText,
    textSecondary: OrlGoColors.secondaryText,
    background: OrlGoColors.white,
    backgroundSecondary: OrlGoColors.lightBackground,
    card: OrlGoColors.white,
    border: OrlGoColors.borderColor,
    primary: OrlGoColors.royalBlue,
    primaryPressed: OrlGoColors.royalBluePressed,
    primarySoft: OrlGoColors.royalBlueSoft,
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    tint: OrlGoColors.royalBlue,
    tabIconDefault: OrlGoColors.secondaryText,
    tabIconSelected: OrlGoColors.royalBlue,
  },
  dark: {
    text: OrlGoColors.white,
    textSecondary: OrlGoColors.secondaryText,
    background: '#0B0F19',
    backgroundSecondary: '#1A1F2E',
    card: '#1A1F2E',
    border: '#2A2F3E',
    primary: OrlGoColors.royalBlue,
    primaryPressed: OrlGoColors.royalBluePressed,
    primarySoft: OrlGoColors.royalBlueSoft,
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    tint: OrlGoColors.royalBlue,
    tabIconDefault: OrlGoColors.secondaryText,
    tabIconSelected: OrlGoColors.royalBlue,
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
