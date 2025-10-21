import { useServices } from './useServices.tsx';

export const useAuthService = () => {
  const { auth: authService } = useServices();
  return authService;
}