import { memo } from 'react';
import { ActionButton } from '@/shared/ui';
import MicrophoneSvg from '@/shared/assets/images/message/microphone.svg?react'

export const AudioAction = memo(() => {
  return  <ActionButton variant="secondary" Icon={MicrophoneSvg}/>
})

AudioAction.displayName = 'AudioAction'