const qs = require('query-string');
const Service = require('./service');

class Applicants extends Service {
  constructor(config) {
    super(config);
  }

  getByProgram(opt, cb) {
    let params = {
      format: opt.format || 'json',
      gradprogid: opt.gradProgId || 0,
      quarter: opt.quarter || 0,
      year: opt.year || 0,
    };
    let query = qs.stringify(params);
    return this._get(`applicants?${query}`);
  }

}

module.exports = Applicants;
