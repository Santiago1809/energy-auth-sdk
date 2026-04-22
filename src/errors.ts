export type AuthServiceSdkErrorCode = 'HTTP_ERROR' | 'NETWORK_ERROR' | 'INVALID_RESPONSE';

export class AuthServiceSdkError extends Error {
  readonly code: AuthServiceSdkErrorCode;
  readonly status?: number;
  readonly payload?: unknown;

  constructor(
    message: string,
    options: {
      code: AuthServiceSdkErrorCode;
      status?: number;
      payload?: unknown;
      cause?: unknown;
    },
  ) {
    super(message);
    this.name = 'AuthServiceSdkError';
    this.code = options.code;
    if (options.status !== undefined) {
      this.status = options.status;
    }

    if (options.payload !== undefined) {
      this.payload = options.payload;
    }

    if (options.cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = options.cause;
    }
  }
}
