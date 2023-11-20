import Endpoint from '../core/endpoint.js';
import { IApplicant, IProgramOptions } from '../entities/IApplicant.js';

export default class Applicant extends Endpoint {
  getByProgram(options: IProgramOptions) {
    const params = {
      format: 'json',
      degree: options.degreeId || 0,
      quarter: options.quarter || 0,
      year: options.year || 0,
    };

    return this.service.get<IApplicant[]>('applicants', params);
  }
}
