'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GWA_SCALE } from '@/lib/constants';

/**
 * GWA Range Slider Component
 *
 * Multi-select checkbox group for filtering by GWA performance levels.
 * Allows users to filter data by academic performance categories.
 */

type GWARange = 'excellent' | 'veryGood' | 'good' | 'fair';

interface GWARangeSliderProps {
  value?: GWARange[];
  onChange?: (value: GWARange[]) => void;
  className?: string;
}

const rangeOptions: { value: GWARange; label: string; range: string; color: string }[] = [
  {
    value: 'excellent',
    label: GWA_SCALE.EXCELLENT.label,
    range: '1.00-1.50',
    color: 'green',
  },
  {
    value: 'veryGood',
    label: GWA_SCALE.VERY_GOOD.label,
    range: '1.51-2.00',
    color: 'blue',
  },
  {
    value: 'good',
    label: GWA_SCALE.GOOD.label,
    range: '2.01-2.50',
    color: 'yellow',
  },
  {
    value: 'fair',
    label: GWA_SCALE.FAIR.label,
    range: '2.51-3.00',
    color: 'orange',
  },
];

export function GWARangeSlider({
  value = ['excellent', 'veryGood', 'good', 'fair'],
  onChange,
  className,
}: GWARangeSliderProps) {
  const [selected, setSelected] = useState<GWARange[]>(value);

  const handleToggle = (range: GWARange) => {
    const newSelected = selected.includes(range)
      ? selected.filter((r) => r !== range)
      : [...selected, range];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleSelectAll = () => {
    const allRanges = rangeOptions.map((opt) => opt.value);
    setSelected(allRanges);
    onChange?.(allRanges);
  };

  const handleClearAll = () => {
    setSelected([]);
    onChange?.([]);
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          GWA Performance Level
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs text-regular-600 hover:text-regular-700 hover:underline"
            disabled={selected.length === rangeOptions.length}
          >
            Select All
          </button>
          <span className="text-gray-400">|</span>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-gray-600 hover:text-gray-700 hover:underline"
            disabled={selected.length === 0}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {rangeOptions.map((option) => {
          const isChecked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                'flex items-center gap-3 rounded-lg border-2 p-3 cursor-pointer transition-all duration-200',
                isChecked
                  ? 'border-regular-300 bg-regular-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option.value)}
                className="h-4 w-4 rounded border-gray-300 text-regular-600 focus:ring-2 focus:ring-regular-500 focus:ring-offset-2"
                aria-label={`Filter by ${option.label}`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                  <span className="text-xs text-gray-500">{option.range}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 mt-1">
        {selected.length === 0 && 'No GWA ranges selected'}
        {selected.length === 1 && '1 GWA range selected'}
        {selected.length > 1 &&
          selected.length < rangeOptions.length &&
          `${selected.length} GWA ranges selected`}
        {selected.length === rangeOptions.length && 'All GWA ranges selected'}
      </div>
    </div>
  );
}
