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
  title: 'Insights & Interpretation - Academic Study',
  description:
    'Key findings, implications, and recommendations from the enrollment status impact study',
};

/**
 * Insights Page
 *
 * Comprehensive display of research findings, implications,
 * and evidence-based recommendations.
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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Insights & Interpretation
          </h1>
          <p className="text-lg text-gray-600">
            Analysis of findings and actionable recommendations
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="regular">
              {respondentData.studyMetadata.academicYear}
            </Badge>
            <Badge variant="default">n={totalStudents}</Badge>
            <Badge variant="default">
              Gap: {Math.abs(performanceGap.gap).toFixed(2)} GWA points
            </Badge>
          </div>
        </header>

        <div className="space-y-8">
          {/* Executive Summary */}
          <SectionWrapper
            id="summary"
            title="Executive Summary"
            description="Overview of the most critical findings and recommendations"
          >
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <p className="mb-4 text-gray-700 leading-relaxed">
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
              <p className="text-gray-700 leading-relaxed">
                These findings underscore the need for targeted interventions,
                including specialized support programs for Irregular students
                and institution-wide emphasis on study quality over quantity.
                The recommendations provided are evidence-based and actionable,
                designed to improve educational outcomes for all students.
              </p>
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

          {/* Implications */}
          <SectionWrapper
            id="implications"
            title="Implications for Educational Practice"
            description="What these findings mean for institutions and students"
          >
            <InsightPanel>
              <InsightCard
                title="Targeted Academic Support is Critical"
                content={supportImplication}
                type="implication"
                priority={determinePriority(performanceGap.gap)}
              />
              <InsightCard
                title="Study Effectiveness Matters More Than Duration"
                content={efficiencyImplication}
                type="implication"
                priority="high"
              />
            </InsightPanel>
          </SectionWrapper>

          {/* Recommendations */}
          <SectionWrapper
            id="recommendations"
            title="Evidence-Based Recommendations"
            description="Actionable strategies for institutional improvement"
          >
            <InsightPanel>
              <InsightCard
                title="1. Establish Irregular Student Support Program"
                content={irregularSupportRec}
                type="recommendation"
                priority={determinePriority(performanceGap.gap)}
              />
              <InsightCard
                title="2. Implement Study Skills Development Initiative"
                content={studySkillsRec}
                type="recommendation"
                priority="high"
              />
              <InsightCard
                title="3. Deploy Early Warning and Intervention System"
                content={earlyInterventionRec}
                type="recommendation"
                priority="high"
              />
              <InsightCard
                title="4. Conduct Comprehensive Curriculum Review"
                content={curriculumRec}
                type="recommendation"
                priority="medium"
              />
            </InsightPanel>
          </SectionWrapper>

          {/* Limitations */}
          <SectionWrapper
            id="limitations"
            title="Study Limitations"
            description="Considerations for interpretation and future research"
          >
            <div className="rounded-lg bg-gray-100 p-6 border border-gray-300">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Sample Size:</strong> The study is limited to 73
                    students from a single institution, which may affect
                    generalizability to other contexts.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Cross-Sectional Design:</strong> The data
                    represents a snapshot in time and cannot establish causal
                    relationships between enrollment status and academic
                    performance.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Self-Reported Data:</strong> Study hours are
                    self-reported and may be subject to recall bias or social
                    desirability effects.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Confounding Variables:</strong> Other factors such
                    as socioeconomic status, employment, family obligations, and
                    prior academic preparation were not controlled for in this
                    analysis.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    <strong>Program-Specific:</strong> Results are specific to
                    Computer Science students and may not generalize to other
                    academic programs.
                  </span>
                </li>
              </ul>
            </div>
          </SectionWrapper>

          {/* Future Research */}
          <SectionWrapper
            id="future-research"
            title="Future Research Directions"
            description="Suggested areas for further investigation"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Longitudinal Studies
                </h4>
                <p className="text-sm text-gray-600">
                  Track students over multiple semesters to examine how
                  enrollment status changes affect academic trajectories and
                  identify critical intervention points.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Qualitative Investigation
                </h4>
                <p className="text-sm text-gray-600">
                  Conduct interviews and focus groups to understand the lived
                  experiences of Irregular students and identify specific
                  barriers to academic success.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Study Quality Assessment
                </h4>
                <p className="text-sm text-gray-600">
                  Develop and validate instruments to measure study quality
                  (e.g., metacognitive strategies, focus, comprehension) beyond
                  simple duration metrics.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Intervention Effectiveness
                </h4>
                <p className="text-sm text-gray-600">
                  Design and evaluate targeted interventions based on these
                  findings through randomized controlled trials to establish
                  causal evidence.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
