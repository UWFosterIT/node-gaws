import { IAuth } from './IAuth';

export interface ICertFetcher {
  readCertificate(config?: any): Promise<IAuth>;
}
