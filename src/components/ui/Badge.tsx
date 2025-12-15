import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge Component
 *
 * Small status indicator or label component.
 * Supports different variants and sizes.
 */

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'regular' | 'irregular' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    regular: 'bg-regular-100 text-regular-800',
    irregular: 'bg-irregular-100 text-irregular-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
