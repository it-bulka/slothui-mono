import { TypographyTypes, Typography } from '@/shared/ui';
import { Statistics, StoryAvatar, useFetchUserProfileStats, useUserProfileSelect } from '@/entities';
import { BlockTitle } from '@/widgets';
import ArrowUpRightSvg from "@/shared/assets/images/general/arrow-up-right.svg?react"
import MockAvatar from '@/mock/images/avatar.png'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { UserProfileData } from './UserProfileData/UserProfileData.tsx';
import { toast } from 'react-toastify'
import { UserContactInformation } from './UserContactInformation/UserContactInformation.tsx';

export const UserRightSidebar = () => {
  const { userId } = useParams<{ userId: string }>()
  const { fetchUserProfileStats } = useFetchUserProfileStats()
  const { isLoading, error, data } = useUserProfileSelect(userId)

  useEffect(() => {
    if(!userId) return;
    fetchUserProfileStats(userId)
  }, [userId, fetchUserProfileStats]);

  useEffect(() => {
    if(error) {
      toast.error(error);
    }
  }, [error]);

  // TODO: add fetching stories
  const stories = [
    {
      avatarSrc: MockAvatar,
      username: 'username',
      nickname: "nickname1",
    }
  ]

  if(!userId) return <Typography>User not found</Typography>;

  if (isLoading) {
    // TODO: add Skeleton
    return <p>Loading ....</p>
  }

  if(!data) {
    return <Typography>User not found</Typography>
  }

  return (
    <div className="px-sidebar py-sidebar border-style-l bg-underground-secondary">
      <UserProfileData name={data.username} avatarSrc={data.avatarUrl} nickname={data.nickname} />
      <Statistics
        followingCount={data.followingCount}
        followersCount={data.followersCount}
        postsCount={data.postsCount}
      />

      <div>
        <BlockTitle
          title="About Me"
          withMargin
        />
        <Typography type={TypographyTypes.P_SM}>
          Hi there! I'm X-AE-A-19, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.
        </Typography>
      </div>

      <div>
        <BlockTitle title="Story Highlights" withMargin />
        <div>
          {stories.map((item) => (
            <StoryAvatar avatarSrc={item.avatarSrc} username={item.username} key={item.nickname} />
          ))}
        </div>
      </div>

      <UserContactInformation contacts={[{
        username: data.username,
        nickname: data.nickname,
        avatarSrc: data.avatarUrl
      }]}/>
      <BlockTitle title="Friends" CustomBtnIcon={ArrowUpRightSvg} onBtnClick={() => {}}/>
    </div>
  )
}