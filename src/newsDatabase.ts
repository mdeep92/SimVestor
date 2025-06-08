// src/newsDatabase.ts

import { Company, Sector } from './models/companies';
import { PriceEngine } from './models/priceEngine';

export type NewsItem = {
    headline: string;
    impact: (companies: Company[]) => void;
    sector?: Sector;
};

// Utility functions for more complex market behaviors
const impactSectorWithVolatility = (
    companies: Company[],
    sector: Sector,
    basePercentage: number,
    volatility: number
) => {
    companies
        .filter(c => c.sector === sector)
        .forEach(c => {
            const randomVariation = (Math.random() - 0.5) * volatility;
            const totalImpact = basePercentage + randomVariation;
            c.price = c.price * (1 + totalImpact);
            c.priceChange = totalImpact * 100;
        });
};

const impactRelatedSectors = (
    companies: Company[],
    primarySector: Sector,
    primaryImpact: number,
    relatedSectors: Sector[],
    relatedImpact: number
) => {
    // Primary sector impact
    impactSectorWithVolatility(companies, primarySector, primaryImpact, 0.02);
    
    // Related sectors impact
    relatedSectors.forEach(sector => {
        impactSectorWithVolatility(companies, sector, relatedImpact, 0.01);
    });
};

const marketWideImpact = (
    companies: Company[],
    basePercentage: number,
    volatility: number
) => {
    companies.forEach(c => {
        const randomVariation = (Math.random() - 0.5) * volatility;
        const totalImpact = basePercentage + randomVariation;
        c.price = c.price * (1 + totalImpact);
        c.priceChange = totalImpact * 100;
    });
};

// Major Event Impact Functions
const applyCorporateScandal = (
    companies: Company[],
    targetCompany: string,
    severity: number,
    relatedSectorImpact: number,
    engine: PriceEngine
) => {
    const company = companies.find(c => c.name === targetCompany);
    if (company) {
        engine.applyCatastrophicEvent(company, severity);
        // Impact other companies in the same sector
        companies
            .filter(c => c.sector === company.sector && c.name !== company.name)
            .forEach(c => {
                c.price = c.price * (1 + relatedSectorImpact);
                c.priceChange = relatedSectorImpact * 100;
            });
    }
};

const applyMergerAcquisition = (
    companies: Company[],
    targetCompany: string,
    magnitude: number,
    engine: PriceEngine
) => {
    const company = companies.find(c => c.name === targetCompany);
    if (company) {
        engine.applyBreakthroughEvent(company, magnitude);
    }
};

