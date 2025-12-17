/**
 * Attendance Patterns Comparison Chart
 *
 * Visualizes the relationship between class attendance frequency
 * and academic performance (GWA) for Regular and Irregular students.
 */

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '@/lib/constants';
import type { AttendanceData } from '@/types';

interface AttendanceComparisonChartProps {
  data: AttendanceData;
  metric?: 'count' | 'avgGWA';
}

export function AttendanceComparisonChart({ data, metric = 'avgGWA' }: AttendanceComparisonChartProps) {
  const chartData = data.categories.map(category => ({
    attendance: category.attendance,
    'Regular': metric === 'count' ? category.regular.count : category.regular.avgGWA,
    'Irregular': metric === 'count' ? category.irregular.count : category.irregular.avgGWA,
  }));

  const yAxisLabel = metric === 'count' ? 'Number of Students' : 'Average GWA';

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="attendance"
          stroke="#6B7280"
          style={{ fontSize: '14px' }}
          angle={-15}
          textAnchor="end"
          height={80}
        />
        <YAxis
          stroke="#6B7280"
          style={{ fontSize: '14px' }}
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          domain={metric === 'avgGWA' ? [1, 3] : undefined}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '12px',
          }}
          formatter={(value, name) => {
            if (value === null || value === undefined) return ['N/A', name as string];
            if (metric === 'count') return [`${value} students`, name as string];
            return [Number(value).toFixed(2), name as string];
          }}
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
  );
}
