const qs = require('query-string');
const Service = require('./service');

class Applicants extends Service {
  getByProgram(opt) {
    const params = {
      format: opt.format || 'json',
      gradprogid: opt.gradProgId || 0,
      quarter: opt.quarter || 0,
      year: opt.year || 0,
    };
    const query = qs.stringify(params);
    return this.get(`applicants?${query}`);
  }
}

module.exports = Applicants;
