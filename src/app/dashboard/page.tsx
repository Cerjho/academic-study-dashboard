import { Metadata } from 'next';
import {
  getRespondentData,
  getGWADistribution,
  getStudyHabitsData,
} from '@/data';
import { Card, Badge } from '@/components/ui';
import { KPICard, InsightCard, InsightPanel } from '@/components/dashboard';
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

  // Extract key data points
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
          </div>
        </header>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
          <KPICard
            label="Total Respondents"
            value={respondentData.studyMetadata.totalRespondents}
            color="neutral"
          />

          {respondentData.enrollmentDistribution.map((enrollment) => (
            <KPICard
              key={enrollment.status}
              label={`${enrollment.status} Students`}
              value={enrollment.count}
              subtitle={`(${enrollment.percentage}%)`}
              color={enrollment.status === 'Regular' ? 'regular' : 'irregular'}
            />
          ))}

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
          >
            <ChartContainer
              title="Enrollment Status Breakdown"
              description="Visual representation of Regular vs Irregular student distribution"
            >
              <EnrollmentPieChart
                regularCount={
                  respondentData.enrollmentDistribution.find(
                    (e) => e.status === 'Regular'
                  )?.count || 0
                }
                irregularCount={
                  respondentData.enrollmentDistribution.find(
                    (e) => e.status === 'Irregular'
                  )?.count || 0
                }
              />
            </ChartContainer>
          </SectionWrapper>

          <SectionWrapper
            id="gwa"
            title="GWA Comparison"
            description="Statistical analysis of academic performance by enrollment status"
          >
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card hover>
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
                </div>
              </Card>
              <Card hover>
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
                </div>
              </Card>
            </div>
            <ChartContainer
              title="GWA Distribution by Category"
              description="Comparison of academic performance across all GWA categories"
            >
              <GWAComparisonBarChart
                data={gwaData.categories.map((category) => ({
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
          >
            <ChartContainer
              title="Study Hours vs Academic Performance"
              description="Trend analysis showing the relationship between study time and GWA"
            >
              <StudyHoursLineChart
                data={studyHabitsData.studyHoursPerWeek.map((range) => ({
                  hoursRange: range.hoursRange,
                  regularGWA: range.regular.avgGWA,
                  irregularGWA: range.irregular.avgGWA,
                }))}
                correlationCoefficient={studyHabitsData.correlationCoefficient}
              />
            </ChartContainer>
          </SectionWrapper>

          {/* Key Findings */}
          <SectionWrapper
            id="findings"
            title="Key Findings"
            description="Principal discoveries from the statistical analysis"
          >
            <InsightPanel>
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
            </InsightPanel>
          </SectionWrapper>

          {/* Implications */}
          <SectionWrapper
            id="implications"
            title="Implications"
            description="Educational and policy implications of the research findings"
          >
            <InsightPanel>
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
            </InsightPanel>
          </SectionWrapper>

          {/* Recommendations */}
          <SectionWrapper
            id="recommendations"
            title="Recommendations"
            description="Evidence-based recommendations for institutional improvement"
          >
            <InsightPanel>
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
            </InsightPanel>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
