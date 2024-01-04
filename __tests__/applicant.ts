import { ICertFetcher } from '../src/certFetcher/ICertFetcher.js';
import { Gaws, CertFetcherManager } from '../src/index.js';
import { IApplicant } from '../src/entities/IApplicant';
import { IProgram } from '../src/entities/IProgram';
import { LogLevel } from '../src/IGawsOptions';
import config from './config.js';
import { IProgramOptions } from '../src/entities/IApplication.js';

jest.setTimeout(20000);

let fetcher: ICertFetcher;
let auth;
let gaws: Gaws;
let program: IProgramOptions;

describe('Applicant', () => {
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
    const [gradProgram] = gradProgramResponse;
    program = {
      degreeId: gradProgram.DegreeID,
      year: gradProgram.SubmittedApplications[0].Year,
      quarter: gradProgram.SubmittedApplications[0].Quarter,
    };
  });

  test('Get applicants by program, year, quarter should return many applicants', async () => {
    const applicantResponse = await gaws.applicants.getByProgram(program);

    const response = <IApplicant[]>applicantResponse.data;

    expect(applicantResponse.result).toBe('success');
    expect(response[0].PersonDetail).toHaveProperty('OfficialFirstName');
  });
});
