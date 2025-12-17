'use client';

import { useState, useMemo } from 'react';
import { Card, Badge, GWAScaleTooltip, SignificanceMarker, SignificanceLegend } from '@/components/ui';
import { 
  KPICard, 
  InsightCard, 
  FilterBar, 
  StatusToggle, 
  GWARangeSlider, 
  YearLevelFilter 
} from '@/components/dashboard';
import { SectionWrapper } from '@/components/ui';
import {
  ChartContainer,
  EnrollmentPieChart,
  GWAComparisonBarChart,
  StudyHoursLineChart,
  YearLevelChart,
  AttendanceComparisonChart,
  TimeManagementChart,
  PerformanceFactorsBarChart,
  StatisticalTestsTable,
  QualitativeThemesDisplay,
} from '@/components/charts';
import {
  generateEnrollmentFinding,
  generateGWAFinding,
  generateStudyHabitsFinding,
  calculatePerformanceGap,
  determinePriority,
} from '@/lib/insights';
import type { 
  RespondentData, 
  GWADistribution, 
  StudyHabitsData,
  DemographicsData,
  AttendanceData,
  TimeManagementData,
  PerformanceFactorsData,
  StatisticalTestsData,
  QualitativeThemesData
} from '@/types';

type StatusOption = 'all' | 'regular' | 'irregular';
type GWARange = 'excellent' | 'aboveAverage' | 'satisfactory' | 'fair';
type YearOption = 'all' | '1st' | '2nd' | '3rd' | '4th';

interface DashboardContentProps {
  respondentData: RespondentData;
  gwaData: GWADistribution;
  studyHabitsData: StudyHabitsData;
  demographicsData: DemographicsData;
  attendanceData: AttendanceData;
  timeManagementData: TimeManagementData;
  performanceFactorsData: PerformanceFactorsData;
  statisticalTestsData: StatisticalTestsData;
  qualitativeThemesData: QualitativeThemesData;
}

