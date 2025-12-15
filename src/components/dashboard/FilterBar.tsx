'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

/**
 * Filter Bar Component
 *
 * Container for filter controls with reset functionality.
 * Provides consistent layout and spacing for dashboard filters.
 */

interface FilterBarProps {
  children: ReactNode;
  onReset?: () => void;
  className?: string;
  showReset?: boolean;
  title?: string;
  description?: string;
}

export function FilterBar({
  children,
  onReset,
  className,
  showReset = true,
  title = 'Filters',
  description,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
        {showReset && onReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="flex items-center gap-1.5"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  );
}
