import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Insight Card Component
 *
 * Displays key findings, implications, and recommendations.
 * Used to highlight important discoveries from the data analysis.
 */

interface InsightCardProps {
  title: string;
  content: string;
  type?: 'finding' | 'implication' | 'recommendation' | 'neutral';
  icon?: ReactNode;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
}

export function InsightCard({
  title,
  content,
  type = 'neutral',
  icon,
  className,
  priority = 'medium',
}: InsightCardProps) {
  const typeStyles = {
    finding: {
      bg: 'bg-regular-50',
      border: 'border-regular-200',
      iconBg: 'bg-regular-100',
      iconColor: 'text-regular-600',
      titleColor: 'text-regular-900',
    },
    implication: {
      bg: 'bg-irregular-50',
      border: 'border-irregular-200',
      iconBg: 'bg-irregular-100',
      iconColor: 'text-irregular-600',
      titleColor: 'text-irregular-900',
    },
    recommendation: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
    },
    neutral: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      titleColor: 'text-gray-900',
    },
  };

  const priorityIndicator = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  const defaultIcons = {
    finding: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    implication: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    recommendation: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    neutral: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
    ),
  };

  const styles = typeStyles[type];
  const displayIcon = icon || defaultIcons[type];

  return (
    <div
      className={cn(
        'rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-md',
        styles.bg,
        styles.border,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
            styles.iconBg,
            styles.iconColor
          )}
        >
          {displayIcon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn('font-semibold text-base', styles.titleColor)}>
              {title}
            </h4>
            <span className="text-lg" aria-label={`Priority: ${priority}`}>
              {priorityIndicator[priority]}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Insight Panel Component
 *
 * Container for multiple insight cards with consistent spacing.
 */

interface InsightPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function InsightPanel({
  title = 'Key Insights',
  children,
  className,
}: InsightPanelProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
