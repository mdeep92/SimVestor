import React, { useState, useMemo } from 'react';
import { Company } from '../models/companies';
import { BiSortAlt2, BiTrendingUp } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface ScreenerProps {
  companies: Company[];
  onCompanySelect: (company: Company) => void;
}

interface Filter {
  metric: keyof Company | 'peRatio' | 'marketCap' | 'debtToEquity';
  operator: '>' | '<' | '=' | '>=';
  value: number;
}

const Screener: React.FC<ScreenerProps> = ({ companies, onCompanySelect }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Company | 'peRatio' | 'marketCap' | 'debtToEquity',
    direction: 'asc' | 'desc'
  }>({ key: 'marketCap', direction: 'desc' });
  
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = useMemo(() => 
    ['all', ...new Set(companies.map(company => company.sector))],
    [companies]
  );

  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies];

    // Apply sector filter
    if (selectedSector !== 'all') {
      result = result.filter(company => company.sector === selectedSector);
    }

    // Apply metric filters
    result = result.filter(company => {
      return filters.every(filter => {
        const value = company[filter.metric as keyof Company];
        if (typeof value === 'number') {
          switch (filter.operator) {
            case '>': return value > filter.value;
            case '<': return value < filter.value;
            case '=': return value === filter.value;
            case '>=': return value >= filter.value;
            default: return true;
          }
        }
        return true;
      });
    });

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Company];
      const bValue = b[sortConfig.key as keyof Company];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    return result;
  }, [companies, sortConfig, filters, selectedSector]);

  const addFilter = () => {
    setFilters([...filters, { metric: 'marketCap', operator: '>', value: 0 }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSort = (key: keyof Company | 'peRatio' | 'marketCap' | 'debtToEquity') => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="screener-container">
      <div className="screener-controls">
        <div className="sector-filter">
          <select 
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="sector-select"
          >
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>
        </div>

        <div className="filters">
          {filters.map((filter, index) => (
            <div key={index} className="filter-item">
              <select
                value={filter.metric}
                onChange={(e) => {
                  const newFilters = [...filters];
                  newFilters[index].metric = e.target.value as keyof Company;
                  setFilters(newFilters);
                }}
              >
                <option value="marketCap">Market Cap</option>
                <option value="peRatio">P/E Ratio</option>
                <option value="roe">ROE</option>
                <option value="roce">ROCE</option>
                <option value="debtToEquity">Debt/Equity</option>
              </select>
              <select
                value={filter.operator}
                onChange={(e) => {
                  const newFilters = [...filters];
                  newFilters[index].operator = e.target.value as '>' | '<' | '=' | '>=';
                  setFilters(newFilters);
                }}
              >
                <option value=">">greater than</option>
                <option value="<">less than</option>
                <option value="=">equal to</option>
                <option value=">=">greater than or equal</option>
              </select>
              <input
                type="number"
                value={filter.value}
                onChange={(e) => {
                  const newFilters = [...filters];
                  newFilters[index].value = parseFloat(e.target.value) || 0;
                  setFilters(newFilters);
                }}
              />
              <button onClick={() => removeFilter(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addFilter} className="add-filter-btn">Add Filter</button>
        </div>
      </div>

      <div className="screener-table-container">
        <table className="screener-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Company {sortConfig.key === 'name' && <BiSortAlt2 />}
              </th>
              <th onClick={() => handleSort('marketCap')}>
                Market Cap {sortConfig.key === 'marketCap' && <BiSortAlt2 />}
              </th>
              <th onClick={() => handleSort('peRatio')}>
                P/E Ratio {sortConfig.key === 'peRatio' && <BiSortAlt2 />}
              </th>
              <th onClick={() => handleSort('roe')}>
                ROE {sortConfig.key === 'roe' && <BiSortAlt2 />}
              </th>
              <th onClick={() => handleSort('roce')}>
                ROCE {sortConfig.key === 'roce' && <BiSortAlt2 />}
              </th>
              <th onClick={() => handleSort('debtToEquity')}>
                D/E {sortConfig.key === 'debtToEquity' && <BiSortAlt2 />}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCompanies.map((company) => (
              <motion.tr
                key={company.name}
                whileHover={{ scale: 1.01 }}
                className="company-row"
              >
                <td>
                  <span className="company-name">{company.name}</span>
                  <span className={`sector-tag ${company.sector}`}>{company.sector}</span>
                </td>
                <td>${(company.marketCap / 1000000000).toFixed(1)}B</td>
                <td>{company.peRatio.toFixed(1)}</td>
                <td>{(company.roe * 100).toFixed(1)}%</td>
                <td>{(company.roce * 100).toFixed(1)}%</td>
                <td>{company.debtToEquity.toFixed(2)}</td>
                <td>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCompanySelect(company)}
                    className="view-company-btn"
                  >
                    <BiTrendingUp /> View
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Screener;
