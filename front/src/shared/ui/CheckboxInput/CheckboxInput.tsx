import classnames from 'classnames';
import cls from './CheckboxInput.module.css'
import { memo, type PropsWithChildren } from 'react';

interface CheckboxInputProps {
  name: string
  selected?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export const CheckboxInput = memo(({ name, children, selected = false, onChange, disabled = false}: PropsWithChildren<CheckboxInputProps>) => {
  return (
    <label className="flex">
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={(e) => onChange?.(e.target.checked) }
        disabled={disabled}
      />
      <span className={classnames(cls.btn)}/>
      <div className="grow">
        {children}
      </div>
    </label>
  )
})

CheckboxInput.displayName = 'CheckboxInput'