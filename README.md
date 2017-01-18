# UW Person Web Service
This implements the [v3 Graduate Applicant Webservice](https://webdev.grad.uw.edu/grad_appl/documentation/uwnetid/version3api.html).   

## USE

### Installation

    npm install uwgaws

### Examples

Import the module and set it's configuration.  You must set a ``cacheMode`` to tell the ``micro-cache`` module to save http reqeusts or not to the filesystem (usefull for development).  In production, set that mode to ``wild`` to force all requests to go over the internet.

#### First, set your config and initialize



```JavaScript
const uwgaws = import('uwgaws');

uwgaws.initialize(config);
```

#### 

### Using a local cache

The ``cacheMode`` can be set to any one of the following modes.  This uses the ``micro-cache`` node module as a local file system cache.  

- wild: all requests go out to the internet, don't load anything from cache, doesn't save anything.
- dryrun: Loads files from cache if exists, does http calls when cache doesn't exist, doesn't save to the cache.
- record: Loads files from the cache and saves new ones to the cache.

### Logging
This module uses ``winston`` for all logging.  Set an environment variable to a valid log level such as ``LOG_LEVEL=debug node yourscript.js``.

## Development
For linting, this assumes you have ``eslint`` and ``babel-eslint`` installed globally ``npm install eslint@2.x babel-eslint@next -g``

Copy ``test/setup/config-sample.js`` to ``test/setup/config.js`` and edit values as needed. Use the ``npm`` commands indicated in ``package.json``.

    npm build
    npm test
    npm lint
