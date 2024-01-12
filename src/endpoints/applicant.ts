import Endpoint from '../core/endpoint.js';
import { IApplicant } from '../entities/IApplicant.js';

interface IDegreeOptions {
  degreeId?: number;
  degreeCode?: string;
  year?: number;
  quarter?: number;
  verbose?: true | false;
}

export default class Applicant extends Endpoint {
  get(options?: IDegreeOptions) {
    const params = {
      format: 'json',
      degree: options?.degreeId || options?.degreeCode,
      quarter: options?.quarter,
      verbose: options?.verbose,
      year: options?.year,
    };

    return this.service.get<IApplicant[]>('applicants', params);
  }
}
