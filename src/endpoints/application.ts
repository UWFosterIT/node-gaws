import Endpoint from '../core/endpoint.js';
import { IApplication, IIdOptions, IProgramOptions } from '../entities/IApplication.js';

export default class Application extends Endpoint {
  getById(options: IIdOptions) {
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
      gradprogid: options.degreeId,
      quarter: options.quarter,
      year: options.year,
    };
    return this.service.get<IApplication[]>('applications', params);
  }
}
