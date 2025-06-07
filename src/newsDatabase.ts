// src/newsDatabase.ts

import { Company, Sector } from './models/companies';

export type NewsItem = {
    headline: string;
    impact: (companies: Company[]) => void;
    sector?: Sector;
};

// Utility function to impact sector stocks
const impactSector = (companies: Company[], sector: Sector, percentage: number) => {
    companies
        .filter(c => c.sector === sector)
        .forEach(c => {
            c.price = c.price * (1 + percentage);
        });
};

export const newsDatabase: NewsItem[] = [
    // Technology Sector News
    {
        headline: 'New AI breakthrough boosts tech sector!',
        impact: (companies) => impactSector(companies, 'Technology', 0.08),
        sector: 'Technology'
    },
    {
        headline: 'Global chip shortage affects tech companies',
        impact: (companies) => impactSector(companies, 'Technology', -0.06),
        sector: 'Technology'
    },
    {
        headline: 'Major cybersecurity concerns hit tech stocks',
        impact: (companies) => impactSector(companies, 'Technology', -0.09),
        sector: 'Technology'
    },

    // Healthcare Sector News
    {
        headline: 'Breakthrough in medical research boosts healthcare stocks',
        impact: (companies) => impactSector(companies, 'Healthcare', 0.07),
        sector: 'Healthcare'
    },
    {
        headline: 'Healthcare policy changes impact sector',
        impact: (companies) => impactSector(companies, 'Healthcare', -0.05),
        sector: 'Healthcare'
    },
    {
        headline: 'New pandemic concerns affect healthcare stocks',
        impact: (companies) => impactSector(companies, 'Healthcare', 0.12),
        sector: 'Healthcare'
    },

    // Finance Sector News
    {
        headline: 'Interest rate hike benefits financial sector',
        impact: (companies) => impactSector(companies, 'Finance', 0.06),
        sector: 'Finance'
    },
    {
        headline: 'Banking regulations tighten globally',
        impact: (companies) => impactSector(companies, 'Finance', -0.04),
        sector: 'Finance'
    },

    // Energy Sector News
    {
        headline: 'Renewable energy breakthrough boosts green stocks',
        impact: (companies) => impactSector(companies, 'Energy', 0.09),
        sector: 'Energy'
    },
    {
        headline: 'Oil price volatility affects energy sector',
        impact: (companies) => impactSector(companies, 'Energy', -0.07),
        sector: 'Energy'
    },

    // Consumer Sector News
    {
        headline: 'Strong holiday sales boost retail stocks',
        impact: (companies) => impactSector(companies, 'Consumer', 0.05),
        sector: 'Consumer'
    },
    {
        headline: 'Consumer confidence drops sharply',
        impact: (companies) => impactSector(companies, 'Consumer', -0.06),
        sector: 'Consumer'
    },

    // Industrial Sector News
    {
        headline: 'Manufacturing activity surges',
        impact: (companies) => impactSector(companies, 'Industrial', 0.07),
        sector: 'Industrial'
    },
    {
        headline: 'Supply chain issues hit industrial sector',
        impact: (companies) => impactSector(companies, 'Industrial', -0.05),
        sector: 'Industrial'
    },

    // Market-wide News
    {
        headline: 'Market optimism boosts all stocks',
        impact: (companies) => companies.forEach(c => c.price *= 1.03)
    },
    {
        headline: 'Economic recession fears hit market',
        impact: (companies) => companies.forEach(c => c.price *= 0.95)
    },
    {
        headline: 'Global trade tensions impact markets',
        impact: (companies) => companies.forEach(c => c.price *= 0.97)
    }
];
