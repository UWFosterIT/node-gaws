import { Logger } from 'tslog';
import Service from './modules/apiService.js';
import GradProgram from './endpoints/gradprogram.js';
import Application from './endpoints/application.js';
import Applicant from './endpoints/applicant.js';
import Unsubmitted from './endpoints/unsubmitted.js';
import { IGawsOptions } from './IGawsOptions';

export { CertFetcherManager } from './certFetcher/cert-fetcher-manager.js';
export { ICertFetcher } from './certFetcher/ICertFetcher';
export { IApiError } from './modules/IService';
export { IGradProgram } from './entities/IGradProgram';
export { IApplicant } from './entities/IApplicant';
export { IApplication } from './entities/IApplication';
export { IUnsubmitted } from './entities/IUnsubmitted';
export { IAuth } from './certFetcher/IAuth';

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
