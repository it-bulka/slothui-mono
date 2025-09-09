import { StoryAvatar } from '@/entities';
import { Card } from '@/shared/ui';
import ArrowRightSvg from '@/shared/assets/images/general/arrow-right.svg?react'

const storiesList = [
  { avatarSrc: '', username: '' },
]

const StoryScrollButton = () => {
  return (
    <button
      className={"bg-white rounded-full flex items-center justify-center w-[32px] h-[32px] absolute right-0 top-[50%] translate-[-50%] border border-gray-g3 shadow-2xl shadow-gray-g3"}>
      <ArrowRightSvg />
    </button>
  )
}
export const Stories = () => {
  return (
    <Card>
      <Card.Body className="relative flex">
        {storiesList.map((story) => {
          return <StoryAvatar
            avatarSrc={story.avatarSrc}
            username={story.username}
            key={story.username}
          />
        })}
        <StoryScrollButton />
      </Card.Body>
    </Card>
  )
}