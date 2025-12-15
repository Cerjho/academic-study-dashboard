import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * KPI Card Component
 *
 * Displays key performance indicators with value, label, and optional metrics.
 * Used in dashboard for highlighting important statistics.
 */

interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: 'regular' | 'irregular' | 'neutral';
  icon?: ReactNode;
  className?: string;
}

export function KPICard({
  label,
  value,
  subtitle,
  trend,
  color = 'neutral',
  icon,
  className,
}: KPICardProps) {
  const colorClasses = {
    regular: 'text-regular-600',
    irregular: 'text-irregular-600',
    neutral: 'text-gray-900',
  };

  const trendColorClasses = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  return (
    <div
      className={cn(
        'rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className={cn('text-3xl font-bold', colorClasses[color])}>
              {value}
            </p>
            {subtitle && (
              <span className="text-sm text-gray-500">{subtitle}</span>
            )}
          </div>
          {trend && (
            <div
              className={cn(
                'mt-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                trendColorClasses[trend.direction]
              )}
            >
              {trend.direction === 'up' && (
                <svg
                  className="mr-1 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H13a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {trend.direction === 'down' && (
                <svg
                  className="mr-1 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 011 1v4a1 1 0 11-2 0v-2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.414l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H13a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {trend.value > 0 ? '+' : ''}
              {trend.value}% {trend.label}
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
