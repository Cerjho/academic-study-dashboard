import { cn } from '@/lib/utils';
import type { GWAStatistics } from '@/types';

/**
 * Statistical Summary Component
 *
 * Displays descriptive statistics in a clean, organized layout.
 * Shows mean, median, standard deviation, and mode.
 */

interface StatisticalSummaryProps {
  statistics: GWAStatistics;
  label: string;
  color?: 'regular' | 'irregular' | 'neutral';
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function StatisticalSummary({
  statistics,
  label,
  color = 'neutral',
  className,
  orientation = 'vertical',
}: StatisticalSummaryProps) {
  const colorClasses = {
    regular: 'border-regular-200 bg-regular-50',
    irregular: 'border-irregular-200 bg-irregular-50',
    neutral: 'border-gray-200 bg-gray-50',
  };

  const textColorClasses = {
    regular: 'text-regular-700',
    irregular: 'text-irregular-700',
    neutral: 'text-gray-700',
  };

  const stats = [
    { label: 'Mean', value: statistics.mean, description: 'Average GWA' },
    { label: 'Median', value: statistics.median, description: 'Middle value' },
    {
      label: 'Std Dev',
      value: statistics.stdDeviation,
      description: 'Variability',
    },
    {
      label: 'Mode',
      value: statistics.mode,
      description: 'Most frequent',
    },
  ];

  return (
    <div
      className={cn(
        'rounded-lg border-2 p-4',
        colorClasses[color],
        className
      )}
    >
      <h4 className={cn('mb-4 font-semibold', textColorClasses[color])}>
        {label}
      </h4>

      <div
        className={cn(
          'grid gap-4',
          orientation === 'horizontal' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <div className="text-xs font-medium text-gray-600">
              {stat.label}
            </div>
            <div className={cn('text-2xl font-bold', textColorClasses[color])}>
              {stat.value.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Comparison Summary Component
 *
 * Side-by-side comparison of two statistical summaries.
 */

interface ComparisonSummaryProps {
  regularStats: GWAStatistics;
  irregularStats: GWAStatistics;
  className?: string;
}

export function ComparisonSummary({
  regularStats,
  irregularStats,
  className,
}: ComparisonSummaryProps) {
  const difference = {
    mean: (regularStats.mean - irregularStats.mean).toFixed(2),
    median: (regularStats.median - irregularStats.median).toFixed(2),
    stdDev: (regularStats.stdDeviation - irregularStats.stdDeviation).toFixed(
      2
    ),
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid gap-4 md:grid-cols-2">
        <StatisticalSummary
          statistics={regularStats}
          label="Regular Students"
          color="regular"
        />
        <StatisticalSummary
          statistics={irregularStats}
          label="Irregular Students"
          color="irregular"
        />
      </div>

      {/* Performance Gap Indicator */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="mb-3 font-semibold text-gray-900">Performance Gap</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-600">Mean Difference</div>
            <div
              className={cn(
                'text-lg font-bold',
                parseFloat(difference.mean) < 0
                  ? 'text-green-600'
                  : parseFloat(difference.mean) > 0
                    ? 'text-red-600'
                    : 'text-gray-600'
              )}
            >
              {difference.mean}
            </div>
            <div className="text-xs text-gray-500">GWA points</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Median Difference</div>
            <div
              className={cn(
                'text-lg font-bold',
                parseFloat(difference.median) < 0
                  ? 'text-green-600'
                  : parseFloat(difference.median) > 0
                    ? 'text-red-600'
                    : 'text-gray-600'
              )}
            >
              {difference.median}
            </div>
            <div className="text-xs text-gray-500">GWA points</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Std Dev Difference</div>
            <div className="text-lg font-bold text-gray-900">
              {difference.stdDev}
            </div>
            <div className="text-xs text-gray-500">variance</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-600 text-center">
          Note: Lower GWA is better. Negative difference means Regular students
          perform better.
        </p>
      </div>
    </div>
  );
}
