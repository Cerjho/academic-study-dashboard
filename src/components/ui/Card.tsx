import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Component
 *
 * Reusable container component with shadow and border.
 * Provides consistent styling across the application.
 */

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'elevated';
  hover?: boolean;
}

export function Card({
  children,
  className,
  padding = 'md',
  variant = 'default',
  hover = false,
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: 'bg-white shadow-sm',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
  };

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        paddingClasses[padding],
        variantClasses[variant],
        hover && 'hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader Component
 */
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4 border-b border-gray-100 pb-3', className)}>
      {children}
    </div>
  );
}

/**
 * CardTitle Component
 */
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({
  children,
  className,
  as: Component = 'h3',
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        'text-xl font-semibold text-gray-900 leading-tight',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * CardContent Component
 */
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('text-gray-600', className)}>{children}</div>;
}
