import { HttpClient } from '../http-client';
import {
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
  SessionResponse,
  SuccessResponse,
  TokensResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '../types';

export class AuthClient {
  constructor(private readonly httpClient: HttpClient) {}

  register(payload: RegisterRequest): Promise<TokensResponse> {
    return this.httpClient.request('POST', '/auth/register', { body: payload });
  }

  login(payload: LoginRequest): Promise<TokensResponse> {
    return this.httpClient.request('POST', '/auth/login', { body: payload });
  }

  refresh(payload: RefreshRequest): Promise<TokensResponse> {
    return this.httpClient.request('POST', '/auth/refresh', { body: payload });
  }

  validate(payload: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    return this.httpClient.request('POST', '/auth/validate', { body: payload });
  }

  logout(accessToken: string): Promise<SuccessResponse> {
    return this.httpClient.request('POST', '/auth/logout', { token: accessToken });
  }

  sessions(accessToken: string): Promise<SessionResponse[]> {
    return this.httpClient.request('GET', '/auth/sessions', { token: accessToken });
  }

  revokeSession(accessToken: string, sessionId: string): Promise<SuccessResponse> {
    return this.httpClient.request('DELETE', `/auth/sessions/${sessionId}`, {
      token: accessToken,
    });
  }
}
