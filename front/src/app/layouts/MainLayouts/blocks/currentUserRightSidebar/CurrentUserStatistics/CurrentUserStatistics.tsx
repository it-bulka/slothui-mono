import {
  useFetchUserProfileStats,
  useAuthUserSelector,
  Statistics,
  StatisticsSkeleton
} from '@/entities';
import { useEffect, memo } from 'react';
import { Typography } from '@/shared/ui';
import { toast } from 'react-toastify'
import { useAuthUserLoadingSelector, useAuthUserErrorSelector } from '@/entities/AuthUser';

export const CurrentUserStatistics = memo(() => {
  const user = useAuthUserSelector()
  const isLoading = useAuthUserLoadingSelector()
  const error = useAuthUserErrorSelector()
  const { fetchUserProfileStats } = useFetchUserProfileStats()

  useEffect(() => {
    if(!user) return;
    fetchUserProfileStats(user.id)
  }, [user, fetchUserProfileStats]);

  useEffect(() => {
    if(error) {
      toast.error(error);
    }
  }, [error]);

  if (!user) return <Typography>User not authorized</Typography>;
  if(isLoading) return <StatisticsSkeleton />
  return <Statistics
    followingCount={user.followingCount}
    followersCount={user.followersCount}
    postsCount={user.postsCount}
  />
})

CurrentUserStatistics.displayName = 'CurrentUserStatistics';