// src/newsDatabase.ts

export type NewsItem = {
    headline: string;
    impact: (companies: any[]) => void;
};

// Example news database (expand as needed)
export const newsDatabase: NewsItem[] = [
    {
        headline: 'TechNova launches breakthrough AI chip!',
        impact: (companies) => { companies[0].price += 10; }
    },
    {
        headline: 'GreenCore faces regulatory hurdles.',
        impact: (companies) => { companies[1].price -= 8; }
    },
    {
        headline: 'FinEdge reports record profits.',
        impact: (companies) => { companies[2].price += 12; }
    },
    {
        headline: 'HealthPlus recalls product line.',
        impact: (companies) => { companies[3].price -= 7; }
    },
    // Add more news items here for a richer game experience
    {
        headline: 'Market optimism boosts all stocks.',
        impact: (companies) => { companies.forEach(c => c.price += 5); }
    },
    {
        headline: 'Economic downturn hits tech sector.',
        impact: (companies) => { companies[0].price -= 15; }
    },
    {
        headline: 'GreenCore wins sustainability award.',
        impact: (companies) => { companies[1].price += 10; }
    },
    {
        headline: 'FinEdge faces fraud investigation.',
        impact: (companies) => { companies[2].price -= 20; }
    },
    {
        headline: 'HealthPlus develops new vaccine.',
        impact: (companies) => { companies[3].price += 14; }
    }
];
