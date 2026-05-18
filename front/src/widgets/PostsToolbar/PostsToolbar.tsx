import { memo } from 'react';
import { UserSearchToolbar } from '@/features/user-search/ui/UserSearchToolbar/UserSearchToolbar';
import { AddPostPanel } from '../AddPostPanel';
import { ToolbarWrapper } from '@/shared/ui/ToolbarWrapper';

export const PostsToolbar = memo(() => {
  return (
    <ToolbarWrapper className="flex items-stretch gap-4">
      <UserSearchToolbar className="flex-1 min-w-0" />
      <AddPostPanel />
    </ToolbarWrapper>
  )
})

PostsToolbar.displayName = "PostsToolbar"