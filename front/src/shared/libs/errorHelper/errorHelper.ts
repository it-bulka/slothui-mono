export class ErrorHelper {
  static  extractErrorMessage(e: unknown, defaultMsg?: string) {
    if (e instanceof Error) return e.message;
    if (typeof e === 'string' && e.trim() !== '') return e;
    if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
      return e.message;
    }
    return defaultMsg || '';
  }
}