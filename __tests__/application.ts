import { ICertFetcher } from '../src/certFetcher/ICertFetcher.js';
import { Gaws, CertFetcherManager } from '../src/index.js';
import { IGradProgram } from '../src/entities/IGradProgram';
import { IApplication } from '../src/entities/IApplication';
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
      gradProgId: config.testProgramId,
      year: gradProgram.submitted_applications[0].year,
      quarter: gradProgram.submitted_applications[0].quarter,
    };
  });

  test('get applications by program, year, quarter should return many applications type=1', async () => {
    const applicationResponse = await gaws.applications.getByProgram(program);

    const response = <IApplication[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('user');

    applicationId = response[0].id!;
  });

  test('slow get applications by program, year, quarter should return many applications: no type', async () => {
    const applicationResponse = await gaws.applications.getByProgramSlow(program);

    const response = <IApplication[]>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('user');

    delete program.type;

    applicationId = response[0].id!;
  });

  test('get application by id type=1', async () => {
    const applicationResponse = await gaws.applications.getById({
      id: applicationId,
    });

    const response = <IApplication>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response).toHaveProperty('user');
  });

  test('slow get application by id: no type', async () => {
    const applicationResponse = await gaws.applications.getByIdSlow({
      id: applicationId,
    });

    const response = <IApplication>applicationResponse.data;

    expect(applicationResponse.result).toBe('success');
    expect(response).toHaveProperty('user');
  });
});
