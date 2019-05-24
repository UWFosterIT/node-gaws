const AWS = require('aws-sdk');
const fs = require('fs');
const log4js = require('log4js');
const MicroCache = require('micro-cache');
const util = require('util');
const Applicants = require('./modules/applicants');
const Applications = require('./modules/applications');
const GradPrograms = require('./modules/gradprograms');

const FileCertificate = {
  readCertificate: async (opts) => {
    if (opts.cert === '' || opts.key === ''
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      || !fs.existsSync(opts.cert) || !fs.existsSync(opts.key)) {
      throw new Error(`Client cert ${opts.cert} or key ${opts.key} can not be found`);
    }

    return {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      cert: fs.readFileSync(opts.cert),
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      key: fs.readFileSync(opts.key),
    };
  },
};

const S3Certificate = {
  readCertificate: async (opts) => {
    const s3 = new AWS.S3();
    const cert = await s3.getObject({
      Bucket: opts.certBucket,
      Key: opts.certKey,
    }).promise().catch((err) => {
      // eslint-disable-next-line no-console
      console.log('cert error', err);
    });
    const key = await s3.getObject({
      Bucket: opts.keyBucket,
      Key: opts.keyKey,
    }).promise();

    return {
      cert: cert.Body,
      key: key.Body,
    };
  },
};

async function readCertificate(options) {
  let certReader;
  let opts;

  switch (true) {
    case Object.prototype.hasOwnProperty.call(options, 'file'):
      certReader = Object.create(FileCertificate);
      opts = options.file;
      break;

    case Object.prototype.hasOwnProperty.call(options, 's3'):
      certReader = Object.create(S3Certificate);
      opts = options.s3;
      break;

    default:
      throw Error('Certificate reader not supported');
  }
  const certs = await certReader.readCertificate(opts);
  return certs;
}

const UWGAWS = {
  async initialize(options) {
    const config = { ...options };
    config.auth = await readCertificate(config.certInfo);

    log4js.configure({
      appenders: {
        out: {
          layout: { type: 'colored' },
          type: 'stdout',
        },
      },
      categories: {
        default: {
          appenders: ['out'],
          level: process.env.LOG_LEVEL || config.logLevel || 'info',
        },
      },
    });

    config.log = log4js.getLogger();

    config.cache = new MicroCache(
      options.cachePath,
      options.logLevel,
      options.cacheExt,
    );

    this.programs = new GradPrograms(config);
    this.applications = new Applications(config);
    this.applicants = new Applicants(config);

    return this;
  },
};

module.exports = UWGAWS;

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.error(`Promise: ${util.inspect(p)}\nReason: ${reason}`);
  process.exit(1);
});
