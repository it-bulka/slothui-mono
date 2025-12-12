import { type ReactNode, useState } from 'react';
import { Button } from '@/shared/ui';

export interface AttachmentListProps<T> {
  list: T[]
  showAll?: boolean
  renderItem: (item: T) => ReactNode,
  limit?: number
}
export const AttachmentList = <T,>({ list, showAll = false, renderItem, limit = 3 }: AttachmentListProps<T>) => {
  const [showAllItems, setShowAllItems] = useState(showAll);

  const visible = showAllItems ? list : list.slice(0, limit);
  const hiddenCount = list.length - limit;
  const isMore = !showAllItems && hiddenCount > 0

  return (
    <div className="attachments-docs">
      {visible.map(renderItem)}

      <Button
        className="ml-auto"
        variant="link"
        onClick={() => setShowAllItems(isMore)}
      >
        {isMore ? `+${hiddenCount} more` : 'show less'}
      </Button>
    </div>
  );
};
