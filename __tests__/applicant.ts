import { ICertFetcher } from '../src/certFetcher/ICertFetcher.js';
import { Gaws, CertFetcherManager } from '../src/index.js';
import { IApplicant } from '../src/entities/IApplicant';
import { IGradProgram } from '../src/entities/IGradProgram';
import { LogLevel } from '../src/IGawsOptions';
// @ts-ignore
import config from './config.js';

jest.setTimeout(20000);

let fetcher: ICertFetcher;
let auth;
let gaws: Gaws;
let program: {
  gradProgId: number,
  year: number,
  quarter: 1 | 2 | 3 | 4,
};

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
    const gradProgramResponse = <IGradProgram[]>gradPrograms.data;
    const [gradProgram] = gradProgramResponse;
    program = {
      gradProgId: gradProgram.gradprogID,
      year: gradProgram.submitted_applications[0].year,
      quarter: gradProgram.submitted_applications[0].quarter,
    };
  });

  test('Get applicants by program, year, quarter should return many applicants', async () => {
    const applicantResponse = await gaws.applicants.getByProgram(program);

    const response = <IApplicant[]>applicantResponse.data;

    expect(applicantResponse.result).toBe('success');
    expect(response[0]).toHaveProperty('firstname');
  });
});
