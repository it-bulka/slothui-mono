import { List, AvatarWithInfo } from '@/shared/ui';
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