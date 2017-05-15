import qs      from 'query-string';
import Service from './service';

class Applications extends Service {
  constructor(config) {
    super(config);
  }

  getById(opt, cb) {
    let params = {
      applId: opt.id,
      format: opt.format || 'json'
    }
    let query = qs.stringify(params);
    return this._get(`applications?${query}`);
  }

  getByProgram(opt, cb) {
    let params = {
      gradprogid: opt.gradProgId  || 0,
      year: opt.year              || 0,
      quarter: opt.quarter        || 0,
      format: opt.format          || 'json'
    }
    let query = qs.stringify(params);
    return this._get(`applications?${query}`);
  }

}

export default Applications;
