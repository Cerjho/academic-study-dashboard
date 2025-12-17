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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-2xl bg-white p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-regular-500 to-regular-600 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              About This Study
            </h1>
          </div>

          <div className="mb-10 rounded-xl bg-gradient-to-br from-regular-50 to-blue-50 p-6 border border-regular-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-regular-500 shadow-md">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-regular-900">
                  Research Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  This interactive dashboard presents data from a quantitative
                  study examining the relationship between enrollment status and
                  academic achievement among Computer Science students at Mabini
                  College. The research was conducted during the 2024-2025 academic
                  year.
                </p>
              </div>
            </div>
          </div>

          {/* About Mabini College */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Study Context
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-gray-700 leading-relaxed">
                This study was conducted at <strong>Mabini College</strong>, focusing on the
                Bachelor of Science in Computer Science program.
              </p>
            </div>
          </section>

          {/* Research Team */}
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-regular-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Research Team
              </h2>
            </div>
            <div className="space-y-5">
              {/* Instructor */}
              <div className="group rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-regular-500 to-regular-600 shadow-md">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Enova, Aeron Dave C.
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        Instructor
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-regular-100 to-blue-100 px-4 py-1.5 text-xs font-semibold text-regular-700 shadow-sm">
                    Instructor
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Instructor for the comparative study.
                </p>
              </div>

              {/* Student Researchers */}
              <div className="group rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Student Researchers
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      Bachelor of Science in Computer Science
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-4">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="flex h-2 w-2 rounded-full bg-regular-500"></span>
                    <strong>Balon, Niccolo</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="flex h-2 w-2 rounded-full bg-regular-500"></span>
                    <strong>Jarapa, Arabella P.</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="flex h-2 w-2 rounded-full bg-regular-500"></span>
                    <strong>Balangbang, Dranreb wen A.</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="flex h-2 w-2 rounded-full bg-regular-500"></span>
                    <strong>Barcela, Jhocer</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="flex h-2 w-2 rounded-full bg-regular-500"></span>
                    <strong>Magnampo, Benedict Samuel</strong>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
                  These student researchers contributed to research design, data
                  collection, analysis, and the development of this interactive
                  dashboard as part of their coursework requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Study Information */}
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-regular-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Study Information
              </h2>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 p-6 border border-gray-200 shadow-md">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  <dd className="text-sm text-gray-900">2024-2025</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-medium text-gray-700">
                    Ethical Compliance
                  </dt>
                  <dd className="text-sm text-gray-900">Data Privacy Act 2012</dd>
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
                    December 2025
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-regular-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Contact Information
              </h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <div className="rounded-xl border border-gray-200 p-6 shadow-md bg-gradient-to-br from-white to-gray-50">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Instructor
                </h3>
                <address className="not-italic">
                  <p className="mb-2 text-sm text-gray-700">
                    <strong>Enova, Aeron Dave C.</strong>
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    Position: Instructor
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
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-regular-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Acknowledgments
              </h2>
            </div>
            <div className="prose prose-gray max-w-none rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed font-medium">
                The research team gratefully acknowledges the contributions of:
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <strong>Participating Students:</strong> All 73 Computer
                  Science students who voluntarily participated in this study
                </li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
