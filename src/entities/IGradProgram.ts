export interface IProgram {
  DegreeID: number;
  DegreeCode: string;
  CampusCode: number;
  CollegeCode: string;
  MajorCode: string;
  Pathway: number;
  DegreeLevel: number;
  DegreeType: number;
  SlateProgramMarketingName: string;
  ProgramStatus: string;
  ProgramURL: string;
  SlateProgramURL: string;
  SlateProgramVisitingGradURL: null;
  SlateProgramLastUpdate: string;
  SubmittedApplications: SubmittedApplication[];
}

interface SubmittedApplication {
  Year: number;
  Quarter: number;
  SubmittedCount: number;
  GAWSuri: string;
}
