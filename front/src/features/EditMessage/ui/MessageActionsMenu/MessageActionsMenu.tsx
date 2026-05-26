import EditIcon from '@/shared/assets/images/actions/edit.svg?react';

interface MessageActionsMenuProps {
  onEdit: () => void;
}

export const MessageActionsMenu = ({ onEdit }: MessageActionsMenuProps) => {
  return (
    <div className="card-premium rounded-xl py-1 min-w-[160px] shadow-lg overflow-hidden">
      <button
        onClick={onEdit}
        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors dark:hover:bg-white/5"
      >
        <EditIcon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium">Edit message</span>
      </button>
    </div>
  );
};
