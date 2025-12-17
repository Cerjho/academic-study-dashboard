'use client';

/**
 * Enrollment Distribution Dashboard
 * Focused visualization of enrollment status patterns
 */

import { Badge } from '@/components/ui';
import { KPICard, StatusToggle } from '@/components/dashboard';
import { SectionWrapper } from '@/components/ui';
import { useFilters } from '@/contexts/FilterContext';
import { useRespondentCounts, useEnrollmentDistribution } from '@/hooks/useRespondentData';

export default function EnrollmentPage() {
  const { filters, setEnrollmentStatus } = useFilters();
  const counts = useRespondentCounts();

  const regularPercentage = (counts.regular / counts.total) * 100;
  const irregularPercentage = (counts.irregular / counts.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-regular-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-regular-600 bg-clip-text text-transparent mb-2">
            Enrollment Distribution
          </h1>
          <p className="text-gray-600 text-lg">
            Visualize student enrollment patterns • {counts.total} respondents
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Filter by Status
          </label>
          <StatusToggle
            value={filters.enrollmentStatus.toLowerCase() as 'all' | 'regular' | 'irregular'}
            onChange={(val) => {
              const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
              setEnrollmentStatus(capitalized as 'All' | 'Regular' | 'Irregular');
            }}
          />
        </div>

        {/* KPIs */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <KPICard
            label="Total Students"
            value={counts.total}
            color="neutral"
          />
          <KPICard
            label="Regular Students"
            value={counts.regular}
            subtitle={`${regularPercentage.toFixed(1)}%`}
            color="regular"
          />
          <KPICard
            label="Irregular Students"
            value={counts.irregular}
            subtitle={`${irregularPercentage.toFixed(1)}%`}
            color="irregular"
          />
        </div>

        {/* Enrollment Visualization */}
        <SectionWrapper
          title="Enrollment Status Breakdown"
          description="Visual breakdown of student enrollment distribution"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Chart Visualization */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-6 text-center text-gray-900">Distribution Chart</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-regular-50 rounded-lg">
                  <div>
                    <span className="font-medium text-regular-700">Regular Students</span>
                    <div className="text-xs text-gray-500 mt-1">Full-time enrollment</div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-regular-600">{counts.regular}</span>
                    <div className="text-xs text-gray-600 mt-1">{regularPercentage.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-irregular-50 rounded-lg">
                  <div>
                    <span className="font-medium text-irregular-700">Irregular Students</span>
                    <div className="text-xs text-gray-500 mt-1">Part-time enrollment</div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-irregular-600">{counts.irregular}</span>
                    <div className="text-xs text-gray-600 mt-1">{irregularPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-6 text-gray-900">Quick Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Sample Size</span>
                  <Badge variant="default" className="text-lg">{counts.total}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-regular-50 rounded">
                  <span className="text-gray-700">Regular Count</span>
                  <Badge variant="regular" className="text-lg">{counts.regular}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-irregular-50 rounded">
                  <span className="text-gray-700">Irregular Count</span>
                  <Badge variant="irregular" className="text-lg">{counts.irregular}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Ratio</span>
                  <span className="font-semibold">
                    {(counts.regular / counts.irregular).toFixed(2)}:1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Percentage Bars */}
        <SectionWrapper
          title="Percentage Distribution"
          description="Visual percentage comparison"
        >
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-regular-700">Regular Students</span>
                  <span className="text-sm font-semibold text-regular-600">{regularPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    className="bg-regular-500 h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-semibold transition-all duration-500"
                    style={{ width: `${regularPercentage}%` }}
                  >
                    {counts.regular} students
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-irregular-700">Irregular Students</span>
                  <span className="text-sm font-semibold text-irregular-600">{irregularPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    className="bg-irregular-500 h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-semibold transition-all duration-500"
                    style={{ width: `${irregularPercentage}%` }}
                  >
                    {counts.irregular} students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
