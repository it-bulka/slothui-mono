import { Feed, PostTextarea } from '@/widgets';
import { AddPostBtn } from '@/features';
import { useState } from 'react';
import { useSelectMyPosts } from '@/entities';

const Me = () => {
  const [isPostTextarea, setPostTextarea] = useState(false);
  const { posts } = useSelectMyPosts()

  return (
    <>
      <Feed
        posts={posts}
        withOutAuthor
        header={(
        <div className={"toolbar"}>
          <AddPostBtn
            onClick={() => setPostTextarea(prev => !prev)}
            active={!isPostTextarea}
            className="ml-auto"
          />
          {isPostTextarea && <PostTextarea className="basis-full py-6"/>}
        </div>
      )}/>
    </>

  )
}

export default Me;