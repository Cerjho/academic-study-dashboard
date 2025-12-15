'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { COLORS } from '@/lib/constants';

/**
 * Study Hours vs GWA Line Chart
 *
 * Displays the correlation between study hours per week and GWA
 * for both Regular and Irregular students.
 */

interface StudyHoursData {
  hoursRange: string;
  regularGWA: number;
  irregularGWA: number;
}

interface StudyHoursLineChartProps {
  data: StudyHoursData[];
  correlationCoefficient?: number;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <p className="mb-2 font-semibold text-gray-900">
          Study Hours: {label}
        </p>
        <div className="space-y-1">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <span
                className="mr-3 inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">{entry.name}:</span>
              <span className="ml-2 font-medium text-gray-900">
                {(entry.value as number).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 border-t border-gray-200 pt-2 text-xs text-gray-600">
          Gap: {Math.abs((payload[0].value as number) - (payload[1].value as number)).toFixed(2)}
        </div>
      </div>
    );
  }
  return null;
}

export function StudyHoursLineChart({
  data,
  correlationCoefficient = -0.78,
  className,
}: StudyHoursLineChartProps) {

  const getCorrelationStrength = (coefficient: number): string => {
    const abs = Math.abs(coefficient);
    if (abs >= 0.7) return 'Strong';
    if (abs >= 0.4) return 'Moderate';
    return 'Weak';
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="hoursRange"
            label={{
              value: 'Study Hours per Week',
              position: 'insideBottom',
              offset: -10,
              style: { fontSize: 12 },
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: 'Average GWA',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12 },
            }}
            domain={[1.0, 3.0]}
            ticks={[1.0, 1.5, 2.0, 2.5, 3.0]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            iconType="line"
            formatter={(value) => {
              return value === 'regularGWA'
                ? 'Regular Students'
                : 'Irregular Students';
            }}
          />
          <ReferenceLine
            y={2.0}
            stroke="#999"
            strokeDasharray="3 3"
            label={{
              value: 'Good (2.0)',
              position: 'right',
              style: { fontSize: 10, fill: '#666' },
            }}
          />
          <Line
            type="monotone"
            dataKey="regularGWA"
            stroke={COLORS.REGULAR}
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            animationDuration={800}
            name="regularGWA"
          />
          <Line
            type="monotone"
            dataKey="irregularGWA"
            stroke={COLORS.IRREGULAR}
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            animationDuration={800}
            name="irregularGWA"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600">
              Correlation Coefficient
            </div>
            <div className="mt-1 text-2xl font-bold text-gray-900">
              {correlationCoefficient.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Pearson&apos;s r</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600">Strength</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">
              {getCorrelationStrength(correlationCoefficient)}
            </div>
            <div className="text-xs text-gray-500">
              {correlationCoefficient < 0 ? 'Negative' : 'Positive'} relationship
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600">
              Interpretation
            </div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {correlationCoefficient < 0 ? 'Inverse' : 'Direct'} Correlation
            </div>
            <div className="text-xs text-gray-500">
              {correlationCoefficient < 0
                ? 'More hours → Lower GWA'
                : 'More hours → Higher GWA'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
