'use client';

/**
 * Performance Factors Dashboard
 * Focused visualization of study habits and performance factors
 */

import { Badge } from '@/components/ui';
import { KPICard } from '@/components/dashboard';
import { SectionWrapper } from '@/components/ui';
import { useProcessedData, usePerformanceFactors } from '@/hooks/useRespondentData';

export default function PerformancePage() {
  const processedData = useProcessedData();
  const performanceFactors = usePerformanceFactors();

  const studyHours = processedData.studyHours;
  const hasStudyData = studyHours && studyHours.correlation !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-green-600 bg-clip-text text-transparent mb-2">
            Performance Factors
          </h1>
          <p className="text-gray-600 text-lg">
            Study habits, time management, and factors influencing academic success
          </p>
        </div>

        {/* Study Hours Analysis */}
        {hasStudyData && (
          <>
            {/* KPIs */}
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              <KPICard
                label="Correlation Coefficient"
                value={studyHours.correlation.toFixed(3)}
                subtitle="Study hours vs GWA"
                color="neutral"
              />
              <KPICard
                label="Regular Avg Hours"
                value={studyHours.regular.averageHours.toFixed(1)}
                subtitle="Hours per week"
                color="regular"
              />
              <KPICard
                label="Irregular Avg Hours"
                value={studyHours.irregular.averageHours.toFixed(1)}
                subtitle="Hours per week"
                color="irregular"
              />
            </div>

            {/* Study Hours Breakdown */}
            <SectionWrapper
              title="Study Hours Analysis"
              description="Average study time comparison between enrollment groups"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Regular Students */}
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-regular-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-regular-700">Regular Students</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-regular-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Average Weekly Hours</div>
                      <div className="text-3xl font-bold text-regular-600">
                        {studyHours.regular.averageHours.toFixed(2)}h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Irregular Students */}
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-irregular-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-irregular-700">Irregular Students</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-irregular-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Average Weekly Hours</div>
                      <div className="text-3xl font-bold text-irregular-600">
                        {studyHours.irregular.averageHours.toFixed(2)}h
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Correlation Analysis */}
              <div className="mt-6 bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-4 text-gray-900">Correlation Analysis</h3>
                <div className="flex items-center justify-center py-6">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-gray-900 mb-2">
                      {studyHours.correlation.toFixed(3)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">Pearson Correlation (r)</div>
                    <Badge 
                      variant={Math.abs(studyHours.correlation) > 0.5 ? 'regular' : 'default'}
                      className="text-sm"
                    >
                      {Math.abs(studyHours.correlation) > 0.7 ? 'Strong' : 
                       Math.abs(studyHours.correlation) > 0.4 ? 'Moderate' : 'Weak'} Correlation
                    </Badge>
                    <p className="text-xs text-gray-500 mt-3 max-w-md">
                      {studyHours.correlation < 0 
                        ? 'Negative correlation: More study hours associated with lower GWA (better grades)'
                        : 'Positive correlation: More study hours associated with higher GWA (lower grades)'}
                    </p>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </>
        )}

        {/* Performance Factors */}
        {performanceFactors && performanceFactors.factors && performanceFactors.factors.length > 0 && (
          <SectionWrapper
            title="Key Performance Factors"
            description="Factors influencing academic achievement"
          >
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="space-y-5">
                {performanceFactors.factors.slice(0, 10).map((factor, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-5 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-gray-900">{factor.factor}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="default">{factor.count} responses</Badge>
                        <span className="text-sm font-semibold text-gray-600">{factor.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 ml-11">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${factor.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Time Management Insights */}
        {hasStudyData && (
          <SectionWrapper
            title="Time Management Insights"
            description="Study time efficiency and patterns"
          >
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Study Time Difference</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.abs(studyHours.regular.averageHours - studyHours.irregular.averageHours).toFixed(1)}h
                </div>
                <div className="text-sm text-gray-600">
                  {studyHours.regular.averageHours > studyHours.irregular.averageHours
                    ? 'Regular students study more'
                    : 'Irregular students study more'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Correlation Strength</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.abs(studyHours.correlation) > 0.7 ? 'Strong' : 
                   Math.abs(studyHours.correlation) > 0.4 ? 'Moderate' : 'Weak'}
                </div>
                <div className="text-sm text-gray-600">
                  {studyHours.correlation < 0 ? 'Negative' : 'Positive'} relationship
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}
      </div>
    </div>
  );
}
