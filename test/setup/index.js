import config from './config';
import uwgaws  from '../../lib/node/index';
import chai from 'chai';

global.expect = chai.expect;
global.config = config;
global.uwgaws = uwgaws;
