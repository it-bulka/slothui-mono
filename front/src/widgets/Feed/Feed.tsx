import { type ReactNode } from 'react';
import { Stories, SubscribeEventButton } from '@/features';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { EventCard } from '@/entities';
import type { PostWithAttachmentsDto } from '@/shared/types';

//TODO: add posts data
/*const posts: PostCardProps[] = [
  {
    avatarSrc: '/',
    userName: 'userName',
    userPosition: 'userPosition',
    paragraphs: ["jkjkjkjkjkjkjk #klklklk", 'lklklklk'],
    images: [MockImg, MockImg, MockImg]

  }
]*/

export const Feed = ({ header, posts }: { header?: ReactNode, withOutAuthor?: boolean, posts: PostWithAttachmentsDto[] }) => {
  return (
    <div className="flex flex-col h-full">
      {header}
      <div className="bg-light-l3 px-main py-6 grow flex flex-col gap-4">
        <Stories />

        <EventCard
          id="1"
          title="Frontend Meetup"
          description="Зустріч розробників для обговорення React, TypeScript і FSD архітектури."
          date="2025-11-12"
          location="Київ, UNIT.City"
          organizer={{ name: 'Iv Li', avatar: '/avatars/ivli.png' }}
          participantsCount={57}
          actions={(
            <SubscribeEventButton
              eventId={"1"}
            />
          )}
        />

        {posts.map((post) => (
          <PostCard
            postId={post.id}
            userName={post.author.nickname}
            userPosition={post.author.nickname}
            avatarSrc={post.author.avatarUrl}
            file={post.attachments.file}
            video={post.attachments.video}
            audio={post.attachments.audio}
            images={post.attachments.images}
            text={post.text}
          />
        ))}
      </div>
    </div>
  )
}