export const newsDatabase: NewsItem[] = [
    // Technology Sector News
    {
        headline: 'Revolutionary AI Model Breakthrough Sparks Tech Rally',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Technology',
            0.12,
            ['Finance', 'Industrial'],
            0.04
        ),
        sector: 'Technology'
    },
    {
        headline: 'Global Semiconductor Shortage Worsens',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Technology',
            -0.09,
            ['Industrial', 'Consumer'],
            -0.03
        ),
        sector: 'Technology'
    },
    {
        headline: 'Major Tech Companies Announce Layoffs Amid Economic Concerns',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Technology',
            -0.08,
            ['Finance'],
            -0.03
        ),
        sector: 'Technology'
    },
    {
        headline: 'Quantum Computing Breakthrough Promises Industry Revolution',
        impact: (companies) => impactSectorWithVolatility(
            companies,
            'Technology',
            0.15,
            0.05
        ),
        sector: 'Technology'
    },

    // Healthcare Sector News
    {
        headline: 'FDA Approves Revolutionary Cancer Treatment',
        impact: (companies) => impactSectorWithVolatility(
            companies,
            'Healthcare',
            0.14,
            0.04
        ),
        sector: 'Healthcare'
    },
    {
        headline: 'Healthcare Reform Bill Faces Uncertain Future',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Healthcare',
            -0.07,
            ['Finance', 'Consumer'],
            -0.02
        ),
        sector: 'Healthcare'
    },
    {
        headline: 'AI-Powered Drug Discovery Platform Shows Promise',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Healthcare',
            0.09,
            ['Technology'],
            0.04
        ),
        sector: 'Healthcare'
    },

    // Finance Sector News
    {
        headline: 'Federal Reserve Announces Surprise Interest Rate Hike',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Finance',
            0.08,
            ['Consumer', 'Industrial'],
            -0.03
        ),
        sector: 'Finance'
    },
    {
        headline: 'Major Bank Reports Record Profits',
        impact: (companies) => impactSectorWithVolatility(
            companies,
            'Finance',
            0.11,
            0.03
        ),
        sector: 'Finance'
    },
    {
        headline: 'Cryptocurrency Market Crash Affects Traditional Finance',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Finance',
            -0.06,
            ['Technology'],
            -0.02
        ),
        sector: 'Finance'
    },

    // Energy Sector News
    {
        headline: 'Breakthrough in Solar Energy Efficiency',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Energy',
            0.13,
            ['Technology', 'Industrial'],
            0.04
        ),
        sector: 'Energy'
    },
    {
        headline: 'OPEC Announces Production Cuts',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Energy',
            0.09,
            ['Industrial', 'Consumer'],
            -0.03
        ),
        sector: 'Energy'
    },
    {
        headline: 'New Battery Technology Revolution',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Energy',
            0.11,
            ['Technology', 'Consumer'],
            0.05
        ),
        sector: 'Energy'
    },

    // Market-Wide Events
    {
        headline: 'Global Economic Recovery Exceeds Expectations',
        impact: (companies) => marketWideImpact(companies, 0.05, 0.02)
    },
    {
        headline: 'Inflation Data Sparks Market-Wide Concerns',
        impact: (companies) => marketWideImpact(companies, -0.04, 0.02)
    },
    {
        headline: 'Trade Tensions Escalate Between Major Economies',
        impact: (companies) => marketWideImpact(companies, -0.06, 0.03)
    },

    // Consumer Sector News
    {
        headline: 'E-commerce Sales Hit Record Numbers',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Consumer',
            0.08,
            ['Technology', 'Industrial'],
            0.03
        ),
        sector: 'Consumer'
    },
    {
        headline: 'Supply Chain Innovation Boosts Retail Efficiency',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Consumer',
            0.06,
            ['Technology', 'Industrial'],
            0.02
        ),
        sector: 'Consumer'
    },

    // Industrial Sector News
    {
        headline: 'Automation Breakthrough in Manufacturing',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Industrial',
            0.10,
            ['Technology', 'Energy'],
            0.04
        ),
        sector: 'Industrial'
    },
    {
        headline: 'Global Logistics Disruption Impacts Production',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Industrial',
            -0.07,
            ['Consumer', 'Energy'],
            -0.03
        ),
        sector: 'Industrial'
    },

    // Unexpected Events
    {
        headline: 'Major Tech Security Breach Sends Shockwaves',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Technology',
            -0.15,
            ['Finance', 'Consumer'],
            -0.05
        ),
        sector: 'Technology'
    },
    {
        headline: 'Revolutionary Green Energy Breakthrough',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Energy',
            0.18,
            ['Technology', 'Industrial'],
            0.06
        ),
        sector: 'Energy'
    },

    // Economic Indicators
    {
        headline: 'GDP Growth Surpasses Expectations',
        impact: (companies) => marketWideImpact(companies, 0.04, 0.02)
    },
    {
        headline: 'Employment Data Shows Strong Job Market',
        impact: (companies) => marketWideImpact(companies, 0.03, 0.01)
    },

    // Regulatory News
    {
        headline: 'New Tech Regulations Impact Big Tech',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Technology',
            -0.08,
            ['Finance', 'Consumer'],
            -0.02
        ),
        sector: 'Technology'
    },
    {
        headline: 'Financial Sector Reforms Announced',
        impact: (companies) => impactRelatedSectors(
            companies,
            'Finance',
            -0.05,
            ['Technology', 'Consumer'],
            -0.02
        ),
        sector: 'Finance'
    },

    // Major Corporate Events
    {
        headline: 'SEC Launches Investigation into TechGiant Financial Practices',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyCorporateScandal(companies, 'TechGiant', 0.8, -0.05, engine);
        },
        sector: 'Technology'
    },
    {
        headline: 'HealthPlus CEO Resigns Amid Accounting Fraud Allegations',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyCorporateScandal(companies, 'HealthPlus', 0.9, -0.07, engine);
        },
        sector: 'Healthcare'
    },
    {
        headline: 'MegaBank Faces Criminal Investigation for Market Manipulation',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyCorporateScandal(companies, 'MegaBank', 0.85, -0.08, engine);
        },
        sector: 'Finance'
    },
    {
        headline: 'EnergyCorp Whistleblower Reveals Environmental Violations',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyCorporateScandal(companies, 'EnergyCorp', 0.75, -0.06, engine);
        },
        sector: 'Energy'
    },
    {
        headline: 'TechGiant Announces Revolutionary AI Assistant Launch',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyMergerAcquisition(companies, 'TechGiant', 0.9, engine);
            impactRelatedSectors(companies, 'Technology', 0.15, ['Consumer', 'Finance'], 0.05);
        },
        sector: 'Technology'
    },
    {
        headline: 'MegaBank to Acquire Major Fintech Startup',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyMergerAcquisition(companies, 'MegaBank', 0.7, engine);
            impactRelatedSectors(companies, 'Finance', 0.12, ['Technology'], 0.04);
        },
        sector: 'Finance'
    },
    {
        headline: 'HealthPlus Breakthrough: Cancer Treatment Patent Approved',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyMergerAcquisition(companies, 'HealthPlus', 0.85, engine);
            impactSectorWithVolatility(companies, 'Healthcare', 0.2, 0.05);
        },
        sector: 'Healthcare'
    },
    {
        headline: 'EnergyCorp Nuclear Fusion Success: Energy Sector Revolution',
        impact: (companies) => {
            const engine = new PriceEngine();
            applyMergerAcquisition(companies, 'EnergyCorp', 0.95, engine);
            impactRelatedSectors(companies, 'Energy', 0.25, ['Technology', 'Industrial'], 0.08);
        },
        sector: 'Energy'
    }

] satisfies NewsItem[];
