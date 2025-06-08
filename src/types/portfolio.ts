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

export interface PortfolioViewProps {
  portfolio: Portfolio;
  setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>;
}

export interface MarketViewProps {
  companies: Company[];
  portfolio: Portfolio;
  setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>;
}

export interface ReturnsViewProps {
  portfolio: Portfolio;
  weeklyReturns: { week: number; value: number }[];
}

export interface QuarterlyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekNumber: number;
  portfolioValueStart: number;
  portfolioValueEnd: number;
  holdings: HoldingData[];
}
