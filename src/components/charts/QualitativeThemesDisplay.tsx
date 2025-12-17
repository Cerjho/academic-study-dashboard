/**
 * Qualitative Themes Display
 *
 * Displays thematic analysis of student open-ended responses,
 * including representative quotes and belief distribution.
 */

'use client';

import { Card, Badge } from '@/components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '@/lib/constants';
import type { QualitativeThemesData } from '@/types';

interface QualitativeThemesDisplayProps {
  data: QualitativeThemesData;
}

export function QualitativeThemesDisplay({ data }: QualitativeThemesDisplayProps) {
  const { themes, beliefDistribution } = data;

  // Prepare belief distribution data for chart
  const beliefChartData = [
    {
      belief: 'Yes',
      Regular: beliefDistribution.yes.regular,
      Irregular: beliefDistribution.yes.irregular,
    },
    {
      belief: 'Maybe',
      Regular: beliefDistribution.maybe.regular,
      Irregular: beliefDistribution.maybe.irregular,
    },
    {
      belief: 'No',
      Regular: beliefDistribution.no.regular,
      Irregular: beliefDistribution.no.irregular,
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Regular') return 'bg-blue-100 text-blue-800';
    if (status === 'Irregular') return 'bg-red-100 text-red-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      {/* Themes Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Identified Themes from Student Responses
        </h3>
        
        {themes.map((theme, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {index + 1}. {theme.theme}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {theme.description}
                </p>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(theme.enrollmentStatus)}>
                    {theme.enrollmentStatus}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Frequency: {theme.frequency} responses
                  </span>
                </div>
              </div>
            </div>

            {/* Representative Quotes */}
            {theme.representativeQuotes.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Representative Quotes:
                </p>
                {theme.representativeQuotes.slice(0, 3).map((quote, qIndex) => (
                  <blockquote
                    key={qIndex}
                    className="pl-4 border-l-4 border-gray-300 text-sm text-gray-700 italic"
                  >
                    &quot;{quote.length > 200 ? quote.substring(0, 197) + '...' : quote}&quot;
                  </blockquote>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Belief Distribution Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Student Beliefs: Does Enrollment Status Affect Performance?
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={beliefChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="belief"
              stroke="#6B7280"
              style={{ fontSize: '14px' }}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '14px' }}
              label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '12px',
              }}
              formatter={(value: number) => [`${value} students`, '']}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Bar
              dataKey="Regular"
              fill={COLORS.REGULAR}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="Irregular"
              fill={COLORS.IRREGULAR}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Statistics */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 font-medium mb-1">YES</p>
            <p className="text-2xl font-bold text-green-900">
              {beliefDistribution.yes.regular + beliefDistribution.yes.irregular}
            </p>
            <p className="text-xs text-green-600">
              R: {beliefDistribution.yes.regular} | I: {beliefDistribution.yes.irregular}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-700 font-medium mb-1">MAYBE</p>
            <p className="text-2xl font-bold text-yellow-900">
              {beliefDistribution.maybe.regular + beliefDistribution.maybe.irregular}
            </p>
            <p className="text-xs text-yellow-600">
              R: {beliefDistribution.maybe.regular} | I: {beliefDistribution.maybe.irregular}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-700 font-medium mb-1">NO</p>
            <p className="text-2xl font-bold text-gray-900">
              {beliefDistribution.no.regular + beliefDistribution.no.irregular}
            </p>
            <p className="text-xs text-gray-600">
              R: {beliefDistribution.no.regular} | I: {beliefDistribution.no.irregular}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
