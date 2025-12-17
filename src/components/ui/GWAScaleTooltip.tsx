/**
 * GWA Scale Tooltip
 *
 * Explains the Philippine General Weighted Average grading system
 * where lower values indicate better performance.
 */

'use client';

import { useState } from 'react';

export function GWAScaleTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="GWA Scale Information"
      >
        ?
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-72 p-4 mt-2 text-sm bg-white border border-gray-200 rounded-lg shadow-lg left-1/2 transform -translate-x-1/2"
          role="tooltip"
        >
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Philippine GWA System
              </h4>
              <p className="text-gray-600 text-xs mb-3">
                In the Philippine grading system, <strong>lower GWA values indicate better performance</strong>.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="font-medium text-green-700">1.00 - 1.49</span>
                <span className="text-gray-600">Excellent</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="font-medium text-blue-700">1.50 - 1.99</span>
                <span className="text-gray-600">Above Average</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="font-medium text-yellow-700">2.00 - 2.49</span>
                <span className="text-gray-600">Satisfactory</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="font-medium text-orange-700">2.50 - 2.99</span>
                <span className="text-gray-600">Fair</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-red-700">3.00 - 5.00</span>
                <span className="text-gray-600">Failing</span>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 italic">
                💡 A GWA of 1.0 is the highest possible grade, while 5.0 indicates failure.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-t border-l border-gray-200"></div>
        </div>
      )}
    </div>
  );
}
