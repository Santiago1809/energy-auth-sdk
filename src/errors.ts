export class AuthServiceSdkError extends Error {
  readonly status: number;
  readonly message: string;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'AuthServiceSdkError';
    this.status = status;
    this.message = message;
  }
}
