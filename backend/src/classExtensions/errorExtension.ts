export class AppError extends Error {
  public readonly name: string;

  constructor(name: string, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    Error.captureStackTrace(this);
  }
}
