export interface IUnsubmitted {
  id: number;
  appl_user_id: number;
  gradprogID: number;
  firstname?: string;
  lastname?: string;
  PreferredFirstName?: string;
  PreferredMiddleName?: string;
  PreferredLastName?: string;
  LegalFirstName?: string;
  LegalLastName?: string;
  LegalMiddleName?: string;
  email: string;
  appl_year: number;
  appl_qtr: number;
  last_change_date: string;
  last_login_date: string;
  started_date: string;
}
