# UW Graduate Applicant Webervice

This implements the [v3 Graduate Applicant Webservice](https://devweb.grad.uw.edu/services/documentation/index.htm).

Note: Version 4.0.0 and later require Node 8.10 or later.

## USE

### Installation

Add the following to your `package.json` and then do a `npm install`. Update the version number as needed.

    "uwgaws": "git+ssh://git@github.com/UWFosterIT/node-gaws.git#4.0.0",

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

The Graduate Applicant Web Service requires that you have a valid UW x509 Client Cert. The data returned is restricted to what is authorized for your cert.

When specifying the store for the certificates, only choose one of the valid types and edit the certInfo section of the config file accordingly. Currently only local file and s3 certificate storage locations are supported.

#### Caching

The ``cacheMode`` can be set to any one of the following modes.  This uses the ``micro-cache`` node module as a local file system cache.

- wild: all requests go out to the internet, don't load anything from cache, doesn't save anything.
- dryrun: Loads files from cache if exists, does http calls when cache doesn't exist, doesn't save to the cache.
- record: Loads files from the cache and saves new ones to the cache.

It's recommended to use `record` during development and `wild` in producation.

#### Logging

This module uses ``winston`` for all logging.

### Endpoints Implemented

All the v3 endpoints except for `documents` have been implemented. By default, all requests are made to the JSON endpoints, if you want XML as the response set `options.format` to `xml`.

Endpoint|Implementation
-|-
gradprograms|uwgaws.programs.getAuthorized()
applicants|uwgaws.applicants.getByProgram(options)
applications (single)|uwgaws.applications.getById(options)
applications (for program)|uwgaws.applications.getByProgram(options)

#### Options example and return values

```Javascript
  let options = {
    gradProgId: 999,
    year:       2037,
    quarter:    1
  };
```

Got to  [v3 Graduate Applicant Web Service](https://devweb.grad.uw.edu/services/documentation/index.htm) page for complete details.

## DEVELOPMENT

Copy ``test/setup/config-sample.js`` to ``test/setup/config.js`` and edit values as needed. Use the ``npm`` commands indicated in ``package.json``.

    npm run test
    npm run lint
