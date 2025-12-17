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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-2xl bg-white p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ethics & Privacy
            </h1>
          </div>

          <div className="mb-10 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 shadow-md flex-shrink-0">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-green-900 mb-2">
                  Ethical Research Standards
                </p>
                <p className="text-sm text-green-800 font-medium">
                  Complies with Data Privacy Act of 2012 | Academic Year 2024-2025 | Voluntary & Anonymous Participation
                </p>
              </div>
            </div>
          </div>

          {/* Ethical Framework */}
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Ethical Framework
              </h2>
            </div>
            <div className="prose prose-gray max-w-none rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 border border-gray-200 shadow-md">
              <p className="mb-5 text-gray-700 leading-relaxed font-medium">
                The study adhered to the following ethical principles:
              </p>
              <ul className="space-y-4">
                <li>
                  <strong>Data Privacy Act of 2012:</strong> The research complied with the Data Privacy Act of 2012 to ensure the protection of participants' personal information.
                </li>
                <li>
                  <strong>Voluntary Participation:</strong> Participation in the study was entirely voluntary.
                </li>
                <li>
                  <strong>Anonymity:</strong> The survey was conducted anonymously to protect the identity of the respondents.
                </li>
              </ul>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-8">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Data Collection Procedures
              </h2>
            </div>
            <div className="prose prose-gray max-w-none rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 border border-gray-200 shadow-md">
              <p className="mb-5 text-gray-700 leading-relaxed font-medium">
                Data was collected using the following procedures:
              </p>
              <ul className="space-y-4">
                 <li>
                  <strong>Survey Instrument:</strong> A survey was administered via Google Forms.
                </li>
                <li>
                  <strong>Respondents:</strong> A total of 73 Computer Science students at Mabini College participated in the study during the Academic Year 2024-2025.
                </li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
