import { HttpService } from '../httpService/http.service.ts';
import { AuthService } from '../authService/auth.service';
import { TokenManager } from '../tokenManager/TokenManager.ts';

export const createCoreServices = () => {
  const tokenManager = new TokenManager();
  const httpService = new HttpService(tokenManager);
  return {
    tokenManager,
    http: httpService,
    auth: new AuthService(httpService),
  };
};

export type CoreServices = ReturnType<typeof createCoreServices>;
