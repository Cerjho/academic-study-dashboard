import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology - Academic Study',
  description:
    'Research design, data collection process, and statistical methods',
};

/**
 * Methodology Page
 *
 * Details the research design, data collection process,
 * limitations, and statistical methods used in the study.
 */

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-lg bg-white p-8 shadow">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Research Methodology
          </h1>

          <div className="mb-8 rounded-lg bg-regular-50 p-4 border border-regular-200">
            <p className="text-sm text-gray-700">
              <strong>Study Title:</strong> The Impact of Enrollment Status on
              Academic Achievement: A Quantitative Analysis of Computer Science
              Students at Mabini College
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-blue-50 p-5 border-l-4 border-blue-500">
            <h3 className="text-sm font-bold text-blue-900 mb-2">ℹ️ Dashboard Context</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              This page provides structured presentation of the research methodology.
              <strong> Core methodology from the research paper:</strong> Survey-based data collection (n=73),
              descriptive and comparative analysis, GWA distribution across enrollment status,
              and study habits correlation. Additional organizational structure supports dashboard presentation.
            </p>
          </div>

          {/* Research Design */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Research Design
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                This study employed a <strong>quantitative cross-sectional research design</strong> to
                examine the relationship between enrollment status (Regular vs.
                Irregular) and academic achievement among Computer Science
                students. The research utilized descriptive and correlational
                analysis to identify patterns and relationships within the data.
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Key Variables
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Independent Variable:</strong> Enrollment Status
                  (Categorical: Regular, Irregular)
                </li>
                <li>
                  <strong>Dependent Variable:</strong> Academic Achievement
                  (Continuous: GWA on 1.0-5.0 scale)
                </li>
                <li>
                  <strong>Contributing Factors:</strong> Study habits, attendance, time management
                </li>
              </ul>
            </div>
          </section>

          {/* Participants and Sampling */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Participants and Sampling
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Sampling
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Survey-based data collection from Computer Science students at Mabini College.
                Sample size: 73 students (55 Regular, 18 Irregular).
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Sample Characteristics
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Total respondents: 73 students</li>
                <li>Regular students: 55 (75.34%)</li>
                <li>Irregular students: 18 (24.66%)</li>
              </ul>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Data Collection Process
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Survey Instrument
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Structured questionnaire administered via <strong>Google Forms</strong>,
                consisting of 10-15 close-ended items covering:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>GWA (General Weighted Average)</li>
                <li>Study habits and daily study hours</li>
                <li>Attendance patterns</li>
                <li>Enrollment classification (Regular/Irregular)</li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Data Collection Procedure
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Voluntary and anonymous participation</li>
                <li>Structured questionnaire via Google Forms (10-15 close-ended items)</li>
                <li>Covered GPA, study habits, attendance, and enrollment classification</li>
                <li>Responses validated and securely encoded for analysis</li>
                <li>No personal or sensitive information collected</li>
              </ul>
            </div>
          </section>

          {/* Statistical Methods */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Statistical Analysis
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Data analysis utilized descriptive and comparative techniques to interpret
                survey-based data. Numerical responses were aggregated using mean, percentage,
                and categorical grouping as stated in the research paper.
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Descriptive Statistics
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Measures of Central Tendency:</strong> Mean, median,
                  and mode calculated for GWA by enrollment status
                </li>
                <li>
                  <strong>Measures of Dispersion:</strong> Standard deviation
                  computed to assess variability
                </li>
                <li>
                  <strong>Frequency Distribution:</strong> GWA categorized into
                  performance levels (Excellent, Very Good, Good, Fair)
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Comparative Analysis
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Descriptive Comparison:</strong> Mean, median, and distribution
                  analysis of GWA between Regular and Irregular students
                </li>
                <li>
                  <strong>Correlation Analysis:</strong> Examined relationship between
                  study hours and GWA (r = -0.68, strong negative correlation)
                </li>
                <li>
                  <strong>Percentage Analysis:</strong> Distribution across GWA
                  categories and study habit patterns
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Data Management
              </h3>
              <p className="mb-2 text-gray-700 leading-relaxed">
                Data were stored in JSON format with the following quality
                assurance measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Range validation for all GWA values (1.0-5.0)</li>
                <li>
                  Consistency checks for enrollment distribution totals
                </li>
                <li>Cross-tabulation verification for study hours data</li>
                <li>Automated validation scripts to detect anomalies</li>
              </ul>
            </div>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Study Limitations
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                The following limitations should be considered when interpreting
                the findings:
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Cross-Sectional Design:</strong> Data collected at a
                  single time point; cannot establish causality between
                  enrollment status and academic performance
                </li>
                <li>
                  <strong>Self-Reported Study Hours:</strong> Study time data
                  relies on participant recall, which may be subject to social
                  desirability bias or memory errors
                </li>
                <li>
                  <strong>Single Institution:</strong> Sample drawn from one
                  college; findings may not generalize to other institutions with
                  different student populations or policies
                </li>
                <li>
                  <strong>Program-Specific:</strong> Limited to Computer Science
                  students; results may differ in other academic disciplines
                </li>
                <li>
                  <strong>Unmeasured Confounds:</strong> Factors such as
                  socioeconomic status, employment, family obligations, and prior
                  academic preparation not controlled for in the analysis
                </li>
                <li>
                  <strong>Sample Size:</strong> While adequate for exploratory
                  analysis (n = 73), a larger sample would provide greater
                  statistical power for subgroup analyses
                </li>
              </ol>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
