import EditIcon from '@/shared/assets/images/actions/edit.svg?react';

interface MessageActionsMenuProps {
  onEdit: () => void;
}

export const MessageActionsMenu = ({ onEdit }: MessageActionsMenuProps) => (
  <div className="popup-menu min-w-[160px]">
    <button onClick={onEdit} className="popup-menu-item">
      <EditIcon className="w-4 h-4 shrink-0" />
      Edit message
    </button>
  </div>
);
