import { type FormEvent, type HTMLAttributes, type ReactNode, useEffect, useId, useState } from 'react'
import { type IRegister } from '@/api/types/forms'
import classnames from 'classnames'
import {type FieldValues } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type InputVal = string | undefined
type InputSetter = <T>(a: T) => void

interface InputProps<T extends FieldValues | undefined = undefined>
  extends HTMLAttributes<HTMLInputElement>,
    IRegister<T> {
  className?: string
  type?: string
  label?: string
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

export function Input<T extends FieldValues | undefined = undefined>({
  className,
  type = 'text',
  label,
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
}: InputProps<T>) {
  const [value, setValue] = useState<InputVal>(inputValue || defaultValue)
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
    setValue(inputValue)
  }, [inputValue])

  return (
    <div
      className={twMerge(
        classnames(`relative flex rounded-3xl border border-gray-g4 py-2 px-3 input`, [className], {
          'flex-row-reverse': addendumLeft,
          'input-padding': !addendumFull,
        })
      )}
    >
      {label && (
        <label
          htmlFor={id + name}
          className={twMerge(
            classnames('absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-500 pl-5 text-white/60', {
              'top-0 translate-0 pl-2 text-sm  text-white/40': !!value || isFieldFocused,
            })
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
      />
      {addendum && <button onClick={addendumClickHandler}>{addendum}</button>}
      {error && !isFieldFocused && (
        <p role="alert" className={'cls.error text-red-500 absolute bottom-0 left-0 pl-2 translate-y-1/2 text-[0.7em]'}>
          {error}
        </p>
      )}
    </div>
  )
}
