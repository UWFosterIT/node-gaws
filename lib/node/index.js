'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _microCache = require('micro-cache');

var _microCache2 = _interopRequireDefault(_microCache);

var _gradprograms = require('./modules/gradprograms');

var _gradprograms2 = _interopRequireDefault(_gradprograms);

var _applications = require('./modules/applications');

var _applications2 = _interopRequireDefault(_applications);

var _applicants = require('./modules/applicants');

var _applicants2 = _interopRequireDefault(_applicants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readCertificate() {
  var cert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (cert === '' || key === '' || !_fs2.default.existsSync(cert) || !_fs2.default.existsSync(key)) {
    throw new Error('Client cert ' + cert + ' or key ' + key + ' can not be found');
  }

  return {
    cert: _fs2.default.readFileSync(cert),
    key: _fs2.default.readFileSync(key)
  };
}

var UWGAWS = {
  initialize: function initialize(options) {
    var config = options;
    config.auth = readCertificate(options.cert, options.key);

    _winston2.default.loggers.add('uwgaws', {
      console: {
        colorize: true,
        label: 'uwgaws',
        level: process.env.LOG_LEVEL || options.logLevel,
        prettyPrint: true
      }
    });

    config.log = _winston2.default.loggers.get('uwgaws');
    config.cache = new _microCache2.default(options.cachePath, options.logLevel, options.cacheExt);

    this.programs = new _gradprograms2.default(config);
    this.applications = new _applications2.default(config);
    this.applicants = new _applicants2.default(config);

    return this;
  }
};

module.exports = UWGAWS;
//# sourceMappingURL=index.js.map