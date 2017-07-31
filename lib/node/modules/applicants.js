'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Applicants extends _service2.default {
  constructor(config) {
    super(config);
  }

  getByProgram(opt, cb) {
    let params = {
      gradprogid: opt.gradProgId || 0,
      year: opt.year || 0,
      quarter: opt.quarter || 0,
      format: opt.format || 'json'
    };
    let query = _queryString2.default.stringify(params);
    return this._get(`applicants?${query}`);
  }

}

exports.default = Applicants;
//# sourceMappingURL=applicants.js.map