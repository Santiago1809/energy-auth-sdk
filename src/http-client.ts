import { AuthServiceSdkError } from './errors';
import {
  AuthServiceSdkOptions,
  FetchLike,
  HttpMethod,
  QueryParams,
  RequestOptions,
} from './types';

const AUTH_SERVICE_BASE_URL =
  'https://energy-comunity-auth-production.up.railway.app';

function buildUrl(baseUrl: string, path: string, query?: QueryParams): string {
  const url = new URL(path, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

function extractMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'string' && payload.length > 0) {
    return payload;
  }

  if (payload && typeof payload === 'object' && 'message' in payload) {
    const raw = (payload as { message?: string | string[] }).message;

    if (Array.isArray(raw)) {
      return raw.join(', ');
    }

    if (typeof raw === 'string' && raw.length > 0) {
      return raw;
    }
  }

  return fallback;
}

export class HttpClient {
  private readonly appId: string;
  private readonly apiKey: string;
  private readonly fetchImpl: FetchLike;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options: AuthServiceSdkOptions) {
    this.appId = options.appId;
    this.apiKey = options.apiKey;
    this.fetchImpl = options.fetch ?? fetch;
    this.defaultHeaders = options.defaultHeaders ?? {};
  }

  async request<TResponse>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    const url = buildUrl(AUTH_SERVICE_BASE_URL, path, options.query);

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      'X-App-Id': this.appId,
      'X-Api-Key': this.apiKey,
      ...options.headers,
    };

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    const hasBody = options.body !== undefined;
    if (hasBody && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const init: RequestInit = {
      method,
      headers,
    };

    if (hasBody) {
      init.body = JSON.stringify(options.body);
    }

    let response: Response;
    try {
      response = await this.fetchImpl(url, init);
    } catch (error) {
      throw new AuthServiceSdkError('Network error while calling auth_service', {
        code: 'NETWORK_ERROR',
        cause: error,
      });
    }

    const text = await response.text();
    const payload = text.length > 0 ? safeJsonParse(text) : undefined;

    if (!response.ok) {
      throw new AuthServiceSdkError(
        extractMessage(payload, `Request failed with status ${response.status}`),
        {
          code: 'HTTP_ERROR',
          status: response.status,
          payload,
        },
      );
    }

    return payload as TResponse;
  }
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
