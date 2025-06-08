export type Sector = 'Technology' | 'Healthcare' | 'Finance' | 'Energy' | 'Consumer' | 'Industrial';

export interface FinancialHistory {
  year: number;
  revenue: number;
  profit: number;
  fcf: number;
  pe: number;
  roi: number;
  roce: number;
}

export interface CompanyBackground {
  description: string;
  founded: number;
  headquarters: string;
  employees: number;
  keyProducts: string[];
  competitors: string[];
  management: {
    ceo: string;
    cfo: string;
  };
}

export type Company = {
  name: string;
  price: number;
  roe: number;
  fcf: number;
  sector: Sector;
  priceChange?: number;
  marketCap: number;
  peRatio: number;
  revenue: number;
  profit: number;
  roce: number;
  assets: number;
  debt: number;
  debtToEquity: number;
  history: FinancialHistory[];
  background: CompanyBackground;
  employees?: number;
  yearFounded?: number;
};

export const companies: Company[] = [
    // Technology Sector
    {
        name: 'TechNova',
        price: 100,
        roe: 0.15,
        fcf: 500000,
        sector: 'Technology',
        marketCap: 50000000000,
        peRatio: 25,
        revenue: 12000000000,
        profit: 3000000000,
        roce: 0.18,
        assets: 60000000000,
        debt: 18000000000,
        debtToEquity: 0.3,
        history: [
            {
                year: 2024,
                revenue: 12000000000,
                profit: 3000000000,
                fcf: 500000,
                pe: 25,
                roi: 0.15,
                roce: 0.18
            },
            {
                year: 2023,
                revenue: 10000000000,
                profit: 2500000000,
                fcf: 450000,
                pe: 22,
                roi: 0.14,
                roce: 0.16
            }
        ],
        background: {
            description: "TechNova is a leading innovator in artificial intelligence and cloud computing solutions.",
            founded: 2010,
            headquarters: "Silicon Valley, CA",
            employees: 15000,
            keyProducts: ["AI Platform", "Cloud Services", "Enterprise Solutions"],
            competitors: ["CloudPeak", "ByteWorks", "DataFlow"],
            management: {
                ceo: "Sarah Chen",
                cfo: "Michael Roberts"
            }
        }
    },
    {
        name: 'ByteWorks',
        price: 85,
        roe: 0.12,
        fcf: 320000,
        sector: 'Technology',
        marketCap: 30000000000,
        peRatio: 22,
        revenue: 8000000000,
        profit: 2000000000,
        roce: 0.15,
        assets: 40000000000,
        debt: 10000000000,
        debtToEquity: 0.25,
        history: [
            {
                year: 2024,
                revenue: 8000000000,
                profit: 2000000000,
                fcf: 320000,
                pe: 22,
                roi: 0.12,
                roce: 0.15
            },
            {
                year: 2023,
                revenue: 7000000000,
                profit: 1800000000,
                fcf: 300000,
                pe: 20,
                roi: 0.11,
                roce: 0.14
            }
        ],
        background: {
            description: "ByteWorks specializes in enterprise software solutions and cybersecurity.",
            founded: 2012,
            headquarters: "Boston, MA",
            employees: 10000,
            keyProducts: ["Security Suite", "Enterprise Software", "Cloud Security"],
            competitors: ["TechNova", "CloudPeak", "DataFlow"],
            management: {
                ceo: "James Wilson",
                cfo: "Linda Chang"
            }
        }
    },
    {
        name: 'CloudPeak',
        price: 150,
        roe: 0.18,
        fcf: 800000,
        sector: 'Technology',
        marketCap: 60000000000,
        peRatio: 28,
        revenue: 14000000000,
        profit: 3500000000,
        roce: 0.20,
        assets: 70000000000,
        debt: 24500000000,
        debtToEquity: 0.35,
        history: [
            {
                year: 2024,
                revenue: 14000000000,
                profit: 3500000000,
                fcf: 800000,
                pe: 28,
                roi: 0.18,
                roce: 0.20
            },
            {
                year: 2023,
                revenue: 12000000000,
                profit: 3000000000,
                fcf: 700000,
                pe: 25,
                roi: 0.16,
                roce: 0.18
            }
        ],
        background: {
            description: "CloudPeak is a major player in cloud computing and data storage solutions.",
            founded: 2008,
            headquarters: "Seattle, WA",
            employees: 20000,
            keyProducts: ["Cloud Storage", "Data Analytics", "AI Solutions"],
            competitors: ["TechNova", "ByteWorks", "DataFlow"],
            management: {
                ceo: "Emily White",
                cfo: "David Brown"
            }
        }
    },
    {
        name: 'DataFlow',
        price: 95,
        roe: 0.14,
        fcf: 420000,
        sector: 'Technology',
        marketCap: 35000000000,
        peRatio: 24,
        revenue: 10000000000,
        profit: 2500000000,
        roce: 0.17,
        assets: 45000000000,
        debt: 12600000000,
        debtToEquity: 0.28,
        history: [
            {
                year: 2024,
                revenue: 10000000000,
                profit: 2500000000,
                fcf: 420000,
                pe: 24,
                roi: 0.14,
                roce: 0.17
            },
            {
                year: 2023,
                revenue: 9000000000,
                profit: 2200000000,
                fcf: 400000,
                pe: 22,
                roi: 0.13,
                roce: 0.15
            }
        ],
        background: {
            description: "DataFlow provides cutting-edge solutions in big data and analytics.",
            founded: 2015,
            headquarters: "Austin, TX",
            employees: 8000,
            keyProducts: ["Data Analytics", "Business Intelligence", "Cloud Solutions"],
            competitors: ["TechNova", "ByteWorks", "CloudPeak"],
            management: {
                ceo: "Robert Green",
                cfo: "Patricia Hill"
            }
        }
    },

    // Healthcare Sector
    {
        name: 'HealthPlus',
        price: 90,
        roe: 0.10,
        fcf: 250000,
        sector: 'Healthcare',
        marketCap: 20000000000,
        peRatio: 20,
        revenue: 5000000000,
        profit: 1000000000,
        roce: 0.12,
        assets: 25000000000,
        debt: 10000000000,
        debtToEquity: 0.4,
        history: [
            {
                year: 2024,
                revenue: 5000000000,
                profit: 1000000000,
                fcf: 250000,
                pe: 20,
                roi: 0.10,
                roce: 0.12
            },
            {
                year: 2023,
                revenue: 4500000000,
                profit: 900000000,
                fcf: 230000,
                pe: 18,
                roi: 0.09,
                roce: 0.11
            }
        ],
        background: {
            description: "HealthPlus is a prominent healthcare company focusing on medical devices and health IT solutions.",
            founded: 2005,
            headquarters: "New York, NY",
            employees: 12000,
            keyProducts: ["Medical Devices", "Health IT Solutions", "Telemedicine Services"],
            competitors: ["MediTech", "BioCore", "VitalCare"],
            management: {
                ceo: "John Doe",
                cfo: "Jane Smith"
            }
        }
    },
    {
        name: 'MediTech',
        price: 110,
        roe: 0.13,
        fcf: 380000,
        sector: 'Healthcare',
        marketCap: 25000000000,
        peRatio: 23,
        revenue: 7000000000,
        profit: 1500000000,
        roce: 0.14,
        assets: 30000000000,
        debt: 10500000000,
        debtToEquity: 0.35,
        history: [
            {
                year: 2024,
                revenue: 7000000000,
                profit: 1500000000,
                fcf: 380000,
                pe: 23,
                roi: 0.13,
                roce: 0.14
            },
            {
                year: 2023,
                revenue: 6000000000,
                profit: 1300000000,
                fcf: 350000,
                pe: 21,
                roi: 0.12,
                roce: 0.13
            }
        ],
        background: {
            description: "MediTech is at the forefront of medical technology, offering innovative solutions for patient care.",
            founded: 2011,
            headquarters: "San Francisco, CA",
            employees: 9000,
            keyProducts: ["Diagnostic Equipment", "Patient Monitoring Systems", "Healthcare Software"],
            competitors: ["HealthPlus", "BioCore", "VitalCare"],
            management: {
                ceo: "Mary Johnson",
                cfo: "James Wilson"
            }
        }
    },
    {
        name: 'BioCore',
        price: 75,
        roe: 0.09,
        fcf: 200000,
        sector: 'Healthcare',
        marketCap: 15000000000,
        peRatio: 18,
        revenue: 4000000000,
        profit: 800000000,
        roce: 0.10,
        assets: 20000000000,
        debt: 9000000000,
        debtToEquity: 0.45,
        history: [
            {
                year: 2024,
                revenue: 4000000000,
                profit: 800000000,
                fcf: 200000,
                pe: 18,
                roi: 0.09,
                roce: 0.10
            },
            {
                year: 2023,
                revenue: 3500000000,
                profit: 700000000,
                fcf: 180000,
                pe: 17,
                roi: 0.08,
                roce: 0.09
            }
        ],
        background: {
            description: "BioCore is dedicated to advancing healthcare through biotechnology and pharmaceutical innovations.",
            founded: 2000,
            headquarters: "Los Angeles, CA",
            employees: 5000,
            keyProducts: ["Biologics", "Pharmaceuticals", "Gene Therapy"],
            competitors: ["HealthPlus", "MediTech", "VitalCare"],
            management: {
                ceo: "Robert Brown",
                cfo: "Linda Green"
            }
        }
    },
    {
        name: 'VitalCare',
        price: 130,
        roe: 0.16,
        fcf: 550000,
        sector: 'Healthcare',
        marketCap: 30000000000,
        peRatio: 26,
        revenue: 9000000000,
        profit: 2300000000,
        roce: 0.19,
        assets: 35000000000,
        debt: 11200000000,
        debtToEquity: 0.32,
        history: [
            {
                year: 2024,
                revenue: 9000000000,
                profit: 2300000000,
                fcf: 550000,
                pe: 26,
                roi: 0.16,
                roce: 0.19
            },
            {
                year: 2023,
                revenue: 8000000000,
                profit: 2000000000,
                fcf: 500000,
                pe: 24,
                roi: 0.15,
                roce: 0.17
            }
        ],
        background: {
            description: "VitalCare is a leader in healthcare services, providing comprehensive solutions for patient management.",
            founded: 2014,
            headquarters: "Chicago, IL",
            employees: 7000,
            keyProducts: ["Healthcare Services", "Patient Management Software", "Telehealth Solutions"],
            competitors: ["HealthPlus", "MediTech", "BioCore"],
            management: {
                ceo: "Jennifer White",
                cfo: "Charles Black"
            }
        }
    },

    // Finance Sector
    {
        name: 'FinEdge',
        price: 120,
        roe: 0.18,
        fcf: 700000,
        sector: 'Finance',
        marketCap: 55000000000,
        peRatio: 27,
        revenue: 13000000000,
        profit: 3500000000,
        roce: 0.21,
        assets: 150000000000,
        debt: 45000000000,
        debtToEquity: 0.3,
        history: [
            {
                year: 2024,
                revenue: 13000000000,
                profit: 3500000000,
                fcf: 700000,
                pe: 27,
                roi: 0.18,
                roce: 0.21
            },
            {
                year: 2023,
                revenue: 11000000000,
                profit: 3000000000,
                fcf: 600000,
                pe: 25,
                roi: 0.16,
                roce: 0.19
            }
        ],
        background: {
            description: "FinEdge offers innovative financial solutions and investment strategies.",
            founded: 2003,
            headquarters: "Miami, FL",
            employees: 6000,
            keyProducts: ["Investment Banking", "Asset Management", "Wealth Management"],
            competitors: ["WealthWise", "SecureBank", "InvestPro"],
            management: {
                ceo: "Andrew Taylor",
                cfo: "Jessica Lee"
            }
        }
    },
    {
        name: 'WealthWise',
        price: 95,
        roe: 0.15,
        fcf: 450000,
        sector: 'Finance',
        marketCap: 35000000000,
        peRatio: 24,
        revenue: 9000000000,
        profit: 2200000000,
        roce: 0.18,
        assets: 100000000000,
        debt: 35000000000,
        debtToEquity: 0.35,
        history: [
            {
                year: 2024,
                revenue: 9000000000,
                profit: 2200000000,
                fcf: 450000,
                pe: 24,
                roi: 0.15,
                roce: 0.18
            },
            {
                year: 2023,
                revenue: 8000000000,
                profit: 2000000000,
                fcf: 400000,
                pe: 22,
                roi: 0.14,
                roce: 0.17
            }
        ],
        background: {
            description: "WealthWise is a premier financial advisory firm, guiding clients in wealth accumulation and management.",
            founded: 2001,
            headquarters: "San Diego, CA",
            employees: 5000,
            keyProducts: ["Financial Advisory", "Investment Management", "Retirement Planning"],
            competitors: ["FinEdge", "SecureBank", "InvestPro"],
            management: {
                ceo: "Karen Miller",
                cfo: "Paul Wilson"
            }
        }
    },
    {
        name: 'SecureBank',
        price: 140,
        roe: 0.17,
        fcf: 850000,
        sector: 'Finance',
        marketCap: 70000000000,
        peRatio: 30,
        revenue: 16000000000,
        profit: 4000000000,
        roce: 0.22,
        assets: 200000000000,
        debt: 56000000000,
        debtToEquity: 0.28,
        history: [
            {
                year: 2024,
                revenue: 16000000000,
                profit: 4000000000,
                fcf: 850000,
                pe: 30,
                roi: 0.17,
                roce: 0.22
            },
            {
                year: 2023,
                revenue: 14000000000,
                profit: 3500000000,
                fcf: 700000,
                pe: 28,
                roi: 0.16,
                roce: 0.20
            }
        ],
        background: {
            description: "SecureBank is a leading global bank, offering a wide range of financial services.",
            founded: 1995,
            headquarters: "London, UK",
            employees: 30000,
            keyProducts: ["Retail Banking", "Corporate Banking", "Investment Banking"],
            competitors: ["FinEdge", "WealthWise", "InvestPro"],
            management: {
                ceo: "Richard Branson",
                cfo: "Elon Musk"
            }
        }
    },
    {
        name: 'InvestPro',
        price: 88,
        roe: 0.14,
        fcf: 380000,
        sector: 'Finance',
        marketCap: 25000000000,
        peRatio: 22,
        revenue: 7000000000,
        profit: 1600000000,
        roce: 0.15,
        assets: 80000000000,
        debt: 26400000000,
        debtToEquity: 0.33,
        history: [
            {
                year: 2024,
                revenue: 7000000000,
                profit: 1600000000,
                fcf: 380000,
                pe: 22,
                roi: 0.14,
                roce: 0.15
            },
            {
                year: 2023,
                revenue: 6000000000,
                profit: 1400000000,
                fcf: 350000,
                pe: 20,
                roi: 0.13,
                roce: 0.14
            }
        ],
        background: {
            description: "InvestPro provides expert investment management and financial planning services.",
            founded: 2006,
            headquarters: "Toronto, Canada",
            employees: 4000,
            keyProducts: ["Investment Management", "Financial Planning", "Retirement Solutions"],
            competitors: ["FinEdge", "WealthWise", "SecureBank"],
            management: {
                ceo: "George Lucas",
                cfo: "Natalie Portman"
            }
        }
    },

    // Energy Sector
    {
        name: 'GreenCore',
        price: 80,
        roe: 0.12,
        fcf: 300000,
        sector: 'Energy',
        marketCap: 20000000000,
        peRatio: 19,
        revenue: 6000000000,
        profit: 1200000000,
        roce: 0.13,
        assets: 25000000000,
        debt: 10000000000,
        debtToEquity: 0.4,
        history: [
            {
                year: 2024,
                revenue: 6000000000,
                profit: 1200000000,
                fcf: 300000,
                pe: 19,
                roi: 0.12,
                roce: 0.13
            },
            {
                year: 2023,
                revenue: 5000000000,
                profit: 1000000000,
                fcf: 280000,
                pe: 17,
                roi: 0.11,
                roce: 0.12
            }
        ],
        background: {
            description: "GreenCore is committed to providing sustainable and renewable energy solutions.",
            founded: 2013,
            headquarters: "Denver, CO",
            employees: 3000,
            keyProducts: ["Solar Panels", "Wind Turbines", "Energy Storage"],
            competitors: ["SolarFlow", "WindTech", "EcoEnergy"],
            management: {
                ceo: "Alice Johnson",
                cfo: "Bob Smith"
            }
        }
    },
    {
        name: 'SolarFlow',
        price: 70,
        roe: 0.11,
        fcf: 250000,
        sector: 'Energy',
        marketCap: 15000000000,
        peRatio: 18,
        revenue: 4000000000,
        profit: 900000000,
        roce: 0.11,
        assets: 18000000000,
        debt: 8100000000,
        debtToEquity: 0.45,
        history: [
            {
                year: 2024,
                revenue: 4000000000,
                profit: 900000000,
                fcf: 250000,
                pe: 18,
                roi: 0.11,
                roce: 0.11
            },
            {
                year: 2023,
                revenue: 3500000000,
                profit: 800000000,
                fcf: 230000,
                pe: 16,
                roi: 0.10,
                roce: 0.10
            }
        ],
        background: {
            description: "SolarFlow specializes in solar energy solutions, promoting clean and sustainable power.",
            founded: 2016,
            headquarters: "Phoenix, AZ",
            employees: 2000,
            keyProducts: ["Solar Panels", "Solar Inverters", "Energy Management Systems"],
            competitors: ["GreenCore", "WindTech", "EcoEnergy"],
            management: {
                ceo: "Tom Hanks",
                cfo: "Emma Watson"
            }
        }
    },
    {
        name: 'WindTech',
        price: 65,
        roe: 0.09,
        fcf: 180000,
        sector: 'Energy',
        marketCap: 10000000000,
        peRatio: 17,
        revenue: 3000000000,
        profit: 600000000,
        roce: 0.10,
        assets: 15000000000,
        debt: 7500000000,
        debtToEquity: 0.5,
        history: [
            {
                year: 2024,
                revenue: 3000000000,
                profit: 600000000,
                fcf: 180000,
                pe: 17,
                roi: 0.09,
                roce: 0.10
            },
            {
                year: 2023,
                revenue: 2500000000,
                profit: 500000000,
                fcf: 150000,
                pe: 15,
                roi: 0.08,
                roce: 0.09
            }
        ],
        background: {
            description: "WindTech is a pioneer in wind energy technology, providing innovative solutions for clean power.",
            founded: 2010,
            headquarters: "Dallas, TX",
            employees: 2500,
            keyProducts: ["Wind Turbines", "Energy Storage Systems", "Grid Solutions"],
            competitors: ["GreenCore", "SolarFlow", "EcoEnergy"],
            management: {
                ceo: "Mark Zuckerberg",
                cfo: "Sheryl Sandberg"
            }
        }
    },

    // Consumer Sector
    {
        name: 'ConsumerFirst',
        price: 92,
        roe: 0.13,
        fcf: 420000,
        sector: 'Consumer',
        marketCap: 22000000000,
        peRatio: 21,
        revenue: 8000000000,
        profit: 1800000000,
        roce: 0.16,
        assets: 28000000000,
        debt: 8400000000,
        debtToEquity: 0.3,
        history: [
            {
                year: 2024,
                revenue: 8000000000,
                profit: 1800000000,
                fcf: 420000,
                pe: 21,
                roi: 0.13,
                roce: 0.16
            },
            {
                year: 2023,
                revenue: 7000000000,
                profit: 1600000000,
                fcf: 400000,
                pe: 19,
                roi: 0.12,
                roce: 0.15
            }
        ],
        background: {
            description: "ConsumerFirst is dedicated to delivering top-quality consumer goods and exceptional service.",
            founded: 2007,
            headquarters: "Seattle, WA",
            employees: 4000,
            keyProducts: ["Electronics", "Home Appliances", "Personal Care Products"],
            competitors: ["RetailPro", "BrandMaster", "ShopSmart"],
            management: {
                ceo: "Howard Schultz",
                cfo: "Michele Ganeless"
            }
        }
    },
    {
        name: 'RetailPro',
        price: 78,
        roe: 0.11,
        fcf: 290000,
        sector: 'Consumer',
        marketCap: 18000000000,
        peRatio: 19,
        revenue: 5000000000,
        profit: 1100000000,
        roce: 0.14,
        assets: 22000000000,
        debt: 7700000000,
        debtToEquity: 0.35,
        history: [
            {
                year: 2024,
                revenue: 5000000000,
                profit: 1100000000,
                fcf: 290000,
                pe: 19,
                roi: 0.11,
                roce: 0.14
            },
            {
                year: 2023,
                revenue: 4500000000,
                profit: 1000000000,
                fcf: 270000,
                pe: 17,
                roi: 0.10,
                roce: 0.13
            }
        ],
        background: {
            description: "RetailPro is a leading retailer, offering a wide range of products at competitive prices.",
            founded: 2015,
            headquarters: "Miami, FL",
            employees: 3500,
            keyProducts: ["Clothing", "Footwear", "Accessories"],
            competitors: ["ConsumerFirst", "BrandMaster", "ShopSmart"],
            management: {
                ceo: "Richard Gere",
                cfo: "Julia Roberts"
            }
        }
    },
    {
        name: 'BrandMaster',
        price: 105,
        roe: 0.15,
        fcf: 480000,
        sector: 'Consumer',
        marketCap: 25000000000,
        peRatio: 25,
        revenue: 9000000000,
        profit: 2200000000,
        roce: 0.17,
        assets: 30000000000,
        debt: 9600000000,
        debtToEquity: 0.32,
        history: [
            {
                year: 2024,
                revenue: 9000000000,
                profit: 2200000000,
                fcf: 480000,
                pe: 25,
                roi: 0.15,
                roce: 0.17
            },
            {
                year: 2023,
                revenue: 8000000000,
                profit: 2000000000,
                fcf: 450000,
                pe: 23,
                roi: 0.14,
                roce: 0.16
            }
        ],
        background: {
            description: "BrandMaster is a global leader in consumer branding and marketing solutions.",
            founded: 2002,
            headquarters: "Los Angeles, CA",
            employees: 6000,
            keyProducts: ["Brand Strategy", "Marketing Campaigns", "Consumer Insights"],
            competitors: ["ConsumerFirst", "RetailPro", "ShopSmart"],
            management: {
                ceo: "Steve Jobs",
                cfo: "Tim Cook"
            }
        }
    },

    // Industrial Sector
    {
        name: 'IndusTech',
        price: 115,
        roe: 0.16,
        fcf: 520000,
        sector: 'Industrial',
        marketCap: 30000000000,
        peRatio: 26,
        revenue: 10000000000,
        profit: 2600000000,
        roce: 0.18,
        assets: 40000000000,
        debt: 12000000000,
        debtToEquity: 0.3,
        history: [
            {
                year: 2024,
                revenue: 10000000000,
                profit: 2600000000,
                fcf: 520000,
                pe: 26,
                roi: 0.16,
                roce: 0.18
            },
            {
                year: 2023,
                revenue: 9000000000,
                profit: 2300000000,
                fcf: 480000,
                pe: 24,
                roi: 0.15,
                roce: 0.17
            }
        ],
        background: {
            description: "IndusTech provides innovative solutions in industrial automation and manufacturing.",
            founded: 1998,
            headquarters: "Detroit, MI",
            employees: 8000,
            keyProducts: ["Automation Systems", "Robotics", "Manufacturing Software"],
            competitors: ["ManufactEx", "TechNova", "CloudPeak"],
            management: {
                ceo: "Henry Ford",
                cfo: "Cheryl Sandberg"
            }
        }
    },
    {
        name: 'ManufactEx',
        price: 98,
        roe: 0.14,
        fcf: 440000,
        sector: 'Industrial',
        marketCap: 25000000000,
        peRatio: 24,
        revenue: 9000000000,
        profit: 2100000000,
        roce: 0.16,
        assets: 35000000000,
        debt: 12250000000,
        debtToEquity: 0.35,
        history: [
            {
                year: 2024,
                revenue: 9000000000,
                profit: 2100000000,
                fcf: 440000,
                pe: 24,
                roi: 0.14,
                roce: 0.16
            },
            {
                year: 2023,
                revenue: 8000000000,
                profit: 1900000000,
                fcf: 420000,
                pe: 22,
                roi: 0.13,
                roce: 0.15
            }
        ],
        background: {
            description: "ManufactEx is a leader in manufacturing excellence, providing high-quality industrial products.",
            founded: 2000,
            headquarters: "Chicago, IL",
            employees: 7000,
            keyProducts: ["Industrial Equipment", "Manufacturing Solutions", "Supply Chain Management"],
            competitors: ["IndusTech", "TechNova", "CloudPeak"],
            management: {
                ceo: "David Beckham",
                cfo: "Victoria Beckham"
            }
        }
    }
];
