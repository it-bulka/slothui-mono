import { Avatar, Modal } from '@/shared/ui';
import { Story, type StoryProps } from '../../../../Story';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Link } from 'react-router';
import { Typography, CloseButton } from '@/shared/ui';

type StoryMessageModal = StoryProps & {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    avatarUrl?: string | null
    nickname: string
    username: string
  }
}

export const StoryMessageModal = ({
  type, url, onComplete, id, isOpen, onClose, user
}: StoryMessageModal) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} fit aria-label="Story preview dialog">
      <div className="relative h-[80vh] max-w-[80vh] aspect-[3/4] overflow-hidden rounded-2xl bg-black">
        <div className="absolute top-2 left-0 w-full z-20 flex justify-between items-center gap-2 px-2">
          <Link to={getUserPage(user.id)} className="flex items-center gap-2">
            <Avatar src={user.avatarUrl} />
            <Typography>{user.nickname}</Typography>
          </Link>
          <CloseButton onClick={onClose} />
        </div>
        <Story type={type} url={url} onComplete={onComplete} id={id} />
      </div>
    </Modal>
  )
}
