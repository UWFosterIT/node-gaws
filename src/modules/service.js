const got = require('got');
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
      agent: false,
      https: {
        certificate: this.config.auth.cert,
        key: this.config.auth.key,
      },
      url: this.config.baseUrl + endpoint,
      uriCache: endpoint.replace(/\//g, ''),
    };
  }

  async get(endpoint) {
    // wild    no load no save
    // dryrun  load not save
    // record  load and save
    const options = this.options(endpoint);
    const { cacheMode } = this.config;
    let response = {};

    if (cacheMode !== 'wild') {
      const body = this.cache.read(options.uriCache);

      if (body) {
        response.statusCode = 200;
        response.body = body;
        this.log.debug(`${cacheMode} cache hit for ${options.url}`);
      } else {
        this.log.debug(`${cacheMode} cache miss for ${options.url}`);
      }
    }

    response = await got.get(options)
      .catch((err) => {
        if (!err.response) {
          this.log.error(`${err.name}: ${err.message}`);
          throw new Error('Unable to make GET request');
        }
        return err.response;
      });

    this.log.debug(`GET -- ${options.url}`);

    if (cacheMode === 'record' && !!response.body) {
      this.cache.write(options.uriCache, response.body, true);
    }

    return this.buildResult(response);
  }

  buildResult(response) {
    const { body } = response;
    this.log.trace(`Response body: ${body}`);
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
