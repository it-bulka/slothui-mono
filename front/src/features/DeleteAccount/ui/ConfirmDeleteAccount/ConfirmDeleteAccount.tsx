import { Button } from '@/shared/ui/Button/Button'
import { ModalCard } from '@/shared/ui/Modal';
import { useDeleteProfile } from '@/entities/AuthUser';
import { memo } from 'react';

export const ConfirmDeleteAccountButton = memo(({ onClose }: { onClose: () => void }) => {
  const { deleteProfile, isDeleting } = useDeleteProfile();
  return (
    <ModalCard onClose={onClose} title="Are you sure you want to delete account?">
      <Button
        className="!bg-red-500"
        variant="secondary"
        position="right"
        onClick={deleteProfile}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Confirm and Delete account'}
      </Button>
    </ModalCard>
  );
});

ConfirmDeleteAccountButton.displayName = 'ConfirmDeleteAccountButton';
