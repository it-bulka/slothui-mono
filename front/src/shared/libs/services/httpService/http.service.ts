import { API_BASE } from '@/shared/constants';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export class HttpService {
  private token: string = ''
  private static instance: HttpService | null = null;
  constructor(token: string) {
    if(HttpService.instance) {
      return HttpService.instance;
    }

    this.token = token;
    HttpService.instance = this;
  }
  /* ------------------------------------------------------------------ */
  /*               ---- Shared low‑level fetch helper ----              */
  /* ------------------------------------------------------------------ */

  async request<T>(
    path: string,
    opts: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      body?: unknown;
      params?: Record<string, string | number | boolean | undefined>;
      /** Override / add headers if you need something extra */
      headers?: HeadersInit;
      /** Supply a custom AbortController for timeouts etc. */
      signal?: AbortSignal;
      credentials?: 'include' | 'same-origin' | 'omit' ;
    } = {},
  ): Promise<T> {
    return HttpService.request<T>(this.token, path, opts);
  }

  /**
   * Generic JSON fetcher that injects base URL, headers and query params.
   * Throws with a detailed message on non‑2xx responses.
   */
  static async request<T>(
    token: string,
    path: string,
    opts: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      body?: unknown;
      params?: Record<string, string | number | boolean | undefined>;
      /** Override / add headers if you need something extra */
      headers?: HeadersInit;
      /** Supply a custom AbortController for timeouts etc. */
      signal?: AbortSignal;
      credentials?: 'include' | 'same-origin' | 'omit';
    } = {},
  ): Promise<T> {
    const url = new URL(`${API_BASE}${path}`, location.origin);
    if (opts.params) {
      Object.entries(opts.params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
      });
    }

    const isFD = opts.body instanceof FormData;

    const headers: HeadersInit = {
      ...(isFD ? {} : { 'Content-Type': 'application/json' }),
      'Authorization': token,
      ...opts.headers,
    };

    const init: RequestInit = {
      method: opts.method ?? (opts.body ? 'POST' : 'GET'),
      headers,
      signal: opts.signal,
      body: isFD
        ? (opts.body as FormData)
        : opts.body
          ? JSON.stringify(opts.body)
          : undefined,
    };

    const res = await fetch(url.toString(), init);

    if (!res.ok) {
     await this.throwErrorResponse(res)
    }

    if (res.status === 204) return undefined as unknown as T;

    const ct = res.headers.get('Content-Type') ?? '';
    if (!ct.includes('application/json')) {
      throw new Error(`Unexpected Content‑Type: ${ct}`);
    }

    return res.json() as Promise<T>;
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

  updateToken(newToken: string) {
    this.token = newToken;
  }
}