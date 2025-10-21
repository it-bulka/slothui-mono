import { type ReactNode, useCallback, useMemo, useEffect } from 'react';
import { Ctx } from './service.context.tsx';
import { createServices } from '../createServices/createServices.tsx';

interface Props {
  token: string,
  children: ReactNode
}
export const ServiceProvider = ({ children, token }: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const services = useMemo(() => createServices(token), [])

  const updateToken = useCallback((newToken: string) => {
    services.http.updateToken(newToken)
    services.socket.updateToken(newToken)
  }, [services])

  useEffect(() => {
    updateToken(token)
  }, [token, updateToken])

  return (
    <Ctx.Provider value={{ services, updateToken }}>
      {children}
    </Ctx.Provider>
  )
}