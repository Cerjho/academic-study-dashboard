import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button Component
 *
 * Reusable button with multiple variants and sizes.
 * Includes proper accessibility attributes.
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-regular-600 text-white hover:bg-regular-700 focus-visible:outline-regular-600 active:bg-regular-800',
    secondary:
      'bg-irregular-600 text-white hover:bg-irregular-700 focus-visible:outline-irregular-600 active:bg-irregular-800',
    outline:
      'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-400 active:bg-gray-100',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-400 active:bg-gray-200',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 active:bg-red-800',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
