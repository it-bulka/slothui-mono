import { ServicesFacade } from '../ServicesFacade/ServicesFacade.ts';

let servicesInstance: ServicesFacade | null = null;

export const getServices = (): ServicesFacade => {
  if (!servicesInstance) {
    servicesInstance = new ServicesFacade();
  }
  return servicesInstance;
};
