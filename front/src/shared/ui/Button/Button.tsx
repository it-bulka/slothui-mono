import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import cls from './Button.module.css'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'

type BtnVariant = 'icon' | 'primary' | 'secondary' | 'transparent' | 'link'
type BtnSizes = 'normal' | 'md'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSizes
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'normal',
  className,
  type = 'button',
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...rest}
      disabled={disabled}
      className={twMerge(classNames(`${cls[variant]} ${cls[size]} ${cls.active} ${cls.btn} ${className} `, { [cls.disabled]: disabled}))}
    >
      {children}
    </button>
  )
}
