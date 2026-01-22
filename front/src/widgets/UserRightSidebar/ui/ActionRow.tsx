import { OpenChatWithUserButton, FollowButton, UnfollowButton } from '@/features';

export const ActionRow = ({
  userId,
  isFollowee,
}: {
  userId: string;
  isFollowee?: boolean;
}) => (
  <div className="flex justify-between mb-4">
    <OpenChatWithUserButton userId={userId} />
    {isFollowee !== undefined &&
      (isFollowee ? (
        <UnfollowButton userId={userId} />
      ) : (
        <FollowButton userId={userId} />
      ))}
  </div>
);
