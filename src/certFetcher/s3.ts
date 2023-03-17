import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { ICertFetcher } from './ICertFetcher.js';

interface IS3CertFetcherOptions {
  certBucket: string,
  certKey: string,
  keyBucket: string,
  keyKey: string,
}

export default class S3CertFetcher implements ICertFetcher {
  // eslint-disable-next-line class-methods-use-this
  async readCertificate(opts: IS3CertFetcherOptions) {
    const s3 = new S3Client({ region: 'us-west-1' });
    const getCertCommand = new GetObjectCommand({
      Bucket: opts.certBucket,
      Key: opts.certKey,
    });
    const cert = await s3.send(getCertCommand).catch((err) => {
      throw Error(`Cert file '${opts.certKey}' in bucket '${opts.certBucket}' does not exist or is not accessible. ${err}`);
    });
    const getKeyCommand = new GetObjectCommand({
      Bucket: opts.keyBucket,
      Key: opts.keyKey,
    });
    const key = await s3.send(getKeyCommand).catch((err) => {
      throw Error(`Key file '${opts.keyKey}' in bucket '${opts.keyBucket}' does not exist or is not accessible. ${err}`);
    });

    return {
      cert: await cert.Body?.transformToString()!,
      key: await key.Body?.transformToString()!,
    };
  }
}
