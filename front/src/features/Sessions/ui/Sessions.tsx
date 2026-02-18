import { List, Typography } from '@/shared/ui';
import { useSessionsService } from '@/shared/libs/services';
import { useState, useEffect, memo, useCallback } from 'react';
import type { UserSessionDto } from '@/shared/types';
import { toast } from 'react-toastify'
import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react'

export const Sessions = memo(() => {
  const sessionsService = useSessionsService();
  const [sessions, setSessions] = useState<UserSessionDto[]>([])

  useEffect(() => {
    sessionsService.getAllSessions()
      .then((res) => setSessions(res))
      .catch(() => toast.error('Failed to get sessions'));
  }, [sessionsService]);

  const deleteSession = useCallback((id: string) => {
    sessionsService.deleteSession(id)
      .then(() => {
        setSessions(prev => prev.filter((s) => s.id !== id))
      })
      .catch(() => toast.error('Failed to delete sessions'));
  }, [sessionsService])
  return (
    <div>
      <Typography bold>Active sessions:</Typography>
      <List topBorder={false}>
        {sessions.map(({ id, device, location, browser, os, isCurrent }) => {
          if (isCurrent) {
            return <List.Item
              key={id}
              btnText={"current"}
              className={"bg-gray"}
            >
              {device}.{browser}.{os}.{location}
            </List.Item>
          }

          return <List.Item
            key={id}
            onClick={() => deleteSession(id)}
            btnIcon={DeleteIcon}
          >
            {device}.{browser}.{os}.{location}
          </List.Item>
        })}
      </List>
    </div>
  )
})

Sessions.displayName = 'Sessions';