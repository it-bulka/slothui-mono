import { TogglerBtn } from './TogglerBtn.tsx';
import { Typography } from '../Typography/Typography.tsx';
import type { TypographyProps } from '../Typography/Typography.tsx';
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
type TogglerProps = Props & Omit<TogglerBtnProps, 'className'> & Omit<TypographyProps, 'className' | 'children'>

export const Toggler = memo(({ onChange, name, label, labelClassName, btnClassName, className, initialState }: TogglerProps) => {
  return (
    <div className={twMerge('flex', className)}>
      <Typography className={classnames('grow', labelClassName)} variant="span">{label}</Typography>
      <TogglerBtn initialState={initialState} className={btnClassName} name={name} onChange={onChange} />
    </div>
  )
})

Toggler.displayName = 'Toggler';