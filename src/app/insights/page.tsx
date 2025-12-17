import { Metadata } from 'next';
import {
  getRespondentData,
  getGWADistribution,
  getStudyHabitsData,
} from '@/data';
import { SectionWrapper, Badge } from '@/components/ui';
import { InsightCard, InsightPanel } from '@/components/dashboard';
import {
  generateEnrollmentFinding,
  generateGWAFinding,
  generateStudyHabitsFinding,
  calculatePerformanceGap,
  determinePriority,
} from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Insights & Interpretation - Academic Study',
  description:
    'Key findings from the enrollment status impact study',
};

/**
 * Insights Page
 *
 * Comprehensive display of research findings.
 */

export default function InsightsPage() {
  // Load data
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <svg className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Insights & Interpretation
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Analysis of findings from the academic study
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="regular" className="px-4 py-2 text-sm font-semibold shadow-md">
              {respondentData.studyMetadata.academicYear}
            </Badge>
            <Badge variant="default" className="px-4 py-2 text-sm font-semibold shadow-md">n={totalStudents}</Badge>
            <Badge variant="default" className="px-4 py-2 text-sm font-semibold shadow-md">
              Gap: {Math.abs(performanceGap.gap).toFixed(2)} GWA points
            </Badge>
          </div>
        </header>

        <div className="space-y-8">
          {/* Executive Summary */}
          <SectionWrapper
            id="summary"
            title="Executive Summary"
            description="Overview of the most critical findings"
          >
            <div className="rounded-xl bg-gradient-to-br from-white to-blue-50 p-8 shadow-xl border border-blue-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 shadow-md flex-shrink-0">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    This study examined the impact of enrollment status on academic
                    achievement among {totalStudents} Computer Science students at
                    Mabini College. The analysis revealed a{' '}
                    <strong className="text-gray-900">
                      {Math.abs(performanceGap.gap).toFixed(2)} GWA point
                      performance gap
                    </strong>{' '}
                    between Regular and Irregular students, alongside a{' '}
                    <strong className="text-gray-900">
                      strong negative correlation (r ={' '}
                      {studyHabitsData.correlationCoefficient})
                    </strong>{' '}
                    between study hours and academic performance.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Key Findings */}
          <SectionWrapper
            id="findings"
            title="Key Findings"
            description="Principal discoveries from the statistical analysis"
          >
            <InsightPanel>
              <InsightCard
                title="1. Enrollment Distribution Patterns"
                content={enrollmentFinding}
                type="finding"
                priority="medium"
              />
              <InsightCard
                title="2. Significant Academic Performance Gap"
                content={gwaFinding}
                type="finding"
                priority={determinePriority(performanceGap.gap)}
              />
              <InsightCard
                title="3. Counterintuitive Study Hours Relationship"
                content={studyHabitsFinding}
                type="finding"
                priority="high"
              />
            </InsightPanel>
          </SectionWrapper>

          {/* Limitations */}
          <SectionWrapper
            id="limitations"
            title="Study Limitations"
            description="Considerations for interpretation"
          >
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg border border-amber-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 shadow-md">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-900">Important Considerations</h3>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Sample Size:</strong> The study is limited to 73
                    students from a single institution.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Cross-Sectional Design:</strong> The data
                    represents a snapshot in time.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Self-Reported Data:</strong> Study hours are
                    self-reported.
                  </span>
                </li>
              </ul>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
