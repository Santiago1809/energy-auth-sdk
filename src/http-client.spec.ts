import { describe, expect, it, vi } from 'vitest';
import { HttpClient } from './http-client';

const baseOptions = {
  appId: 'demo-app',
  apiKey: 'demo-key',
};

describe('HttpClient', () => {
  it('sends required auth headers and bearer token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const client = new HttpClient({ ...baseOptions, fetch: fetchMock });
    await client.request<{ ok: boolean }>('GET', '/auth/sessions', {
      token: 'access-token',
    });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Record<string, string>;

    expect(headers['X-App-Id']).toBe('demo-app');
    expect(headers['X-Api-Key']).toBe('demo-key');
    expect(headers.Authorization).toBe('Bearer access-token');
  });

  it('serializes query params correctly', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const client = new HttpClient({ ...baseOptions, fetch: fetchMock });
    await client.request('GET', '/audit/me', {
      query: { page: 2, limit: 10, eventType: 'LOGIN' },
    });

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      'https://energy-comunity-auth-production.up.railway.app/audit/me?page=2&limit=10&eventType=LOGIN',
    );
  });

  it('uses localhost base url when local_test is true', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const client = new HttpClient({
      ...baseOptions,
      local_test: true,
      fetch: fetchMock,
    });
    await client.request('GET', '/auth/sessions');

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('http://localhost:3000/auth/sessions');
  });

  it('throws typed error for http failures', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ statusCode: 400, message: 'Payload invalido' }),
        {
          status: 400,
          headers: { 'content-type': 'application/json' },
        },
      ),
    );

    const client = new HttpClient({ ...baseOptions, fetch: fetchMock });

    await expect(
      client.request('POST', '/auth/login', {
        body: { email: 'a@b.com', password: 'x' },
      }),
    ).rejects.toMatchObject({
      code: 'HTTP_ERROR',
      status: 400,
      message: 'Payload invalido',
    });
  });

  it('throws network error when fetch fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('socket hang up'));
    const client = new HttpClient({ ...baseOptions, fetch: fetchMock });

    await expect(client.request('GET', '/auth/sessions')).rejects.toMatchObject({
      code: 'NETWORK_ERROR',
      message: 'Network error while calling auth_service',
    });
  });
});
