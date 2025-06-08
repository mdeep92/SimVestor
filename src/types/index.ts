import { Company } from '../models/companies';

export interface HoldingData {
  company: Company;
  shares: number;
  avgBuyPrice: number;
}

export interface Portfolio {
  cash: number;
  holdings: HoldingData[];
}
