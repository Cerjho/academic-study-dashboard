import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ethics & Privacy - Academic Study',
  description: 'Data privacy, ethical considerations, and participant consent',
};

/**
 * Ethics & Privacy Page
 *
 * Outlines ethical considerations, data privacy measures,
 * IRB compliance, and consent procedures.
 */

export default function EthicsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-lg bg-white p-8 shadow">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Ethics & Privacy
          </h1>

          <div className="mb-8 rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-green-900">
                  IRB Approved Research
                </p>
                <p className="text-sm text-green-800">
                  Protocol #2023-CS-089 | Approved: August 15, 2023 | Valid
                  through: August 14, 2024
                </p>
              </div>
            </div>
          </div>

          {/* Ethical Framework */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Ethical Framework
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                This research adhered to the ethical principles outlined in the{' '}
                <strong>Belmont Report</strong> (1979) and followed guidelines
                established by the American Educational Research Association
                (AERA) Code of Ethics. The study was designed to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Respect for Persons:</strong> Treat participants as
                  autonomous agents capable of making informed decisions about
                  participation
                </li>
                <li>
                  <strong>Beneficence:</strong> Maximize potential benefits while
                  minimizing risks to participants
                </li>
                <li>
                  <strong>Justice:</strong> Ensure fair distribution of research
                  benefits and burdens across all student groups
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Participant Rights
              </h3>
              <p className="mb-2 text-gray-700 leading-relaxed">
                All participants were guaranteed the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Right to be informed about the study&apos;s purpose and procedures</li>
                <li>Right to voluntary participation without coercion or penalty</li>
                <li>Right to withdraw from the study at any time without consequence</li>
                <li>Right to privacy and confidentiality of personal information</li>
                <li>Right to ask questions and receive clarification</li>
                <li>Right to access study results upon completion</li>
              </ul>
            </div>
          </section>

          {/* IRB Compliance */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Institutional Review Board (IRB) Compliance
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Prior to data collection, the research protocol was submitted to
                and approved by the <strong>Mabini College Institutional Review Board</strong>{' '}
                (IRB Protocol #2023-CS-089). The IRB review ensured that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Research design minimized risk to participants (classified as{' '}
                  <strong>minimal risk</strong> study)
                </li>
                <li>
                  Informed consent procedures were comprehensive and clearly
                  communicated
                </li>
                <li>
                  Data protection measures met institutional standards for
                  sensitive educational records
                </li>
                <li>
                  Participant selection was fair and non-discriminatory
                </li>
                <li>
                  Provisions were in place for ongoing monitoring and reporting
                </li>
              </ul>

              <div className="my-6 rounded-lg bg-gray-50 p-5 border border-gray-300">
                <h4 className="mb-3 font-semibold text-gray-900">
                  IRB Approval Details
                </h4>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <dt className="font-medium text-gray-700">
                      Protocol Number:
                    </dt>
                    <dd className="text-gray-600">2023-CS-089</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Approval Date:</dt>
                    <dd className="text-gray-600">August 15, 2023</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      Expiration Date:
                    </dt>
                    <dd className="text-gray-600">August 14, 2024</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Risk Level:</dt>
                    <dd className="text-gray-600">Minimal Risk</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Review Type:</dt>
                    <dd className="text-gray-600">Expedited Review</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* Informed Consent */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Informed Consent Procedures
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                All participants provided <strong>written informed consent</strong> before
                participating in the study. The consent process included:
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Consent Form Components
              </h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Study Purpose:</strong> Clear explanation of research
                  objectives and significance
                </li>
                <li>
                  <strong>Procedures:</strong> Detailed description of what
                  participation involves (10-15 minute questionnaire)
                </li>
                <li>
                  <strong>Voluntary Nature:</strong> Explicit statement that
                  participation is voluntary and can be withdrawn anytime
                </li>
                <li>
                  <strong>Confidentiality Assurance:</strong> Explanation of data
                  protection and anonymization measures
                </li>
                <li>
                  <strong>Contact Information:</strong> Researcher and IRB
                  contact details for questions or concerns
                </li>
                <li>
                  <strong>Signature and Date:</strong> Participant acknowledgment
                  and consent documentation
                </li>
              </ol>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Consent Administration
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Consent forms distributed and explained before questionnaire
                  administration
                </li>
                <li>
                  Participants given adequate time to read and ask questions
                  (minimum 5 minutes)
                </li>
                <li>
                  Researcher available to clarify any unclear terms or procedures
                </li>
                <li>
                  No penalties or negative consequences for declining to
                  participate
                </li>
                <li>
                  Signed consent forms stored securely and separately from study
                  data
                </li>
              </ul>
            </div>
          </section>

          {/* Data Privacy & Security */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Data Privacy & Security Measures
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Comprehensive data protection measures were implemented to
                safeguard participant information and comply with data privacy
                regulations:
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Anonymization Protocol
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Immediate Coding:</strong> All identifying information
                  (names, student IDs) replaced with unique numeric codes upon
                  data collection
                </li>
                <li>
                  <strong>Code-Key Separation:</strong> Link between codes and
                  identities stored separately in password-protected file
                  accessible only to principal investigator
                </li>
                <li>
                  <strong>Data Aggregation:</strong> Published results present
                  only aggregate statistics; individual records never disclosed
                </li>
                <li>
                  <strong>Indirect Identifiers Removed:</strong> Specific course
                  names, instructors, and other potentially identifying details
                  excluded from dataset
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Data Storage & Access
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Secure Storage:</strong> All data stored on encrypted,
                  password-protected devices
                </li>
                <li>
                  <strong>Access Control:</strong> Only authorized research team
                  members granted access to raw data
                </li>
                <li>
                  <strong>Physical Security:</strong> Paper documents stored in
                  locked filing cabinet in secure research office
                </li>
                <li>
                  <strong>Data Retention:</strong> Data will be retained for 5
                  years per institutional policy, then securely destroyed
                </li>
                <li>
                  <strong>Backup Protocols:</strong> Encrypted backups maintained
                  on institutional secure server
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Data Sharing Policy
              </h3>
              <p className="mb-2 text-gray-700 leading-relaxed">
                Anonymized aggregate data may be shared with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Academic researchers upon reasonable request and IRB approval
                </li>
                <li>
                  Mabini College administrators for institutional improvement
                  purposes
                </li>
                <li>
                  Published journal articles and conference presentations
                  (aggregate statistics only)
                </li>
              </ul>
              <p className="mt-3 text-gray-700 leading-relaxed">
                <strong>Individual-level data will never be shared</strong> without
                explicit participant permission.
              </p>
            </div>
          </section>

          {/* Risk Management */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Risk Assessment & Mitigation
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                This study was classified as <strong>minimal risk</strong> by the IRB,
                meaning potential risks are not greater than those encountered in
                daily life. Nevertheless, the following safeguards were
                implemented:
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Potential Risks
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Privacy Breach:</strong> Risk of unauthorized access to
                  student academic records
                </li>
                <li>
                  <strong>Psychological Discomfort:</strong> Possible unease when
                  reflecting on academic performance
                </li>
                <li>
                  <strong>Time Burden:</strong> 10-15 minutes of participant time
                  required
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Mitigation Strategies
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Robust anonymization and encryption protocols (detailed above)
                </li>
                <li>
                  Voluntary participation with clear right to withdraw without
                  penalty
                </li>
                <li>
                  Questionnaire designed to be brief, non-invasive, and
                  non-judgmental
                </li>
                <li>
                  Academic counseling resources provided to all participants if
                  needed
                </li>
              </ul>
            </div>
          </section>

          {/* Conflict of Interest */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Conflict of Interest Statement
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The research team declares <strong>no conflicts of interest</strong>.
                None of the researchers have financial, personal, or professional
                relationships that could inappropriately influence the study
                design, data collection, analysis, interpretation, or reporting.
                The study was conducted independently without external funding or
                sponsorship that could bias the results.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
