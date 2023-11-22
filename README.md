# UW Graduate Applicant Web Service

This package implements the [v4 Graduate Applicant Webservice](https://webapps.grad.uw.edu/services/applicants/v4/documentation/servicesApplicants.xml) API for Node.js.

Note: node-gaws version 7 supports GAWS api V4. Use node-gaws 6.x for GAWS api V3.

## USE

### Installation

Install from the NPM package repository.

 ```bash
 npm i node-gaws
 ```

### Basic Use

Import the module and initialize it.

```JavaScript
import { Gaws } from 'node-gaws';

const gaws = new Gaws({
  organizationName: 'My Organization Name',
  baseUrl: 'https://testweb.grad.uw.edu/services/applicants/v4/api/',
  auth: {
    cert: 'your certificate data',
    key: 'your key data'
  },
  logLevel: config.logLevel,
});

const gawsApiResponse = await gaws.programs.getAuthorized();

console.log(gawsApiResponse.data);

```

### Certificate Helpers

Usually you do not want to put certificates and other secrets in your code. You can implement your own certificate data retrieval and supply it directly to Gaws. This GAWS API package provides two helper certificate fetchers for retrieving certificate information: file and AWS S3. These helpers are accessed via the certificate fetcher manager.

You can create your own cert fetchers and add them dynamically to the certificate fetcher manager. See the certFetcher tests for examples how to add custom fetchers.

The certificate manager returns a certificate fetcher of the type you specify. Once you have the cert fetcher, you can call `readCertificate()` to get the certificate data in an object that you can pass directly to the `auth` option.

#### File Certificate Fetcher

The `file` certificate fetcher retrieves the certificate information from the local file system. You pass the path to the certificate and key to the fetcher.

```JavaScript

import { Gaws, CertFetcherManager} from 'node-gaws';

const config = {
  organizationName: 'FosterIT-GAWS',
  baseUrl: 'https://testweb.grad.uw.edu/services/applicants/v3/api/',
  logLevel: 'debug',
  certFiles: {
    certPath: 'path to certificate file',
    keyPath: 'path to key file',
  },
};

const certFetcherManager = new CertFetcherManager();

const fetcher = certFetcherManager.getFetcher('file');

const certData = await fetcher.readCertificate(config.certFiles);

const gaws = new Gaws({
  organizationName: config.organizationName,
  baseUrl: config.baseUrl,
  auth: certData,
  logLevel: config.logLevel,
});

const gawsApiResponse = await gaws.programs.getAuthorized();

console.log(gawsApiResponse.data);
```

#### S3 Certificate Fetcher

The `s3` certificate fetcher retrieves the certificate information from an Amazon AWS S3 object store. You pass the bucket and key for the certificate and key to the fetcher.

```JavaScript

import { Gaws, CertFetcherManager} from 'node-gaws';

const config = {
  organizationName: 'FosterIT-GAWS',
  baseUrl: 'https://testweb.grad.uw.edu/services/applicants/v3/api/',
  logLevel: 'debug',
  certFiles: {
    certBucket: 'cert bucket name',
    certKey: 'cert S3 key name',
    keyBucket: 'key bucket name',
    keyKey: 'key S3 key name',
  },
};

const certFetcherManager = new CertFetcherManager();

const fetcher = certFetcherManager.getFetcher('s3');

const certData = await fetcher.readCertificate(config.certFiles);

const gaws = new Gaws({
  organizationName: config.organizationName,
  baseUrl: config.baseUrl,
  auth: certData,
  logLevel: config.logLevel,
});

const gawsApiResponse = await gaws.programs.getAuthorized();

console.log(gawsApiResponse.data);
```

### Config options

#### `organizationName`

The organization name is a string that identifies your organization and will appear in the headers of requests to the UW GAWS API. This helps when working with the UW Graduate School to debug your application.

#### `baseUrl`

At the moment, this module only supports the GAWS v3 api. You can use the test or production server.

#### `auth: { cert: 'cert data', key: 'key data' }`

The Graduate Applicant Web Service requires that you pass a valid UW x509 client certificate with all requests. The data returned from the request is restricted to what is authorized for your cert.

#### `logLevel`

You can set the log level to `silly`, `trace`, `debug`, `info`, `warn`, `error`, or `fatal`. If nothing is specified, the default level is `error`.

### Endpoints Implemented

All the v3 endpoints except for `documents` have been implemented. By default, all requests are made to the JSON endpoints, if you want XML as the response set `options.format` to `xml`.

GAWS Endpoint|Implementation
-|-
gradprograms|uwgaws.programs.getAuthorized()
applicants|uwgaws.applicants.getByProgram(program options)
applications (single)|uwgaws.applications.getById(application options)
applications (for program)|uwgaws.applications.getByProgram(program options)

#### Program Options

```Javascript
  const options = {
    gradProgId: 999,
    year:       2037,
    quarter:    1
  };
```

#### Application Options

```Javascript
  const options = {
    id: 12345678
  };
```

Got to  [v3 Graduate Applicant Web Service](https://devweb.grad.uw.edu/services/documentation/version3api.html) page for complete details.

## DEVELOPMENT

This package is written in TypeScript and uses Jest for testing.

Copy ``__tests__/config-sample.ts`` to ``__tests__/config.ts`` and edit values as needed. Use the ``npm`` commands indicated in ``package.json``.

```text
npm run test
npm run lint
npm run build
```
