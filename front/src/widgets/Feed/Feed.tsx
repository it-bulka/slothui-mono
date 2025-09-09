import { useState } from 'react';
import { SearchBar } from '@/shared/ui';
import { AddPostBtn, Stories } from '@/features';
import { PostCard, type PostCardProps } from '@/widgets/PostCard/PostCard.tsx';
import MockImg from '@/mock/images/avatar.png'
import { PostTextarea } from '@/widgets';

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

export const Feed = () => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className={"border-style-b px-main py-5 flex flex-wrap justify-between"}>
        <SearchBar
          placeholder={"Search for friends, groups, pages"}
          size="lg"
          iconPosition="right"
          className="grow max-w-[400px] mr-2"
        />
        <AddPostBtn onClick={() => setPostTextarea(prev => !prev)} active={!isPostTextarea} />
        {isPostTextarea && <PostTextarea className="basis-full py-6"/>}
      </div>
      <div className="bg-light-l3 px-main py-6 grow flex flex-col gap-4">
        <Stories />

        {posts.map((post) => <PostCard {...post} />)}
      </div>
    </div>
  )
}