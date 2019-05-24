const request = require('request');
const { inspect } = require('util');

inspect.defaultOptions.depth = null;

class Service {
  constructor(config) {
    this.config = config;
    this.log = config.log;
    this.cache = config.cache;
  }

  options(endpoint) {
    return {
      agentOptions: this.config.auth,
      uri: this.config.baseUrl + endpoint,
      uriCache: endpoint.replace(/\//g, ''),
    };
  }

  get(endpoint) {
    return new Promise((fulfill, reject) => {
      // wild    no load no save
      // dryrun  load not save
      // record  load and save
      const options = this.options(endpoint);

      if (this.config.cacheMode === 'wild') {
        this.log.debug(`wild -- ${options.uri}`);
        request.get(options, (err, response, body) => {
          if (!err) {
            let bodyNotFound = null;
            if (response.statusCode === 404) {
              // special case for 404 because the Student Web Service
              // returns ugly HTML in the response body.
              bodyNotFound = 'Not found.';
            }
            fulfill(this.buildResult(response, bodyNotFound || body));
          } else {
            reject(err);
          }
        });
      } else if (this.config.cacheMode === 'dryrun') {
        this.log.debug(`dryrun for ${options.uri}`);
        const body = this.cache.read(options.uriCache);
        if (body) {
          const response = {};
          response.statusCode = 200;
          fulfill(this.buildResult(response, body));
        } else {
          request.get(options, (err, response, resBody) => {
            if (!err) {
              let bodyNotFound = null;
              if (response.statusCode === 404) {
                // special case for 404 because the Student Web Service
                // returns ugly HTML in the response body.
                bodyNotFound = 'Not found.';
              }
              fulfill(this.buildResult(response, bodyNotFound || resBody));
            } else {
              reject(err);
            }
          });
        }
      } else if (this.config.cacheMode === 'record') {
        this.log.debug(`record -- ${options.uri}`);
        const body = this.cache.read(options.uriCache);
        if (body) {
          const response = {};
          response.statusCode = 200;
          fulfill(this.buildResult(response, body));
        } else {
          request.get(options, (err, response, resBody) => {
            if (!err) {
              let bodyNotFound = null;
              if (response.statusCode === 200) {
                this.cache.write(options.uriCache, resBody, true);
              } else if (response.statusCode === 404) {
                // special case for 404 because the Student Web Service
                // returns ugly HTML in the response body.
                bodyNotFound = 'Not found.';
              }
              fulfill(this.buildResult(response, bodyNotFound || resBody));
            } else {
              reject(err);
            }
          });
        }
      }
    });
  }

  buildResult(response, body) {
    const result = {};
    result.statusCode = response.statusCode;
    if (response.statusCode !== 200) {
      if (!Service.isJson(body)) {
        result.message = body;
      } else {
        result.message = JSON.parse(body);
      }
      result.data = {};
    } else if (Service.isJson(body)) {
      result.data = JSON.parse(body);
    } else {
      result.data = body;
    }

    this.log.trace(`API response body: ${inspect(result.data)}`);
    return result;
  }

  static isJson(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
}

module.exports = Service;
