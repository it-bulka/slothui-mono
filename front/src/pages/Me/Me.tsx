import { Feed, PostTextarea } from '@/widgets';
import { AddPostBtn } from '@/features';
import { useState } from 'react';

const Me = () => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
    <>
      <Feed
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