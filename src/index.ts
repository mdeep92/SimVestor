// Entry point for Simvestor game app
import { Company } from './models/companies';
import { newsDatabase } from './newsDatabase';

console.log('Hello, Simvestor!');

// Portfolio and game management code

// --- MVP Feature: Fictional Companies ---
const companies: Company[] = [
    { 
        name: 'TechNova',
        price: 100,
        roe: 0.15,
        fcf: 500000,
        sector: 'Technology',
        marketCap: 5000000,
        peRatio: 20,
        revenue: 1000000,
        profit: 200000,
        roce: 0.18,
        assets: 3000000,
        debt: 1000000,
        debtToEquity: 0.3,
        history: [
            {
                year: 2024,
                revenue: 1000000,
                profit: 200000,
                fcf: 500000,
                pe: 20,
                roi: 0.15,
                roce: 0.18
            },
            {
                year: 2023,
                revenue: 900000,
                profit: 180000,
                fcf: 450000,
                pe: 18,
                roi: 0.14,
                roce: 0.16
            }
        ],
        background: {
            description: "TechNova is a leading innovator in artificial intelligence and cloud computing solutions.",
            founded: 2010,
            headquarters: "Silicon Valley, CA",
            employees: 500,
            keyProducts: ["AI Platform", "Cloud Services", "Enterprise Solutions"],
            competitors: ["CloudPeak", "ByteWorks", "DataFlow"],
            management: {
                ceo: "Sarah Chen",
                cfo: "Michael Roberts"
            }
        }
    },
    // Add other companies with the same structure...
];

// --- MVP Feature: Simulated News Feed ---

// --- MVP Feature: Player Portfolio ---
type PortfolioEntry = {
    company: Company;
    shares: number;
};

class Portfolio {
    entries: PortfolioEntry[] = [];
    cash: number = 10000;

    buy(company: Company, shares: number) {
        const cost = company.price * shares;
        if (cost > this.cash) {
            console.log('Not enough cash to buy.');
            return false;
        }
        this.cash -= cost;
        let entry = this.entries.find(e => e.company.name === company.name);
        if (!entry) {
            entry = { company, shares: 0 };
            this.entries.push(entry);
        }
        entry.shares += shares;
        console.log(`Bought ${shares} shares of ${company.name}.`);
        return true;
    }

    sell(company: Company, shares: number) {
        let entry = this.entries.find(e => e.company.name === company.name);
        if (!entry || entry.shares < shares) {
            console.log('Not enough shares to sell.');
            return false;
        }
        entry.shares -= shares;
        this.cash += company.price * shares;
        console.log(`Sold ${shares} shares of ${company.name}.`);
        return true;
    }

    dashboard() {
        console.log('\n--- Portfolio Dashboard ---');
        this.entries.forEach(e => {
            if (e.shares > 0) {
                console.log(`${e.company.name}: ${e.shares} shares @ $${e.company.price} each`);
            }
        });
        console.log(`Cash: $${this.cash}`);
    }
}

// --- MVP Feature: Navigation & Time Advancement ---
class SimvestorGame {
    portfolio: Portfolio;
    week: number;
    newsHistory: string[];

    constructor() {
        this.portfolio = new Portfolio();
        this.week = 1;
        this.newsHistory = [];
    }

    showMarket() {
        console.log('\n--- Market ---');
        companies.forEach((c, i) => {
            console.log(`${i + 1}. ${c.name} | Price: $${c.price} | ROE: ${c.roe * 100}% | FCF: $${c.fcf}`);
        });
    }

    showNews() {
        console.log('\n--- News Feed ---');
        this.newsHistory.forEach((headline, i) => {
            console.log(`Week ${i + 1}: ${headline}`);
        });
    }

    advanceWeek() {
        // Pick a random news event from the database
        const news = newsDatabase[Math.floor(Math.random() * newsDatabase.length)];
        news.impact(companies);
        this.newsHistory.push(news.headline);
        this.week++;
        console.log(`\n[Week ${this.week}] News: ${news.headline}`);
    }
}

import inquirer from 'inquirer';

async function mainMenu(game: SimvestorGame) {
    let exit = false;
    while (!exit) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: [
                    'View Market',
                    'View News',
                    'View Portfolio',
                    'Buy Stock',
                    'Sell Stock',
                    'Advance 1 Week',
                    'Exit'
                ]
            }
        ]);

        switch (action) {
            case 'View Market':
                game.showMarket();
                break;
            case 'View News':
                game.showNews();
                break;
            case 'View Portfolio':
                game.portfolio.dashboard();
                break;
            case 'Buy Stock':
                await buyStockPrompt(game);
                break;
            case 'Sell Stock':
                await sellStockPrompt(game);
                break;
            case 'Advance 1 Week':
                game.advanceWeek();
                break;
            case 'Exit':
                exit = true;
                break;
        }
    }
    console.log('Thanks for playing Simvestor!');
}

async function buyStockPrompt(game: SimvestorGame) {
    const { companyIdx, shares } = await inquirer.prompt([
        {
            type: 'list',
            name: 'companyIdx',
            message: 'Select a company to buy:',
            choices: companies.map((c, i) => ({ name: `${c.name} ($${c.price})`, value: i }))
        },
        {
            type: 'input',
            name: 'shares',
            message: 'How many shares?',
            validate: (input: string) => !isNaN(Number(input)) && Number(input) > 0 ? true : 'Enter a valid number of shares.'
        }
    ]);
    game.portfolio.buy(companies[companyIdx], Number(shares));
}

async function sellStockPrompt(game: SimvestorGame) {
    const owned = game.portfolio.entries.filter(e => e.shares > 0);
    if (owned.length === 0) {
        console.log('You do not own any shares to sell.');
        return;
    }
    const { companyIdx, shares } = await inquirer.prompt([
        {
            type: 'list',
            name: 'companyIdx',
            message: 'Select a company to sell:',
            choices: owned.map((e, i) => ({ name: `${e.company.name} (${e.shares} shares)`, value: i }))
        },
        {
            type: 'input',
            name: 'shares',
            message: 'How many shares?',
            validate: (input: string) => !isNaN(Number(input)) && Number(input) > 0 ? true : 'Enter a valid number of shares.'
        }
    ]);
    const entry = owned[companyIdx];
    game.portfolio.sell(entry.company, Number(shares));
}

// Start the interactive game
mainMenu(new SimvestorGame());
