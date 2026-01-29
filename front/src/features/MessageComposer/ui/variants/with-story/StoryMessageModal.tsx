import { Avatar, Modal } from '@/shared/ui';
import { Story } from '@/entities';
import type { StoryProps } from '@/entities/Story/model';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Link } from 'react-router';
import { Typography, CloseButton } from '@/shared/ui';

type StoryMessageModal = StoryProps & {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    avatarUrl?: string
    nickname: string
    name: string
  }
}
export const StoryMessageModal = ({
  type, url, onComplete, id, isOpen, onClose, user
}: StoryMessageModal) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} aria-label="Story preview dialog">
      <div className="absolute top-2 left-0 w-full z-10 flex justify-between gap-2 px-2">
        <Link to={getUserPage(user.id)} className="flex items-center">
          <Avatar src={user.avatarUrl} />
          <Typography>{user.nickname}</Typography>
        </Link>
        <CloseButton onClick={onClose} />
      </div>
      <Story type={type} url={url} onComplete={onComplete} id={id} user={user}/>
    </Modal>
  )
}