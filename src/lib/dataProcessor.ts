/**
 * Dynamic Data Processor
 * 
 * Runtime data processing functions that read realRespondents.json directly
 * and perform all statistical calculations on-demand.
 */

import realRespondents from '@/data/realRespondents.json';

export interface RealRespondent {
  Timestamp: number;
  'Email Address': string;
  '  Enrollment Status  ': string;
  '  Current General Weighted Average (GWA)  ': string;
  '  How many hours per day do you spend studying outside of class?  ': string;
  'How often do you attend your scheduled classes?  ': string;
  'How would you describe your time-management skills?  ': string;
  'How frequently do you submit tasks/requirements on time?  ': string;
  'How often do you participate in class activities or discussions?  ': string;
  'Do you experience difficulty balancing workload in your subjects?  ': string;
  'What factors most affect your academic performance? (Choose up to 3)  ': string;
  'Do you believe your enrollment status affects your academic performance?  ': string;
  '  In what way does it affect you? (Short answer)': string;
}

export type EnrollmentStatus = 'Regular' | 'Irregular' | 'All';
export type YearLevel = '1st' | '2nd' | '3rd' | '4th' | 'All';

// Return type definitions
export interface EnrollmentDistribution {
  total: number;
  regular: { count: number; percentage: number };
  irregular: { count: number; percentage: number };
}

export interface GWADistributionCategory {
  range: string;
  label: string;
  regular: { count: number; percentage: number };
  irregular: { count: number; percentage: number };
}

export interface GWADistributionResult {
  categories: GWADistributionCategory[];
  statistics: {
    regular: ReturnType<typeof calculateStats>;
    irregular: ReturnType<typeof calculateStats>;
  };
  byStatus: {
    Regular?: { stats: ReturnType<typeof calculateStats> };
    Irregular?: { stats: ReturnType<typeof calculateStats> };
  };
}

export interface StudyHoursCorrelation {
  correlation: number;
  regular: { averageHours: number };
  irregular: { averageHours: number };
}

export interface PerformanceFactors {
  factors: Array<{ factor: string; count: number; percentage: number }>;
}

export interface StatisticalTests {
  gwaComparison: ReturnType<typeof calculateTTest>;
  studyHoursComparison?: ReturnType<typeof calculateTTest>;
}

export interface ProcessedData {
  enrollmentDistribution: EnrollmentDistribution;
  gwaDistribution: GWADistributionResult;
  studyHours?: StudyHoursCorrelation;
  performanceFactors?: PerformanceFactors;
  statisticalTests?: StatisticalTests;
  qualitativeThemes?: unknown;
}

// Normalization functions
export function cleanEnrollmentStatus(status: string): 'Regular' | 'Irregular' {
  const normalized = status.trim().toLowerCase();
  if (normalized.includes('irregular')) {
    return 'Irregular';
  }
  return 'Regular';
}

export function normalizeGWARange(gwa: string): string {
  const cleaned = gwa.trim();
  const mapping: Record<string, string> = {
    '1.0–1.49': '1.00-1.49',
    '1.5–1.99': '1.50-1.99',
    '2.0–2.49': '2.00-2.49',
    '2.5–2.99': '2.50-2.99',
  };
  return mapping[cleaned] || cleaned;
}

export function getGWAMidpoint(range: string): number {
  const mapping: Record<string, number> = {
    '1.00-1.49': 1.25,
    '1.50-1.99': 1.75,
    '2.00-2.49': 2.25,
    '2.50-2.99': 2.75,
  };
  return mapping[range] || 2.5;
}

export function normalizeStudyHours(hours: string): string {
  const cleaned = hours.trim();
  if (cleaned.includes('Less than 1')) return '<1 hour';
  if (cleaned.includes('1–2') || cleaned.includes('1-2')) return '1-2 hours';
  if (cleaned.includes('3–4') || cleaned.includes('3-4')) return '3-4 hours';
  if (cleaned.includes('More than 4')) return '>4 hours';
  return cleaned;
}

export function getStudyHoursValue(hours: string): number {
  const mapping: Record<string, number> = {
    '<1 hour': 0.5,
    '1-2 hours': 1.5,
    '3-4 hours': 3.5,
    '>4 hours': 5,
  };
  return mapping[hours] || 0;
}

// Get unique respondents (remove duplicates by email)
export function getUniqueRespondents(data: RealRespondent[] = realRespondents): RealRespondent[] {
  const uniqueMap = new Map<string, RealRespondent>();
  
  data.forEach(respondent => {
    const email = respondent['Email Address'];
    if (!uniqueMap.has(email)) {
      uniqueMap.set(email, respondent);
    }
  });
  
  return Array.from(uniqueMap.values());
}

