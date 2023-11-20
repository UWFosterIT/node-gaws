import { ICertFetcher } from '../src/certFetcher/ICertFetcher.js';
import { Gaws, CertFetcherManager } from '../src/index.js';
import { IGradProgram } from '../src/entities/IGradProgram';
import { IApplication, IProgramOptions } from '../src/entities/IApplication';
import config from './config.js';
import { LogLevel } from '../src/IGawsOptions';

jest.setTimeout(60000);

let fetcher: ICertFetcher;
let auth;
let gaws: Gaws;
let program: IProgramOptions;

let applicationId: number;

describe('Application', () => {
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
      degreeId: config.degreeId,
      year: gradProgram.SubmittedApplications[0].Year,
      quarter: gradProgram.SubmittedApplications[0].Quarter,
    };
  });

  test('get applications by program, year, quarter should return many applications', async () => {
    const applicationResponse = await gaws.applications.getByProgram(program);

    const response = <IApplication[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('Person');

    applicationId = response[0].ApplicationDetail.ApplicationID!;
  });

  // This test requires the applicationId from the previous test.
  test('get application by id', async () => {
    const applicationResponse = await gaws.applications.getById({
      id: applicationId,
    });

    const response = <IApplication>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response).toHaveProperty('Person');
  });
});
