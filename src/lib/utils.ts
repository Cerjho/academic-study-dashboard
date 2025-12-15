/**
 * Utility Functions
 *
 * Common helper functions for the application.
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to a specific decimal precision
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

/**
 * Calculates percentage with proper rounding
 */
export function calculatePercentage(
  part: number,
  total: number,
  decimals: number = 2
): number {
  if (total === 0) return 0;
  return Number(((part / total) * 100).toFixed(decimals));
}
