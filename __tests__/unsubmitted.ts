import { ICertFetcher } from '../src/certFetcher/ICertFetcher.js';
import { Gaws, CertFetcherManager } from '../src/index.js';
import { IGradProgram } from '../src/entities/IGradProgram';
import { IUnsubmitted } from '../src/entities/IUnsubmitted';
import config from './config.js';
import { LogLevel } from '../src/IGawsOptions';

jest.setTimeout(20000);

let fetcher: ICertFetcher;
let auth;
let gaws: Gaws;
let program: {
  gradProgId: number,
  year: number,
  quarter: 1 | 2 | 3 | 4,
  type?: 1
};

describe('Unsubmitted', () => {
  beforeAll(async () => {
    const certFetcherManager = new CertFetcherManager();

    fetcher = certFetcherManager.getFetcher('s3');
    auth = await fetcher.readCertificate(config.auth);

    gaws = new Gaws({
      organizationName: config.organizationName,
      baseUrl: config.baseUrl,
      auth,
      logLevel: <LogLevel>config.logLevel,
    });

    const gradPrograms = await gaws.programs.getAuthorized();
    const gradProgramResponse = <IGradProgram[]>gradPrograms.data;
    const gradProgram = gradProgramResponse[0];
    program = {
      gradProgId: config.testProgramId,
      year: gradProgram.submitted_applications[0].year,
      quarter: gradProgram.submitted_applications[0].quarter,
    };
  });

  test('should get all unsubmitted applications', async () => {
    const applicationResponse = await gaws.unsubmitted.getAll();

    const response = <IUnsubmitted[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('gradprogID');
  });

  test('get applications by program, year, quarter should return many applications type=1', async () => {
    const applicationResponse = await gaws.unsubmitted.getByProgramId(program.gradProgId);

    const response = <IUnsubmitted[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('gradprogID');
  });
});
