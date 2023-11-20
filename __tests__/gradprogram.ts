import { inspect } from 'util';
import { IGradProgram } from '../src/entities/IGradProgram';
import { LogLevel } from '../src/IGawsOptions';
import { Gaws, CertFetcherManager } from '../src/index.js';
// @ts-ignore
import config from './config.js';

jest.setTimeout(20000);

inspect.defaultOptions.depth = null;

describe('Grad Program', () => {
  test('get authorized programs should return many programs', async () => {
    const certFetcherManager = new CertFetcherManager();

    const fetcher = certFetcherManager.getFetcher('s3');
    const auth = await fetcher.readCertificate(config.auth);

    const gaws = new Gaws({
      organizationName: config.organizationName,
      baseUrl: config.baseUrl,
      auth,
      logLevel: <LogLevel>config.logLevel,
    });

    const programResponse = await gaws.programs.getAuthorized();

    const response = <IGradProgram[]>programResponse.data;

    expect(programResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('DegreeCode');
  });
});
