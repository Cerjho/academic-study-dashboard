'use client';

/**
 * Custom hooks for fetching and processing respondent data
 * 
 * Uses FilterContext and dataProcessor.ts for real-time calculations
 */

import { useMemo } from 'react';
import { useFilters } from '@/contexts/FilterContext';
import {
  getUniqueRespondents,
  filterRespondents,
  getAllProcessedData,
  getEnrollmentDistribution,
  getGWADistribution,
  getStudyHoursCorrelation,
  getPerformanceFactors,
  getStatisticalTests,
  calculateStats,
  type RealRespondent,
  type ProcessedData,
  type EnrollmentDistribution,
  type GWADistributionResult,
  type StudyHoursCorrelation,
  type PerformanceFactors,
  type StatisticalTests
} from '@/lib/dataProcessor';

/**
 * Hook to get all processed data based on current filters
 */
export function useProcessedData(): ProcessedData {
  const { filters } = useFilters();
  
  return useMemo(() => {
    return getAllProcessedData(filters);
  }, [filters]);
}

/**
 * Hook to get filtered respondent list
 */
export function useFilteredRespondents(): RealRespondent[] {
  const { filters } = useFilters();
  
  return useMemo(() => {
    const unique = getUniqueRespondents();
    return filterRespondents(unique, filters);
  }, [filters]);
}

/**
 * Hook to get enrollment distribution
 */
export function useEnrollmentDistribution(): EnrollmentDistribution {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    return getEnrollmentDistribution(respondents);
  }, [respondents]);
}

/**
 * Hook to get GWA distribution with statistics
 */
export function useGWADistribution(): GWADistributionResult {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    return getGWADistribution(respondents);
  }, [respondents]);
}

/**
 * Hook to get study hours correlation
 */
export function useStudyHoursCorrelation(): StudyHoursCorrelation {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    return getStudyHoursCorrelation(respondents);
  }, [respondents]);
}

/**
 * Hook to get performance factors
 */
export function usePerformanceFactors(): PerformanceFactors {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    return getPerformanceFactors(respondents);
  }, [respondents]);
}

/**
 * Hook to get statistical tests
 */
export function useStatisticalTests(): StatisticalTests {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    return getStatisticalTests(respondents);
  }, [respondents]);
}

/**
 * Hook to get basic statistics for a specific metric
 */
export function useMetricStats(metric: 'gwa' | 'studyHours' | 'attendance') {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    let values: number[] = [];
    
    switch (metric) {
      case 'gwa':
        values = respondents
          .map(r => {
            const gwaStr = r['  Current General Weighted Average (GWA)  '];
            return parseFloat(gwaStr);
          })
          .filter(v => !isNaN(v));
        break;
      case 'studyHours':
        values = respondents
          .map(r => {
            const hours = r['  How many hours per day do you spend studying outside of class?  '];
            if (hours.includes('Less than 1')) return 0.5;
            if (hours.includes('1–2') || hours.includes('1-2')) return 1.5;
            if (hours.includes('3–4') || hours.includes('3-4')) return 3.5;
            if (hours.includes('More than 4')) return 5;
            return 0;
          });
        break;
      case 'attendance':
        values = respondents
          .map(r => {
            const attendance = r['How often do you attend your scheduled classes?  '];
            if (attendance.includes('90-100%') || attendance.includes('Always')) return 95;
            if (attendance.includes('80-89%') || attendance.includes('Often')) return 84.5;
            if (attendance.includes('70-79%') || attendance.includes('Sometimes')) return 74.5;
            if (attendance.includes('<70%') || attendance.includes('Rarely')) return 65;
            return 0;
          });
        break;
    }
    
    return calculateStats(values);
  }, [respondents, metric]);
}

/**
 * Hook to get respondent count by enrollment status
 */
export function useRespondentCounts() {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    const regular = respondents.filter(r => r['  Enrollment Status  '].trim().toLowerCase().includes('regular') && !r['  Enrollment Status  '].trim().toLowerCase().includes('irregular')).length;
    const irregular = respondents.filter(r => r['  Enrollment Status  '].trim().toLowerCase().includes('irregular')).length;
    const total = respondents.length;
    
    return {
      total,
      regular,
      irregular,
      regularPercentage: total > 0 ? (regular / total) * 100 : 0,
      irregularPercentage: total > 0 ? (irregular / total) * 100 : 0
    };
  }, [respondents]);
}

/**
 * Hook to get year level distribution
 */
export function useYearLevelDistribution() {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    const distribution = respondents.reduce((acc) => {
      // Year level field doesn't exist in current schema, skip for now
      const year = '1st'; // Placeholder
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(distribution).map(([year, count]) => ({
      year,
      count,
      percentage: (count / respondents.length) * 100
    }));
  }, [respondents]);
}

/**
 * Hook to compare two groups (Regular vs Irregular)
 */
export function useGroupComparison(metric: 'gwa' | 'studyHours' | 'attendance') {
  const respondents = useFilteredRespondents();
  
  return useMemo(() => {
    const regular = respondents.filter(r => r['  Enrollment Status  '].trim().toLowerCase().includes('regular') && !r['  Enrollment Status  '].trim().toLowerCase().includes('irregular'));
    const irregular = respondents.filter(r => r['  Enrollment Status  '].trim().toLowerCase().includes('irregular'));
    
    let regularValues: number[] = [];
    let irregularValues: number[] = [];
    
    const extractValue = (r: RealRespondent): number => {
      switch (metric) {
        case 'gwa':
          return parseFloat(r['  Current General Weighted Average (GWA)  ']);
        case 'studyHours':
          const hours = r['  How many hours per day do you spend studying outside of class?  '];
          if (hours.includes('Less than 1')) return 0.5;
          if (hours.includes('1–2') || hours.includes('1-2')) return 1.5;
          if (hours.includes('3–4') || hours.includes('3-4')) return 3.5;
          if (hours.includes('More than 4')) return 5;
          return 0;
        case 'attendance':
          const attendance = r['How often do you attend your scheduled classes?  '];
          if (attendance.includes('90-100%') || attendance.includes('Always')) return 95;
          if (attendance.includes('80-89%') || attendance.includes('Often')) return 84.5;
          if (attendance.includes('70-79%') || attendance.includes('Sometimes')) return 74.5;
          if (attendance.includes('<70%') || attendance.includes('Rarely')) return 65;
          return 0;
      }
    };
    
    regularValues = regular.map(extractValue).filter(v => !isNaN(v));
    irregularValues = irregular.map(extractValue).filter(v => !isNaN(v));
    
    return {
      regular: calculateStats(regularValues),
      irregular: calculateStats(irregularValues),
      regularCount: regular.length,
      irregularCount: irregular.length
    };
  }, [respondents, metric]);
}
