'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Interactive Legend Component
 *
 * Legend for charts with interactive toggle functionality.
 * Allows users to show/hide data series.
 */

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  value?: string | number;
  description?: string;
}

interface InteractiveLegendProps {
  items: LegendItem[];
  onToggle?: (id: string, visible: boolean) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  interactive?: boolean;
  showValues?: boolean;
}

export function InteractiveLegend({
  items,
  onToggle,
  orientation = 'horizontal',
  className,
  interactive = true,
  showValues = false,
}: InteractiveLegendProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(
    new Set(items.map((item) => item.id))
  );

  const handleToggle = (id: string) => {
    if (!interactive) return;

    const newVisibleItems = new Set(visibleItems);
    const isVisible = newVisibleItems.has(id);

    if (isVisible) {
      newVisibleItems.delete(id);
    } else {
      newVisibleItems.add(id);
    }

    setVisibleItems(newVisibleItems);
    onToggle?.(id, !isVisible);
  };

  return (
    <div
      className={cn(
        'flex flex-wrap gap-3',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      role="list"
      aria-label="Chart legend"
    >
      {items.map((item) => {
        const isVisible = visibleItems.has(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleToggle(item.id)}
            disabled={!interactive}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200',
              interactive
                ? isVisible
                  ? 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                  : 'bg-gray-100 border border-gray-200 opacity-50 hover:opacity-75'
                : 'bg-white border border-gray-200',
              interactive && 'cursor-pointer',
              !interactive && 'cursor-default'
            )}
            aria-pressed={interactive ? isVisible : undefined}
            aria-label={`${item.label}${showValues && item.value ? `: ${item.value}` : ''}`}
            role={interactive ? 'switch' : 'listitem'}
          >
            <span
              className={cn(
                'h-3 w-3 rounded-full flex-shrink-0 transition-opacity',
                !isVisible && 'opacity-30'
              )}
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span
              className={cn(
                'font-medium transition-opacity',
                isVisible ? 'text-gray-900' : 'text-gray-500'
              )}
            >
              {item.label}
            </span>
            {showValues && item.value !== undefined && (
              <span
                className={cn(
                  'text-xs transition-opacity',
                  isVisible ? 'text-gray-600' : 'text-gray-400'
                )}
              >
                ({item.value})
              </span>
            )}
            {item.description && (
              <span className="sr-only">{item.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Simple Legend Component (Non-Interactive)
 *
 * Static legend for informational purposes only.
 */

interface SimpleLegendProps {
  items: Omit<LegendItem, 'id'>[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function SimpleLegend({
  items,
  orientation = 'horizontal',
  className,
}: SimpleLegendProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-4',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      role="list"
      aria-label="Chart legend"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-2 text-sm"
          role="listitem"
        >
          <span
            className="h-3 w-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="font-medium text-gray-700">{item.label}</span>
          {item.value !== undefined && (
            <span className="text-xs text-gray-500">({item.value})</span>
          )}
        </div>
      ))}
    </div>
  );
}
