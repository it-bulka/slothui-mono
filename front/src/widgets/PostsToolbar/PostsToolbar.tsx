import { SearchBar } from '@/shared/ui';
import { AddPostBtn } from '@/features';
import { PostTextarea } from '@/widgets';
import { useState, memo } from 'react';

export const PostsToolbar = memo(() => {
  const [isPostTextarea, setPostTextarea] = useState(false);

  return (
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
  )
})

PostsToolbar.displayName = "PostsToolbar"