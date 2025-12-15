/**
 * Data Loader Functions
 *
 * Centralized data loading utilities for the academic study dashboard.
 * All data is imported from static JSON files and typed with TypeScript interfaces.
 */

import respondentsData from './respondents.json';
import gwaData from './gwaDistribution.json';
import studyHabitsData from './studyHabits.json';

import type {
  RespondentData,
  GWADistributionData,
  StudyHabitsData,
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
 * Get all study data in a single object
 */
export function getAllStudyData() {
  return {
    respondents: getRespondentData(),
    gwaDistribution: getGWADistribution(),
    studyHabits: getStudyHabitsData(),
  };
}
