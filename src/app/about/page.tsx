import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Academic Study',
  description:
    'Information about Mabini College, study authors, and contact details',
};

/**
 * About Page
 *
 * Provides information about the institution, study authors,
 * and contact information.
 */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-lg bg-white p-8 shadow">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            About This Study
          </h1>

          <div className="mb-8 rounded-lg bg-regular-50 p-5 border border-regular-200">
            <h3 className="mb-2 text-lg font-semibold text-regular-900">
              Research Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This interactive dashboard presents findings from a quantitative
              study examining the relationship between enrollment status and
              academic achievement among Computer Science students at Mabini
              College. The research was conducted during the 2023-2024 academic
              year and aims to inform institutional policies and student support
              services.
            </p>
          </div>

          {/* About Mabini College */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Mabini College
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                <strong>Mabini College</strong> is a comprehensive higher education
                institution dedicated to academic excellence and student success.
                Located in the Philippines, the college serves a diverse student
                population and offers undergraduate and graduate programs across
                multiple disciplines.
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Computer Science Program
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                The Bachelor of Science in Computer Science program at Mabini
                College prepares students for careers in software development,
                systems analysis, data science, and related fields. The
                curriculum emphasizes both theoretical foundations and practical
                applications, with courses in programming, algorithms, database
                systems, software engineering, and emerging technologies.
              </p>

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800">
                Program Highlights
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>CHED-Compliant Curriculum:</strong> Aligned with
                  Commission on Higher Education standards and ACM/IEEE CS2013
                  guidelines
                </li>
                <li>
                  <strong>Industry Partnerships:</strong> Collaborations with
                  technology companies for internships and capstone projects
                </li>
                <li>
                  <strong>Modern Facilities:</strong> State-of-the-art computer
                  laboratories and software development tools
                </li>
                <li>
                  <strong>Faculty Expertise:</strong> Qualified instructors with
                  industry experience and advanced degrees
                </li>
                <li>
                  <strong>Student Support:</strong> Academic advising, tutoring
                  services, and career counseling
                </li>
              </ul>
            </div>
          </section>

          {/* Research Team */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Research Team
            </h2>
            <div className="space-y-6">
              {/* Research Instructor */}
              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Enova, Aeron Dave C.
                    </h3>
                    <p className="text-sm text-gray-600">
                      Research Instructor
                    </p>
                  </div>
                  <span className="rounded-full bg-regular-100 px-3 py-1 text-xs font-medium text-regular-700">
                    Instructor
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Research instructor and advisor for this comparative study on
                  enrollment status and academic achievement.
                </p>
              </div>

              {/* Student Researchers */}
              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Student Researchers
                  </h3>
                  <p className="text-sm text-gray-600">
                    Bachelor of Science in Computer Science
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Balon, Niccolo</strong></li>
                  <li>• <strong>Jarapa, Arabella P.</strong></li>
                  <li>• <strong>Balangbang, Dranreb wen A.</strong></li>
                  <li>• <strong>Barcela, Jhocer</strong></li>
                  <li>• <strong>Magnampo, Benedict Samuel</strong></li>
                </ul>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  These student researchers contributed to research design, data
                  collection, analysis, and the development of this interactive
                  dashboard as part of their coursework requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Study Information */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Study Information
            </h2>
            <div className="rounded-lg bg-gray-50 p-5 border border-gray-300">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    Study Title
                  </dt>
                  <dd className="text-sm text-gray-900">
                    The Impact of Enrollment Status on Academic Achievement
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    Academic Year
                  </dt>
                  <dd className="text-sm text-gray-900">2023-2024</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    IRB Protocol
                  </dt>
                  <dd className="text-sm text-gray-900">#2023-CS-089</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    Sample Size
                  </dt>
                  <dd className="text-sm text-gray-900">73 students</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    Data Collection Period
                  </dt>
                  <dd className="text-sm text-gray-900">
                    September 1-14, 2023
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    Funding Source
                  </dt>
                  <dd className="text-sm text-gray-900">
                    Institutional Research Funds
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                For inquiries about this research, data access requests, or
                collaboration opportunities, please contact:
              </p>

              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Principal Investigator
                </h3>
                <address className="not-italic">
                  <p className="mb-2 text-sm text-gray-700">
                    <strong>Dr. Maria L. Santos</strong>
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    📧 Email:{' '}
                    <a
                      href="mailto:mlsantos@mabini.edu.ph"
                      className="text-regular-600 hover:text-regular-700 underline"
                    >
                      mlsantos@mabini.edu.ph
                    </a>
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    📞 Phone: +63 (2) 8123-4567 ext. 305
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    📧 Email:{' '}
                    <a
                      href="mailto:cs.department@mabini.edu.ph"
                      className="text-regular-600 hover:text-regular-700 underline"
                    >
                      cs.department@mabini.edu.ph
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">
                    🏢 Office: Computer Science Department, Mabini Colleges, Inc.
                  </p>
                </address>
              </div>

              <div className="mt-4 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  For Research Inquiries
                </h3>
                <address className="not-italic">
                  <p className="mb-1 text-sm text-gray-700">
                    <strong>Instructor: Enova, Aeron Dave C.</strong>
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    College of Computer Studies
                  </p>
                  <p className="text-sm text-gray-700">
                    Mabini Colleges, Inc.
                  </p>
                </address>
              </div>
            </div>
          </section>

          {/* Acknowledgments */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Acknowledgments
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The research team gratefully acknowledges the contributions of
                the following individuals and offices:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Participating Students:</strong> All 73 Computer
                  Science students who voluntarily participated in this study
                </li>
                <li>
                  <strong>Office of the Registrar:</strong> For assistance with
                  data verification and record access
                </li>
                <li>
                  <strong>Institutional Review Board:</strong> For ethical
                  oversight and approval of research protocols
                </li>
                <li>
                  <strong>CS Faculty Members:</strong> For facilitating data
                  collection during class hours
                </li>
                <li>
                  <strong>College Administration:</strong> For supporting
                  institutional research initiatives
                </li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
