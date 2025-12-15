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
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-regular-50 to-white px-4 py-16">
        <div className="max-w-4xl text-center animate-fade-in">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            {respondentData.studyMetadata.title}
          </h1>

          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            An academic study examining the relationship between enrollment
            status and academic performance in the{' '}
            {respondentData.studyMetadata.program} at{' '}
            {respondentData.studyMetadata.institution}
          </p>

          {/* KPI Cards */}
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
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

          <Link href="/dashboard">
            <Button size="lg" className="rounded-full px-8 shadow-lg">
              Explore Findings →
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Study Highlights
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-regular-100">
                  <svg
                    className="h-8 w-8 text-regular-600"
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
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                GWA Analysis
              </h3>
              <p className="text-gray-600">
                Compare academic performance across enrollment status with
                detailed statistical breakdowns
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-irregular-100">
                  <svg
                    className="h-8 w-8 text-irregular-600"
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
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Study Habits
              </h3>
              <p className="text-gray-600">
                Explore the correlation between study hours and academic
                achievement
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
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
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Research Ethics
              </h3>
              <p className="text-gray-600">
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
