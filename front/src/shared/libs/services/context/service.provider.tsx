import { type ReactNode, useCallback, useMemo } from 'react';
import { Ctx } from './service.context.tsx';
import { getServices } from '../getServices/getServices.ts';

interface Props {
  children: ReactNode
}
export const ServiceProvider = ({ children }: Props) => {
  const services = useMemo(() => getServices(), [])

  const updateToken = useCallback((newToken: string) => {
    services.tokenManager.setToken(newToken)
  }, [services])

  return (
    <Ctx.Provider value={{ services, updateToken }}>
      {children}
    </Ctx.Provider>
  )
}