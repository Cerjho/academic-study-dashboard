import Link from 'next/link';
import { Button } from '@/components/ui';
import { KPICard } from '@/components/dashboard';
import { getRespondentData } from '@/data';

/**
 * Home Page - Landing Page
 *
 * Displays the study overview, key metrics, and call-to-action
 * to explore the full dashboard.
 */

export default function Home() {
  const respondentData = getRespondentData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-br from-regular-50 via-blue-50 to-white px-4 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-regular-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-5xl text-center animate-fade-in relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-regular-200">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-700">Live Research Dashboard</span>
          </div>
          
          <h1 className="mb-8 text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-regular-600 to-blue-600 bg-clip-text text-transparent md:text-6xl lg:text-7xl leading-tight">
            {respondentData.studyMetadata.title}
          </h1>

          <p className="mb-12 text-lg text-gray-700 md:text-xl max-w-3xl mx-auto leading-relaxed">
            Interactive data presentation for the study examining the relationship between enrollment
            status and academic performance in the{' '}
            <span className="font-semibold text-regular-600">{respondentData.studyMetadata.program}</span> at{' '}
            <span className="font-semibold text-regular-600">{respondentData.studyMetadata.institution}</span>
          </p>

          {/* KPI Cards */}
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            <KPICard
              label="Total Respondents"
              value={respondentData.studyMetadata.totalRespondents}
              color="neutral"
              icon={
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            {respondentData.enrollmentDistribution.map((enrollment) => (
              <KPICard
                key={enrollment.status}
                label={`${enrollment.status} Students`}
                value={enrollment.count}
                subtitle={`(${enrollment.percentage}%)`}
                color={
                  enrollment.status === 'Regular' ? 'regular' : 'irregular'
                }
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-10 py-6 text-lg shadow-2xl bg-gradient-to-r from-regular-600 to-blue-600 hover:from-regular-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300">
                Explore Findings →
              </Button>
            </Link>
            <Link href="/insights">
              <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg border-2 border-regular-600 text-regular-600 hover:bg-regular-50 transform hover:scale-105 transition-all duration-300">
                View Insights
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Study Highlights
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive analysis of academic performance and enrollment patterns
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-regular-500 to-blue-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                GWA Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Compare academic performance across enrollment status with
                detailed statistical breakdowns
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-irregular-500 to-red-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Study Habits
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore the correlation between study hours and academic
                achievement
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Research Ethics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ethical research standards with full data privacy and voluntary
                anonymous participation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
