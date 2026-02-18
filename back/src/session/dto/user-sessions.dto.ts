export interface UserSessionDto {
  id: string;
  userAgent: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  location?: string;
}
