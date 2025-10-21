import { useServices } from './useServices.tsx';

export const useChatService = () => {
  const { chat: chatService } = useServices();
  return chatService;
}