'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Service {
  constructor(config) {
    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
  }

  _options(endpoint) {
    return {
      agentOptions: this.config.auth,
      uriCache: endpoint.replace(/\//g, ''),
      uri: this.config.baseUrl + endpoint
    };
  }

  _get(endpoint) {
    return new Promise((fulfill, reject) => {
      // wild    no load no save
      // dryrun  load not save
      // record  load and save
      let options = this._options(endpoint);

      if (this.config.cacheMode === 'wild') {
        this.log.debug(`wild -- ${options.uri}`);
        _request2.default.get(options, (err, response, body) => {
          if (!err) {
            if (response.statusCode === 404) {
              // special case for 404 because the Student Web Service
              // returns ugly HTML in the response body.
              body = 'Not found.';
            }
            fulfill(this._buildResult(response, body));
          } else {
            reject(err);
          }
        });
      } else if (this.config.cacheMode === 'dryrun') {
        this.log.debug(`dryrun for ${options.uri}`);
        let body = this.cache.read(options.uriCache);
        if (body) {
          let response = {};
          response.statusCode = 200;
          fulfill(this._buildResult(response, body));
        } else {
          _request2.default.get(options, (err, response, body) => {
            if (!err) {
              if (response.statusCode === 404) {
                // special case for 404 because the Student Web Service
                // returns ugly HTML in the response body.
                body = 'Not found.';
              }
              fulfill(this._buildResult(response, body));
            } else {
              reject(err);
            }
          });
        }
      } else if (this.config.cacheMode === 'record') {
        this.log.debug(`record -- ${options.uri}`);
        let body = this.cache.read(options.uriCache);
        if (body) {
          let response = {};
          response.statusCode = 200;
          fulfill(this._buildResult(response, body));
        } else {
          _request2.default.get(options, (err, response, body) => {
            if (!err) {
              if (response.statusCode === 200) {
                this.cache.write(options.uriCache, body, true);
              } else if (response.statusCode === 404) {
                // special case for 404 because the Student Web Service
                // returns ugly HTML in the response body.
                body = 'Not found.';
              }
              fulfill(this._buildResult(response, body));
            } else {
              reject(err);
            }
          });
        }
      }
    });
  }

  _buildResult(response, body) {
    let result = {};
    result.statusCode = response.statusCode;
    if (response.statusCode != 200) {
      if (!this._isJson(body)) {
        result.message = body;
      } else {
        result.message = JSON.parse(body);
      }
      result.data = {};
    } else {
      if (this._isJson(body)) {
        result.data = JSON.parse(body);
      } else {
        result.data = body;
      }
    }
    return result;
  }

  _isJson(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
}

exports.default = Service;
//# sourceMappingURL=service.js.map