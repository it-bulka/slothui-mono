import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import cls from './Button.module.css'
import { twMerge } from 'tailwind-merge'

type BtnVariant = 'icon' | 'primary' | 'secondary' | 'transparent'
type BtnSizes = 'normal' | 'md'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
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
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...rest}
      className={twMerge(`rounded-3xl w-max block ${cls[variant]} ${cls[size]} ${className}`)}
    >
      {children}
    </button>
  )
}
