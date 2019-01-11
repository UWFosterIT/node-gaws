const qs = require('query-string');
const Service = require('./service');

class Applications extends Service {
  constructor(config) {
    super(config);
  }

  getById(opt, cb) {
    let params = {
      applId: opt.id,
      format: opt.format || 'json'
    };
    let query = qs.stringify(params);
    return this._get(`applications?${query}`);
  }

  getByProgram(opt, cb) {
    let params = {
      format:     opt.format || 'json',
      gradprogid: opt.gradProgId || 0,
      quarter:    opt.quarter || 0,
      year:       opt.year || 0,
    };
    let query = qs.stringify(params);
    return this._get(`applications?${query}`);
  }

}

module.exports = Applications;
