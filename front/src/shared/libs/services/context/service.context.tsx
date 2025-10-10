import {  createContext, type ReactNode, useMemo, useEffect } from 'react';
import { ChatService } from '../chatService/chat.service.ts';
import { HttpService } from '../httpService/http.service.ts';
import { SocketService } from '../socketService/socket.service.ts';
import { AuthService } from '../authService/auth.service.ts';
import { UserService } from '../userService/user.service.ts';

interface CtxProps {
  chatService:  ChatService
  authService:  AuthService
  userService:  UserService
}
const Ctx = createContext<CtxProps | null>(null);

interface Props {
  token: string,
  children: ReactNode
}
export const ServiceProvider = ({ children, token }: Props) => {
  const { socketService, httpService } = useMemo(() => ({
    socketService: new SocketService(token),
    httpService: new HttpService(token)
  }), [token])

  const value = useMemo(() => {
    const authService = new AuthService(httpService)
    const userService = new UserService(httpService)
    const chatService = new ChatService(httpService, socketService)
    return { chatService, authService, userService }
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
