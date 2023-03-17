import Endpoint from '../core/endpoint.js';
import { IUnsubmitted } from '../entities/IUnsubmitted';

export default class GradProgram extends Endpoint {
  getAll() {
    const params = {
      format: 'json',
    };
    return this.service.get<IUnsubmitted[]>('unsubmitted', params);
  }

  getByProgramId(gradProgId: number) {
    const params = {
      format: 'json',
      gradprogid: gradProgId,
    };
    return this.service.get<IUnsubmitted[]>('unsubmitted', params);
  }
}
