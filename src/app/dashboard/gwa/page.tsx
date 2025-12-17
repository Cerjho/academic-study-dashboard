'use client';

/**
 * GWA Analysis Dashboard
 * Focused visualization of academic performance metrics
 */

import { Card, Badge } from '@/components/ui';
import { KPICard, GWARangeSlider } from '@/components/dashboard';
import { SectionWrapper } from '@/components/ui';
import { useFilters } from '@/contexts/FilterContext';
import { useGWADistribution, useMetricStats, useStatisticalTests } from '@/hooks/useRespondentData';

export default function GWAPage() {
  const { filters, setGWARanges } = useFilters();
  const gwaDistribution = useGWADistribution();
  const gwaStats = useMetricStats('gwa');
  const statisticalTests = useStatisticalTests();

  const regularStats = gwaDistribution.byStatus.Regular?.stats;
  const irregularStats = gwaDistribution.byStatus.Irregular?.stats;
  const performanceGap = regularStats && irregularStats 
    ? (regularStats.mean - irregularStats.mean).toFixed(2)
    : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent mb-2">
            GWA Analysis
          </h1>
          <p className="text-gray-600 text-lg">
            Academic performance metrics and statistical comparisons
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Filter by GWA Range
          </label>
          <GWARangeSlider
            value={filters.gwaRanges as ('excellent' | 'aboveAverage' | 'satisfactory' | 'fair')[]}
            onChange={(ranges) => setGWARanges(ranges as string[])}
          />
        </div>

        {/* KPIs */}
        <div className="grid gap-6 sm:grid-cols-4 mb-8">
          <KPICard
            label="Overall Mean GWA"
            value={gwaStats.mean.toFixed(2)}
            color="neutral"
          />
          <KPICard
            label="Median GWA"
            value={gwaStats.median.toFixed(2)}
            color="neutral"
          />
          <KPICard
            label="Best GWA"
            value={gwaStats.min.toFixed(2)}
            subtitle="Lowest is best"
            color="neutral"
          />
          <KPICard
            label="Performance Gap"
            value={performanceGap}
            subtitle="Regular vs Irregular"
            color="neutral"
          />
        </div>

        {/* GWA Comparison by Status */}
        <SectionWrapper
          title="GWA Comparison by Enrollment Status"
          description="Statistical comparison between Regular and Irregular students"
        >
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="p-8 bg-gradient-to-br from-regular-50 to-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-regular-500 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-regular-700">Regular Students</h3>
              </div>
              {regularStats ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Mean GWA</span>
                    <span className="text-2xl font-bold text-regular-600">{regularStats.mean.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Median</span>
                    <span className="text-xl font-semibold text-gray-700">{regularStats.median.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Std Deviation</span>
                    <span className="text-xl font-semibold text-gray-700">{regularStats.stdDev.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Range</span>
                    <span className="text-xl font-semibold text-gray-700">
                      {regularStats.min.toFixed(2)} - {regularStats.max.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </Card>

            <Card className="p-8 bg-gradient-to-br from-irregular-50 to-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-irregular-500 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-irregular-700">Irregular Students</h3>
              </div>
              {irregularStats ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Mean GWA</span>
                    <span className="text-2xl font-bold text-irregular-600">{irregularStats.mean.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Median</span>
                    <span className="text-xl font-semibold text-gray-700">{irregularStats.median.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Std Deviation</span>
                    <span className="text-xl font-semibold text-gray-700">{irregularStats.stdDev.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-medium">Range</span>
                    <span className="text-xl font-semibold text-gray-700">
                      {irregularStats.min.toFixed(2)} - {irregularStats.max.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </Card>
          </div>

          {/* Performance Gap Visualization */}
          {regularStats && irregularStats && (
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-4 text-gray-900">Performance Gap Analysis</h3>
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-gray-900 mb-2">
                    {Math.abs(parseFloat(performanceGap as string)).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">GWA Point Difference</div>
                  <Badge variant={parseFloat(performanceGap as string) < 0 ? 'irregular' : 'regular'} className="text-sm">
                    {parseFloat(performanceGap as string) > 0 ? 'Regular students perform better' : 'Irregular students perform better'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </SectionWrapper>

        {/* Statistical Tests */}
        {statisticalTests?.gwaComparison && (
          <SectionWrapper
            title="Statistical Significance Testing"
            description="T-test results comparing GWA between enrollment groups"
          >
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-2 font-medium">T-Statistic</div>
                  <div className="text-4xl font-bold text-blue-600">
                    {statisticalTests.gwaComparison.tStatistic?.toFixed(3) || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Measures difference magnitude</div>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-gray-600 mb-2 font-medium">P-Value</div>
                  <div className="text-4xl font-bold text-purple-600">
                    {statisticalTests.gwaComparison.pValue?.toFixed(4) || 'N/A'}
                  </div>
                  {statisticalTests.gwaComparison.pValue && (
                    <div className={`text-xs font-semibold mt-2 ${
                      statisticalTests.gwaComparison.pValue < 0.05 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {statisticalTests.gwaComparison.pValue < 0.05 ? '✓ Statistically Significant' : '✗ Not Significant'}
                    </div>
                  )}
                </div>
                
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-gray-600 mb-2 font-medium">Cohen&apos;s d</div>
                  <div className="text-4xl font-bold text-green-600">
                    {statisticalTests.gwaComparison.cohensD?.toFixed(3) || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Effect size measure</div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}


      </div>
    </div>
  );
}
