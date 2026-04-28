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

// Errores específicos por código HTTP
export class BadRequestError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'ConflictError';
  }
}

export class TooManyRequestsError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'TooManyRequestsError';
  }
}

export class InternalServerError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'InternalServerError';
  }
}
