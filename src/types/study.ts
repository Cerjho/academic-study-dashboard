/**
 * Study Data Type Definitions
 *
 * Defines the structure for academic study data including
 * enrollment, GWA distribution, and study habits.
 */

export interface StudyMetadata {
  title: string;
  institution: string;
  program: string;
  academicYear: string;
  totalRespondents: number;
  dataCollectionDate: string;
}

export interface EnrollmentData {
  status: 'Regular' | 'Irregular';
  count: number;
  percentage: number;
  color: string;
}

export interface RespondentData {
  studyMetadata: StudyMetadata;
  enrollmentDistribution: EnrollmentData[];
}

export interface StudentGroup {
  count: number;
  percentage: number;
}

export interface GWACategory {
  range: string;
  label: string;
  regular: StudentGroup;
  irregular: StudentGroup;
}

export interface GWAStatistics {
  mean: number;
  median: number;
  stdDeviation: number;
  mode: number;
}

export interface GWADistributionData {
  categories: GWACategory[];
  statistics: {
    regular: GWAStatistics;
    irregular: GWAStatistics;
  };
}

export interface StudyHoursGroup {
  count: number;
  avgGWA: number;
}

export interface StudyHoursData {
  hoursRange: string;
  regular: StudyHoursGroup;
  irregular: StudyHoursGroup;
}

export interface StudyHabitsData {
  studyHoursPerDay: StudyHoursData[];
  correlationCoefficient: number;
  note?: string;
}

// Alias for clarity
export type GWADistribution = GWADistributionData;

// Demographics data
export interface YearLevelDistribution {
  year: string;
  regular: number;
  irregular: number;
  total: number;
}

export interface DemographicsData {
  yearLevel: YearLevelDistribution[];
  note?: string;
}

// Attendance data
export interface AttendanceGroup {
  count: number;
  avgGWA: number | null;
  percentage: number;
}

export interface AttendanceCategory {
  attendance: string;
  regular: AttendanceGroup;
  irregular: AttendanceGroup;
}

export interface AttendanceData {
  categories: AttendanceCategory[];
}

// Time Management data
export interface TimeManagementGroup {
  count: number;
  avgGWA: number | null;
  percentage: number;
}

export interface TimeManagementCategory {
  level: string;
  regular: TimeManagementGroup;
  irregular: TimeManagementGroup;
}

export interface TimeManagementData {
  categories: TimeManagementCategory[];
}

// Performance Factors data
export interface PerformanceFactor {
  factor: string;
  regular: number;
  irregular: number;
  total: number;
  regularPercentage: number;
  irregularPercentage: number;
}

export interface PerformanceFactorsData {
  factors: PerformanceFactor[];
}

// Statistical Tests data
export interface TTestResult {
  description: string;
  tStatistic: number;
  df: number;
  pValue: number;
  significant: boolean;
  cohensD: number;
  interpretation: string;
  mean1: number;
  mean2: number;
  confidenceInterval95: {
    lower: number;
    upper: number;
  };
  regularGroup: {
    n: number;
    mean: number;
    sd: number;
  };
  irregularGroup: {
    n: number;
    mean: number;
    sd: number;
  };
}

export interface CorrelationResult {
  description: string;
  r: number;
  pValue: number;
  significant: boolean;
  interpretation: string;
  n: number;
}

export interface StatisticalTestsData {
  gwaComparison: TTestResult;
  correlations: {
    studyHoursVsGWA: CorrelationResult;
  };
  note?: string;
}

// Qualitative Themes data
export interface QualitativeTheme {
  theme: string;
  description: string;
  frequency: number;
  enrollmentStatus: 'Regular' | 'Irregular' | 'Both';
  representativeQuotes: string[];
}

export interface BeliefDistribution {
  yes: { regular: number; irregular: number };
  no: { regular: number; irregular: number };
  maybe: { regular: number; irregular: number };
}

export interface QualitativeThemesData {
  themes: QualitativeTheme[];
  beliefDistribution: BeliefDistribution;
}
