import {
  forwardRef,
  type TextareaHTMLAttributes,
  type KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string;
  onEnter?: () => void; // дія при Enter без Shift
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, onEnter, value, onChange, ...props }, ref) => {

    const timeoutRef = useRef<number | null>(null);

    const handleShiftEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const textarea = e.currentTarget;
      const cursorPos = textarea.selectionStart ?? 0;
      const textBefore = textarea.value.slice(0, cursorPos);
      const textAfter = textarea.value.slice(cursorPos);

      textarea.value = textBefore + "\n" + textAfter;

      // очищаємо попередній таймаут, якщо він був
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        textarea.selectionStart = cursorPos + 1;
        textarea.selectionEnd = cursorPos + 1;
      }, 0);
    };

    // В cleanup useEffect, якщо компонент знімається
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    }, []);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onEnter?.();
      } else if (e.key === 'Enter' && e.shiftKey) {
        handleShiftEnter(e)
      }
    };

    return (
      <div className={twMerge(classnames('relative input-wrapper', [className]))}>
        <textarea
          {...props}
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          aria-invalid={!!error}
          className={twMerge(classnames('textarea resize-none', [className]))}
        />

        {error && (
          <p role="alert" className={'px-3 text-red-500 text-[0.7em] absolute -bottom-5 left-0'}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';