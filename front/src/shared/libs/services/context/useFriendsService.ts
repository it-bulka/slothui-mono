import { useServices } from './useServices.tsx';

export const useFriendsService = () => {
  const { friends: friendsService } = useServices();
  return friendsService;
}