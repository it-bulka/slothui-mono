import { AvatarWithInfo, Button, List, Typography } from '@/shared/ui';
import ArrowUpRightSvg from '@/shared/assets/images/general/arrow-up-right.svg?react'
import { memo, useCallback, useEffect, useState } from 'react';
import { useEventsService } from '@/shared/libs/services';
import type { EventParticipant } from '@/shared/libs/services/eventsService/events.type.ts';
import { toast } from 'react-toastify'

export const Participants = memo(({ id }: { id: string }) => {
  const eventsService = useEventsService();
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [participantsMeta, setParticipantsMeta] = useState<{cursor?: string | null, hasMore: boolean, totalCount: number}>({ cursor: null, hasMore: true, totalCount: 0 });

  const fetchParticipants = useCallback(() => {
    if(!id) return;

    eventsService.listEventParticipants(id, participantsMeta.cursor)
      .then(res => {
        setParticipants(res.items)
        setParticipantsMeta({cursor:res.nextCursor, hasMore: res.hasMore, totalCount: res.totalCount || 0 })
      })
      .catch(() => toast.error('Failed to fetch event participants'))
  }, [eventsService, id, participantsMeta])

  useEffect(() => {
    if (!participantsMeta.hasMore) return
    fetchParticipants()
  }, [fetchParticipants, participantsMeta.hasMore]);

  return (
    <>
      {participantsMeta.totalCount ? (
        <Typography variant="h4" bold className="flex justify-between">
          <span>Participants</span>
          <span>{participantsMeta.totalCount}</span>
        </Typography>
      ) : (
        <Typography variant="h4" bold>
          No any participants yet
        </Typography>
      )}

      <List className="max-h-[400px] overflow-y-scroll py-4 relative">
        {participants?.map(({id, username, avatar}, index) => (
          <List.Item key={id} btnIcon={ArrowUpRightSvg}>
            <AvatarWithInfo size="md" src={avatar} name={username} position={(index + 1).toString()} />
          </List.Item>
        ))}
        {!!(participants.length && participantsMeta.hasMore) && (
          <Button className="ml-auto sticky bottom-0 left-0 mt-2" onClick={fetchParticipants}>
            See more participants
          </Button>
        )}
      </List>
    </>

  )
})

Participants.displayName = 'Participants';