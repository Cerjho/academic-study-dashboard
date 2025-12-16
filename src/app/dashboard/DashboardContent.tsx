'use client';

import { useState, useMemo } from 'react';
import { Card, Badge } from '@/components/ui';
import { 
  KPICard, 
  InsightCard, 
  FilterBar, 
  StatusToggle, 
  GWARangeSlider 
} from '@/components/dashboard';
import { SectionWrapper } from '@/components/ui';
import {
  ChartContainer,
  EnrollmentPieChart,
  GWAComparisonBarChart,
  StudyHoursLineChart,
} from '@/components/charts';
import {
  generateEnrollmentFinding,
  generateGWAFinding,
  generateStudyHabitsFinding,
  generateAcademicSupportImplication,
  generateStudyEfficiencyImplication,
  generateIrregularSupportRecommendation,
  generateStudySkillsRecommendation,
  generateEarlyInterventionRecommendation,
  generateCurriculumRecommendation,
  calculatePerformanceGap,
  determinePriority,
} from '@/lib/insights';
import type { 
  RespondentData, 
  GWADistribution, 
  StudyHabitsData 
} from '@/types';

type StatusOption = 'all' | 'regular' | 'irregular';
type GWARange = 'excellent' | 'veryGood' | 'good' | 'fair';

interface DashboardContentProps {
  respondentData: RespondentData;
  gwaData: GWADistribution;
  studyHabitsData: StudyHabitsData;
}

export function DashboardContent({
  respondentData,
  gwaData,
  studyHabitsData,
}: DashboardContentProps) {
  // Filter states
  const [statusFilter, setStatusFilter] = useState<StatusOption>('all');
  const [gwaRanges, setGwaRanges] = useState<GWARange[]>([
    'excellent',
    'veryGood',
    'good',
    'fair',
  ]);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    const rangeMap: Record<GWARange, string> = {
      excellent: '1.00-1.49',
      veryGood: '1.50-1.99',
      good: '2.00-2.49',
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
    irregularStats.median
  );

  const studyHabitsFinding = generateStudyHabitsFinding(
    studyHabitsData.correlationCoefficient
  );

  const supportImplication = generateAcademicSupportImplication(
    performanceGap.gap
  );

  const efficiencyImplication = generateStudyEfficiencyImplication();

  const irregularSupportRec = generateIrregularSupportRecommendation();
  const studySkillsRec = generateStudySkillsRecommendation();
  const earlyInterventionRec = generateEarlyInterventionRecommendation();
  const curriculumRec = generateCurriculumRecommendation();

  const handleResetFilters = () => {
    setStatusFilter('all');
    setGwaRanges(['excellent', 'veryGood', 'good', 'fair']);
  };

  const hasActiveFilters =
    statusFilter !== 'all' || gwaRanges.length < 4;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Academic Performance Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            {respondentData.studyMetadata.institution} —{' '}
            {respondentData.studyMetadata.program}
          </p>
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
            <div className="grid gap-6 md:grid-cols-2">
              <StatusToggle
                value={statusFilter}
                onChange={setStatusFilter}
              />
              <GWARangeSlider
                value={gwaRanges}
                onChange={setGwaRanges}
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
            title="GWA Comparison"
            description="Statistical analysis of academic performance by enrollment status"
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
                data={filteredData.categories.map((category) => ({
                  category: category.label,
                  range: category.range,
                  regular: category.regular.count,
                  irregular: category.irregular.count,
                }))}
              />
            </ChartContainer>
          </SectionWrapper>

          <SectionWrapper
            id="study-habits"
            title="Study Habits Analysis"
            description={`Correlation between study hours and academic performance (r = ${studyHabitsData.correlationCoefficient})`}
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

          {/* Implications */}
          <SectionWrapper
            id="implications"
            title="Implications"
            description="Educational and policy implications of the research findings"
            className="transition-all duration-500"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <InsightCard
                title="Need for Targeted Academic Support"
                content={supportImplication}
                type="implication"
                priority={determinePriority(performanceGap.gap)}
              />
              <InsightCard
                title="Study Quality Over Quantity"
                content={efficiencyImplication}
                type="implication"
                priority="high"
              />
            </div>
          </SectionWrapper>

          {/* Recommendations */}
          <SectionWrapper
            id="recommendations"
            title="Recommendations"
            description="Evidence-based recommendations extrapolated from study findings for institutional consideration"
            className="transition-all duration-500"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <InsightCard
                title="Irregular Student Support Program"
                content={irregularSupportRec}
                type="recommendation"
                priority={determinePriority(performanceGap.gap)}
              />
              <InsightCard
                title="Study Skills Development Initiative"
                content={studySkillsRec}
                type="recommendation"
                priority="high"
              />
              <InsightCard
                title="Early Warning and Intervention System"
                content={earlyInterventionRec}
                type="recommendation"
                priority="high"
              />
              <InsightCard
                title="Curriculum and Pathway Review"
                content={curriculumRec}
                type="recommendation"
                priority="medium"
              />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
