'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Status Toggle Component
 *
 * Toggle button group for filtering by enrollment status.
 * Allows selection of Regular, Irregular, or Both.
 */

type StatusOption = 'all' | 'regular' | 'irregular';

interface StatusToggleProps {
  value?: StatusOption;
  onChange?: (value: StatusOption) => void;
  className?: string;
}

export function StatusToggle({
  value = 'all',
  onChange,
  className,
}: StatusToggleProps) {
  const [selected, setSelected] = useState<StatusOption>(value);

  const handleChange = (newValue: StatusOption) => {
    setSelected(newValue);
    onChange?.(newValue);
  };

  const options: { value: StatusOption; label: string; color: string }[] = [
    { value: 'all', label: 'All Students', color: 'gray' },
    { value: 'regular', label: 'Regular', color: 'regular' },
    { value: 'irregular', label: 'Irregular', color: 'irregular' },
  ];

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <label className="text-sm font-medium text-gray-700">
        Enrollment Status
      </label>
      <div
        className="inline-flex rounded-lg bg-gray-100 p-1"
        role="group"
        aria-label="Filter by enrollment status"
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange(option.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                isSelected
                  ? option.value === 'regular'
                    ? 'bg-regular-600 text-white shadow-sm hover:bg-regular-700 focus-visible:outline-regular-600'
                    : option.value === 'irregular'
                      ? 'bg-irregular-600 text-white shadow-sm hover:bg-irregular-700 focus-visible:outline-irregular-600'
                      : 'bg-white text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline-gray-400'
                  : 'text-gray-700 hover:bg-gray-200/50'
              )}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
