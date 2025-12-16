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
