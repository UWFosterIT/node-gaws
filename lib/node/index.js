'use strict';

var readCertificate = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(opts) {
    var certReader, certs;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            certReader = void 0;
            _context3.t0 = true;
            _context3.next = _context3.t0 === opts.hasOwnProperty('file') ? 4 : _context3.t0 === opts.hasOwnProperty('s3') ? 7 : 10;
            break;

          case 4:
            certReader = Object.create(FileCertificate);
            opts = opts.file;
            return _context3.abrupt('break', 11);

          case 7:
            certReader = Object.create(S3Certificate);
            opts = opts.s3;
            return _context3.abrupt('break', 11);

          case 10:
            throw Error('Certificate reader not supported');

          case 11:
            _context3.next = 13;
            return certReader.readCertificate(opts);

          case 13:
            certs = _context3.sent;
            return _context3.abrupt('return', certs);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function readCertificate(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

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

var FileCertificate = {
  readCertificate: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(opts) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(opts.cert === '' || opts.key === '' || !_fs2.default.existsSync(opts.cert) || !_fs2.default.existsSync(opts.key))) {
                _context.next = 2;
                break;
              }

              throw new Error('Client cert ' + opts.cert + ' or key ' + opts.key + ' can not be found');

            case 2:
              return _context.abrupt('return', {
                cert: _fs2.default.readFileSync(opts.cert),
                key: _fs2.default.readFileSync(opts.key)
              });

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function readCertificate(_x) {
      return _ref.apply(this, arguments);
    }

    return readCertificate;
  }()
};

var S3Certificate = {
  readCertificate: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(opts) {
      var s3, cert, key;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              s3 = new _awsSdk2.default.S3();
              _context2.next = 3;
              return s3.getObject({
                Bucket: opts.certBucket,
                Key: opts.certKey
              }).promise().catch(function (err) {
                console.log('cert error', err);
              });

            case 3:
              cert = _context2.sent;
              _context2.next = 6;
              return s3.getObject({
                Bucket: opts.keyBucket,
                Key: opts.keyKey
              }).promise();

            case 6:
              key = _context2.sent;
              return _context2.abrupt('return', {
                cert: cert.Body,
                key: key.Body
              });

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function readCertificate(_x2) {
      return _ref2.apply(this, arguments);
    }

    return readCertificate;
  }()
};

var UWGAWS = {
  initialize: function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(options) {
      var config;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              config = options;
              _context4.next = 3;
              return readCertificate(config.certInfo);

            case 3:
              config.auth = _context4.sent;


              _winston2.default.loggers.add('uwgaws', {
                console: {
                  colorize: true,
                  label: 'uwgaws',
                  level: process.env.LOG_LEVEL || options.logLevel,
                  prettyPrint: true
                }
              });
              this.log = _winston2.default.loggers.get('uwgaws');
              config.log = this.log;
              config.cache = new _microCache2.default(options.cachePath, options.logLevel, options.cacheExt);

              this.programs = new _gradprograms2.default(config);
              this.applications = new _applications2.default(config);
              this.applicants = new _applicants2.default(config);

              return _context4.abrupt('return', this);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function initialize(_x4) {
      return _ref4.apply(this, arguments);
    }

    return initialize;
  }()
};

module.exports = UWGAWS;

process.on('unhandledRejection', function (reason, p) {
  console.error('Promise: ' + _util2.default.inspect(p) + '\nReason: ' + reason);
  process.exit(1);
});
//# sourceMappingURL=index.js.map