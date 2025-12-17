/**
 * Time Management Skills Chart
 *
 * Visualizes the relationship between self-reported time management
 * skills and academic performance (GWA) for both enrollment groups.
 */

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '@/lib/constants';
import type { TimeManagementData } from '@/types';

interface TimeManagementChartProps {
  data: TimeManagementData;
  metric?: 'count' | 'avgGWA';
}

export function TimeManagementChart({ data, metric = 'avgGWA' }: TimeManagementChartProps) {
  const chartData = data.categories.map(category => ({
    level: category.level,
    'Regular': metric === 'count' ? category.regular.count : category.regular.avgGWA,
    'Irregular': metric === 'count' ? category.irregular.count : category.irregular.avgGWA,
  }));

  const yAxisLabel = metric === 'count' ? 'Number of Students' : 'Average GWA';

  // Order for skill levels
  const skillOrder = ['Excellent', 'Good', 'Fair', 'Poor'];
  const sortedData = chartData.sort((a, b) => 
    skillOrder.indexOf(a.level) - skillOrder.indexOf(b.level)
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={sortedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="level"
          stroke="#6B7280"
          style={{ fontSize: '14px' }}
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
