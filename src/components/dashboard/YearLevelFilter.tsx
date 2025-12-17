'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type YearOption = 'all' | '1st' | '2nd' | '3rd' | '4th';

interface YearLevelFilterProps {
  value?: YearOption;
  onChange?: (value: YearOption) => void;
  className?: string;
}

export function YearLevelFilter({ value = 'all', onChange, className }: YearLevelFilterProps) {
  const [selected, setSelected] = useState<YearOption>(value);

  const handleChange = (newValue: YearOption) => {
    setSelected(newValue);
    onChange?.(newValue);
  };

  const options: { value: YearOption; label: string }[] = [
    { value: 'all', label: 'All Years' },
    { value: '1st', label: '1st Year' },
    { value: '2nd', label: '2nd Year' },
    { value: '3rd', label: '3rd Year' },
    { value: '4th', label: '4th Year' },
  ];

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-sm font-medium text-gray-700">Year Level</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleChange(opt.value)}
            className={cn(
              'px-3 py-2 text-sm rounded-md border transition-colors',
              selected === opt.value
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
            )}
            aria-pressed={selected === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {selected !== 'all' && (
        <p className="text-xs text-gray-500 mt-1">
          Note: Year-level data is estimated; use cautiously.
        </p>
      )}
    </div>
  );
}
