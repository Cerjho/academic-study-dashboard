import { Metadata } from 'next';
import {
  getRespondentData,
  getGWADistribution,
  getStudyHabitsData,
} from '@/data';
import { SectionWrapper, Badge, InfoTooltip, InsightBadge } from '@/components/ui';
import { InsightCard, InsightPanel } from '@/components/dashboard';
import {
  generateEnrollmentFinding,
  generateGWAFinding,
  generateStudyHabitsFinding,
  calculatePerformanceGap,
  determinePriority,
} from '@/lib/insights';
import { pdfInsights } from '@/lib/pdfInsights';

export const metadata: Metadata = {
  title: 'Data Insights - Student Performance Dashboard',
  description:
    'Statistical patterns and key insights from student performance data',
};

/**
 * Data Insights Page
 *
 * Statistical patterns and key findings from the data.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Data Insights
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Key patterns and statistical findings
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="regular" className="px-4 py-2 text-sm font-semibold shadow-md">
              {respondentData.studyMetadata.academicYear}
            </Badge>
            <Badge variant="default" className="px-4 py-2 text-sm font-semibold shadow-md">{totalStudents} students</Badge>
            <Badge variant="default" className="px-4 py-2 text-sm font-semibold shadow-md">
              {Math.abs(performanceGap.gap).toFixed(2)} GWA point gap
            </Badge>
          </div>
        </header>

        <div className="space-y-8">
          {/* Key Findings from Data */}
          <SectionWrapper
            id="key-findings"
            title="Key Data Patterns"
            description="Notable trends and statistical findings"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {pdfInsights.keyFindings.map((finding, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-regular-100 text-regular-600 font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{finding.category}</h3>
                        <InfoTooltip content={finding.tooltip} position="right" />
                      </div>
                      <InsightBadge
                        text={finding.significance}
                        tooltip={finding.implication}
                        variant="finding"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{finding.finding}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Data Summary */}
          <SectionWrapper
            id="summary"
            title="Data Summary"
            description="Overview of key statistical findings"
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
                    This data analysis explores enrollment status patterns and academic
                    performance metrics across {totalStudents} Computer Science students at
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

          {/* Research Questions */}
          <SectionWrapper
            id="research-questions"
            title="Research Questions"
            description="Core questions guiding this study"
          >
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
              <ul className="space-y-4">
                {pdfInsights.researchQuestions.map((question, idx) => (
                  <li key={idx} className="flex gap-4 text-gray-700">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-regular-100 text-regular-600 font-semibold text-sm">
                      {idx + 1}
                    </span>
                    <span className="flex-1 pt-1">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionWrapper>

          {/* Recommendations */}
          <SectionWrapper
            id="recommendations"
            title="Recommendations"
            description="Actionable recommendations based on research findings"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {pdfInsights.recommendations.map((rec, idx) => (
                <div key={idx} className={`p-6 rounded-lg border-2 ${
                  rec.priority === 'high' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 mt-1 ${
                      rec.priority === 'high' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{rec.target}</h3>
                        <Badge variant={rec.priority === 'high' ? 'regular' : 'default'} className="text-xs">
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-700">{rec.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
