import { memo } from 'react';
import { Link } from 'react-router';
import { Typography } from '@/shared/ui';
import { getPostPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import ArrowSide from '@/shared/assets/images/general/arrow-up-right.svg?react';

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
    className="block mt-2"
    style={{ textDecoration: 'none' }}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="card-premium overflow-hidden">
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1">
        {entityTitle && (
          <Typography color="secondary" className="text-sm leading-snug line-clamp-2">
            {entityTitle}
          </Typography>
        )}

        {commentText && (
          <Typography
            color="secondary"
            className="text-sm leading-snug line-clamp-2 pt-1.5 mt-0.5"
            style={{ borderTop: '1px solid var(--color-gray-g4)' }}
          >
            💬 {commentText}
          </Typography>
        )}

        <div
          className="flex items-center gap-0.5 mt-1"
          style={{ color: 'var(--color-blue-b1)' }}
        >
          <span className="text-xs font-semibold">Open post</span>
          <ArrowSide className="w-3 h-3" />
        </div>
      </div>
    </div>
  </Link>
));

NotificationPostPreview.displayName = 'NotificationPostPreview';
