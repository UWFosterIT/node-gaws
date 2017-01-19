# UW Graduate Applicant Webervice
This implements the [v3 Graduate Applicant Webservice](https://webdev.grad.uw.edu/grad_appl/documentation/uwnetid/version3api.html).   

## USE

### Installation

    npm install uwgaws

### Set up

Import the module and initialize it 

```JavaScript
const uwgaws = import('uwgaws');

// With x509 cert
let config = {
  baseUrl:   'https://apps.grad.uw.edu/services/applicants/v3/api/',
  cert:      '/path/to/your/x509.pem',
  key:       '/path/to/your/x509.key',
  cacheMode: 'record',
  cachePath: '/path/to/a/cache/directory/',
  cacheExt:  '.json',
  logLevel:  'info'
};

uwgaws.initialize(config);
```

### Config options

#### Base Url
At the moment, this module only supports the v3 api. The url in the example config above is what your config should use. There is no test url. 

#### UW x509 Client Cert
The Graduate Applicant Webservice requires that you have a valid UW x509 Client Cert. The data returned is restricted to what is authorized for your cert.

#### Caching

The ``cacheMode`` can be set to any one of the following modes.  This uses the ``micro-cache`` node module as a local file system cache.  

- wild: all requests go out to the internet, don't load anything from cache, doesn't save anything.
- dryrun: Loads files from cache if exists, does http calls when cache doesn't exist, doesn't save to the cache.
- record: Loads files from the cache and saves new ones to the cache.

It's recommended to use `record` during development and `wild` in producation.

#### Logging
This module uses ``winston`` for all logging. 

### Endpoints Implemented
All the v3 endpoints except for `documents` have been implemented. This module is currently hardcoded to request data be returned in JSON. The webservice supports returning XML. This module could be modified to accomodate that if needed. 

Endpoint|Implementation
-|-
gradprograms|uwgaws.programs.getAuthorized()
applicants|uwgaws.applicants.getByProgram(options)
applications (single)|uwgaws.applications.getById(applicationId)
applications (for program)|uwgaws.applications.getByProgram(options)

#### Options example and return values
```Javascript
  let options = {
    gradProgId: 999,
    year:       2037,
    quarter:    1
  };
```
Got to  [v3 Graduate Applicant Webservice](https://webdev.grad.uw.edu/grad_appl/documentation/uwnetid/version3api.html) page for complete details.


## DEVELOPMENT
For linting, this assumes you have ``eslint`` and ``babel-eslint`` installed globally ``npm install eslint@2.x babel-eslint@next -g``

Copy ``test/setup/config-sample.js`` to ``test/setup/config.js`` and edit values as needed. Use the ``npm`` commands indicated in ``package.json``.

    npm build
    npm test
    npm lint
