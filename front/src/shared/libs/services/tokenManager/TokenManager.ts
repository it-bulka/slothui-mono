import { LOCAL_STORAGE_TOKEN_KEY } from '../../../constants';

type TokenListener = (token: string | null) => void;

export class TokenManager {
  private accessToken: string | null = null;
  private listeners = new Set<TokenListener>();

  private static instance: TokenManager | null = null;
  constructor() {
    if(TokenManager.instance) {
      return TokenManager.instance;
    }

    this.accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    TokenManager.instance = this;
  }

  getToken() {
    return this.accessToken;
  }

  setToken(token: string | null) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }
    this.notify();
  }

  clearToken() {
    this.accessToken = null;
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    this.notify();
  }

  subscribe(listener: TokenListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // emit
  private notify() {
    for (const listener of this.listeners) {
      listener(this.accessToken);
    }
  }
}
