import classnames from 'classnames';
import cls from './RadioInput.module.css'
import { memo, type PropsWithChildren } from 'react';

interface RadioInputProps {
  name: string
  selected?: boolean
  onChange?: (value: string) => void
  disabled?: boolean
}

export const RadioInput = memo(({ name, children, selected = false, onChange, disabled = false}: PropsWithChildren<RadioInputProps>) => {
  return (
    <label className="flex">
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={(e) => onChange?.(e.target.value) }
        disabled={disabled}
      />
      <span className={classnames(cls.btn)}/>
      <div className="grow">
        {children}
      </div>
    </label>
  )
})