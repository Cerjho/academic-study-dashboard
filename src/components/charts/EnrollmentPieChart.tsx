'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { COLORS } from '@/lib/constants';
import { formatNumber, calculatePercentage } from '@/lib/utils';

/**
 * Enrollment Distribution Pie Chart
 *
 * Visualizes the distribution of Regular vs Irregular students
 * using a pie chart with custom colors and tooltips.
 */

interface EnrollmentData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface EnrollmentPieChartProps {
  regularCount: number;
  irregularCount: number;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload as EnrollmentData;
    const total = payload[0].payload.value + payload.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sum: number, item: any) => sum + (item.value || 0),
      0
    ) - payload[0].value;
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">
          Count: {formatNumber(data.value)}
        </p>
        <p className="text-sm text-gray-600">
          Percentage: {calculatePercentage(data.value, total)}%
        </p>
      </div>
    );
  }
  return null;
}

export function EnrollmentPieChart({
  regularCount,
  irregularCount,
  className,
}: EnrollmentPieChartProps) {
  const totalStudents = regularCount + irregularCount;

  const data: EnrollmentData[] = [
    {
      name: 'Regular',
      value: regularCount,
      color: COLORS.REGULAR,
    },
    {
      name: 'Irregular',
      value: irregularCount,
      color: COLORS.IRREGULAR,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLabel = (entry: any) => {
    const percent = calculatePercentage(entry.value, totalStudents);
    return `${percent}%`;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value, entry: any) => {
              return `${value} (${entry.payload?.value || entry.value})`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <div className="text-center">
          <div
            className="mb-1 text-2xl font-bold"
            style={{ color: COLORS.REGULAR }}
          >
            {formatNumber(regularCount)}
          </div>
          <div className="text-sm text-gray-600">Regular Students</div>
          <div className="text-xs text-gray-500">
            {calculatePercentage(regularCount, totalStudents)}% of total
          </div>
        </div>
        <div className="text-center">
          <div
            className="mb-1 text-2xl font-bold"
            style={{ color: COLORS.IRREGULAR }}
          >
            {formatNumber(irregularCount)}
          </div>
          <div className="text-sm text-gray-600">Irregular Students</div>
          <div className="text-xs text-gray-500">
            {calculatePercentage(irregularCount, totalStudents)}% of total
          </div>
        </div>
      </div>
    </div>
  );
}
