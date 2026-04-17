import { Avatar, AvatarWithInfo, Button, List, Typography, TypographyTypes } from '@/shared/ui';
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
    <section className="rounded-3xl p-5 mt-4 space-y-4 bg-light-l1">

      {/* Header */}
      <header className="flex items-center justify-between">
        <Typography variant="h3" bold>Participants</Typography>
        {participantsMeta.totalCount > 0 && (
          <Typography type={TypographyTypes.P_SM} className="text-gray-g1">
            {participantsMeta.totalCount} joined
          </Typography>
        )}
      </header>

      {/* Avatar stack preview */}
      {participants.length > 0 && (
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {participants.slice(0, 5).map((p) => (
              <Avatar
                key={p.id}
                src={p.avatar}
                name={p.username}
                size="sm"
                className="ring-2 ring-background"
              />
            ))}
          </div>
          {participantsMeta.totalCount > 5 && (
            <Typography type={TypographyTypes.P_SM} className="ml-3 text-gray-g1">
              +{participantsMeta.totalCount - 5} more
            </Typography>
          )}
        </div>
      )}

      {/* Full list */}
      {participants.length > 0 ? (
        <List className="max-h-[400px] overflow-y-auto">
          {participants.map(({id, username, avatar}, index) => (
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
      ) : (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g1">
          No participants yet
        </Typography>
      )}

    </section>
  )
})

Participants.displayName = 'Participants';
