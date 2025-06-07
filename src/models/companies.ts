export type Sector = 'Technology' | 'Healthcare' | 'Finance' | 'Energy' | 'Consumer' | 'Industrial';

export type Company = {
    name: string;
    price: number;
    roe: number;
    fcf: number;
    sector: Sector;
    priceChange?: number;
};

export const companies: Company[] = [
    // Technology Sector
    { name: 'TechNova', price: 100, roe: 0.15, fcf: 500000, sector: 'Technology' },
    { name: 'ByteWorks', price: 85, roe: 0.12, fcf: 320000, sector: 'Technology' },
    { name: 'CloudPeak', price: 150, roe: 0.18, fcf: 800000, sector: 'Technology' },
    { name: 'DataFlow', price: 95, roe: 0.14, fcf: 420000, sector: 'Technology' },

    // Healthcare Sector
    { name: 'HealthPlus', price: 90, roe: 0.10, fcf: 250000, sector: 'Healthcare' },
    { name: 'MediTech', price: 110, roe: 0.13, fcf: 380000, sector: 'Healthcare' },
    { name: 'BioCore', price: 75, roe: 0.09, fcf: 200000, sector: 'Healthcare' },
    { name: 'VitalCare', price: 130, roe: 0.16, fcf: 550000, sector: 'Healthcare' },

    // Finance Sector
    { name: 'FinEdge', price: 120, roe: 0.18, fcf: 700000, sector: 'Finance' },
    { name: 'WealthWise', price: 95, roe: 0.15, fcf: 450000, sector: 'Finance' },
    { name: 'SecureBank', price: 140, roe: 0.17, fcf: 850000, sector: 'Finance' },
    { name: 'InvestPro', price: 88, roe: 0.14, fcf: 380000, sector: 'Finance' },

    // Energy Sector
    { name: 'GreenCore', price: 80, roe: 0.12, fcf: 300000, sector: 'Energy' },
    { name: 'SolarFlow', price: 70, roe: 0.11, fcf: 250000, sector: 'Energy' },
    { name: 'WindTech', price: 65, roe: 0.09, fcf: 180000, sector: 'Energy' },

    // Consumer Sector
    { name: 'ConsumerFirst', price: 92, roe: 0.13, fcf: 420000, sector: 'Consumer' },
    { name: 'RetailPro', price: 78, roe: 0.11, fcf: 290000, sector: 'Consumer' },
    { name: 'BrandMaster', price: 105, roe: 0.15, fcf: 480000, sector: 'Consumer' },

    // Industrial Sector
    { name: 'IndusTech', price: 115, roe: 0.16, fcf: 520000, sector: 'Industrial' },
    { name: 'ManufactEx', price: 98, roe: 0.14, fcf: 440000, sector: 'Industrial' }
];
