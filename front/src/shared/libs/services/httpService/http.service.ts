import { API_BASE } from '../../../constants';
import { TokenManager } from '../tokenManager/TokenManager.ts';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  /** Override / add headers if you need something extra */
  headers?: HeadersInit;
  /** Supply a custom AbortController for timeouts etc. */
  signal?: AbortSignal;
  credentials?: 'include' | 'same-origin' | 'omit' ;
  _retryCount?: number;
}

export class HttpService {
  private token: string | null = null;
  private MAX_RETRY: number = 1;
  private refreshPromise: Promise<string> | null = null;
  private onUnauthorized: (() => void) | null = null;
  private static instance: HttpService | null = null;
  constructor(private readonly tokenManager: TokenManager) {
    if(HttpService.instance) {
      return HttpService.instance;
    }

    this.token = tokenManager.getToken();

    tokenManager.subscribe(token => {
      this.token = token;
    });

    HttpService.instance = this;
  }
  /* ------------------------------------------------------------------ */
  /*               ---- Shared low‑level fetch helper ----              */
  /* ------------------------------------------------------------------ */

  setOnUnauthorized(cb: () => void) {
    this.onUnauthorized = cb;
  }

  private handleUnauthorized() {
    this.tokenManager.clearToken();
    this.onUnauthorized?.();
  }
  /**
   * Generic JSON fetcher that injects base URL, headers and query params.
   * Throws with a detailed message on non‑2xx responses.
   */
  async request<T>(
    path: string,
    opts: RequestOptions = {},
  ): Promise<T> {
    try {
      let res = await this.doFetch(this.token, path, opts);

      if (res.status === 401 && (opts._retryCount ?? 0) < this.MAX_RETRY) {
        try {
          const newToken = await this.refreshToken();
          res = await this.doFetch(
            newToken,
            path,
            { ...opts, _retryCount: (opts._retryCount ?? 0) + 1 }
          );
        } catch {
          this.handleUnauthorized();
          throw new Error('Unauthorized');
        }
      }

      if (!res.ok) {
        await HttpService.throwErrorResponse(res)
      }

      if (res.status === 204) return undefined as unknown as T;

      const ct = res.headers.get('Content-Type') ?? '';
      if (!ct.includes('application/json')) {
        throw new Error(`Unexpected Content‑Type: ${ct}`);
      }

      return await res.json() as Promise<T>;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('SERVER_UNAVAILABLE');
      }
      throw error;
    }
  }

  private async doFetch(
    token: string | null,
    path: string,
    opts: RequestOptions
  ): Promise<Response> {
    const url = new URL(`${API_BASE}${path}`, location.origin);

    if (opts.params) {
      Object.entries(opts.params).forEach(([k, v]) => {
        if (v != null) url.searchParams.append(k, String(v));
      });
    }

    const isFD = opts.body instanceof FormData;

    const headers: HeadersInit = {
      ...(isFD ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    };

    return fetch(url.toString(), {
      method: opts.method ?? (opts.body ? 'POST' : 'GET'),
      headers,
      body: isFD
        ? (opts.body as FormData)
        : opts.body
          ? JSON.stringify(opts.body)
          : undefined,
      credentials: opts.credentials,
      signal: opts.signal,
    });
  }

  static async throwErrorResponse(res: Response) {
    const ct = res.headers.get('Content-Type') ?? '';
    if (ct.includes('application/json')) {
      const errData = await res.json();
      throw new Error(errData.message || 'Error');
    } else {
      const text = await res.text().catch(() => '');
      throw new Error(text || res.statusText || 'Error');
    }
  }

  private async refresh(): Promise<string> {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Unauthorized');
    const data = await res.json();
    return data.token;
  }

  private async refreshToken(): Promise<string> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.refresh()
        .then(token => {
          this.tokenManager.setToken(token);
          return token;
        })
        .finally(() => {
          this.refreshPromise = null;
        });
    }

    return this.refreshPromise;
  }
}