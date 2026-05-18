import { memo } from 'react';
import { ActionButton } from '@/shared/ui/ActionButton';
import MicrophoneSvg from '@/shared/assets/images/message/microphone.svg?react'

export const AudioAction = memo(() => {
  return  <ActionButton variant="secondary" Icon={MicrophoneSvg} aria-label="Record audio" />
})

AudioAction.displayName = 'AudioAction'