import qs      from 'query-string';
import Service from './service';

class Applications extends Service {
  constructor(config) {
    super(config);
  }

  getById(id, cb) {
    let params = {
      applId: id,
      format: 'json'
    }
    let query = qs.stringify(params);
    return this._get(`applications?${query}`);
  }

  getByProgram(opt, cb) {
    let params = {
      gradprogid: opt.gradProgId  || 0,
      year: opt.year              || 0,
      quarter: opt.quarter        || 0,
      format: 'json'
    }
    let query = qs.stringify(params);
    return this._get(`applications?${query}`);
  }

}

export default Applications;
