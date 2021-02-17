require('../setup');
const { inspect } = require('util');
const config = require('../setup/config');

inspect.defaultOptions.depth = null;
config.baseUrl = 'https://webapps.grad.uw.edu/services/applicants/v3/api/';

const doQuery = async () => {
  await uwgaws.initialize(config);
  const gradPrograms = await uwgaws.programs.getAuthorized();
  console.log(inspect(gradPrograms));
};

doQuery();
