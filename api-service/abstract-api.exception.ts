export class AbstractApiException extends Error {
  constructor(
    message: any,
    public status = 500,
  ) {
    super(message);
  }
}
