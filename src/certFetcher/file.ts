import fs from 'fs/promises';
import { ICertFetcher } from './ICertFetcher';

interface IFileCertFetcher {
  cert: string,
  key: string
}

export default class FileCertFetcher implements ICertFetcher {
  // eslint-disable-next-line class-methods-use-this
  async readCertificate(opts: IFileCertFetcher) {
    const cert = await fs.readFile(opts.cert)
      .catch(() => {
        throw Error(`Cert file '${opts.cert}' does not exist or is not accessible`);
      });

    const key = await fs.readFile(opts.key)
      .catch(() => {
        throw Error(`Key file '${opts.key}' does not exist or is not accessible`);
      });
    return {
      cert: cert.toString(),
      key: key.toString(),
    };
  }
}
