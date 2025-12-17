import { interpretCorrelation } from './constants';

/**
 * Insights Generation Utilities
 *
 * Functions to analyze data patterns and generate academic findings,
 * implications, and recommendations with statistical backing.
 */

/**
 * Research Questions
 */
export const RESEARCH_QUESTIONS = {
  RQ1: 'Is there a significant difference in academic performance (GWA) between Regular and Irregular students in the Computer Science program?',
  RQ2: 'What is the relationship between study hours per day and academic achievement (GWA)?',
  RQ3: 'How do attendance patterns, time management skills, and other factors differ between Regular and Irregular students?',
  RQ4: 'What are the primary challenges and factors affecting academic performance as reported by students in each enrollment category?',
} as const;

/**
 * Calculate performance gap between Regular and Irregular students
 */
export function calculatePerformanceGap(
  regularMean: number,
  irregularMean: number
): {
  gap: number;
  percentage: number;
  direction: 'higher' | 'lower';
  magnitude: 'negligible' | 'small' | 'moderate' | 'large';
} {
  const gap = irregularMean - regularMean;
  const percentage = ((gap / regularMean) * 100);
  const direction = gap > 0 ? 'higher' : 'lower';
  const absGap = Math.abs(gap);

  let magnitude: 'negligible' | 'small' | 'moderate' | 'large';
  if (absGap < 0.1) magnitude = 'negligible';
  else if (absGap < 0.3) magnitude = 'small';
  else if (absGap < 0.5) magnitude = 'moderate';
  else magnitude = 'large';

  return { gap, percentage, direction, magnitude };
}

/**
 * Interpret correlation coefficient
 */
export function interpretCorrelationStrength(r: number): {
  strength: string;
  direction: string;
  interpretation: string;
} {
  const abs = Math.abs(r);
  const direction = r < 0 ? 'negative' : 'positive';
  
  let strength: string;
  if (abs >= 0.7) strength = 'strong';
  else if (abs >= 0.4) strength = 'moderate';
  else if (abs >= 0.2) strength = 'weak';
  else strength = 'negligible';

  const interpretation = interpretCorrelation(r);

  return { strength, direction, interpretation };
}

/**
 * Generate enrollment distribution finding
 */
export function generateEnrollmentFinding(
  regularCount: number,
  irregularCount: number,
  total: number
): string {
  const regularPercent = ((regularCount / total) * 100).toFixed(1);
  const irregularPercent = ((irregularCount / total) * 100).toFixed(1);
  const ratio = (regularCount / irregularCount).toFixed(2);

  return `The study sample consists of ${total} Computer Science students at Mabini College, with ${regularCount} (${regularPercent}%) classified as Regular students and ${irregularCount} (${irregularPercent}%) as Irregular students. This represents a ${ratio}:1 ratio of Regular to Irregular students, indicating that the majority of respondents follow the standard academic progression path.`;
}

/**
 * Generate GWA performance finding with statistical backing
 */
export function generateGWAFinding(
  regularMean: number,
  irregularMean: number,
  regularMedian: number,
  irregularMedian: number,
  tStatistic?: number,
  pValue?: number,
  cohensD?: number
): string {
  const gap = calculatePerformanceGap(regularMean, irregularMean);
  const gapValue = Math.abs(gap.gap).toFixed(2);
  const percentDiff = Math.abs(gap.percentage).toFixed(1);

  let statSummary = '';
  if (tStatistic && pValue !== undefined && cohensD) {
    const significance = pValue < 0.001 ? 'highly significant' : pValue < 0.01 ? 'very significant' : 'significant';
    const effectSize = interpretEffectSize(cohensD);
    statSummary = ` This difference is ${significance} (t = ${tStatistic.toFixed(3)}, p < ${pValue < 0.001 ? '0.001' : pValue.toFixed(3)}) with a ${effectSize} effect size (Cohen's d = ${cohensD.toFixed(2)}), demonstrating a substantial performance gap.`;
  }

  return `${RESEARCH_QUESTIONS.RQ1}\n\nRegular students (Mean GWA = ${regularMean.toFixed(2)}, Median = ${regularMedian.toFixed(2)}) demonstrate ${percentDiff}% better academic performance compared to irregular students (Mean GWA = ${irregularMean.toFixed(2)}, Median = ${irregularMedian.toFixed(2)}), representing a ${gapValue}-point difference in the Philippine GWA system.${statSummary}`;
}

/**
 * Generate insights for study habits and GWA correlation with statistical significance
 */
export function generateStudyHabitsFinding(
  correlationCoefficient: number,
  pValue?: number,
  sampleSize?: number
): string {
  const corr = interpretCorrelationStrength(correlationCoefficient);
  
  let statSummary = '';
  if (pValue !== undefined && sampleSize) {
    const significance = pValue < 0.001 ? 'highly significant' : pValue < 0.01 ? 'very significant' : 'significant';
    statSummary = ` This correlation is ${significance} (p < ${pValue < 0.001 ? '0.001' : pValue.toFixed(3)}, n = ${sampleSize}), indicating a reliable relationship in the population.`;
  }
  
  return `${RESEARCH_QUESTIONS.RQ2}\n\nA ${corr.strength} ${corr.direction} correlation (r = ${correlationCoefficient.toFixed(3)}) exists between study hours per day and GWA. ${corr.interpretation}${statSummary}`;
}

/**
 * Format statistical summary for academic presentation
 */
export function formatStatisticalSummary(
  mean: number,
  sd: number,
  n: number
): string {
  return `M = ${mean.toFixed(2)}, SD = ${sd.toFixed(2)}, n = ${n}`;
}

/**
 * Generate confidence interval description
 */
export function formatConfidenceInterval(
  lower: number,
  upper: number,
  confidenceLevel: number = 95
): string {
  return `${confidenceLevel}% CI [${lower.toFixed(2)}, ${upper.toFixed(2)}]`;
}

/**
 * Interpret effect size (Cohen's d)
 */
export function interpretEffectSize(d: number): string {
  const abs = Math.abs(d);
  if (abs < 0.2) return 'negligible';
  if (abs < 0.5) return 'small';
  if (abs < 0.8) return 'medium';
  return 'large';
}

/**
 * Generate research hypothesis result
 */
export function generateHypothesisResult(
  pValue: number,
  alpha: number = 0.05,
  hypothesisStatement: string
): string {
  if (pValue < alpha) {
    return `The null hypothesis is rejected (p ${pValue < 0.001 ? '< 0.001' : `= ${pValue.toFixed(3)}`}). ${hypothesisStatement}`;
  }
  return `The null hypothesis is not rejected (p = ${pValue.toFixed(3)}). Insufficient evidence to support ${hypothesisStatement.toLowerCase()}`;
}

/**
 * Determine priority level based on performance gap
 */
export function determinePriority(
  gap: number
): 'high' | 'medium' | 'low' {
  const absGap = Math.abs(gap);
  if (absGap > 0.4) return 'high';
  if (absGap > 0.2) return 'medium';
  return 'low';
}
