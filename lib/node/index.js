'use strict';

let readCertificate = (() => {
  var _ref3 = _asyncToGenerator(function* (opts) {
    let certReader;

    switch (true) {

      case opts.hasOwnProperty('file'):
        certReader = Object.create(FileCertificate);
        opts = opts.file;
        break;

      case opts.hasOwnProperty('s3'):
        certReader = Object.create(S3Certificate);
        opts = opts.s3;
        break;

      default:
        throw Error('Certificate reader not supported');
    }
    let certs = yield certReader.readCertificate(opts);
    return certs;
  });

  return function readCertificate(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

require('source-map-support/register');

var _applicants = require('./modules/applicants');

var _applicants2 = _interopRequireDefault(_applicants);

var _applications = require('./modules/applications');

var _applications2 = _interopRequireDefault(_applications);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gradprograms = require('./modules/gradprograms');

var _gradprograms2 = _interopRequireDefault(_gradprograms);

var _microCache = require('micro-cache');

var _microCache2 = _interopRequireDefault(_microCache);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let FileCertificate = {
  readCertificate: (() => {
    var _ref = _asyncToGenerator(function* (opts) {
      if (opts.cert === '' || opts.key === '' || !_fs2.default.existsSync(opts.cert) || !_fs2.default.existsSync(opts.key)) {
        throw new Error(`Client cert ${opts.cert} or key ${opts.key} can not be found`);
      }

      return {
        cert: _fs2.default.readFileSync(opts.cert),
        key: _fs2.default.readFileSync(opts.key)
      };
    });

    return function readCertificate(_x) {
      return _ref.apply(this, arguments);
    };
  })()
};

let S3Certificate = {
  readCertificate: (() => {
    var _ref2 = _asyncToGenerator(function* (opts) {
      let s3 = new _awsSdk2.default.S3();
      let cert = yield s3.getObject({
        Bucket: opts.certBucket,
        Key: opts.certKey
      }).promise().catch(function (err) {
        console.log('cert error', err);
      });
      let key = yield s3.getObject({
        Bucket: opts.keyBucket,
        Key: opts.keyKey
      }).promise();

      return {
        cert: cert.Body,
        key: key.Body
      };
    });

    return function readCertificate(_x2) {
      return _ref2.apply(this, arguments);
    };
  })()
};

let UWGAWS = {
  initialize(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let config = options;
      config.auth = yield readCertificate(config.certInfo);

      _winston2.default.loggers.add('uwgaws', {
        console: {
          colorize: true,
          label: 'uwgaws',
          level: process.env.LOG_LEVEL || options.logLevel,
          prettyPrint: true
        }
      });
      _this.log = _winston2.default.loggers.get('uwgaws');
      config.log = _this.log;
      config.cache = new _microCache2.default(options.cachePath, options.logLevel, options.cacheExt);

      _this.programs = new _gradprograms2.default(config);
      _this.applications = new _applications2.default(config);
      _this.applicants = new _applicants2.default(config);

      return _this;
    })();
  }
};

module.exports = UWGAWS;

process.on('unhandledRejection', (reason, p) => {
  console.error(`Promise: ${_util2.default.inspect(p)}\nReason: ${reason}`);
  process.exit(1);
});
//# sourceMappingURL=index.js.map