export interface IIdOptions {
  id: number,
}

export interface IProgramOptions {
  degreeId: number,
  quarter: number,
  year: number,
}

export interface IApplication {
  ApplicationDetail: ApplicationDetail;
  Person: Person;
}

interface ApplicationDetail {
  ApplicationID: number;
  SlateApplicationReferenceID: string;
  SlateApplicationGUID: string;
  CloneSourceGUID: null;
  ApplicationComplete: string;
  StatusSlate: string;
  ApplicationFee: number;
  SDBApplicationNumber: number;
  ApplicationYear: number;
  ApplicationQuarter: number;
  StatusSDBDate: string;
  StatusSDB: number;
  ApplicationType: string;
  SlatePersonReferenceID: number;
  Class: number;
  Email: string;
  GPAComputed: null;
  GPARecent: number;
  DegreeIDApplication: number;
  DegreeCodeApplication: string;
  ApplicationLastChangeDate: string;
  LastInstitutionCode: string;
  LastInstitutionType: number;
  LastInstitutionAttendedTo: string;
  NCRCode: number;
  AEPRequired: string;
  ClearedToTeach: string;
  Resident: number;
  SDBReject: string;
  SpecialProgram: null;
  ApplicationSubmitDate: string;
  PGEducation1: string;
  PGEducation2: string;
  EnglishRequirementOption: null;
  ECDPaymentTime: null;
  IsConcurrent: boolean;
  FirstGeneration: boolean;
  RequiredSpeaking: null;
  VisaType: null;
  IsVisitingGrad: boolean;
  SlateApplicationURL: string;
  Interests: any[];
  Majors: Major[];
  Recommendations: any[];
  Materials: Material[];
  Questions: any[];
}

interface Major {
  DegreeIndex: number;
  DegreeID: number;
  DegreeCode: string;
  ApplicationDegreeFlag: boolean;
  CampusCode: number;
  CollegeCode: string;
  Major: string;
  Pathway: number;
  DegreeLevel: number;
  DegreeType: number;
  Evening: boolean;
}

interface Material {
  MaterialGUID: string;
  MaterialName: string;
  MaterialContentType: string;
  MaterialFileName: string;
  MaterialViewerURL: string;
  MaterialCreateDate: string;
  MaterialUpdateDate: string;
}

interface Person {
  SlatePersonReferenceID: string;
  OfficialFirstName: string;
  OfficialMiddleName: string;
  OfficialLastName: string;
  PreferredFirstName: string;
  PreferredMiddleName: string;
  PreferredLastName: string;
  Pronouns: string;
  Sex: string;
  GenderOptionDescription: string;
  GenderDescription: null;
  FormerLastName1: null;
  FormerFirstName1: null;
  FormerLastName2: null;
  FormerFirstName2: null;
  Email: string;
  BirthCity: null;
  BirthCountryNameSDB: null;
  CitizenshipCountryNameSDB: string;
  BirthCountryNameGENCShort: null;
  BirthCountryNameISO3166: null;
  CitizenshipCountryNameGENCShort: string;
  CitizenshipCountryNameISO3166: string;
  NativeEnglishSpeaker: boolean;
  USCitizenStatus: string;
  Veteran: number;
  LastChangeDate: string;
  SystemKey: number;
  SSNLast4: string;
  StudentID: null;
  SlatePersonURL: string;
  Contact: Contact;
  Education: Education[];
  Employment: Employment[];
  Tests: Test[];
}

interface Contact {
  Phone: Phone[];
  Address: Address[];
}

interface Address {
  AddressTypeName: string;
  AddressLine1: string;
  AddressLine2: null;
  AddressCity: string;
  AddressRegion: string;
  StateAbbreviation: string;
  AddressCountryNameSDB: string;
  AddressCountryNameGENCShort: string;
  AddressCountryNameISO3166: string;
  AddressZip5: number;
  AddressZip4: number;
  AddressPostalCode: null;
  AddressLastChangeDate: string;
}

interface Phone {
  PhoneRank: number;
  PhoneNumber: string;
  PhoneType: string;
  PhoneLastChangeDate: string;
}

interface Education {
  EducationGUID: string;
  PESCCode: string;
  SDBInstitutionCode: number;
  InstitutionName: string;
  AttendedFromYear: number;
  AttendedFromMonth: number;
  AttendedToYear: number;
  AttendedToMonth: number;
  DegreeEarnedYear: number;
  DegreeEarnedMonth: number;
  Major: string;
  GPAMajor: null;
  GPA: number;
  GPACalculated: null;
  InstitutionLocationRegion: string;
  InstitutionLocation: string;
  InstitutionState: string;
  InstitutionCountryNameSDB: string;
  InstitutionCountryNameISO3166: string;
  InstitutionCountryNameGENCShort: string;
  DegreeType: string;
  DegreeReported: string;
  DegreeTranscriptRequired: null;
  DegreeTranscriptSufficent: null;
  UnofficialTranscriptName: string;
  UnofficialTranscriptDocumentType: string;
  UnofficialTranscriptReceiveDate: string;
  UnofficialTranscriptUpdateDate: string;
  UnofficialTranscriptViewerURL: string;
  OfficialTranscriptName: null;
  OfficialTranscriptDocumentType: null;
  OfficialTranscriptReceiveDate: null;
  OfficialTranscriptUpdateDate: null;
  OfficialTranscriptViewerURL: null;
}

interface Employment {
  EmploymentGUID: string;
  EmployerName: string;
  EmployeeTitle: string;
  EmploymentStartDate: string;
  EmploymentEndDate?: string;
  EmployerCity: string;
  EmployerRegion: string;
  EmployerCountryNameSDB: string;
  EmployerCountryNameISO3166: string;
  EmployerCountryNameGENCShort: string;
  EmploymentPaidType: string;
  EmploymentDescription: string;
  EmploymentTotalHoursInRole: number;
  EmploymentHoursPerWeek: string;
  EmploymentRank: number;
  GeneticCounselingExperience?: any;
}

interface Test {
  TestKey: string;
  SDBTestCode: string;
  SDBTestTypeName: string;
  SlateTestID: string;
  SlateTestName: string;
  SlateTestSubTypeCode: string;
  TestDate: string;
  TestEnteredDate: string;
  Scores: Score[];
}

interface Score {
  TestComponent: string;
  TestScore: number;
  TestPercentile: number;
}
