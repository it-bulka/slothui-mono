import { useServices } from './useServices.tsx';

export const useUserService = () => {
  const { user: userService } = useServices();
  return userService;
}