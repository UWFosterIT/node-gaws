import { Logger } from 'tslog';
import Service from './modules/apiService.js';
import GradProgram from './endpoints/gradprogram.js';
import Application from './endpoints/application.js';
import Applicant from './endpoints/applicant.js';
import Unsubmitted from './endpoints/unsubmitted.js';
import { IGawsOptions } from './IGawsOptions.js';

export { CertFetcherManager } from './certFetcher/cert-fetcher-manager.js';
export type { ICertFetcher } from './certFetcher/ICertFetcher.js';
export type { IApiError } from './modules/IService.js';
export type { IProgram } from './entities/IProgram.js';
export type { IApplicant } from './entities/IApplicant.js';
export type { IApplication } from './entities/IApplication.js';
export type { IUnsubmitted } from './entities/IUnsubmitted.js';
export type { IAuth } from './certFetcher/IAuth.js';

enum LogLevel {
  silly,
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
}

const logSettings = {
  prettyLogTemplate: '{{rawIsoStr}} - {{logLevelName}}: [{{name}}]',
  stylePrettyLogs: false,
} as const;

export class Gaws {
  private service: Service;

  private log: Logger<unknown>;

  programs: GradProgram;

  applications: Application;

  applicants: Applicant;

  unsubmitted: Unsubmitted;

  constructor(options: IGawsOptions) {
    this.log = new Logger({ name: this.constructor.name, minLevel: LogLevel[options.logLevel || 'error'], ...logSettings });

    this.service = new Service({
      organizationName: options.organizationName,
      baseUrl: options.baseUrl,
      auth: options.auth,
    }, this.log);

    this.programs = new GradProgram(this.service, this.log);
    this.applications = new Application(this.service, this.log);
    this.applicants = new Applicant(this.service, this.log);
    this.unsubmitted = new Unsubmitted(this.service, this.log);
  }
}
