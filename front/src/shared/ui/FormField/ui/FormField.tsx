/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  memo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type ChangeEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type FocusEventHandler
} from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import classnames from 'classnames';

type FieldProps = InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  labelClass?: string
  error?: string
  addendum?: ReactNode
  addendumLeft?: boolean
  addendumFull?: boolean
  onAddendumClick?: () => void
  children: ReactNode
}

export const FormField = memo(({
  label,
  labelClass,
  error,
  addendum,
  addendumLeft,
  addendumFull,
  onAddendumClick,
  className,
  children,
  ...props
}: FormFieldProps) => {
  const id = useId()
  const [isFocused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [hasPlaceholder] = useState((children as any).props?.placeholder)

  const onFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setFocused(true);
    (children as any)?.props?.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setFocused(false);
    (children as any)?.props?.onBlur?.(e);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(!!e.target.value);
    (children as any)?.props?.onChange?.(e);
  };

  const childWithProps = isValidElement(children)
    ? cloneElement(children as ReactElement<FieldProps>, {
      ...(children.props || {}),
      onFocus,
      onBlur,
      onChange,
      'aria-invalid': !!error,
    })
    : children

  return (
    <div {...props}>
      <div
        className={twMerge(
          classNames(
            'relative flex rounded-3xl border border-gray-g4 py-2 px-3 bg-white',
            {
              'flex-row-reverse': addendumLeft,
              'input-padding': !addendumFull,
              'mt-2': !!label,
            },
            className
          )
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              classnames('absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-500 pl-5 text-blue-b1', {
                'top-0 px-2 text-sm -translate-y-1/2 bg-white rounded-3xl backdrop-blur-sm': hasValue || isFocused || !!hasPlaceholder,
              }, [labelClass])
            )}
          >
            {label}
          </label>
        )}

        {childWithProps}

        {addendum && (
          <button
            onClick={onAddendumClick}
            className="h-[24px] min-w-[24px] flex items-center justify-center"
          >
            {addendum}
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="px-3 text-red-500 text-[0.7em]">
          {error}
        </p>
      )}
    </div>
  )
})
