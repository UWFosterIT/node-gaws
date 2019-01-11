const chai = require('chai');
const config = require('./config');
const uwgaws = require('../../src/index');

global.expect = chai.expect;
global.config = config;
global.uwgaws = uwgaws;
