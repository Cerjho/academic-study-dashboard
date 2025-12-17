'use client';

/**
 * Dashboard Content - Dynamic Data Visualization
 * 
 * Real-time dashboard using FilterContext and runtime data processing
 */

import { Card, Badge } from '@/components/ui';
import { KPICard, StatusToggle, GWARangeSlider, YearLevelFilter } from '@/components/dashboard';
import { SectionWrapper } from '@/components/ui';
// Chart imports removed - using custom visualizations
import { useFilters } from '@/contexts/FilterContext';
import {
  useRespondentCounts,
  useProcessedData,
  useGWADistribution,
  useStatisticalTests,
  useMetricStats
} from '@/hooks/useRespondentData';

export function DashboardContent() {
  const { filters, setEnrollmentStatus, setGWARanges, setYearLevel, clearFilters, applyPreset } = useFilters();
  const counts = useRespondentCounts();
  const processedData = useProcessedData();
  const gwaDistribution = useGWADistribution();
  const statisticalTests = useStatisticalTests();
  const gwaStats = useMetricStats('gwa');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-regular-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-regular-600 bg-clip-text text-transparent">
                  Data Overview
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                {counts.total} students • Filter and explore the data
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-white bg-regular-600 rounded-lg hover:bg-regular-700 transition-colors">
                  Quick Presets
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <button
                    onClick={() => applyPreset('high-performers')}
                    className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50 rounded-t-lg"
                  >
                    <div className="font-medium">High Performers</div>
                    <div className="text-xs text-gray-500">GWA 1.00-1.99</div>
                  </button>
                  <button
                    onClick={() => applyPreset('at-risk')}
                    className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    <div className="font-medium">At-Risk Students</div>
                    <div className="text-xs text-gray-500">Low GWA, minimal study</div>
                  </button>
                  <button
                    onClick={() => applyPreset('regular-students')}
                    className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    <div className="font-medium">Regular Only</div>
                    <div className="text-xs text-gray-500">Full-time students</div>
                  </button>
                  <button
                    onClick={() => applyPreset('irregular-students')}
                    className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50 rounded-b-lg"
                  >
                    <div className="font-medium">Irregular Only</div>
                    <div className="text-xs text-gray-500">Part-time students</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Data Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enrollment Status
                </label>
                <StatusToggle
                  value={filters.enrollmentStatus.toLowerCase() as 'all' | 'regular' | 'irregular'}
                  onChange={(val) => {
                    const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
                    setEnrollmentStatus(capitalized as 'All' | 'Regular' | 'Irregular');
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  GWA Ranges
                </label>
                <GWARangeSlider
                  value={filters.gwaRanges as ('excellent' | 'aboveAverage' | 'satisfactory' | 'fair')[]}
                  onChange={(ranges) => setGWARanges(ranges as string[])}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Year Level
                </label>
                <YearLevelFilter
                  value={filters.yearLevel.toLowerCase() as 'all' | '1st' | '2nd' | '3rd' | '4th'}
                  onChange={(val) => {
                    const capitalized = val === 'all' ? 'All' : val.charAt(0).toUpperCase() + val.slice(1);
                    setYearLevel(capitalized as 'All' | '1st' | '2nd' | '3rd' | '4th');
                  }}
                />
              </div>
            </div>
            
            {/* Active Filters Badge */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Active filters:</span>
                {filters.enrollmentStatus !== 'All' && (
                  <Badge variant={filters.enrollmentStatus === 'Regular' ? 'regular' : 'irregular'}>
                    {filters.enrollmentStatus}
                  </Badge>
                )}
                {filters.gwaRanges.length > 0 && filters.gwaRanges.length < 4 && (
                  <Badge variant="default">
                    {filters.gwaRanges.length} GWA range{filters.gwaRanges.length > 1 ? 's' : ''}
                  </Badge>
                )}
                {filters.yearLevel !== 'All' && (
                  <Badge variant="default">Year {filters.yearLevel}</Badge>
                )}
                {filters.enrollmentStatus === 'All' && 
                 filters.gwaRanges.length === 0 && 
                 filters.yearLevel === 'All' && (
                  <span className="text-gray-500 italic">None (showing all data)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard
            label="Total Respondents"
            value={counts.total}
            color="neutral"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <KPICard
            label="Regular Students"
            value={counts.regular}
            subtitle={`${counts.regularPercentage.toFixed(1)}%`}
            color="regular"
          />
          <KPICard
            label="Irregular Students"
            value={counts.irregular}
            subtitle={`${counts.irregularPercentage.toFixed(1)}%`}
            color="irregular"
          />
          <KPICard
            label="Average GWA"
            value={gwaStats.mean.toFixed(2)}
            subtitle={`Range: ${gwaStats.min.toFixed(2)} - ${gwaStats.max.toFixed(2)}`}
            color="neutral"
          />
        </div>



        {/* Enrollment Distribution */}
        <SectionWrapper
          title="Enrollment Distribution"
          description="Visual breakdown of student enrollment status"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <h3 className="font-semibold mb-4">Enrollment Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-regular-50 rounded-lg">
                  <span className="font-medium text-regular-700">Regular Students</span>
                  <span className="text-2xl font-bold text-regular-600">{counts.regular}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-irregular-50 rounded-lg">
                  <span className="font-medium text-irregular-700">Irregular Students</span>
                  <span className="text-2xl font-bold text-irregular-600">{counts.irregular}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 p-6 bg-white rounded-lg border border-gray-200">
              <div>
                <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sample Size:</span>
                    <span className="font-semibold">{counts.total} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Regular Students:</span>
                    <span className="font-semibold text-regular-600">{counts.regular}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Irregular Students:</span>
                    <span className="font-semibold text-irregular-600">{counts.irregular}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* GWA Analysis */}
        <SectionWrapper
          title="GWA Distribution & Comparison"
          description="Academic performance analysis by enrollment status"
        >
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">GWA comparison chart being updated for dynamic data...</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-regular-500 rounded"></span>
                Regular Students
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mean GWA:</span>
                  <span className="font-semibold">{gwaDistribution.byStatus.Regular?.stats.mean.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Std Dev:</span>
                  <span className="font-semibold">{gwaDistribution.byStatus.Regular?.stats.stdDev.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-irregular-500 rounded"></span>
                Irregular Students
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mean GWA:</span>
                  <span className="font-semibold">{gwaDistribution.byStatus.Irregular?.stats.mean.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Std Dev:</span>
                  <span className="font-semibold">{gwaDistribution.byStatus.Irregular?.stats.stdDev.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </Card>
          </div>
        </SectionWrapper>

        {/* Study Habits */}
        {processedData.studyHours && (
          <SectionWrapper
            title="Study Hours Analysis"
            description="Relationship between study time and academic performance"
          >
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4">Study Hours Correlation</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Correlation Coefficient</div>
                  <div className="text-2xl font-bold text-gray-900">{processedData.studyHours.correlation.toFixed(3)}</div>
                </div>
                <div className="p-4 bg-regular-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Regular Avg Hours</div>
                  <div className="text-2xl font-bold text-regular-600">{processedData.studyHours.regular.averageHours.toFixed(2)}h</div>
                </div>
                <div className="p-4 bg-irregular-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Irregular Avg Hours</div>
                  <div className="text-2xl font-bold text-irregular-600">{processedData.studyHours.irregular.averageHours.toFixed(2)}h</div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Performance Factors */}
        {processedData.performanceFactors && (
          <SectionWrapper
            title="Performance Factors"
            description="Key factors influencing academic achievement"
          >
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4">Top Factors Affecting Academic Performance</h3>
              <div className="space-y-3">
                {processedData.performanceFactors.factors.slice(0, 5).map((factor, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{factor.factor}</span>
                        <span className="text-sm text-gray-600">{factor.count} ({factor.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-regular-600 h-2 rounded-full" style={{ width: `${factor.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Statistical Tests */}
        {statisticalTests && statisticalTests.gwaComparison && (
          <SectionWrapper
            title="Statistical Analysis"
            description="Hypothesis testing and significance levels"
          >
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4">GWA T-Test Results</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">T-Statistic</div>
                  <div className="text-2xl font-bold text-gray-900">{statisticalTests.gwaComparison.tStatistic?.toFixed(3) || 'N/A'}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">P-Value</div>
                  <div className="text-2xl font-bold text-gray-900">{statisticalTests.gwaComparison.pValue?.toFixed(4) || 'N/A'}</div>
                  {statisticalTests.gwaComparison.pValue && statisticalTests.gwaComparison.pValue < 0.05 && (
                    <div className="mt-2 text-xs font-medium text-green-600">Statistically Significant</div>
                  )}
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Cohen&apos;s d</div>
                  <div className="text-2xl font-bold text-gray-900">{statisticalTests.gwaComparison.cohensD?.toFixed(3) || 'N/A'}</div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Qualitative Themes - Coming Soon */}
        {/* {processedData.qualitativeThemes && (
          <SectionWrapper
            title="Qualitative Insights"
            description="Themes from student feedback and observations"
          >
            <QualitativeThemesDisplay data={processedData.qualitativeThemes} />
          </SectionWrapper>
        )} */}


      </div>
    </div>
  );
}
