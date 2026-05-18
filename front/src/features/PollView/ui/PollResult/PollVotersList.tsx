import { List } from '@/shared/ui/List/List'
import { AvatarWithInfo } from '@/shared/ui/Avatar/AvatarWithInfo';
import type { VoterDetails } from '@/shared/types';

type Props = {
  voters: VoterDetails[]
}

export const PollVotersList = ({ voters }: Props) => {
  return (
    <List>
      {voters.map((voter) => (
        <AvatarWithInfo
          src={voter.avatarUrl}
          name={voter.nickname}
          position={voter.username}
          key={voter.id}
        />
      ))}
    </List>
  )
}