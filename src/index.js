const Applicants = require('./modules/applicants');
const Applications = require('./modules/applications');
const AWS = require('aws-sdk');
const fs = require('fs');
const GradPrograms = require('./modules/gradprograms');
const MicroCache = require('micro-cache');
const util = require('util');
const winston = require('winston');

let FileCertificate = {
  readCertificate: async (opts) => {
    if (opts.cert === '' || opts.key === '' ||
      !fs.existsSync(opts.cert) || !fs.existsSync(opts.key)) {
      throw new Error(`Client cert ${opts.cert} or key ${opts.key} can not be found`);
    }

    return {
      cert: fs.readFileSync(opts.cert),
      key:  fs.readFileSync(opts.key)
    };
  }
};

let S3Certificate = {
  readCertificate: async (opts) => {
    let s3 = new AWS.S3();
    let cert = await s3.getObject({
      Bucket: opts.certBucket,
      Key:    opts.certKey
    }).promise().catch((err) => {
      console.log('cert error', err);
    });
    let key = await s3.getObject({
      Bucket: opts.keyBucket,
      Key:    opts.keyKey
    }).promise();

    return {
      cert: cert.Body,
      key:  key.Body
    };
  }
};

async function readCertificate(opts) {
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
  let certs = await certReader.readCertificate(opts);
  return certs;

}

let UWGAWS = {
  async initialize(options) {
    let config = {...options};
    config.auth = await readCertificate(config.certInfo);

    winston.loggers.add('uwgaws', {
      console: {
        colorize:    true,
        label:       'uwgaws',
        level:       process.env.LOG_LEVEL || options.logLevel,
        prettyPrint: true
      }
    });
    this.log = winston.loggers.get('uwgaws');
    config.log = this.log;
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

process.on('unhandledRejection', (reason, p) => {
  console.error(`Promise: ${util.inspect(p)}\nReason: ${reason}`);
  process.exit(1);
});
