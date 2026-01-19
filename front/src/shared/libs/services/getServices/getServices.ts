import { createServices } from '../createServices/createServices.tsx';
let servicesInstance: ReturnType<typeof createServices> | null = null;

export const getServices = () => {
  if (!servicesInstance) {
    servicesInstance = createServices();
  }
  return servicesInstance;
}