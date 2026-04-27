import { useParams, Navigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { usePostByIdSelect } from '@/entities/Post/model/hooks/usePostByIdSelect.ts';
import { fetchPostByIdThunk } from '@/entities/Post/model/thunks/fetchPostById.thunk.ts';
import { useAppDispatch } from '@/shared/config/redux';
import { useEffect } from 'react';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Typography } from '@/shared/ui';
import { usePostGroupedAttachments } from '@/entities/Post';

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useAppDispatch();
  const post = usePostByIdSelect(postId ?? '');
  const grouped = usePostGroupedAttachments(postId ?? '');

  useEffect(() => {
    if (!postId) return;
    if (post) return;
    dispatch(fetchPostByIdThunk({ postId }));
  }, [dispatch, postId, post]);

  if (!postId) return <Navigate to={RoutePaths.not_found} />;

  if (!post) return <Typography bold>Loading...</Typography>;

  return (
    <div className="px-main py-main">
      <PostCard
        postId={post.id}
        profileLink={getUserPage(post.author?.id)}
        userId={post.author?.id}
        userName={post.author?.nickname}
        userPosition={post.author?.nickname}
        avatarSrc={post.author?.avatarUrl}
        file={grouped.file}
        video={grouped.video}
        audio={grouped.audio}
        images={grouped.images}
        text={post.text}
        poll={post.poll}
      />
    </div>
  );
};

export default PostPage;
