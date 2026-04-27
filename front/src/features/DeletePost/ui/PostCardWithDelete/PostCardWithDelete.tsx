import { MoreButton } from '@/shared/ui';
import { PostCard, type PostCardProps } from '@/widgets/PostCard/PostCard.tsx';
import { useDeletePost } from '../../model/useDeletePost.ts';
import { PostActionsMenu } from '../PostActionsMenu/PostActionsMenu.tsx';
import { DeletePostModal } from '../DeletePostModal/DeletePostModal.tsx';

type PostCardWithDeleteProps = PostCardProps & { isOwner: boolean };

export const PostCardWithDelete = ({ isOwner, ...cardProps }: PostCardWithDeleteProps) => {
  const { confirmPostId, requestDelete, cancelDelete, confirmDelete } = useDeletePost();

  return (
    <>
      <PostCard
        {...cardProps}
        menu={isOwner ? (
          <MoreButton
            content={(close) => (
              <PostActionsMenu onDelete={() => { close(); requestDelete(cardProps.postId); }} />
            )}
          />
        ) : undefined}
      />
      <DeletePostModal
        isOpen={!!confirmPostId}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};
