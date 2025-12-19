import { useServices } from './useServices.tsx';

export const useMessagesService = () => {
  const { messages: messagesService } = useServices();
  return messagesService;
}