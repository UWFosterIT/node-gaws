import Endpoint from '../core/endpoint.js';
import { IApplication, IIdOptions, IProgramOptions } from '../entities/IApplication';

export default class Application extends Endpoint {
  getById(options: IIdOptions) {
    const params = {
      applId: options.id,
      format: 'json',
      type: 1,
    };
    return this.service.get('applications', params);
  }

  getByIdSlow(options: IIdOptions) {
    const params = {
      applId: options.id,
      format: 'json',
    };
    return this.service.get('applications', params);
  }

  getByProgram(options: IProgramOptions) {
    const params = {
      format: 'json',
      type: 1,
      gradprogid: options.gradProgId,
      quarter: options.quarter,
      year: options.year,
    };
    return this.service.get<IApplication[]>('applications', params);
  }

  getByProgramSlow(options: IProgramOptions) {
    const params = {
      format: 'json',
      gradprogid: options.gradProgId,
      quarter: options.quarter,
      year: options.year,
    };
    return this.service.get<IApplication[]>('applications', params);
  }
}
