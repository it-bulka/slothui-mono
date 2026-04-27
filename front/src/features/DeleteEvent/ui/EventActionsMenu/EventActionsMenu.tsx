import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react';

interface EventActionsMenuProps {
  onDelete: () => void;
}

export const EventActionsMenu = ({ onDelete }: EventActionsMenuProps) => {
  return (
    <div className="card-premium rounded-xl py-1 min-w-[160px] shadow-lg overflow-hidden">
      <button
        onClick={onDelete}
        className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-500 hover:bg-gray-50 transition-colors"
      >
        <DeleteIcon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium">Delete event</span>
      </button>
    </div>
  );
};
