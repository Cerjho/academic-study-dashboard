'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';

/**
 * GWA Comparison Bar Chart
 *
 * Compares GWA distribution across Regular and Irregular students.
 * Shows grouped bars for each GWA category with custom tooltips.
 */

interface GWACategoryData {
  category: string;
  range: string;
  regular: number;
  irregular: number;
}

interface GWAComparisonBarChartProps {
  data: GWACategoryData[];
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <p className="mb-2 font-semibold text-gray-900">{label}</p>
        <div className="space-y-1">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <span
                className="mr-3 inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">{entry.name}:</span>
              <span className="ml-2 font-medium text-gray-900">
                {formatNumber(entry.value as number)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 border-t border-gray-200 pt-2 text-xs text-gray-600">
          Total: {formatNumber((payload[0].value as number) + (payload[1].value as number))} students
        </div>
      </div>
    );
  }
  return null;
}

export function GWAComparisonBarChart({
  data,
  className,
}: GWAComparisonBarChartProps) {

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="category"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: 'Number of Students',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12 },
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
            formatter={(value) => {
              return value === 'regular' ? 'Regular Students' : 'Irregular Students';
            }}
          />
          <Bar
            dataKey="regular"
            fill={COLORS.REGULAR}
            name="Regular"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="irregular"
            fill={COLORS.IRREGULAR}
            name="Irregular"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-1 text-xs font-medium text-gray-600">
                {item.category}
              </div>
              <div className="text-sm text-gray-500">{item.range}</div>
              <div className="mt-1 flex items-center justify-center gap-2 text-xs">
                <span style={{ color: COLORS.REGULAR }}>
                  R: {item.regular}
                </span>
                <span className="text-gray-400">|</span>
                <span style={{ color: COLORS.IRREGULAR }}>
                  I: {item.irregular}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
