/**
 * Data Constants
 *
 * Centralized constants for data interpretation, labels, and configuration.
 */

/**
 * GWA Grading Scale
 * Philippines academic grading system (lower is better)
 */
export const GWA_SCALE = {
  EXCELLENT: { min: 1.0, max: 1.5, label: 'Excellent' },
  ABOVE_AVERAGE: { min: 1.51, max: 2.0, label: 'Above Average' },
  SATISFACTORY: { min: 2.01, max: 2.5, label: 'Satisfactory' },
  FAIR: { min: 2.51, max: 3.0, label: 'Fair' },
  PASSING: { min: 3.01, max: 3.5, label: 'Passing' },
  FAILING: { min: 3.51, max: 5.0, label: 'Failing' },
} as const;

/**
 * Enrollment Status Types
 */
export const ENROLLMENT_STATUS = {
  REGULAR: 'Regular',
  IRREGULAR: 'Irregular',
} as const;

/**
 * Color Palette
 * WCAG AA compliant and colorblind-friendly
 * Per paper specification: Blue for Regular, Red for Irregular students
 */
export const COLORS = {
  // Primary colors for enrollment status
  REGULAR: '#3B82F6', // Blue-500 (Blue per paper)
  IRREGULAR: '#EF4444', // Red-500 (Red per paper specification)

  // Supporting colors
  NEUTRAL: '#6B7280', // Gray-500
  SUCCESS: '#10B981', // Green-500
  WARNING: '#F59E0B', // Amber-500
  ERROR: '#EF4444', // Red-500

  // Background colors
  BACKGROUND_LIGHT: '#F9FAFB', // Gray-50
  BACKGROUND_DARK: '#111827', // Gray-900

  // Chart colors (extended palette for multiple series)
  CHART_PALETTE: [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#8B5CF6', // Purple
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#06B6D4', // Cyan
  ],
} as const;

/**
 * Study Hours Categories
 */
export const STUDY_HOURS_RANGES = [
  { value: '0-5', label: '0-5 hours/week', min: 0, max: 5 },
  { value: '6-10', label: '6-10 hours/week', min: 6, max: 10 },
  { value: '11-15', label: '11-15 hours/week', min: 11, max: 15 },
  { value: '16+', label: '16+ hours/week', min: 16, max: Infinity },
] as const;

/**
 * Correlation Coefficient Interpretation
 */
export function interpretCorrelation(coefficient: number): string {
  const abs = Math.abs(coefficient);

  if (abs >= 0.9) return 'Very Strong';
  if (abs >= 0.7) return 'Strong';
  if (abs >= 0.5) return 'Moderate';
  if (abs >= 0.3) return 'Weak';
  return 'Very Weak';
}

/**
 * GWA Label Helper
 */
export function getGWALabel(gwa: number): string {
  if (gwa >= GWA_SCALE.EXCELLENT.min && gwa <= GWA_SCALE.EXCELLENT.max)
    return GWA_SCALE.EXCELLENT.label;
  if (gwa >= GWA_SCALE.ABOVE_AVERAGE.min && gwa <= GWA_SCALE.ABOVE_AVERAGE.max)
    return GWA_SCALE.ABOVE_AVERAGE.label;
  if (gwa >= GWA_SCALE.SATISFACTORY.min && gwa <= GWA_SCALE.SATISFACTORY.max)
    return GWA_SCALE.SATISFACTORY.label;
  if (gwa >= GWA_SCALE.FAIR.min && gwa <= GWA_SCALE.FAIR.max)
    return GWA_SCALE.FAIR.label;
  if (gwa >= GWA_SCALE.PASSING.min && gwa <= GWA_SCALE.PASSING.max)
    return GWA_SCALE.PASSING.label;
  return GWA_SCALE.FAILING.label;
}

/**
 * Chart Configuration Defaults
 */
export const CHART_CONFIG = {
  // Animation durations (ms)
  ANIMATION_DURATION: 750,
  HOVER_ANIMATION_DURATION: 200,

  // Dimensions
  DEFAULT_HEIGHT: 400,
  MOBILE_HEIGHT: 300,

  // Margins
  MARGIN: { top: 20, right: 30, bottom: 50, left: 60 },

  // Fonts
  FONT_FAMILY: 'system-ui, -apple-system, sans-serif',
  FONT_SIZE: {
    TITLE: 18,
    AXIS_LABEL: 14,
    TICK: 12,
    LEGEND: 13,
    TOOLTIP: 12,
  },

  // Tooltip
  TOOLTIP_OFFSET: 10,
} as const;

/**
 * Accessibility Labels
 */
export const A11Y_LABELS = {
  ENROLLMENT_CHART: 'Pie chart showing enrollment distribution',
  GWA_CHART: 'Bar chart comparing GWA between regular and irregular students',
  STUDY_HOURS_CHART:
    'Combined line and column chart showing study hours versus academic performance',
} as const;
