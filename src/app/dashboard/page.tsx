import { Metadata } from 'next';
import {
  getRespondentData,
  getGWADistribution,
  getStudyHabitsData,
  getDemographicsData,
  getAttendanceData,
  getTimeManagementData,
  getPerformanceFactorsData,
  getStatisticalTestsData,
  getQualitativeThemesData,
} from '@/data';
import { DashboardContent } from './DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard - Academic Study',
  description:
    'Interactive dashboard analyzing enrollment status impact on academic achievement',
};

/**
 * Dashboard Page
 *
 * Main analysis page displaying enrollment distribution, GWA comparison,
 * study habits correlation, and interactive filters.
 */

export default function DashboardPage() {
  // Load data (server-side)
  const respondentData = getRespondentData();
  const gwaData = getGWADistribution();
  const studyHabitsData = getStudyHabitsData();
  const demographicsData = getDemographicsData();
  const attendanceData = getAttendanceData();
  const timeManagementData = getTimeManagementData();
  const performanceFactorsData = getPerformanceFactorsData();
  const statisticalTestsData = getStatisticalTestsData();
  const qualitativeThemesData = getQualitativeThemesData();

  return (
    <DashboardContent
      respondentData={respondentData}
      gwaData={gwaData}
      studyHabitsData={studyHabitsData}
      demographicsData={demographicsData}
      attendanceData={attendanceData}
      timeManagementData={timeManagementData}
      performanceFactorsData={performanceFactorsData}
      statisticalTestsData={statisticalTestsData}
      qualitativeThemesData={qualitativeThemesData}
    />
  );
}
