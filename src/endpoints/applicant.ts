import Endpoint from '../core/endpoint.js';
import { IApplicant } from '../entities/IApplicant.js';

interface IDegreeOptions {
  degreeId: number;
  year: number;
  quarter: number;
  verbose?: true | false;
}

export default class Applicant extends Endpoint {
  getByDegreeId(options: IDegreeOptions) {
    const params = {
      format: 'json',
      degree: options.degreeId || 0,
      quarter: options.quarter || 0,
      verbose: options.verbose || 0,
      year: options.year || 0,
    };

    return this.service.get<IApplicant[]>('applicants', params);
  }
}
