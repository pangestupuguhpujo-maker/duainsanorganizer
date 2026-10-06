import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-brand-charcoal">
            {label}
            {props.required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined}
          className={cn(
            'flex w-full rounded-md border border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-charcoal placeholder:text-brand-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:border-brand-forest disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[100px]',
            error && 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500',
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p id={`${inputId}-desc`} className="text-xs text-brand-muted">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
