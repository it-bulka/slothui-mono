import { memo } from 'react'
import { useHandleCopy } from '@/shared/hooks'
import cls from './CopyButton.module.scss'
import classnames from 'classnames';

interface CopyButtonProps {
  textToCopy: string
  className?: string
}

export const CopyButton = memo(({
  textToCopy,
  className
}: CopyButtonProps) => {
  const handleCopy = useHandleCopy()

  return (
    <button onClick={() => handleCopy(textToCopy)} className={classnames(cls.btn, [className])}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.44 11.05L12.12 20.36a5 5 0 01-7.07-7.07l9.9-9.9a3 3 0 014.24 4.24l-9.9 9.9a1 1 0 01-1.41-1.41l9.19-9.2" />
      </svg>

      <span>copy</span>
    </button>
  )
})