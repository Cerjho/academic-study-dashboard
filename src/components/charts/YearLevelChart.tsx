/**
 * Year Level Distribution Chart
 *
 * Visualizes the distribution of students across year levels,
 * comparing Regular and Irregular enrollment status.
 */

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '@/lib/constants';
import type { DemographicsData } from '@/types';

interface YearLevelChartProps {
  data: DemographicsData;
  showTotal?: boolean;
}

export function YearLevelChart({ data, showTotal = false }: YearLevelChartProps) {
  const chartData = data.yearLevel.map(level => ({
    year: level.year,
    Regular: level.regular,
    Irregular: level.irregular,
    Total: level.total,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="year"
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
        {showTotal ? (
          <Bar dataKey="Total" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
        ) : (
          <>
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
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
