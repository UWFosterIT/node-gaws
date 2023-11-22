import Endpoint from '../core/endpoint.js';
import { IProgramOptions } from '../entities/IApplication.js';
import { IUnsubmitted } from '../entities/IUnsubmitted.js';

export default class GradProgram extends Endpoint {
  getAll() {
    const params = {
      format: 'json',
    };
    return this.service.get<IUnsubmitted[]>('unsubmitted', params);
  }

  getByProgramId(degreeId: number) {
    const params = {
      format: 'json',
      degree: degreeId,
    };
    return this.service.get<IUnsubmitted[]>('unsubmitted', params);
  }

  getByProgramQuarter(program: IProgramOptions) {
    const params = {
      format: 'json',
      degree: program.degreeId,
      quarter: program.quarter,
      year: program.year,
    };
    return this.service.get<IUnsubmitted[]>('unsubmitted', params);
  }
}
