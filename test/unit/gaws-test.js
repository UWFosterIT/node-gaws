/* eslint no-undef: "off" */
require('../setup/');
const {inspect} = require('util');

describe('Graduate Applicant Web Service', function () {

  let programId = 0;
  let year = 0;
  let quarter = 0;
  let totalApps = 0;
  let application = {};

  beforeEach(async () => {
    await uwgaws.initialize(config);
  });


  describe('Programs - Get Authorized', () => {
    it('Should return a list of programs authorized to the cert used', async () => {
      let gradPrograms = await uwgaws.programs.getAuthorized();
      expect(gradPrograms.statusCode).to.equal(200);
      expect(gradPrograms.data.length).to.be.above(0);
    });
  });

  describe('Applicants - Get by program id', () => {
    it('should return all the applicants for a given P-Y-Q ', async () => {
      let gradPrograms = await uwgaws.programs.getAuthorized();
      if (gradPrograms.statusCode === 200 && gradPrograms.data.length > 0) {
        // SHORT CUT - This test assumes that the first program returned will have at least one
        // application. It's entirely possible that you are running this test at just the wrong
        // time and there are no applications in the first program. In which case you will
        // have  to rewrite this to loop through the data instead of grabbing the first entry. Sorry. =(
        programId = gradPrograms.data[0].gradprogID;
        year = gradPrograms.data[0].submitted_applications[0].year;
        quarter = gradPrograms.data[0].submitted_applications[0].quarter;
        totalApps = gradPrograms.data[0].submitted_applications[0].total_applications;
        let options = {
          gradProgId: programId,
          quarter:    quarter,
          year:       year
        };
        let applicants = await uwgaws.applicants.getByProgram(options);
        expect(applicants.statusCode).to.equal(200);
        expect(applicants.data.length).to.equal(totalApps);
        application = applicants.data[0];
      }
    });
  });

  describe('Applications - Get By Id', () => {
    it('Should return a full application went sent a valid application Id', async () => {
      let app = await uwgaws.applications.getById({id: application.id});
      expect(app.statusCode).to.equal(200);
      expect(app.data.id).to.equal(application.id);
      expect(app.data.gradprogID).to.equal(programId);
    });
  });

  describe('Applications - Get By Program', () => {
    it('Should return a list of full applications', async () => {
      let options = {
        gradProgId: programId,
        quarter:    quarter,
        year:       year
      };
      let apps = await uwgaws.applications.getByProgram(options);
      expect(apps.statusCode).to.equal(200);
      expect(apps.data.length).to.equal(totalApps);
    });
  });

  describe('Applications - Get XML By Program', () => {
    it('Should return a list of full applications as XML', async () => {
      let options = {
        format:     'xml',
        gradProgId: programId,
        quarter:    quarter,
        year:       year
      };
      let apps = await uwgaws.applications.getByProgram(options);
      expect(apps.data).to.contain('xmlns:i="http://www.w3.org/2001/XMLSchema-instance"');
    });
  });

});
