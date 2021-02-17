/* eslint-disable no-undef */
require('../setup');
const { inspect } = require('util');
const config = require('../setup/config');

inspect.defaultOptions.depth = null;
inspect.defaultOptions.maxArrayLength = null;

config.baseUrl = 'https://webapps.grad.uw.edu/services/applicants/v3/api/';

const doQuery = async () => {
  await uwgaws.initialize(config);
  const options = {
    id: 1000023835,
    format: 'xml',
  };
  const application = await uwgaws.applications.getById(options);
  console.log(inspect(application.data));
};

doQuery();
