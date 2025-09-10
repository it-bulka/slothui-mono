import { type ReactNode } from 'react';
import { Stories } from '@/features';
import { PostCard, type PostCardProps } from '@/widgets/PostCard/PostCard.tsx';
import MockImg from '@/mock/images/avatar.png'

//TODO: add posts data
const posts: PostCardProps[] = [
  {
    avatarSrc: '/',
    userName: 'userName',
    userPosition: 'userPosition',
    paragraphs: ["jkjkjkjkjkjkjk #klklklk", 'lklklklk'],
    images: [MockImg, MockImg, MockImg]

  }
]

export const Feed = ({ header, withOutAuthor = false }: { header?: ReactNode, withOutAuthor?: boolean }) => {
  return (
    <div className="flex flex-col h-full">
      {header}
      <div className="bg-light-l3 px-main py-6 grow flex flex-col gap-4">
        <Stories />

        {posts.map((post) => <PostCard {...post} withOutAuthor={withOutAuthor}/>)}
      </div>
    </div>
  )
}