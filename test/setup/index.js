import chai   from 'chai';
import config from './config';
import uwgaws from '../../lib/node/index';

global.expect = chai.expect;
global.config = config;
global.uwgaws = uwgaws;
