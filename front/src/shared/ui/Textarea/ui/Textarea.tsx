import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      aria-invalid={!!error}
      className={twMerge('input textarea', className)}
    />
  );
});
Textarea.displayName = 'Textarea';
