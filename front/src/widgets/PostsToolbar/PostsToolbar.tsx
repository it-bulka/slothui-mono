import { memo } from 'react';
import { UserSearchToolbar } from '@/features';
import { AddPostPanel } from '../AddPostPanel';
import { ToolbarWrapper } from '@/shared/ui';

export const PostsToolbar = memo(() => {
  return (
    <ToolbarWrapper className={'flex flex-wrap justify-between'}>
      <UserSearchToolbar />
      <AddPostPanel />
    </ToolbarWrapper>
  )
})

PostsToolbar.displayName = "PostsToolbar"