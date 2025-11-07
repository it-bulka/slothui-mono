import classnames from 'classnames';
import cls from './RadioInput.module.css'
import { memo, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface RadioInputProps {
  name: string
  selected?: boolean
  onChange?: (isChecked: boolean) => void
  disabled?: boolean
}

export const RadioInput = memo(({ name, children, selected = false, onChange, disabled = false}: PropsWithChildren<RadioInputProps>) => {
  return (
    <label className="flex relative cursor-pointer items-center gap-2">
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={(e) => onChange?.(e.target.checked) }
        disabled={disabled}
        className="w-[0] h-[0] absolute opacity-0"
      />
      <span className={twMerge(classnames(cls.btn, { [cls.active]: selected }))}/>
      <div className="grow">
        {children}
      </div>
    </label>
  )
})