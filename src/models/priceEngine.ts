import { Company } from './companies';

export class PriceEngine {
    // Base volatility for random price movements (2% default)
    private baseVolatility: number = 0.02;
    
    // Random walk with momentum
    private lastMovement: Record<string, number> = {};

    constructor(volatility?: number) {
        if (volatility) this.baseVolatility = volatility;
    }

    // Generate random price movement with momentum
    private getRandomMove(ticker: string): number {
        const momentum = this.lastMovement[ticker] || 0;
        const randomComponent = (Math.random() - 0.5) * 2 * this.baseVolatility;
        const momentumComponent = momentum * 0.3; // 30% momentum factor
        const totalMove = randomComponent + momentumComponent;
        
        // Store this movement for next time's momentum
        this.lastMovement[ticker] = totalMove;
        
        return totalMove;
    }

    // Update prices for all companies
    public updatePrices(companies: Company[]): void {
        companies.forEach(company => {
            const oldPrice = company.price;
            const priceMove = this.getRandomMove(company.name);
            const newPrice = company.price * (1 + priceMove);
            company.price = Math.max(newPrice, 1); // Prevent prices from going below 1
            company.priceChange = this.getPriceChange(oldPrice, company.price);
        });
    }

    // Apply news impact on top of random movements
    public applyNewsImpact(companies: Company[], impact: (companies: Company[]) => void): void {
        // First apply random movements
        this.updatePrices(companies);
        // Then apply news impact
        impact(companies);
    }

    // Get the percentage change in price
    public getPriceChange(oldPrice: number, newPrice: number): number {
        return ((newPrice - oldPrice) / oldPrice) * 100;
    }
}
