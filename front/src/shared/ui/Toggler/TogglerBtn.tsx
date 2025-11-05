import { useState, memo, useCallback } from 'react';
import classnames from 'classnames';
import cls from './Toggler.module.css'

export interface TogglerBtnProps {
  initialState?: boolean
  className?: string
  onChange?: (value: boolean) => void
  name?: string
}

export const TogglerBtn = memo(({ initialState = false, className, onChange, name }: TogglerBtnProps) => {
  const [isTurnOn, setTurnOn] = useState(initialState)
  const handleChange = useCallback(() => {
    setTurnOn(prev => {
      const newVal = !prev
      onChange?.(newVal)

      return newVal
    })

  }, [onChange, setTurnOn])
  return (
    <label className={classnames(cls.toggler, { [cls.on]: isTurnOn }, className)}>
      <input {...(name ? { name }: {})} type="checkbox" className="w-0" onChange={handleChange} />
      <span className={cls.inner}/>
    </label>
  )
})

TogglerBtn.displayName = 'TogglerBtn';