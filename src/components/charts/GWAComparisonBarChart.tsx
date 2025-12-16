'use client';

import { useState } from 'react';
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
import { formatNumber, calculatePercentage } from '@/lib/utils';
import { DrillDownModal, DrillDownSection, DrillDownStat } from '@/components/ui';

/**
 * GWA Comparison Bar Chart
 *
 * Compares GWA distribution across Regular and Irregular students.
 * Shows grouped bars for each GWA category with custom tooltips and drill-down.
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
    const total = (payload[0].value as number) + (payload[1].value as number);
    const regularCount = payload[0].value as number;
    const irregularCount = payload[1].value as number;
    const regularPercent = calculatePercentage(regularCount, total);
    const irregularPercent = calculatePercentage(irregularCount, total);
    
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xl max-w-xs animate-fade-in">
        <p className="mb-3 font-bold text-gray-900 text-base border-b pb-2">{label}</p>
        <div className="space-y-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700">{entry.name}:</span>
              </div>
              <span className="font-bold text-gray-900">
                {formatNumber(entry.value as number)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-gray-200 pt-3 space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Total Students:</span>
            <span className="font-semibold text-gray-900">{formatNumber(total)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Regular Ratio:</span>
            <span className="font-semibold text-regular-600">{regularPercent}%</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Irregular Ratio:</span>
            <span className="font-semibold text-irregular-600">{irregularPercent}%</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic">💡 Click bar for detailed breakdown</p>
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
  const [selectedCategory, setSelectedCategory] = useState<GWACategoryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarClick = (data: GWACategoryData) => {
    setSelectedCategory(data);
    setIsModalOpen(true);
  };

  const total = data.reduce((sum, item) => sum + item.regular + item.irregular, 0);
  const regularTotal = data.reduce((sum, item) => sum + item.regular, 0);
  const irregularTotal = data.reduce((sum, item) => sum + item.irregular, 0);

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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
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
            onClick={(data) => handleBarClick(data as unknown as GWACategoryData)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
          <Bar
            dataKey="irregular"
            fill={COLORS.IRREGULAR}
            name="Irregular"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
            onClick={(data) => handleBarClick(data as unknown as GWACategoryData)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.map((item, index) => {
            const categoryTotal = item.regular + item.irregular;
            return (
              <div 
                key={index} 
                className="text-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleBarClick(item)}
              >
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
                <div className="mt-1 text-xs text-gray-400">
                  ({calculatePercentage(categoryTotal, total)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drill-Down Modal */}
      {selectedCategory && (
        <DrillDownModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${selectedCategory.category} Performance Analysis`}
        >
          <DrillDownSection title="Category Overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <DrillDownStat
                label="GWA Range"
                value={selectedCategory.range}
                subtitle="Performance bracket"
                color="neutral"
              />
              <DrillDownStat
                label="Total Students"
                value={selectedCategory.regular + selectedCategory.irregular}
                subtitle={`${calculatePercentage(selectedCategory.regular + selectedCategory.irregular, total)}% of all students`}
                color="neutral"
              />
              <DrillDownStat
                label="Performance Level"
                value={selectedCategory.category}
                subtitle="Academic standing"
                color="neutral"
              />
            </div>
          </DrillDownSection>

          <DrillDownSection title="Enrollment Status Breakdown">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <DrillDownStat
                label="Regular Students"
                value={selectedCategory.regular}
                subtitle={`${calculatePercentage(selectedCategory.regular, regularTotal)}% of regular students`}
                color="regular"
              />
              <DrillDownStat
                label="Irregular Students"
                value={selectedCategory.irregular}
                subtitle={`${calculatePercentage(selectedCategory.irregular, irregularTotal)}% of irregular students`}
                color="irregular"
              />
            </div>
          </DrillDownSection>

          <DrillDownSection title="Distribution Analysis">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-regular-700">Regular Students</span>
                    <span className="text-sm font-bold text-regular-700">
                      {calculatePercentage(
                        selectedCategory.regular,
                        selectedCategory.regular + selectedCategory.irregular
                      )}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-regular-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${calculatePercentage(
                          selectedCategory.regular,
                          selectedCategory.regular + selectedCategory.irregular
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-irregular-700">Irregular Students</span>
                    <span className="text-sm font-bold text-irregular-700">
                      {calculatePercentage(
                        selectedCategory.irregular,
                        selectedCategory.regular + selectedCategory.irregular
                      )}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-irregular-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${calculatePercentage(
                          selectedCategory.irregular,
                          selectedCategory.regular + selectedCategory.irregular
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DrillDownSection>

          <DrillDownSection title="Key Insights">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedCategory.regular > selectedCategory.irregular ? (
                  <>
                    <strong>Regular students dominate</strong> this performance category with{' '}
                    {calculatePercentage(
                      selectedCategory.regular,
                      selectedCategory.regular + selectedCategory.irregular
                    )}% of students. This indicates that regular enrollment is associated with{' '}
                    {selectedCategory.category.toLowerCase()} academic performance.
                  </>
                ) : selectedCategory.irregular > selectedCategory.regular ? (
                  <>
                    <strong>Irregular students dominate</strong> this performance category with{' '}
                    {calculatePercentage(
                      selectedCategory.irregular,
                      selectedCategory.regular + selectedCategory.irregular
                    )}% of students. This suggests that irregular enrollment patterns are more prevalent in the{' '}
                    {selectedCategory.category.toLowerCase()} performance range.
                  </>
                ) : (
                  <>
                    There is an <strong>equal distribution</strong> between regular and irregular students in this category,
                    suggesting that both enrollment types achieve {selectedCategory.category.toLowerCase()} performance at similar rates.
                  </>
                )}
              </p>
            </div>
          </DrillDownSection>
        </DrillDownModal>
      )}
    </div>
  );
}
