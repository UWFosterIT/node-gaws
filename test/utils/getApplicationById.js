/* eslint-disable no-undef */
require('../setup');
const fs = require('fs');
const { inspect } = require('util');
const config = require('../setup/config');

inspect.defaultOptions.depth = null;
inspect.defaultOptions.maxArrayLength = null;

config.baseUrl = 'https://webapps.grad.uw.edu/services/applicants/v3/api/';

const doQuery = async () => {
  await uwgaws.initialize(config);
  const options = {
    id: 1000001756,
    format: 'json',
  };
  const application = await uwgaws.applications.getById(options)
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));

  if (options.format === 'json') {
    application.data = JSON.stringify(application.data);
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(`output/${options.id}.${options.format}`, application.data);
};

doQuery();
