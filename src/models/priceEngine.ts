import { Company } from './companies';

export class PriceEngine {
    private baseVolatility: number = 0.02;
    private lastMovement: Record<string, number> = {};
    private marketSentiment: number = 0; // Range from -1 (very bearish) to 1 (very bullish)
    private volatilityMultiplier: number = 1;

    constructor(volatility?: number) {
        if (volatility) this.baseVolatility = volatility;
    }

    // Update market sentiment based on news impact
    private updateMarketSentiment(impact: number) {
        this.marketSentiment = Math.max(-1, Math.min(1, this.marketSentiment + impact));
        // Increase volatility when sentiment is extreme
        this.volatilityMultiplier = 1 + Math.abs(this.marketSentiment);
    }

    // Generate random price movement with momentum
    private getRandomMove(ticker: string): number {
        const momentum = this.lastMovement[ticker] || 0;
        const sentimentEffect = this.marketSentiment * 0.01; // Sentiment affects base movement
        const randomComponent = (Math.random() - 0.5) * 2 * this.baseVolatility * this.volatilityMultiplier;
        const momentumComponent = momentum * 0.3; // 30% momentum factor
        const totalMove = randomComponent + momentumComponent + sentimentEffect;
        
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
            company.price = Math.max(newPrice, 0.01); // Prevent total loss but allow penny stocks
            company.priceChange = this.getPriceChange(oldPrice, company.price);
        });
    }

    // Enhanced news impact application with sentiment updates
    public applyNewsImpact(companies: Company[], impact: (companies: Company[]) => void, sentimentImpact: number = 0): void {
        this.updateMarketSentiment(sentimentImpact);
        this.updatePrices(companies);
        impact(companies);
    }

    // Applied to company-specific events like fraud, SEC investigations
    public applyCatastrophicEvent(company: Company, severity: number): void {
        // severity should be between 0 and 1
        const impactPercentage = -0.15 - (severity * 0.35); // -15% to -50% immediate drop
        const oldPrice = company.price;
        company.price = company.price * (1 + impactPercentage);
        company.price = Math.max(company.price, 0.01);
        company.priceChange = this.getPriceChange(oldPrice, company.price);
        
        // Increase volatility for this company
        this.lastMovement[company.name] = impactPercentage * 0.5;
        this.updateMarketSentiment(-0.2); // Major negative events affect overall market sentiment
    }

    // Applied to positive breakthrough events
    public applyBreakthroughEvent(company: Company, magnitude: number): void {
        // magnitude should be between 0 and 1
        const impactPercentage = 0.15 + (magnitude * 0.35); // 15% to 50% immediate rise
        const oldPrice = company.price;
        company.price = company.price * (1 + impactPercentage);
        company.priceChange = this.getPriceChange(oldPrice, company.price);
        
        // Set positive momentum
        this.lastMovement[company.name] = impactPercentage * 0.3;
        this.updateMarketSentiment(0.1); // Major positive events improve market sentiment
    }

    // Get the percentage change in price
    public getPriceChange(oldPrice: number, newPrice: number): number {
        return ((newPrice - oldPrice) / oldPrice) * 100;
    }
}
