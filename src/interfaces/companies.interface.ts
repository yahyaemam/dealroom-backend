interface Images {
  '32x32': string;
  '74x74': string;
  '100x100': string;
}
interface IncomeStream {
  id: number;
  name: string;
}
interface Industry {
  id: number;
  name: string;
}
export interface CompanyData {
  uuid: string;
  images: Images;
  income_streams: IncomeStream[];
  industries: Industry[];
  name: string;
  tagline: string;
  total_jobs_available: number;
}