export function DashboardContent({
  respondentData,
  gwaData,
  studyHabitsData,
  demographicsData,
  attendanceData,
  timeManagementData,
  performanceFactorsData,
  statisticalTestsData,
  qualitativeThemesData,
}: DashboardContentProps) {
  // Filter states
  const [statusFilter, setStatusFilter] = useState<StatusOption>('all');
  const [gwaRanges, setGwaRanges] = useState<GWARange[]>([
    'excellent',
    'aboveAverage',
    'satisfactory',
    'fair',
  ]);
  const [yearFilter, setYearFilter] = useState<YearOption>('all');

  // Filter data based on selections
  const filteredData = useMemo(() => {
    const rangeMap: Record<GWARange, string> = {
      excellent: '1.00-1.49',
      aboveAverage: '1.50-1.99',
      satisfactory: '2.00-2.49',
      fair: '2.50-2.99',
    };

    // Filter GWA categories
    const filteredCategories = gwaData.categories.filter((category) => {
      const matchingRange = Object.entries(rangeMap).find(
        ([, range]) => range === category.range
      );
      return matchingRange && gwaRanges.includes(matchingRange[0] as GWARange);
    });

    // Adjust counts based on status filter
    const adjustedCategories = filteredCategories.map((category) => ({
      ...category,
      regular: {
        ...category.regular,
        count:
          statusFilter === 'irregular' ? 0 : category.regular.count,
      },
      irregular: {
        ...category.irregular,
        count:
          statusFilter === 'regular' ? 0 : category.irregular.count,
      },
    }));

    // Calculate filtered totals
    const regularTotal = adjustedCategories.reduce(
      (sum, cat) => sum + cat.regular.count,
      0
    );
    const irregularTotal = adjustedCategories.reduce(
      (sum, cat) => sum + cat.irregular.count,
      0
    );

    // Filter enrollment data
    const regularEnrollment =
      statusFilter === 'irregular'
        ? 0
        : respondentData.enrollmentDistribution.find(
            (e) => e.status === 'Regular'
          )?.count || 0;
    const irregularEnrollment =
      statusFilter === 'regular'
        ? 0
        : respondentData.enrollmentDistribution.find(
            (e) => e.status === 'Irregular'
          )?.count || 0;

    return {
      categories: adjustedCategories,
      regularTotal,
      irregularTotal,
      regularEnrollment,
      irregularEnrollment,
      totalFiltered: regularTotal + irregularTotal,
    };
  }, [gwaData, respondentData, statusFilter, gwaRanges]);

  // Extract original data points
  const regularEnrollment = respondentData.enrollmentDistribution.find(
    (e) => e.status === 'Regular'
  );
  const irregularEnrollment = respondentData.enrollmentDistribution.find(
    (e) => e.status === 'Irregular'
  );
  const totalStudents = respondentData.studyMetadata.totalRespondents;

  const regularStats = gwaData.statistics.regular;
  const irregularStats = gwaData.statistics.irregular;

  const performanceGap = calculatePerformanceGap(
    regularStats.mean,
    irregularStats.mean
  );

  // Generate insights
  const enrollmentFinding = generateEnrollmentFinding(
    regularEnrollment?.count || 0,
    irregularEnrollment?.count || 0,
    totalStudents
  );

  const gwaFinding = generateGWAFinding(
    regularStats.mean,
    irregularStats.mean,
    regularStats.median,
    irregularStats.median,
    statisticalTestsData.gwaComparison.tStatistic,
    statisticalTestsData.gwaComparison.pValue,
    statisticalTestsData.gwaComparison.cohensD
  );

  const studyHabitsFinding = generateStudyHabitsFinding(
    studyHabitsData.correlationCoefficient,
    statisticalTestsData.correlations.studyHoursVsGWA.pValue,
    statisticalTestsData.correlations.studyHoursVsGWA.n
  );

  // Status-aware filtered datasets for downstream charts
  const filteredAttendanceData = useMemo(() => {
    if (statusFilter === 'all') return attendanceData;
    return {
      categories: attendanceData.categories.map((cat) => ({
        attendance: cat.attendance,
        regular: {
          ...cat.regular,
          count: statusFilter === 'irregular' ? 0 : cat.regular.count,
          avgGWA: statusFilter === 'irregular' ? null : cat.regular.avgGWA,
        },
        irregular: {
          ...cat.irregular,
          count: statusFilter === 'regular' ? 0 : cat.irregular.count,
          avgGWA: statusFilter === 'regular' ? null : cat.irregular.avgGWA,
        },
      })),
    } as AttendanceData;
  }, [attendanceData, statusFilter]);

  const filteredTimeManagementData = useMemo(() => {
    if (statusFilter === 'all') return timeManagementData;
    return {
      categories: timeManagementData.categories.map((cat) => ({
        level: cat.level,
        regular: {
          ...cat.regular,
          count: statusFilter === 'irregular' ? 0 : cat.regular.count,
          avgGWA: statusFilter === 'irregular' ? null : cat.regular.avgGWA,
          percentage: cat.regular.percentage,
        },
        irregular: {
          ...cat.irregular,
          count: statusFilter === 'regular' ? 0 : cat.irregular.count,
          avgGWA: statusFilter === 'regular' ? null : cat.irregular.avgGWA,
          percentage: cat.irregular.percentage,
        },
      })),
    } as TimeManagementData;
  }, [timeManagementData, statusFilter]);

  const filteredPerformanceFactorsData = useMemo(() => {
    if (statusFilter === 'all') return performanceFactorsData;
    return {
      factors: performanceFactorsData.factors.map((f) => ({
        ...f,
        regular: statusFilter === 'irregular' ? 0 : f.regular,
        irregular: statusFilter === 'regular' ? 0 : f.irregular,
        // Leave percentages as-is to reflect within-group prevalence
        regularPercentage: statusFilter === 'irregular' ? 0 : f.regularPercentage,
        irregularPercentage: statusFilter === 'regular' ? 0 : f.irregularPercentage,
      })),
    } as PerformanceFactorsData;
  }, [performanceFactorsData, statusFilter]);

  const handleResetFilters = () => {
    setStatusFilter('all');
    setGwaRanges(['excellent', 'aboveAverage', 'satisfactory', 'fair']);
  };

  const hasActiveFilters =
    statusFilter !== 'all' || gwaRanges.length < 4;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900">
                Academic Performance Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                {respondentData.studyMetadata.institution} —{' '}
                {respondentData.studyMetadata.program}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">About GWA:</span>
              <GWAScaleTooltip />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="regular">
              {respondentData.studyMetadata.academicYear}
            </Badge>
            <Badge variant="default">
              n={respondentData.studyMetadata.totalRespondents}
            </Badge>
            {hasActiveFilters && (
              <Badge variant="default" className="animate-pulse">
                Filtered: {filteredData.totalFiltered} students
              </Badge>
            )}
          </div>
        </header>

        {/* Filter Controls */}
        <div className="mb-8 animate-slide-up">
          <FilterBar
            onReset={handleResetFilters}
            title="Filter Data"
            description="Customize the view by enrollment status and GWA performance level"
            showReset={hasActiveFilters}
          >
            <div className="grid gap-6 md:grid-cols-3">
              <StatusToggle
                value={statusFilter}
                onChange={setStatusFilter}
              />
              <GWARangeSlider
                value={gwaRanges}
                onChange={setGwaRanges}
              />
              <YearLevelFilter
                value={yearFilter}
                onChange={setYearFilter}
              />
            </div>
          </FilterBar>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up transition-all duration-500">
          <KPICard
            label="Total Respondents"
            value={respondentData.studyMetadata.totalRespondents}
            color="neutral"
          />

          <KPICard
            label="Regular Students"
            value={
              statusFilter === 'irregular'
                ? 0
                : regularEnrollment?.count || 0
            }
            subtitle={`(${regularEnrollment?.percentage || 0}%)`}
            color="regular"
            className="transition-all duration-500"
          />

          <KPICard
            label="Irregular Students"
            value={
              statusFilter === 'regular'
                ? 0
                : irregularEnrollment?.count || 0
            }
            subtitle={`(${irregularEnrollment?.percentage || 0}%)`}
            color="irregular"
            className="transition-all duration-500"
          />

          <KPICard
            label="Study Correlation"
            value={studyHabitsData.correlationCoefficient}
            subtitle="Strong negative"
            color="neutral"
          />
        </div>

        {/* Data Preview Sections */}
        <div className="space-y-8">
          <SectionWrapper
            id="enrollment"
            title="Enrollment Distribution"
            description="Distribution of students by enrollment status"
            className="transition-all duration-500"
          >
            <ChartContainer
              title="Enrollment Status Breakdown"
              description="Visual representation of Regular vs Irregular student distribution"
            >
              <EnrollmentPieChart
                regularCount={filteredData.regularEnrollment}
                irregularCount={filteredData.irregularEnrollment}
              />
            </ChartContainer>
          </SectionWrapper>

          <SectionWrapper
            id="gwa"
            title={
              <span className="flex items-center gap-2">
                GWA Comparison
                <SignificanceMarker 
                  pValue={statisticalTestsData.gwaComparison.pValue} 
                  position="inline"
                />
              </span>
            }
            description={`Statistical analysis of academic performance by enrollment status (t = ${statisticalTestsData.gwaComparison.tStatistic.toFixed(2)}, Cohen's d = ${statisticalTestsData.gwaComparison.cohensD.toFixed(2)})`}
            className="transition-all duration-500"
          >
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card hover className="transition-all duration-500">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-regular-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-regular-100">
                    📚
                  </span>
                  Regular Students
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mean GWA:</span>
                    <span className="font-semibold text-gray-900">
                      {gwaData.statistics.regular.mean}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Median:</span>
                    <span className="font-semibold text-gray-900">
                      {gwaData.statistics.regular.median}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Std Deviation:</span>
                    <span className="font-semibold text-gray-900">
                      {gwaData.statistics.regular.stdDeviation}
                    </span>
                  </div>
                  {statusFilter !== 'all' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Filtered Count:</span>
                        <span className="font-semibold text-gray-900">
                          {filteredData.regularTotal}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              <Card hover className="transition-all duration-500">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-irregular-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-irregular-100">
                    📖
                  </span>
                  Irregular Students
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mean GWA:</span>
                    <span className="font-semibold text-gray-900">
                      {gwaData.statistics.irregular.mean}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Median:</span>
                    <span className="font-semibold text-gray-900">
                      {gwaData.statistics.irregular.median}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Std Deviation:</span>
                    <span className="font-semibold text-gray-900">
                      {gwaData.statistics.irregular.stdDeviation}
                    </span>
                  </div>
                  {statusFilter !== 'all' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Filtered Count:</span>
                        <span className="font-semibold text-gray-900">
                          {filteredData.irregularTotal}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            <ChartContainer
              title="GWA Distribution by Category"
              description="Comparison of academic performance across all GWA categories"
            >
              <GWAComparisonBarChart
                data={filteredData.categories.map((cat) => ({
                  category: cat.label,
                  range: cat.range,
                  regular: cat.regular.count,
                  irregular: cat.irregular.count,
                }))}
              />
            </ChartContainer>
            
            {/* Statistical Significance Note */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Statistical Test:</strong> Independent samples t-test shows a highly significant difference 
                (t({statisticalTestsData.gwaComparison.df}) = {statisticalTestsData.gwaComparison.tStatistic.toFixed(3)}, 
                p &lt; 0.001) with a large effect size (Cohen&apos;s d = {statisticalTestsData.gwaComparison.cohensD.toFixed(2)}).
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper
            id="study-habits"
            title={
              <span className="flex items-center gap-2">
                Study Habits Analysis
                <SignificanceMarker 
                  pValue={statisticalTestsData.correlations.studyHoursVsGWA.pValue} 
                  position="inline"
                />
              </span>
            }
            description={`Correlation between study hours and academic performance (r = ${studyHabitsData.correlationCoefficient.toFixed(3)})`}
            className="transition-all duration-500"
          >
            <ChartContainer
              title="Study Hours vs Academic Performance"
              description="Trend analysis showing the relationship between daily study time and GWA"
            >
              <StudyHoursLineChart
                data={studyHabitsData.studyHoursPerDay.map((range) => ({
                  hoursRange: range.hoursRange,
                  regularGWA: range.regular.avgGWA,
                  irregularGWA: range.irregular.avgGWA,
                }))}
                correlationCoefficient={studyHabitsData.correlationCoefficient}
                statusFilter={statusFilter}
              />
            </ChartContainer>
            
            {/* Correlation Significance Note */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Statistical Test:</strong> Pearson correlation analysis reveals a significant 
                moderate negative correlation (r = {statisticalTestsData.correlations.studyHoursVsGWA.r.toFixed(3)}, 
                p &lt; 0.001, n = {statisticalTestsData.correlations.studyHoursVsGWA.n}). 
                Lower GWA values indicate better performance in the Philippine system.
              </p>
            </div>
            
            {/* Significance Legend */}
            <SignificanceLegend className="mt-4 p-4 bg-gray-50 rounded-lg" />
          </SectionWrapper>

          {/* Key Findings */}
          <SectionWrapper
            id="findings"
            title="Key Findings"
            description="Principal discoveries from the statistical analysis"
            className="transition-all duration-500"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <InsightCard
                title="Enrollment Distribution Patterns"
                content={enrollmentFinding}
                type="finding"
                priority="medium"
              />
              <InsightCard
                title="Academic Performance Gap"
                content={gwaFinding}
                type="finding"
                priority={determinePriority(performanceGap.gap)}
              />
              <InsightCard
                title="Study Hours and Academic Achievement"
                content={studyHabitsFinding}
                type="finding"
                priority="high"
              />
            </div>
          </SectionWrapper>

          {/* Statistical Significance */}
          <SectionWrapper
            id="statistical-tests"
            title="Statistical Significance Tests"
            description="Inferential statistics demonstrating the robustness of observed differences"
            className="transition-all duration-500"
          >
            <StatisticalTestsTable data={statisticalTestsData} />
          </SectionWrapper>

          {/* Demographics */}
          <SectionWrapper
            id="demographics"
            title="Year Level Distribution"
            description="Distribution of students across academic year levels"
            className="transition-all duration-500"
          >
            <ChartContainer
              title="Students by Year Level"
              description="Breakdown of Regular and Irregular students across year levels"
            >
              <YearLevelChart data={
                yearFilter === 'all'
                  ? demographicsData
                  : {
                      yearLevel: demographicsData.yearLevel.filter((y) => y.year.startsWith(yearFilter))
                    }
              } />
            </ChartContainer>
            {(demographicsData.note || yearFilter !== 'all') && (
              <div className="mt-4 text-sm text-gray-600 italic p-4 bg-gray-50 rounded-lg">
                <strong>Note:</strong> {yearFilter !== 'all' ? 'Year-level data is estimated; use cautiously. ' : ''}{demographicsData.note ?? ''}
              </div>
            )}
          </SectionWrapper>

          {/* Attendance Patterns */}
          <SectionWrapper
            id="attendance"
            title="Attendance Patterns Analysis"
            description="Relationship between class attendance and academic performance"
            className="transition-all duration-500"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartContainer
                title="Average GWA by Attendance Frequency"
                description="How attendance patterns correlate with academic achievement"
              >
                <AttendanceComparisonChart data={filteredAttendanceData} metric="avgGWA" />
              </ChartContainer>
              <ChartContainer
                title="Student Count by Attendance Frequency"
                description="Distribution of attendance patterns across enrollment status"
              >
                <AttendanceComparisonChart data={filteredAttendanceData} metric="count" />
              </ChartContainer>
            </div>
          </SectionWrapper>

          {/* Time Management */}
          <SectionWrapper
            id="time-management"
            title="Time Management Skills"
            description="Self-reported time management abilities and their impact on GWA"
            className="transition-all duration-500"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartContainer
                title="Average GWA by Time Management Level"
                description="Correlation between time management skills and academic success"
              >
                <TimeManagementChart data={filteredTimeManagementData} metric="avgGWA" />
              </ChartContainer>
              <ChartContainer
                title="Student Distribution by Time Management Level"
                description="How students rate their own time management abilities"
              >
                <TimeManagementChart data={filteredTimeManagementData} metric="count" />
              </ChartContainer>
            </div>
          </SectionWrapper>

          {/* Performance Factors */}
          <SectionWrapper
            id="factors"
            title="Factors Affecting Academic Performance"
            description="Student-reported challenges and barriers to academic success"
            className="transition-all duration-500"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartContainer
                title="Top Factors (Count)"
                description="Most frequently reported challenges"
              >
                <PerformanceFactorsBarChart 
                  data={filteredPerformanceFactorsData} 
                  topN={8}
                  showPercentage={false}
                />
              </ChartContainer>
              <ChartContainer
                title="Top Factors (Percentage)"
                description="Prevalence of challenges within each group"
              >
                <PerformanceFactorsBarChart 
                  data={filteredPerformanceFactorsData} 
                  topN={8}
                  showPercentage={true}
                />
              </ChartContainer>
            </div>
          </SectionWrapper>

          {/* Qualitative Analysis */}
          <SectionWrapper
            id="qualitative"
            title="Qualitative Insights"
            description="Thematic analysis of student perspectives and experiences"
            className="transition-all duration-500"
          >
            <QualitativeThemesDisplay data={qualitativeThemesData} />
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
