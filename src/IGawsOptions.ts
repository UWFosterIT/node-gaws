export type LogLevel = 'silly' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface IGawsOptions {
  organizationName: string,
  baseUrl: string,
  auth: {
    cert: string | Buffer,
    key: string | Buffer,
  },
  logLevel?: LogLevel,
}
