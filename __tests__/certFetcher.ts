import { CertFetcherManager } from '../src/index.js';
import LiteralCertFetcher from '../src/certFetcher/literal.js';
// @ts-ignore
import config from './config';

jest.setTimeout(20000);

describe('CertFetcher', () => {
  test('S3', async () => {
    const certFetcherManager = new CertFetcherManager();

    const fetcher = certFetcherManager.getFetcher('s3');
    const auth = await fetcher.readCertificate(config.auth);

    expect(auth).not.toBe(null);
  });

  test('Local success', async () => {
    const certFetcherManager = new CertFetcherManager();

    const fetcher = certFetcherManager.getFetcher('file');
    await expect(fetcher.readCertificate({
      cert: '__tests__/fakeCerts/testcert.file',
      key: '__tests__/fakeCerts/testkey.file',
    })).resolves.toStrictEqual(expect.objectContaining({
      cert: expect.any(String), key: expect.any(String),
    }));
  });

  test('Local fail', async () => {
    const certFetcherManager = new CertFetcherManager();

    const fetcher = certFetcherManager.getFetcher('file');
    await expect(() => fetcher.readCertificate({
      cert: 'src/__tests__/fakeCerts/testcert.txt',
      key: 'src/__tests__/fakeCerts/testkey.txt',
    })).rejects.toThrow("Cert file 'src/__tests__/fakeCerts/testcert.txt' does not exist or is not accessible");
  });

  test('Add cert fetcher', () => {
    const certFetcherManager = new CertFetcherManager();
    const literalCertFetcher = new LiteralCertFetcher();

    certFetcherManager.addFetcher('literal', literalCertFetcher);

    const fetcher = certFetcherManager.getFetcher('literal');
    expect(fetcher).toHaveProperty('readCertificate');
  });
});
