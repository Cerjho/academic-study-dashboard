'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * InfoTooltip Component
 * 
 * Hoverable tooltip that displays contextual insights from the research study
 */

interface InfoTooltipProps {
  content: string;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: string;
  className?: string;
}

export function InfoTooltip({
  content,
  title,
  position = 'top',
  maxWidth = '320px',
  className
}: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent'
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Trigger Icon */}
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-regular-100 text-regular-600 hover:bg-regular-200 transition-colors cursor-help focus:outline-none focus:ring-2 focus:ring-regular-500 focus:ring-offset-1"
        aria-label="More information"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Tooltip Content */}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl",
            "animate-in fade-in duration-150",
            positionClasses[position]
          )}
          style={{ maxWidth }}
          role="tooltip"
        >
          {/* Arrow */}
          <div
            className={cn(
              "absolute w-0 h-0 border-4",
              arrowClasses[position]
            )}
          />
          
          {/* Content */}
          <div>
            {title && (
              <div className="font-semibold mb-1.5 text-white">
                {title}
              </div>
            )}
            <div className="text-gray-200 leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * InsightBadge Component
 * 
 * Colored badge with tooltip for highlighting research insights
 */

interface InsightBadgeProps {
  text: string;
  tooltip: string;
  variant?: 'finding' | 'methodology' | 'recommendation' | 'neutral';
  className?: string;
}

export function InsightBadge({
  text,
  tooltip,
  variant = 'neutral',
  className
}: InsightBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  const variantClasses = {
    finding: 'bg-regular-100 text-regular-700 border-regular-300',
    methodology: 'bg-blue-100 text-blue-700 border-blue-300',
    recommendation: 'bg-green-100 text-green-700 border-green-300',
    neutral: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  return (
    <div className={cn("relative inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium border rounded-full",
          variantClasses[variant]
        )}
      >
        {text}
        <button
          type="button"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
          className="inline-flex focus:outline-none"
          aria-label="More information"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </span>

      {/* Tooltip */}
      {isVisible && (
        <div
          className="absolute z-50 left-0 top-full mt-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl w-64 animate-in fade-in duration-150"
          role="tooltip"
        >
          <div className="absolute bottom-full left-4 w-0 h-0 border-4 border-t-transparent border-l-transparent border-r-transparent border-b-gray-900" />
          <div className="text-gray-200 leading-relaxed">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
