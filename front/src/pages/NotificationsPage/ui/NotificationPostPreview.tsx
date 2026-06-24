import { memo } from 'react';
import { Link } from 'react-router';
import { Typography } from '@/shared/ui/Typography/Typography';
import { getPostPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import cls from './NotificationPostPreview.module.css';

interface NotificationPostPreviewProps {
  entityId: string;
  entityTitle?: string;
  commentText?: string;
}

export const NotificationPostPreview = memo(({
  entityId,
  entityTitle,
  commentText,
}: NotificationPostPreviewProps) => (
  <Link
    to={getPostPage(entityId)}
    className="block mt-2 no-underline"
    onClick={(e) => e.stopPropagation()}
  >
    <div className={cls.card}>
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1">
        {entityTitle && (
          <Typography color="secondary" className="text-sm leading-snug line-clamp-2">
            {entityTitle}
          </Typography>
        )}

        {commentText && (
          <Typography
            color="secondary"
            className={`text-sm leading-snug line-clamp-2 pt-1.5 mt-0.5 ${cls.commentDivider}`}
          >
            💬 {commentText}
          </Typography>
        )}

        <div className="flex items-center gap-0.5 mt-1 text-blue-b1">
          <span className="text-xs font-semibold">Open post</span>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
));

NotificationPostPreview.displayName = 'NotificationPostPreview';
