export const theme = {
  colors: {
    primary: '#4CB7A5', // Mint Blue (from reference image)
    secondary: '#E94F8A', // Pink accent (from shoes in image)
    text: '#183642', // Deep teal/dark blue for text
    mutedText: '#5A7D85', // Muted blue-gray for secondary text
    background: '#FFFFFF', // Pure white background
    cardBackground: '#C2E7E2', // Soft mint blue for cards
    error: '#FF6B6B',
    success: '#4BB543',
    // New modern colors
    surface: '#F8FAFC',
    surfaceVariant: '#F1F5F9',
    outline: '#E2E8F0',
    outlineVariant: '#CBD5E1',
    onSurface: '#1E293B',
    onSurfaceVariant: '#64748B',
  },
  typography: {
    displayLarge: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: '40px',
      letterSpacing: -0.5,
    },
    displayMedium: {
      fontSize: 28,
      fontWeight: '600',
      lineHeight: '36px',
      letterSpacing: -0.25,
    },
    displaySmall: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: '32px',
      letterSpacing: 0,
    },
    headlineLarge: {
      fontSize: 22,
      fontWeight: '600',
      lineHeight: '28px',
      letterSpacing: 0,
    },
    headlineMedium: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: '26px',
      letterSpacing: 0.15,
    },
    headlineSmall: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: '24px',
      letterSpacing: 0.1,
    },
    titleLarge: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: '22px',
      letterSpacing: 0.15,
    },
    titleMedium: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: '20px',
      letterSpacing: 0.1,
    },
    titleSmall: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: '16px',
      letterSpacing: 0.5,
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: '24px',
      letterSpacing: 0.5,
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: 0.25,
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: '16px',
      letterSpacing: 0.4,
    },
    labelLarge: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: '20px',
      letterSpacing: 0.1,
    },
    labelMedium: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: '16px',
      letterSpacing: 0.5,
    },
    labelSmall: {
      fontSize: 10,
      fontWeight: '500',
      lineHeight: '14px',
      letterSpacing: 0.5,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
};

// Default export for compatibility
export default theme; 