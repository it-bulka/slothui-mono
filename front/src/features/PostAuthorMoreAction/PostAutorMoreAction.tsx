import { ActionButton } from '@/shared/ui/ActionButton';
import MoreSvg from '@/shared/assets/images/general/more.svg?react'

export const PostAuthorMoreAction = () => {
  return <ActionButton variant="secondary" Icon={MoreSvg} aria-label="More actions" />
}