import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react';

interface StoryActionsMenuProps {
  onDelete: () => void;
}

export const StoryActionsMenu = ({ onDelete }: StoryActionsMenuProps) => (
  <div className="popup-menu min-w-[160px]">
    <button onClick={onDelete} className="popup-menu-item text-red-600 dark:text-red-400">
      <DeleteIcon className="w-4 h-4 shrink-0" />
      Delete story
    </button>
  </div>
);
