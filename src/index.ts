import { AuthClient } from './clients/auth-client';
import { AuthServiceSdkError } from './errors';
import { HttpClient } from './http-client';
import { AuthServiceSdkOptions } from './types';

export class AuthServiceSdk {
  readonly auth: AuthClient;

  constructor(options: AuthServiceSdkOptions) {
    const httpClient = new HttpClient(options);
    this.auth = new AuthClient(httpClient);
  }
}

export * from './errors';
export * from './types';
export { AuthServiceSdkError };
