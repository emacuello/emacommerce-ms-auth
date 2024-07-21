export class ErrorCreateException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
