import React from 'react';

export default function FiltersPanel({ filters, setFilters, labels }) {
  return (
    <div className="filters-panel">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Node Label:</label>
        <select
          value={filters.label}
          onChange={e => setFilters({ ...filters, label: e.target.value })}
        >
          <option value="">All</option>
          {labels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
