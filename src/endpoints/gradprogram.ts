import Endpoint from '../core/endpoint.js';
import { IGradProgram } from '../entities/IGradProgram';

export default class GradProgram extends Endpoint {
  getAuthorized() {
    return this.service.get<IGradProgram[]>('gradprograms/?format=json');
  }
}
