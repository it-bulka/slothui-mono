import { ActionButton } from '@/shared/ui';
import SaveSvg from '@/shared/assets/images/post/store.svg?react'


export const SavePost = ({ className }: { className: string }) => {
  //TODO: add dynamic for storing
  return (
    <ActionButton Icon={SaveSvg} className={className}/>
  )
}