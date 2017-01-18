import qs      from 'query-string';
import Service from './service';

class Applicants extends Service {
  constructor(config) {
    super(config);
  }

  getByProgram(opt, cb) {
    let params = {
      gradprogid: opt.gradProgId  || 0,
      year: opt.year              || 0,
      quarter: opt.quarter        || 0,
      format: 'json'
    }
    let query = qs.stringify(params);
    return this._get(`applicants?${query}`);
  }

}

export default Applicants;
