import { useCallback } from 'react';

interface DeleteMediaBtnProps {
  onDelete?: (itemId: string) => void
  itemId: string
}

export const DeleteMediaBtn = ({ onDelete, itemId }: DeleteMediaBtnProps) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(itemId);
  }, [onDelete, itemId]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute top-1 right-1 z-10 w-5 h-5 rounded-full bg-black/60 text-white text-xs leading-none flex items-center justify-center hover:bg-black/80 transition-colors"
    >
      ×
    </button>
  );
};
