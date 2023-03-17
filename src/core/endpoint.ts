import { Logger } from 'tslog';
import Service from '../modules/apiService.js';

export default abstract class Endpoint {
  constructor(
    public service: Service,
    public log: Logger<unknown>,
  ) {
    this.service = service;
    this.log = log;
  }
}
