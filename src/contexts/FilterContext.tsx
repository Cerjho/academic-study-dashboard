'use client';

/**
 * Global Filter Context
 * 
 * Manages filter state across all pages and syncs with URL query parameters
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { EnrollmentStatus, YearLevel } from '@/lib/dataProcessor';

export interface FilterState {
  enrollmentStatus: EnrollmentStatus;
  gwaRanges: string[];
  yearLevel: YearLevel;
  studyHoursRanges: string[];
}

interface FilterContextType {
  filters: FilterState;
  setEnrollmentStatus: (status: EnrollmentStatus) => void;
  setGWARanges: (ranges: string[]) => void;
  setYearLevel: (level: YearLevel) => void;
  setStudyHoursRanges: (ranges: string[]) => void;
  clearFilters: () => void;
  applyPreset: (preset: string) => void;
}

const defaultFilters: FilterState = {
  enrollmentStatus: 'All',
  gwaRanges: [],
  yearLevel: 'All',
  studyHoursRanges: []
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize filters from URL
  const initialFilters: FilterState = {
    enrollmentStatus: (searchParams.get('status') as EnrollmentStatus) || 'All',
    gwaRanges: searchParams.get('gwa')?.split(',').filter(Boolean) || [],
    yearLevel: (searchParams.get('year') as YearLevel) || 'All',
    studyHoursRanges: searchParams.get('hours')?.split(',').filter(Boolean) || []
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.enrollmentStatus !== 'All') {
      params.set('status', newFilters.enrollmentStatus);
    }
    if (newFilters.gwaRanges.length > 0) {
      params.set('gwa', newFilters.gwaRanges.join(','));
    }
    if (newFilters.yearLevel !== 'All') {
      params.set('year', newFilters.yearLevel);
    }
    if (newFilters.studyHoursRanges.length > 0) {
      params.set('hours', newFilters.studyHoursRanges.join(','));
    }

    const queryString = params.toString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newURL, { scroll: false });
  };

  const setEnrollmentStatus = (status: EnrollmentStatus) => {
    const newFilters = { ...filters, enrollmentStatus: status };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const setGWARanges = (ranges: string[]) => {
    const newFilters = { ...filters, gwaRanges: ranges };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const setYearLevel = (level: YearLevel) => {
    const newFilters = { ...filters, yearLevel: level };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const setStudyHoursRanges = (ranges: string[]) => {
    const newFilters = { ...filters, studyHoursRanges: ranges };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    router.replace(pathname, { scroll: false });
  };

  const applyPreset = (preset: string) => {
    let newFilters: FilterState;
    
    switch (preset) {
      case 'high-performers':
        newFilters = {
          enrollmentStatus: 'All',
          gwaRanges: ['1.00-1.49', '1.50-1.99'],
          yearLevel: 'All',
          studyHoursRanges: []
        };
        break;
      case 'at-risk':
        newFilters = {
          enrollmentStatus: 'All',
          gwaRanges: ['2.50-2.99'],
          yearLevel: 'All',
          studyHoursRanges: ['<1 hour']
        };
        break;
      case 'regular-students':
        newFilters = {
          enrollmentStatus: 'Regular',
          gwaRanges: [],
          yearLevel: 'All',
          studyHoursRanges: []
        };
        break;
      case 'irregular-students':
        newFilters = {
          enrollmentStatus: 'Irregular',
          gwaRanges: [],
          yearLevel: 'All',
          studyHoursRanges: []
        };
        break;
      default:
        newFilters = defaultFilters;
    }
    
    setFilters(newFilters);
    updateURL(newFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setEnrollmentStatus,
        setGWARanges,
        setYearLevel,
        setStudyHoursRanges,
        clearFilters,
        applyPreset
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
