/**
 * MamaGuard Design System
 * Centralized design tokens extracted from original HTML/CSS
 */

export const COLORS = {
  // Primary palette
  primary: '#A8554A',
  dark: '#2E2228',
  cream: '#F7EFE6',
  sage: '#8FA08A',
  card: '#FDF8F2',
  deep: '#F0E6D8',
  muted: '#9B8A84',

  // Risk tier colors
  lowRisk: '#7A9B76',
  watchRisk: '#D9A04B',
  urgentRisk: '#C0463E',
  lowRiskBg: '#EBF2EA',
  watchRiskBg: '#FDF4E3',
  urgentRiskBg: '#FCE9E8',

  // Utility
  border: 'rgba(46,34,40,0.10)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const TYPOGRAPHY = {
  headlineFont: "'Nunito', sans-serif",
  bodyFont: "'Work Sans', sans-serif",
  fontWeights: {
    normal: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  section: '40px',
} as const;

export const BORDER_RADIUS = {
  sm: '8px',
  input: '14px',
  button: '15px',
  card: '20px',
  lg: '30px',
  xl: '32px',
  full: '9999px',
} as const;

export const SHADOWS = {
  sm: '0 10px 30px rgba(0, 0, 0, 0.08)',
  md: '0 20px 50px rgba(0, 0, 0, 0.08)',
  lg: '0 30px 70px rgba(0, 0, 0, 0.12)',
  card: '0 10px 30px rgba(168, 85, 74, 0.12)',
} as const;

export const BREAKPOINTS = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Risk tier mapping
export const RISK_TIERS = {
  LOW: {
    label: 'Low',
    color: COLORS.lowRisk,
    bgColor: COLORS.lowRiskBg,
    minScore: 0,
    maxScore: 30,
  },
  MODERATE: {
    label: 'Moderate',
    color: COLORS.watchRisk,
    bgColor: COLORS.watchRiskBg,
    minScore: 31,
    maxScore: 60,
  },
  HIGH: {
    label: 'High',
    color: COLORS.urgentRisk,
    bgColor: COLORS.urgentRiskBg,
    minScore: 61,
    maxScore: 85,
  },
  CRITICAL: {
    label: 'Critical',
    color: COLORS.urgentRisk,
    bgColor: COLORS.urgentRiskBg,
    minScore: 86,
    maxScore: 100,
  },
} as const;

export const getRiskTierByScore = (score: number) => {
  if (score <= 30) return RISK_TIERS.LOW;
  if (score <= 60) return RISK_TIERS.MODERATE;
  if (score <= 85) return RISK_TIERS.HIGH;
  return RISK_TIERS.CRITICAL;
};
