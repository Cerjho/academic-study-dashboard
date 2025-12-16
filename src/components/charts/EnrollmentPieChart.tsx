'use client';

import { useState } from 'react';
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
import { DrillDownModal, DrillDownSection, DrillDownStat } from '@/components/ui';

/**
 * Enrollment Distribution Pie Chart
 *
 * Visualizes the distribution of Regular vs Irregular students
 * using an interactive pie chart with custom colors, tooltips, and drill-down.
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
    const percentage = calculatePercentage(data.value, total);
    
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xl max-w-xs animate-fade-in">
        <p className="font-bold text-gray-900 text-base mb-3 border-b pb-2">{data.name} Students</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Student Count:</span>
            <span className="font-bold text-gray-900">{formatNumber(data.value)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Students:</span>
            <span className="font-semibold text-gray-700">{formatNumber(total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Percentage:</span>
            <span className="font-bold text-lg" style={{ color: data.color }}>
              {percentage}%
            </span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic">💡 Click segment for detailed analysis</p>
        </div>
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
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [selectedSegment, setSelectedSegment] = useState<EnrollmentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handlePieClick = (_: unknown, index: number) => {
    setSelectedSegment(data[index]);
    setIsModalOpen(true);
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
            outerRadius={activeIndex !== undefined ? 130 : 120}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
            onClick={handlePieClick}
            className="cursor-pointer"
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
        <div 
          className="text-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => {
            setSelectedSegment(data[0]);
            setIsModalOpen(true);
          }}
        >
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
        <div 
          className="text-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => {
            setSelectedSegment(data[1]);
            setIsModalOpen(true);
          }}
        >
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

      {/* Drill-Down Modal */}
      {selectedSegment && (
        <DrillDownModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${selectedSegment.name} Student Analysis`}
        >
          <DrillDownSection title="Enrollment Overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <DrillDownStat
                label="Student Count"
                value={formatNumber(selectedSegment.value)}
                subtitle="Total enrolled"
                color={selectedSegment.name === 'Regular' ? 'regular' : 'irregular'}
              />
              <DrillDownStat
                label="Percentage"
                value={`${calculatePercentage(selectedSegment.value, totalStudents)}%`}
                subtitle="Of all students"
                color={selectedSegment.name === 'Regular' ? 'regular' : 'irregular'}
              />
              <DrillDownStat
                label="Total Population"
                value={formatNumber(totalStudents)}
                subtitle="All students"
                color="neutral"
              />
            </div>
          </DrillDownSection>

          <DrillDownSection title="Population Distribution">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {selectedSegment.name} Students
                  </span>
                  <span className="text-sm font-bold" style={{ color: selectedSegment.color }}>
                    {calculatePercentage(selectedSegment.value, totalStudents)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-700"
                    style={{
                      width: `${calculatePercentage(selectedSegment.value, totalStudents)}%`,
                      backgroundColor: selectedSegment.color,
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedSegment.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{selectedSegment.name}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalStudents - selectedSegment.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {selectedSegment.name === 'Regular' ? 'Irregular' : 'Regular'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DrillDownSection>

          <DrillDownSection title="Key Characteristics">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">
                {selectedSegment.name} Student Profile
              </h4>
              {selectedSegment.name === 'Regular' ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Following prescribed curriculum sequence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>On-track for graduation within standard timeframe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>No major academic setbacks or course retakes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Represent {calculatePercentage(selectedSegment.value, totalStudents)}% of the study population</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Non-sequential course progression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Extended time to degree completion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>May include course retakes or delayed progression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Represent {calculatePercentage(selectedSegment.value, totalStudents)}% of the study population</span>
                  </li>
                </ul>
              )}
            </div>
          </DrillDownSection>
        </DrillDownModal>
      )}
    </div>
  );
}