// Filter respondents by criteria
export function filterRespondents(
  data: RealRespondent[],
  filters: {
    enrollmentStatus?: EnrollmentStatus;
    gwaRanges?: string[];
    yearLevel?: YearLevel;
  }
): RealRespondent[] {
  let filtered = data;

  if (filters.enrollmentStatus && filters.enrollmentStatus !== 'All') {
    filtered = filtered.filter(r => 
      cleanEnrollmentStatus(r['  Enrollment Status  ']) === filters.enrollmentStatus
    );
  }

  if (filters.gwaRanges && filters.gwaRanges.length > 0) {
    filtered = filtered.filter(r => {
      const gwa = normalizeGWARange(r['  Current General Weighted Average (GWA)  ']);
      return filters.gwaRanges!.includes(gwa);
    });
  }

  return filtered;
}

// Statistical calculations
export function calculateStats(values: number[]): {
  mean: number;
  median: number;
  stdDev: number;
  mode: number;
  min: number;
  max: number;
} {
  if (values.length === 0) {
    return { mean: 0, median: 0, stdDev: 0, mode: 0, min: 0, max: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  const frequency: Record<number, number> = {};
  values.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
  });
  const mode = Number(Object.keys(frequency).reduce((a, b) => 
    frequency[Number(a)] > frequency[Number(b)] ? a : b
  ));

  return {
    mean: Number(mean.toFixed(2)),
    median: Number(median.toFixed(2)),
    stdDev: Number(stdDev.toFixed(2)),
    mode,
    min: sorted[0],
    max: sorted[sorted.length - 1]
  };
}

// Generate enrollment distribution
export function getEnrollmentDistribution(data: RealRespondent[] = getUniqueRespondents()) {
  const regularCount = data.filter(r => 
    cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Regular'
  ).length;
  const irregularCount = data.length - regularCount;

  return {
    total: data.length,
    regular: {
      count: regularCount,
      percentage: Number(((regularCount / data.length) * 100).toFixed(2))
    },
    irregular: {
      count: irregularCount,
      percentage: Number(((irregularCount / data.length) * 100).toFixed(2))
    }
  };
}

