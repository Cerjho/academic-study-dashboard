/**
 * Data Loader Functions
 *
 * Centralized data loading utilities for the academic study dashboard.
 * All data is imported from static JSON files and typed with TypeScript interfaces.
 */

import respondentsData from './respondents.json';
import gwaData from './gwaDistribution.json';
import studyHabitsData from './studyHabits.json';
import demographicsData from './demographics.json';
import attendanceData from './attendance.json';
import timeManagementData from './timeManagement.json';
import performanceFactorsData from './performanceFactors.json';
import statisticalTestsData from './statisticalTests.json';
import qualitativeThemesData from './qualitativeThemes.json';

import type {
  RespondentData,
  GWADistributionData,
  StudyHabitsData,
  DemographicsData,
  AttendanceData,
  TimeManagementData,
  PerformanceFactorsData,
  StatisticalTestsData,
  QualitativeThemesData,
} from '@/types';

/**
 * Get respondent and enrollment distribution data
 */
export function getRespondentData(): RespondentData {
  return respondentsData as RespondentData;
}

/**
 * Get GWA distribution and statistics
 */
export function getGWADistribution(): GWADistributionData {
  return gwaData as GWADistributionData;
}

/**
 * Get study habits and correlation data
 */
export function getStudyHabitsData(): StudyHabitsData {
  return studyHabitsData as StudyHabitsData;
}

/**
 * Get demographics data (year level distribution)
 */
export function getDemographicsData(): DemographicsData {
  return demographicsData as DemographicsData;
}

/**
 * Get attendance patterns data
 */
export function getAttendanceData(): AttendanceData {
  return attendanceData as AttendanceData;
}

/**
 * Get time management skills data
 */
export function getTimeManagementData(): TimeManagementData {
  return timeManagementData as TimeManagementData;
}

/**
 * Get performance factors data
 */
export function getPerformanceFactorsData(): PerformanceFactorsData {
  return performanceFactorsData as PerformanceFactorsData;
}

/**
 * Get statistical tests results
 */
export function getStatisticalTestsData(): StatisticalTestsData {
  return statisticalTestsData as StatisticalTestsData;
}

/**
 * Get qualitative themes and analysis
 */
export function getQualitativeThemesData(): QualitativeThemesData {
  return qualitativeThemesData as QualitativeThemesData;
}

/**
 * Get all study data in a single object
 */
export function getAllStudyData() {
  return {
    respondents: getRespondentData(),
    gwaDistribution: getGWADistribution(),
    studyHabits: getStudyHabitsData(),
    demographics: getDemographicsData(),
    attendance: getAttendanceData(),
    timeManagement: getTimeManagementData(),
    performanceFactors: getPerformanceFactorsData(),
    statisticalTests: getStatisticalTestsData(),
    qualitativeThemes: getQualitativeThemesData(),
  };
}
