export class InvalidCredentialsException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
