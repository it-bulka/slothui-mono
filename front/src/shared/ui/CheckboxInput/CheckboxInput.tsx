import classnames from 'classnames';
import cls from './CheckboxInput.module.css'
import { memo, type PropsWithChildren } from 'react';
import CheckedSvg from '@/shared/assets/images/general/checked.svg?react'
import { twMerge } from 'tailwind-merge';

interface CheckboxInputProps {
  name: string
  selected?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export const CheckboxInput = memo(({ name, children, selected = false, onChange, disabled = false}: PropsWithChildren<CheckboxInputProps>) => {
  return (
    <label className="flex relative cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        name={name}
        checked={selected}
        onChange={(e) => onChange?.(e.target.checked) }
        disabled={disabled}
        className={twMerge(classnames("w-[0] h-[0] absolute opacity-0", [cls.input]))}
      />
      <span className={twMerge(classnames(cls.btn, { [cls.active]: selected }))}>
        <CheckedSvg className={classnames(cls.icon)} />
      </span>
      <div className="grow">
        {children}
      </div>
    </label>
  )
})

CheckboxInput.displayName = 'CheckboxInput'