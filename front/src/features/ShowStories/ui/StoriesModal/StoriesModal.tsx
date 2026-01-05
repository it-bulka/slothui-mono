import { Modal } from '@/shared/ui';
import { StoriesView } from '../StoriesView/StoriesView.tsx';
import type { UserStories } from '@/shared/libs/services';
import { memo } from 'react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  allStories: UserStories[]
  startUserIndex?: number | null;
}
export const StoryModal = memo(({
  isOpen, onClose, allStories, startUserIndex
}: StoryModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StoriesView
        allStories={allStories}
        onClose={onClose}
        startUserIndex={startUserIndex}
      />
    </Modal>
  )
})

StoryModal.displayName = 'StoryModal';