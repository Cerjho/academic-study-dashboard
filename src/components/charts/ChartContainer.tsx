import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

/**
 * Chart Container Component
 *
 * Reusable wrapper for chart components with consistent styling,
 * titles, descriptions, and responsive behavior.
 */

interface ChartContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  error?: string;
  actions?: ReactNode;
}

export function ChartContainer({
  title,
  description,
  children,
  className,
  loading = false,
  error,
  actions,
}: ChartContainerProps) {
  return (
    <Card variant="elevated" className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
          {actions && <div className="ml-4 flex-shrink-0">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex h-[300px] items-center justify-center">
            <div className="text-center">
              <div
                className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-regular-500"
                role="status"
                aria-label="Loading chart"
              />
              <p className="mt-4 text-sm text-gray-600">Loading chart...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="flex h-[300px] items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="mt-4 text-sm font-medium text-gray-900">
                Failed to load chart
              </p>
              <p className="mt-1 text-sm text-gray-600">{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && children}
      </CardContent>
    </Card>
  );
}

/**
 * Responsive Chart Wrapper
 *
 * Ensures charts maintain proper aspect ratio and responsiveness.
 */

interface ResponsiveChartProps {
  children: ReactNode;
  height?: number;
  minHeight?: number;
  className?: string;
}

export function ResponsiveChart({
  children,
  height = 400,
  minHeight = 300,
  className,
}: ResponsiveChartProps) {
  return (
    <div
      className={cn('w-full', className)}
      style={{
        height: `${height}px`,
        minHeight: `${minHeight}px`,
      }}
    >
      {children}
    </div>
  );
}
