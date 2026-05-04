import { TogglerBtn } from './TogglerBtn.tsx';
import type { TogglerBtnProps } from './TogglerBtn.tsx';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import { memo } from 'react';

interface Props {
  label: string
  labelClassName?: string
  className?: string
  btnClassName?: string
  onChange?: (value: boolean) => void
}
type TogglerProps = Props & Omit<TogglerBtnProps, 'className'>

export const Toggler = memo(({ onChange, name, label, labelClassName, btnClassName, className, initialState }: TogglerProps) => {
  return (
    <label className={twMerge('flex cursor-pointer', className)}>
      <span className={classnames('grow', labelClassName)}>{label}</span>
      <TogglerBtn initialState={initialState} className={btnClassName} name={name} onChange={onChange} />
    </label>
  )
})

Toggler.displayName = 'Toggler';