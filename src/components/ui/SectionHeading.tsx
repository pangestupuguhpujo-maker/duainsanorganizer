import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className,
  ...props
}: SectionHeadingProps) {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col mb-12 sm:mb-16', alignments[align], className)} {...props}>
      {badge && (
        <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-brand-olive mb-2.5 px-3 py-1 bg-brand-olive/10 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-forest tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
