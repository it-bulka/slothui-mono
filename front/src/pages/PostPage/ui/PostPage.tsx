import { useParams, Navigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { usePostByIdSelect } from '@/entities/Post/model/hooks/usePostByIdSelect.ts';
import { fetchPostByIdThunk } from '@/entities/Post/model/thunks/fetchPostById.thunk.ts';
import { useAppDispatch } from '@/shared/config/redux';
import { useEffect, useState } from 'react';
import { PostCard } from '@/widgets/PostCard/PostCard.tsx';
import { getUserPage, getMyPostsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { usePostGroupedAttachments } from '@/entities/Post';
import { PostPageSkeleton } from './PostPageSkeleton';

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useAppDispatch();
  const post = usePostByIdSelect(postId ?? '');
  const grouped = usePostGroupedAttachments(postId ?? '');
  const [isLoading, setLoading] = useState(!post);

  useEffect(() => {
    if (!postId) return;
    if (post) return;
    setLoading(true);
    dispatch(fetchPostByIdThunk({ postId }))
      .finally(() => setLoading(false));
  }, [dispatch, postId, post]);

  const currentUserId = useAuthUserIdSelector();
  const isOwner = currentUserId === post?.author?.id;

  if (!postId) return <Navigate to={RoutePaths.not_found} />;
  if (isLoading) return <PostPageSkeleton />;
  if (!post) return <Navigate to={RoutePaths.not_found} />;

  return (
    <div className="px-main py-main">
      <Helmet><title>Post — SlothUI</title></Helmet>
      <PostCard
        postId={post.id}
        profileLink={isOwner ? getMyPostsPage() : getUserPage(post.author?.id)}
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
