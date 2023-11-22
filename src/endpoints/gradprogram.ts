import Endpoint from '../core/endpoint.js';
import { IProgram } from '../entities/IProgram.js';

export default class GradProgram extends Endpoint {
  getAuthorized() {
    return this.service.get<IProgram[]>('gradprograms/?format=json');
  }
}
