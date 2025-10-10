import {  createContext, type ReactNode, useMemo, useEffect } from 'react';
import { ChatService } from '../chatService/chat.service.ts';
import { HttpService } from '@/shared/libs/services/httpService/http.service.ts';
import { SocketService } from '@/shared/libs/services/socketService/socket.service.ts';

interface Props {
  token: string,
  children: ReactNode
}
const Ctx = createContext<{ chatService: ChatService } | null>(null);

export const ServiceProvider = ({ children, token }: Props) => {
  const { socketService, httpService } = useMemo(() => ({
    socketService: new SocketService(token),
    httpService: new HttpService(token)
  }), [token])

  const value = useMemo(() => {
    const chatService = new ChatService(httpService, socketService)
    return { chatService }
  }, [httpService, socketService])

  useEffect(() => {
    socketService.connect()
  }, [socketService]);

  return (
    <Ctx.Provider value={value}>
        {children}
    </Ctx.Provider>
  )
}
