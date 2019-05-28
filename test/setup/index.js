const chai = require('chai');
const log4js = require('log4js');
const config = require('./config');
const uwgaws = require('../../src/index');

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

global.expect = chai.expect;
global.config = config;
global.uwgaws = uwgaws;
global.log4js = log4js;
