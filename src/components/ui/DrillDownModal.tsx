'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Drill-Down Modal Component
 *
 * Modal for displaying detailed data insights when users click on chart elements.
 * Shows underlying patterns, breakdowns, and additional metrics.
 */

interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function DrillDownModal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: DrillDownModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-10 w-full max-w-4xl max-h-[90vh] overflow-auto',
          'bg-white rounded-lg shadow-2xl',
          'animate-slide-up',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">{children}</div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Drill-Down Section Component
 *
 * Reusable section for organizing content within the drill-down modal.
 */

interface DrillDownSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DrillDownSection({
  title,
  children,
  className,
}: DrillDownSectionProps) {
  return (
    <div className={cn('mb-6 last:mb-0', className)}>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

/**
 * Drill-Down Stat Component
 *
 * Displays a single statistic with label and value.
 */

interface DrillDownStatProps {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: 'regular' | 'irregular' | 'neutral';
  className?: string;
}

export function DrillDownStat({
  label,
  value,
  subtitle,
  color = 'neutral',
  className,
}: DrillDownStatProps) {
  const colorClasses = {
    regular: 'bg-regular-50 border-regular-200',
    irregular: 'bg-irregular-50 border-irregular-200',
    neutral: 'bg-gray-50 border-gray-200',
  };

  const textColorClasses = {
    regular: 'text-regular-700',
    irregular: 'text-irregular-700',
    neutral: 'text-gray-900',
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        colorClasses[color],
        className
      )}
    >
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className={cn('mt-1 text-2xl font-bold', textColorClasses[color])}>
        {value}
      </div>
      {subtitle && (
        <div className="mt-1 text-xs text-gray-500">{subtitle}</div>
      )}
    </div>
  );
}
