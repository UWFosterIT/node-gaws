import { ICertFetcher } from '../src/certFetcher/ICertFetcher.js';
import { Gaws, CertFetcherManager } from '../src/index.js';
import { IProgram } from '../src/entities/IProgram';
import { IUnsubmitted } from '../src/entities/IUnsubmitted';
import config from './config.js';
import { LogLevel } from '../src/IGawsOptions';
import { IProgramOptions } from '../src/entities/IApplication.js';

jest.setTimeout(20000);

let fetcher: ICertFetcher;
let auth;
let gaws: Gaws;
let program: IProgramOptions;

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
    const gradProgramResponse = <IProgram[]>gradPrograms.data;
    const gradProgram = gradProgramResponse[0];
    program = {
      degreeId: config.degreeId,
      year: gradProgram.SubmittedApplications[0].Year,
      quarter: gradProgram.SubmittedApplications[0].Quarter,
    };
  });

  test('should get all unsubmitted applications', async () => {
    const applicationResponse = await gaws.unsubmitted.getAll();

    const response = <IUnsubmitted[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0].Person).toHaveProperty('OfficialFirstName');
    expect(response.length > 0).toBe(true);
  });

  test('get applications by program id should return many applications', async () => {
    const applicationResponse = await gaws.unsubmitted.getByProgramId(program.degreeId);

    const response = <IUnsubmitted[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0].Application).toHaveProperty('DegreeCodeApplication');
    expect(response.length > 0).toBe(true);
  });

  test('get by programQuarter should return many applications', async () => {
    const applicationResponse = await gaws.unsubmitted.getByProgramQuarter(program);

    const response = <IUnsubmitted[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0].Application).toHaveProperty('DegreeCodeApplication');
    expect(response.length > 0).toBe(true);
  });
});
