'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Applications extends _service2.default {
  constructor(config) {
    super(config);
  }

  getById(opt, cb) {
    let params = {
      applId: opt.id,
      format: opt.format || 'json'
    };
    let query = _queryString2.default.stringify(params);
    return this._get(`applications?${query}`);
  }

  getByProgram(opt, cb) {
    let params = {
      gradprogid: opt.gradProgId || 0,
      year: opt.year || 0,
      quarter: opt.quarter || 0,
      format: opt.format || 'json'
    };
    let query = _queryString2.default.stringify(params);
    return this._get(`applications?${query}`);
  }

}

exports.default = Applications;
//# sourceMappingURL=applications.js.map