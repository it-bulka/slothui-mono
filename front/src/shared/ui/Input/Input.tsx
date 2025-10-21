import { type FormEvent, type HTMLAttributes, type ReactNode, useEffect, useId, useState } from 'react'
import { type IRegister } from '@/api/types/forms'
import classnames from 'classnames'
import {type FieldValues } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react';

type InputVal = string | undefined
type InputSetter = <T>(a: T) => void

interface InputProps<T extends FieldValues | undefined = undefined>
  extends HTMLAttributes<HTMLInputElement>,
    IRegister<T> {
  className?: string
  type?: string
  label?: string
  labelClass?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange?: InputSetter
  addendum?: ReactNode
  onAddendumClick?: InputSetter
  addendumLeft?: boolean
  addendumFull?: boolean
  error?: string
  accept?: string
}

// <T extends FieldValues | undefined = undefined>
export const Input = forwardRef<HTMLInputElement, InputProps<FieldValues>>(({
  className,
  type = 'text',
  label,
  labelClass = '',
  placeholder,
  defaultValue,
  value: inputValue,
  name,
  onChange,
  addendum,
  onAddendumClick,
  addendumLeft,
  addendumFull,
  accept,
  error,
  register,
  ...props
}, ref) => {
  const [value, setValue] = useState<InputVal>(inputValue ?? defaultValue ?? '')
  const [isFieldFocused, setFieldFocused] = useState(false)
  const id = useId()

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    const v = (e.target as HTMLInputElement).value
    setValue(v)
    onChange?.(v)

    if (register && name) {
      register(name).onChange(e)
    }
  }

  const setInputValue = (value: InputVal) => {
    setValue(value)
  }

  const addendumClickHandler = () => {
    onAddendumClick?.(setInputValue)
  }

  useEffect(() => {
    setValue(inputValue || '')
  }, [inputValue])

  return (
    <div>
      <div
        className={twMerge(
          classnames(`relative flex rounded-3xl border border-gray-g4 py-2 px-3 input bg-white`, [className], {
            'flex-row-reverse': addendumLeft,
            'input-padding': !addendumFull,
            'mt-2': !!label
          })
        )}
      >
        {label && (
          <label
            htmlFor={id + name}
            className={twMerge(
              classnames('absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-500 pl-5 text-blue-b1', {
                'top-0 px-2 text-sm -translate-y-1/2 bg-white rounded-3xl backdrop-blur-sm': !!value || isFieldFocused || !!placeholder,
              }, [labelClass])
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          {...props}
          id={id + name}
          {...(register ? register(name) : { value, name })}
          onChange={changeHandler}
          onBlur={() => setFieldFocused(false)}
          onFocus={() => setFieldFocused(true)}
          placeholder={placeholder}
          autoComplete="new-password"
          aria-invalid={!!error}
          accept={accept}
          className={twMerge(
            classnames(`w-full outline-0 rounded-10 bg-transparent text-s text-medium focus:outline-none placeholder:text-gray-g1`, {
              'input-padding': addendumFull,
            })
          )}
          ref={ref}
        />
        {addendum && <button onClick={addendumClickHandler}>{addendum}</button>}
      </div>
      {error && !isFieldFocused && (
        <p role="alert" className={'px-3 text-red-500 text-[0.7em]'}>
          {error}
        </p>
      )}
    </div>
  )
}
)