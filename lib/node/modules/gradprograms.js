'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GradPrograms extends _service2.default {
  constructor(config) {
    super(config);
  }

  getAuthorized() {
    return this._get('gradprograms/?format=json');
  }
}

exports.default = GradPrograms;
//# sourceMappingURL=gradprograms.js.map