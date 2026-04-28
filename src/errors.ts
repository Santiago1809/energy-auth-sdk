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
    this.status = 400;
  }
}

export class UnauthorizedError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}

export class ForbiddenError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

export class NotFoundError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

export class ConflictError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'ConflictError';
    this.status = 409;
  }
}

export class TooManyRequestsError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'TooManyRequestsError';
    this.status = 429;
  }
}

export class InternalServerError extends AuthServiceSdkError {
  constructor(message: string, options: Omit<ConstructorParameters<typeof AuthServiceSdkError>[1], 'code'>) {
    super(message, { ...options, code: 'HTTP_ERROR' });
    this.name = 'InternalServerError';
    this.status = 500;
  }
}