// Generate GWA distribution
export function getGWADistribution(data: RealRespondent[] = getUniqueRespondents()) {
  const gwaRanges = ['1.00-1.49', '1.50-1.99', '2.00-2.49', '2.50-2.99'];
  const gwaLabels: Record<string, string> = {
    '1.00-1.49': 'Excellent',
    '1.50-1.99': 'Very Good',
    '2.00-2.49': 'Good',
    '2.50-2.99': 'Satisfactory'
  };

  const distribution = gwaRanges.map(range => {
    const regularInRange = data.filter(r =>
      cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Regular' &&
      normalizeGWARange(r['  Current General Weighted Average (GWA)  ']) === range
    );
    const irregularInRange = data.filter(r =>
      cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Irregular' &&
      normalizeGWARange(r['  Current General Weighted Average (GWA)  ']) === range
    );

    const regularTotal = data.filter(r => 
      cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Regular'
    ).length;
    const irregularTotal = data.length - regularTotal;

    return {
      range,
      label: gwaLabels[range],
      regular: {
        count: regularInRange.length,
        percentage: regularTotal > 0 ? Number(((regularInRange.length / regularTotal) * 100).toFixed(2)) : 0
      },
      irregular: {
        count: irregularInRange.length,
        percentage: irregularTotal > 0 ? Number(((irregularInRange.length / irregularTotal) * 100).toFixed(2)) : 0
      }
    };
  });

  // Calculate statistics
  const regularGWAs = data
    .filter(r => cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Regular')
    .map(r => getGWAMidpoint(normalizeGWARange(r['  Current General Weighted Average (GWA)  '])));
  
  const irregularGWAs = data
    .filter(r => cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Irregular')
    .map(r => getGWAMidpoint(normalizeGWARange(r['  Current General Weighted Average (GWA)  '])));

  const regularStats = calculateStats(regularGWAs);
  const irregularStats = calculateStats(irregularGWAs);

  return {
    categories: distribution,
    statistics: {
      regular: regularStats,
      irregular: irregularStats
    },
    byStatus: {
      Regular: { stats: regularStats },
      Irregular: { stats: irregularStats }
    }
  };
}

// Calculate correlation between study hours and GWA
export function getStudyHoursCorrelation(data: RealRespondent[] = getUniqueRespondents()): StudyHoursCorrelation {
  // Calculate average study hours by enrollment status
  const regularStudents = data.filter(r => cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Regular');
  const irregularStudents = data.filter(r => cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Irregular');
  
  const regularAvgHours = regularStudents.length > 0 
    ? regularStudents.reduce((sum, r) => sum + getStudyHoursValue(normalizeStudyHours(r['  How many hours per day do you spend studying outside of class?  '])), 0) / regularStudents.length
    : 0;
  
  const irregularAvgHours = irregularStudents.length > 0
    ? irregularStudents.reduce((sum, r) => sum + getStudyHoursValue(normalizeStudyHours(r['  How many hours per day do you spend studying outside of class?  '])), 0) / irregularStudents.length
    : 0;

  // Calculate correlation coefficient (simplified)
  const allHours = data.map(r => getStudyHoursValue(normalizeStudyHours(r['  How many hours per day do you spend studying outside of class?  '])));
  const allGWAs = data.map(r => getGWAMidpoint(normalizeGWARange(r['  Current General Weighted Average (GWA)  '])));
  
  const correlation = calculateCorrelation(allHours, allGWAs);

  return {
    correlation: Number(correlation.toFixed(3)),
    regular: { averageHours: Number(regularAvgHours.toFixed(2)) },
    irregular: { averageHours: Number(irregularAvgHours.toFixed(2)) }
  };
}

// Helper function for correlation calculation
function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n === 0) return 0;
  
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  let denomX = 0;
  let denomY = 0;
  
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }
  
  const denominator = Math.sqrt(denomX * denomY);
  return denominator === 0 ? 0 : numerator / denominator;
}

// Get performance factors distribution
export function getPerformanceFactors(data: RealRespondent[] = getUniqueRespondents()) {
  const factorCounts: Record<string, number> = {};

  data.forEach(respondent => {
    const factors = respondent['What factors most affect your academic performance? (Choose up to 3)  ']
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    factors.forEach(factor => {
      factorCounts[factor] = (factorCounts[factor] || 0) + 1;
    });
  });

  const factors = Object.entries(factorCounts)
    .map(([factor, count]) => ({
      factor,
      count,
      percentage: Number(((count / data.length) * 100).toFixed(2))
    }))
    .sort((a, b) => b.count - a.count);
  
  return { factors };
}

// T-test calculation
export function calculateTTest(group1: number[], group2: number[]) {
  const n1 = group1.length;
  const n2 = group2.length;
  
  const mean1 = group1.reduce((sum, val) => sum + val, 0) / n1;
  const mean2 = group2.reduce((sum, val) => sum + val, 0) / n2;
  
  const variance1 = group1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) / (n1 - 1);
  const variance2 = group2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) / (n2 - 1);
  
  const pooledVariance = ((n1 - 1) * variance1 + (n2 - 1) * variance2) / (n1 + n2 - 2);
  const standardError = Math.sqrt(pooledVariance * (1/n1 + 1/n2));
  
  const tStatistic = (mean1 - mean2) / standardError;
  const degreesOfFreedom = n1 + n2 - 2;
  
  // Simplified p-value approximation (for proper p-value, use statistical library)
  const pValue = tStatistic < -2.5 || tStatistic > 2.5 ? 0.001 : 0.05;
  
  // Cohen's d
  const pooledStdDev = Math.sqrt(pooledVariance);
  const cohensD = (mean1 - mean2) / pooledStdDev;
  
  return {
    tStatistic: Number(tStatistic.toFixed(3)),
    degreesOfFreedom,
    pValue,
    meanDifference: Number((mean1 - mean2).toFixed(3)),
    cohensD: Number(Math.abs(cohensD).toFixed(2)),
    significant: pValue < 0.05
  };
}

// Get comprehensive statistics
export function getStatisticalTests(data: RealRespondent[] = getUniqueRespondents()) {
  const regularGWAs = data
    .filter(r => cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Regular')
    .map(r => getGWAMidpoint(normalizeGWARange(r['  Current General Weighted Average (GWA)  '])));
  
  const irregularGWAs = data
    .filter(r => cleanEnrollmentStatus(r['  Enrollment Status  ']) === 'Irregular')
    .map(r => getGWAMidpoint(normalizeGWARange(r['  Current General Weighted Average (GWA)  '])));

  return {
    gwaComparison: calculateTTest(regularGWAs, irregularGWAs),
    sampleSizes: {
      regular: regularGWAs.length,
      irregular: irregularGWAs.length
    }
  };
}

// Export all data at once with filtering
export function getAllProcessedData(filters?: {
  enrollmentStatus?: EnrollmentStatus;
  gwaRanges?: string[];
  yearLevel?: YearLevel;
}): ProcessedData {
  const unique = getUniqueRespondents();
  const filtered = filters ? filterRespondents(unique, filters) : unique;
  
  return {
    enrollmentDistribution: getEnrollmentDistribution(filtered),
    gwaDistribution: getGWADistribution(filtered),
    studyHours: getStudyHoursCorrelation(filtered),
    performanceFactors: getPerformanceFactors(filtered),
    statisticalTests: getStatisticalTests(filtered)
  };
}
