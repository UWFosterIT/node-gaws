export interface IApplicant {
  ApplicationDetail: ApplicationDetail;
  PersonDetail: PersonDetail;
}

interface PersonDetail {
  OfficialFirstName: string;
  OfficialLastName: string;
  PreferredFirstName: string;
  PreferredLastName: string;
  SystemKey: number;
  StudentID?: any;
  SlatePersonURL: string;
}

interface ApplicationDetail {
  ApplicationID: number;
  SlateApplicationReferenceID: string;
  SlateApplicationGUID: string;
  SlatePersonReferenceID: string;
  CloneSourceGUID?: any;
  StatusSlate: string;
  StatusSDB: number;
  SDBApplicationNumber: number;
  ApplicationYear: number;
  ApplicationQuarter: number;
  DegreeIDApplication: number;
  DegreeCodeApplication: string;
  ApplicationLastChangeDate: string;
  IsVisitingGrad: boolean;
  SlateApplicationURL: string;
  SlateReaderURL: string;
  GAWSApplicationURL: string;
  ECDPaymentTime?: any;
  OperationalReviewNotes?: any;
  Interests: any[];
}
