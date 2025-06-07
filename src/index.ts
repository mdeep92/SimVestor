// Entry point for Simvestor game app
console.log('Hello, Simvestor!');

// Player class to represent each player
class Player {
    name: string;
    balance: number;

    constructor(name: string, startingBalance: number = 1000) {
        this.name = name;
        this.balance = startingBalance;
    }

    invest(amount: number) {
        if (amount > this.balance) {
            console.log(`${this.name} does not have enough balance to invest.`);
            return false;
        }
        this.balance -= amount;
        console.log(`${this.name} invested $${amount}. Remaining balance: $${this.balance}`);
        return true;
    }

    receive(amount: number) {
        this.balance += amount;
        console.log(`${this.name} received $${amount}. New balance: $${this.balance}`);
    }
}

// Game class to manage the game state
class Game {
    players: Player[];
    round: number;

    constructor(playerNames: string[]) {
        this.players = playerNames.map(name => new Player(name));
        this.round = 1;
    }

    start() {
        console.log('Game started!');
        this.nextRound();
    }

    nextRound() {
        console.log(`\n--- Round ${this.round} ---`);
        this.players.forEach(player => {
            // Example: Each player invests a random amount
            const investAmount = Math.floor(Math.random() * 200) + 1;
            player.invest(investAmount);
        });
        this.round++;
        // Add more game logic here (e.g., simulate returns, check win conditions)
    }
}

// --- MVP Feature: Fictional Companies ---
type Company = {
    name: string;
    price: number;
    roe: number; // Return on Equity
    fcf: number; // Free Cash Flow
};

const companies: Company[] = [
    { name: 'TechNova', price: 100, roe: 0.15, fcf: 500000 },
    { name: 'GreenCore', price: 80, roe: 0.12, fcf: 300000 },
    { name: 'FinEdge', price: 120, roe: 0.18, fcf: 700000 },
    { name: 'HealthPlus', price: 90, roe: 0.10, fcf: 250000 },
];

// --- MVP Feature: Simulated News Feed ---
import { newsDatabase, NewsItem } from './newsDatabase';

// --- MVP Feature: Player Portfolio ---
type PortfolioEntry = {
    company: Company;
    shares: number;
};

class Portfolio {
    entries: PortfolioEntry[] = [];
    cash: number = 1000;

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
