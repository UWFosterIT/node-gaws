require('../setup');
const { inspect } = require('util');
const config = require('../setup/config');

inspect.defaultOptions.depth = null;
inspect.defaultOptions.maxArrayLength = null;

config.baseUrl = 'https://webapps.grad.uw.edu/services/applicants/v3/api/';

const doQuery = async () => {
  await uwgaws.initialize(config);
  const options = {
    gradProgId: 802,
    quarter: 3,
    year: 2022,
  };
  const applications = await uwgaws.applicants.getByProgram(options);
  console.log(inspect(applications.data));
};

doQuery();
