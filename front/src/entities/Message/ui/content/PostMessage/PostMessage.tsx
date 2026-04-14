import { MessageTime } from '../../MessageTime/MessageTime.tsx';
import type { MessageWithPostDto } from '@/shared/types/message.dto.ts';
import type { MessageComponent } from '../../../model';
import { getPostPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Link } from 'react-router';
import { Typography } from '@/shared/ui';
import ArrowSide from '@/shared/assets/images/general/arrow-up-right.svg?react';
import { SharedInfo } from '../../SharedInfo/SharedInfo.tsx';

export const PostMessage = ({ msg, time }: MessageComponent<MessageWithPostDto>) => {
  if (!msg.post) {
    return (
      <>
        <SharedInfo>Shared post</SharedInfo>
        <Typography color="secondary" className="text-sm italic">Post is no longer available</Typography>
        <MessageTime time={time} />
      </>
    );
  }

  const { post } = msg;
  const hasMedia = post.mediaCount > 0;
  const hasText = !!post.text?.trim();

  const stats: string[] = [];
  if (post.mediaCount > 0) stats.push(`🖼 ${post.mediaCount} media`);
  if (post.fileCount > 0) stats.push(`📎 ${post.fileCount}`);
  if (post.audioCount > 0) stats.push(`🎵 ${post.audioCount}`);

  return (
    <>
      <SharedInfo>Shared post</SharedInfo>

      <Link to={getPostPage(post.id)} className="block" style={{ textDecoration: 'none' }}>
        <div className="card-premium overflow-hidden" style={{ boxShadow: '0 2px 8px var(--shadow-color)', transition: 'none' }}>

          {post.coverUrl && (
            <img
              src={post.coverUrl}
              alt=""
              className="w-full object-cover"
              style={{ maxHeight: 140, display: 'block' }}
            />
          )}

          <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1">
            <p className="text-sm font-semibold leading-tight">
              {post.authorName}
            </p>

            {!hasMedia && hasText && (
              <Typography color="secondary" className="text-sm leading-snug line-clamp-2">
                {post.text}
              </Typography>
            )}

            {!hasMedia && !hasText && post.pollQuestion && (
              <Typography color="secondary" className="text-sm">
                📊 {post.pollQuestion}
              </Typography>
            )}

            {!hasMedia && !hasText && !post.pollQuestion && post.fileCount > 0 && (
              <Typography color="secondary" className="text-sm">
                📎 {post.fileCount} attachment{post.fileCount > 1 ? 's' : ''}
              </Typography>
            )}

            {!hasMedia && !hasText && !post.pollQuestion && post.fileCount === 0 && post.audioCount > 0 && (
              <Typography color="secondary" className="text-sm">
                🎵 {post.audioCount} audio file{post.audioCount > 1 ? 's' : ''}
              </Typography>
            )}

            {stats.length > 0 && (
              <Typography color="secondary" className="text-xs mt-0.5">
                {stats.join(' • ')}
              </Typography>
            )}

            <div className="flex items-center gap-0.5 mt-1" style={{ color: 'var(--color-blue-b1)' }}>
              <span className="text-xs font-semibold">Open post</span>
              <ArrowSide className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>

      <MessageTime time={time} />
    </>
  );
};
