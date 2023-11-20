export interface IUnsubmitted {
  Application: Application;
  Person: Person;
}

interface Application {
  ApplicationID: number;
  SlateApplicationReferenceID: string;
  SlateApplicationGUID: string;
  CloneSourceGUID: null;
  ApplicationYear: number;
  ApplicationQuarter: number;
  ApplicationType: string;
  SlatePersonReferenceID: number;
  Email: string;
  DegreeIDApplication: number;
  DegreeCodeApplication: string;
  ApplicationLastChangeDate: string;
  ApplicationSubmitDate: null;
  IsVisitingGrad: boolean;
  ApplicationStartDate: string;
}

interface Person {
  OfficialFirstName: string;
  OfficialMiddleName: null;
  OfficialLastName: string;
  PreferredFirstName: string;
  PreferredMiddleName: null;
  PreferredLastName: string;
  LastChangeDate: string;
}
