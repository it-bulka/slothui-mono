import { Button, ModalCard } from '@/shared/ui';
import { useDeleteProfile } from '@/entities/AuthUser';
import { memo } from 'react';

export const ConfirmDeleteAccountButton = memo(({onClose}: { onClose: () => void}) => {
  const { deleteProfile } = useDeleteProfile()
  return (
    <ModalCard onClose={onClose} title="Are you sure you want to delete account?">
      <Button
        className="!bg-red-500"
        variant="secondary"
        position="right"
        onClick={deleteProfile}
      >
        Confirm and Delete account
      </Button>
    </ModalCard>
  )
})

ConfirmDeleteAccountButton.displayName = 'ConfirmDeleteAccountButton'