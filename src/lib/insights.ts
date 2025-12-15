import { interpretCorrelation } from './constants';

/**
 * Insights Generation Utilities
 *
 * Functions to analyze data patterns and generate academic findings,
 * implications, and recommendations.
 */

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
 * Generate GWA performance finding
 */
export function generateGWAFinding(
  regularMean: number,
  irregularMean: number,
  regularMedian: number,
  irregularMedian: number
): string {
  const gap = calculatePerformanceGap(regularMean, irregularMean);
  const gapValue = Math.abs(gap.gap).toFixed(2);
  const percentDiff = Math.abs(gap.percentage).toFixed(1);

  return `Regular students demonstrate notably better academic performance with a mean GWA of ${regularMean} (median: ${regularMedian}) compared to Irregular students with a mean GWA of ${irregularMean} (median: ${irregularMedian}). The performance gap of ${gapValue} GWA points (${percentDiff}% difference) is ${gap.magnitude} in magnitude, suggesting that enrollment status has a substantial impact on academic achievement.`;
}

/**
 * Generate study habits finding
 */
export function generateStudyHabitsFinding(
  correlationCoefficient: number
): string {
  const corr = interpretCorrelationStrength(correlationCoefficient);
  
  return `A ${corr.strength} ${corr.direction} correlation (r = ${correlationCoefficient.toFixed(2)}) exists between study hours per week and GWA. ${corr.interpretation} This counterintuitive finding suggests that students with lower GWA may be investing more time in studying to compensate for academic challenges, while higher-performing students demonstrate more efficient study habits.`;
}

/**
 * Generate implication about academic support
 */
export function generateAcademicSupportImplication(
  performanceGap: number
): string {
  const gapSize = Math.abs(performanceGap);
  
  if (gapSize > 0.4) {
    return `The substantial performance gap (${gapSize.toFixed(2)} GWA points) between Regular and Irregular students indicates a critical need for targeted academic support interventions. Irregular students may face unique challenges including adjusted schedules, delayed subject sequences, and limited peer study opportunities that require institutional attention.`;
  } else if (gapSize > 0.2) {
    return `The moderate performance gap (${gapSize.toFixed(2)} GWA points) suggests that enrollment status affects academic outcomes. While not extreme, this difference warrants consideration of support mechanisms to help Irregular students succeed academically.`;
  } else {
    return `The minimal performance gap (${gapSize.toFixed(2)} GWA points) indicates that both Regular and Irregular students achieve similar academic outcomes, suggesting effective institutional support systems are in place.`;
  }
}

/**
 * Generate implication about study efficiency
 */
export function generateStudyEfficiencyImplication(): string {
  return `The negative correlation between study hours and GWA raises important questions about study quality versus quantity. This finding implies that simply increasing study time may not improve academic performance; instead, students may benefit more from developing effective study strategies, time management skills, and seeking help when needed rather than extended study sessions.`;
}

/**
 * Generate recommendation for irregular students
 * Note: Recommendations are evidence-based extrapolations from study findings
 */
export function generateIrregularSupportRecommendation(): string {
  return `Implement a comprehensive support program specifically designed for Irregular students, including flexible consultation hours, peer mentoring from successful Irregular students, and academic advising that addresses the unique challenges of non-standard progression paths. Consider creating study groups that accommodate varied schedules.`;
}

/**
 * Generate recommendation for study skills training
 */
export function generateStudySkillsRecommendation(): string {
  return `Establish mandatory study skills workshops focusing on effective learning strategies, time management, and metacognitive techniques. The negative correlation between study hours and performance suggests many students lack efficient study methods. Programs should emphasize quality over quantity in study approaches.`;
}

/**
 * Generate recommendation for early intervention
 */
export function generateEarlyInterventionRecommendation(): string {
  return `Deploy an early warning system to identify struggling students (GWA > 2.0) within the first few weeks of each semester. Provide immediate academic counseling, tutoring services, and study strategy consultations. Early identification and intervention can prevent students from falling into patterns of extended study hours with diminishing returns.`;
}

/**
 * Generate recommendation for curriculum review
 */
export function generateCurriculumRecommendation(): string {
  return `Conduct a comprehensive review of curriculum sequencing and course load distribution, particularly for pathways that lead to Irregular status. Consider implementing bridge courses or summer intensives that allow Irregular students to realign with Regular tracks, reducing the academic performance gap observed in this study.`;
}

/**
 * Format statistical summary for academic presentation
 */
export function formatStatisticalSummary(
  mean: number,
  median: number,
  stdDev: number,
  mode: number
): string {
  return `M = ${mean}, Mdn = ${median}, SD = ${stdDev}, Mode = ${mode}`;
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
