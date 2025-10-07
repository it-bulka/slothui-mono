export class ErrorHelper {
  static getMessage(err: any, customMsg?: string) {
    let msg = customMsg || 'Unknown error';
    if (err instanceof Error) msg = err.message;
    return msg;
  }
}
