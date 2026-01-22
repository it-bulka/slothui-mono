import { useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  useFetchUserProfileStats,
  useUserProfileSelect,
  useFriendByIdSelect,
} from '@/entities';

export const useUserRightSidebar = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { fetchUserProfileStats } = useFetchUserProfileStats();
  const { isLoading, error, data } = useUserProfileSelect(userId);
  const friend = useFriendByIdSelect(userId);

  useEffect(() => {
    if (userId) fetchUserProfileStats(userId);
  }, [userId, fetchUserProfileStats]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return {
    userId,
    isLoading,
    data,
    friend,
  };
};
