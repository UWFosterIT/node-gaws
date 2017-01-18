import fs           from 'fs';
import winston      from 'winston';
import MicroCache   from 'micro-cache';
import GradPrograms from './modules/gradprograms';
import Applications from './modules/applications';
import Applicants from './modules/applicants';

function readCertificate(cert = '', key = '') {
  if (cert === '' || key === '' ||
      !fs.existsSync(cert) || !fs.existsSync(key)) {
    throw new Error(`Client cert ${cert} or key ${key} can not be found`);
  }

  return {
    cert: fs.readFileSync(cert),
    key:  fs.readFileSync(key)
  };
}

let UWGAWS = {
  initialize(options) {
    let config = options;
    config.auth = readCertificate(options.cert, options.key);

    winston.loggers.add('uwgaws', {
      console: {
        colorize:    true,
        label:       'uwgaws',
        level:       process.env.LOG_LEVEL || options.logLevel,
        prettyPrint: true
      }
    });

    config.log = winston.loggers.get('uwgaws');
    config.cache = new MicroCache(
      options.cachePath,
      options.logLevel,
      options.cacheExt
    );

    this.programs = new GradPrograms(config);
    this.applications = new Applications(config);
    this.applicants = new Applicants(config);

    return this;
  }
};

module.exports = UWGAWS;
