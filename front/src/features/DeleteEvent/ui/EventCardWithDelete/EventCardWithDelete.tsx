import { MoreButton } from '@/shared/ui';
import { EventCard, type EventCardProps } from '@/entities/Event/ui/EventCard/EventCard.tsx';
import { useDeleteEvent } from '../../model/useDeleteEvent.ts';
import { EventActionsMenu } from '../EventActionsMenu/EventActionsMenu.tsx';
import { DeleteEventModal } from '../DeleteEventModal/DeleteEventModal.tsx';

interface EventCardWithDeleteProps extends EventCardProps {
  isOwner: boolean;
}

export const EventCardWithDelete = ({ isOwner, ...cardProps }: EventCardWithDeleteProps) => {
  const { confirmEventId, requestDelete, cancelDelete, confirmDelete } = useDeleteEvent();

  return (
    <>
      <EventCard
        {...cardProps}
        menu={isOwner ? (
          <MoreButton
            content={(close) => (
              <EventActionsMenu onDelete={() => { close(); requestDelete(cardProps.id); }} />
            )}
          />
        ) : undefined}
      />
      <DeleteEventModal
        isOpen={!!confirmEventId}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};
