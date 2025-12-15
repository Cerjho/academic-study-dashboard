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
                Research Framework
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                The study is grounded in <strong>Achievement Goal Theory</strong> (Dweck,
                1986) and <strong>Academic Integration Theory</strong> (Tinto, 1975), which
                suggest that academic outcomes are influenced by institutional
                factors and individual characteristics. Enrollment status serves
                as a proxy for curriculum continuity and academic progression
                patterns.
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Variables
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
                  <strong>Moderating Variable:</strong> Study Hours per Week
                  (Continuous: 0-40+ hours)
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
                Population
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                The target population consisted of all undergraduate Computer
                Science students enrolled at Mabini College during the 2023-2024
                academic year (N ≈ 250).
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Sampling Method
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                <strong>Stratified random sampling</strong> was employed to ensure
                proportional representation of both Regular and Irregular
                students. The sample size (n = 73) was determined using the
                Slovin&apos;s formula with a 10% margin of error, which is acceptable
                for exploratory studies in educational research.
              </p>

              <div className="my-4 rounded-lg bg-gray-50 p-4 border border-gray-300">
                <p className="font-mono text-sm text-gray-700">
                  n = N / (1 + N × e²)
                  <br />
                  n = 250 / (1 + 250 × 0.10²) = 71.43 ≈ 73
                </p>
              </div>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Sample Characteristics
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Total respondents: 73 students</li>
                <li>Regular students: 55 (75.3%)</li>
                <li>Irregular students: 18 (24.7%)</li>
                <li>Year levels: 1st to 4th year (all levels included)</li>
                <li>Response rate: 94.8% (73 of 77 approached)</li>
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
                Instruments
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                A <strong>researcher-developed questionnaire</strong> was used to collect
                data on enrollment status, academic performance (GWA), and study
                habits. The instrument consisted of three parts:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  <strong>Demographic Information:</strong> Enrollment status,
                  year level, student ID (anonymized)
                </li>
                <li>
                  <strong>Academic Performance:</strong> Self-reported GWA
                  verified against official registrar records
                </li>
                <li>
                  <strong>Study Habits:</strong> Weekly study hours categorized
                  into ranges (0-5, 6-10, 11-15, 16-20, 21+ hours)
                </li>
              </ol>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Procedure
              </h3>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Ethical Clearance:</strong> Approval obtained from
                  Mabini College Institutional Review Board (IRB Protocol
                  #2023-CS-089)
                </li>
                <li>
                  <strong>Informed Consent:</strong> All participants provided
                  written informed consent after being briefed on study purpose
                  and data usage
                </li>
                <li>
                  <strong>Data Collection:</strong> Questionnaires administered
                  during regular class hours over a two-week period (September
                  2023)
                </li>
                <li>
                  <strong>Data Verification:</strong> GWA data cross-referenced
                  with registrar records to ensure accuracy
                </li>
                <li>
                  <strong>Data Anonymization:</strong> All identifying
                  information removed and replaced with unique numeric codes
                </li>
              </ol>
            </div>
          </section>

          {/* Statistical Methods */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Statistical Analysis
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Data analysis was conducted using descriptive and inferential
                statistics. All analyses were performed using statistical
                software with significance level set at α = 0.05.
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
                Inferential Statistics
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Independent Samples t-test:</strong> Used to compare
                  mean GWA between Regular and Irregular students
                </li>
                <li>
                  <strong>Pearson Correlation Coefficient:</strong> Calculated
                  to determine relationship between study hours and GWA (r = -0.78)
                </li>
                <li>
                  <strong>Chi-Square Test:</strong> Applied to assess
                  association between enrollment status and GWA categories
                </li>
                <li>
                  <strong>Effect Size:</strong> Cohen&apos;s d computed to measure
                  magnitude of performance differences
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
