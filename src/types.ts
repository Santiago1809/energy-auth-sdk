export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface ValidateTokenRequest {
  accessToken: string;
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface RegisterResponse extends TokensResponse {
  user: UserResponse;
}

export interface LoginResponse extends TokensResponse {
  user: UserResponse;
}

export interface SuccessResponse {
  success: true;
}

export interface ValidatedUser {
  id: string;
  email: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
  user?: ValidatedUser;
  expiresAt?: string;
}

export interface SessionResponse {
  id: string;
  appId: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  expiresAt: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface AuthServiceSdkOptions {
  appId: string;
  apiKey: string;
  fetch?: FetchLike;
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions {
  token?: string;
  body?: unknown;
  query?: QueryParams;
  headers?: Record<string, string>;
}
