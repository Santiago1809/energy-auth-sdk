import { HttpClient } from '../http-client';
import {
  LoginResponse,
  LoginRequest,
  RegisterResponse,
  RefreshRequest,
  RegisterRequest,
  SessionResponse,
  SuccessResponse,
  TokensResponse,
  UserResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
  RequestPasswordRecoveryRequest,
  ValidateRecoveryTokenRequest,
  ValidateRecoveryTokenResponse,
  ResetPasswordRequest,
} from '../types';

export class AuthClient {
  constructor(private readonly httpClient: HttpClient) {}

  register(payload: RegisterRequest): Promise<RegisterResponse> {
    return this.httpClient.request('POST', '/auth/register', { body: payload });
  }

  login(payload: LoginRequest): Promise<LoginResponse> {
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

  getUserById(userId: string): Promise<UserResponse> {
    return this.httpClient.request('GET', `/auth/users/${userId}`);
  }

  requestPasswordRecovery(
    payload: RequestPasswordRecoveryRequest,
  ): Promise<SuccessResponse> {
    return this.httpClient.request('POST', '/auth/password-recovery/request', {
      body: payload,
    });
  }

  validateRecoveryToken(
    payload: ValidateRecoveryTokenRequest,
  ): Promise<ValidateRecoveryTokenResponse> {
    return this.httpClient.request('POST', '/auth/password-recovery/validate-token', {
      body: payload,
    });
  }

  resetPassword(payload: ResetPasswordRequest): Promise<SuccessResponse> {
    return this.httpClient.request('POST', '/auth/password-recovery/reset', {
      body: payload,
    });
  }
}
