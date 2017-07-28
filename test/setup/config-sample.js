let config = {
  baseUrl:   'https://apps.grad.uw.edu/services/applicants/v3/api/',
  cacheExt:  '.json',
  cacheMode: 'wild',
  cachePath: './cache/',
  certInfo:  {
    // Only use one cert store: file or s3.

    file: {
      cert: '/FULL/PATH/TO/509Cert',
      key:  '/FULL/PATH/TO/509Key'
    },
    // s3: {
    //   certBucket: 'BUCKET NAME',
    //   certKey:    'OBJECT KEY',
    //   keyBucket:  'BUCKET NAME',
    //   keyKey:     'OBJECT KEY'
    // }
  },
  format:   'json',
  logLevel: 'info'
};

export default config;
