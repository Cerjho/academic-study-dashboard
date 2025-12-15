import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Section Wrapper Component
 *
 * Wraps dashboard sections with consistent spacing and optional title.
 * Provides semantic structure for accessibility.
 */

interface SectionWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  title,
  description,
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('mb-8 animate-fade-in', className)}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {title && (
        <div className="mb-6">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
