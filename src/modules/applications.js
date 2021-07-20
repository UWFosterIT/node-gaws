const qs = require('query-string');
const Service = require('./service');

class Applications extends Service {
  getById(opt) {
    const params = {
      applId: opt.id,
      format: opt.format || 'json',
      type: opt.type || 1,
    };
    const query = qs.stringify(params);
    return this.get(`applications?${query}`);
  }

  getByProgram(opt) {
    const params = {
      format: opt.format || 'json',
      type: opt.type || 1,
      gradprogid: opt.gradProgId || 0,
      quarter: opt.quarter || 0,
      year: opt.year || 0,
    };
    const query = qs.stringify(params);
    return this.get(`applications?${query}`);
  }
}

module.exports = Applications;
