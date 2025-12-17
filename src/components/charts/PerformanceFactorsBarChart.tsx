/**
 * Performance Factors Bar Chart
 *
 * Displays the various factors affecting academic performance
 * as reported by students, comparing Regular and Irregular groups.
 */

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '@/lib/constants';
import type { PerformanceFactorsData } from '@/types';

interface PerformanceFactorsBarChartProps {
  data: PerformanceFactorsData;
  showPercentage?: boolean;
  topN?: number;
}

export function PerformanceFactorsBarChart({ 
  data, 
  showPercentage = false,
  topN 
}: PerformanceFactorsBarChartProps) {
  let chartData = data.factors.map(factor => ({
    factor: factor.factor.length > 30 
      ? factor.factor.substring(0, 27) + '...' 
      : factor.factor,
    fullFactor: factor.factor,
    Regular: showPercentage ? factor.regularPercentage : factor.regular,
    Irregular: showPercentage ? factor.irregularPercentage : factor.irregular,
  }));

  // Show only top N factors if specified
  if (topN) {
    chartData = chartData.slice(0, topN);
  }

  const yAxisLabel = showPercentage ? 'Percentage (%)' : 'Number of Students';

  return (
    <ResponsiveContainer width="100%" height={Math.max(400, chartData.length * 50)}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          type="number"
          stroke="#6B7280"
          style={{ fontSize: '14px' }}
          label={{ value: yAxisLabel, position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          type="category"
          dataKey="factor"
          stroke="#6B7280"
          style={{ fontSize: '12px' }}
          width={140}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '12px',
          }}
          formatter={(value, name) => {
            const numValue = Number(value);
            if (showPercentage) return [`${numValue.toFixed(1)}%`, name as string];
            return [`${numValue} students`, name as string];
          }}
          labelFormatter={(label, payload) => {
            if (payload && payload[0]) {
              return payload[0].payload.fullFactor;
            }
            return label;
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="rect"
        />
        <Bar
          dataKey="Regular"
          fill={COLORS.REGULAR}
          radius={[0, 8, 8, 0]}
        />
        <Bar
          dataKey="Irregular"
          fill={COLORS.IRREGULAR}
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
