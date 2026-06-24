import { memo } from 'react';
import { useSelectIsMessageSending } from '@/entities/Message';
import cls from './SendingIndicator.module.css';

export const SendingIndicator = memo(() => {
  const isSending = useSelectIsMessageSending()
  if (!isSending) return null

  return (
    <div className={cls.bar}>
      <div className={cls.inner} />
    </div>
  )
})

SendingIndicator.displayName = 'SendingIndicator'
