import { AvatarWithInfo, Button, List, Typography } from '@/shared/ui';
import ArrowUpRightSvg from '@/shared/assets/images/general/arrow-up-right.svg?react'

interface ParticipantsProps {
  participantsCount?: number
  participants: {id: string; username: string; avatar?: string}[];
}

export const Participants = ({ participants, participantsCount }: ParticipantsProps) => {
  return (
    <>
      <Typography variant="h4" bold className="flex justify-between">
        <span>Participators</span>
        <span>{participantsCount}</span>
      </Typography>

      <List className="max-h-[400px] overflow-y-scroll py-4 relative">
        {participants?.map(({id, username, avatar}, index) => (
          <List.Item key={id} btnIcon={ArrowUpRightSvg}>
            <AvatarWithInfo size="md" src={avatar} name={username} position={(index + 1).toString()} />
          </List.Item>
        ))}
        {participantsCount && participantsCount > participants.length && (
          <Button className="ml-auto sticky bottom-0 left-0 mt-2">
            See more participants
          </Button>
        )}
      </List>
    </>

  )
}