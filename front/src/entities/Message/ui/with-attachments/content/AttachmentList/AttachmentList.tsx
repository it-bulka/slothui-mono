import type { ReactNode } from 'react';
import { Button } from '@/shared/ui';

export interface AttachmentListProps<T> {
  list: T[]
  showAll: boolean
  setShowAll: (arg: boolean) => void,
  renderItem: (item: T) => ReactNode,
  limit?: number
}
export const AttachmentList = <T,>({ list, showAll, setShowAll, renderItem, limit = 3 }: AttachmentListProps<T>) => {
  const visible = showAll ? list : list.slice(0, limit);
  const hiddenCount = list.length - limit;

  return (
    <div className="attachments-docs">
      {visible.map(renderItem)}

      {!showAll && hiddenCount > 0 && (
        <Button
          className="ml-auto"
          variant="link"
          onClick={() => setShowAll(true)}
        >
          +{hiddenCount} more
        </Button>
      )}
    </div>
  );
};
