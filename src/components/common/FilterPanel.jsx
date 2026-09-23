import React from 'react';
import { Filter, RotateCcw, Search, ChevronDown } from 'lucide-react';
import { GOUNDER_COMMUNITIES, DISTRICTS, MARITAL_STATUSES } from '../../data/communities';

export const FilterPanel = ({ filters, setFilters, onReset, resultCount = 0 }) => {
  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card" style={{ padding: '1.5rem', background: 'var(--color-bg-card)', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
          <Filter size={18} color="var(--color-gold)" />
          <span>Refine Matches</span>
        </div>
        <button
          onClick={onReset}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Search Input */}
      <div className="form-group">
        <label className="form-label">Search Keyword / ID</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. GM-1001, Doctor, Erode..."
            value={filters.searchQuery || ''}
            onChange={(e) => handleChange('searchQuery', e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
        </div>
      </div>

      {/* Gender Filter */}
      <div className="form-group">
        <label className="form-label">Gender Preference</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
          {['All', 'Female', 'Male'].map(g => (
            <button
              key={g}
              type="button"
              className={`btn btn-sm ${filters.gender === g ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleChange('gender', g)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Community Filter */}
      <div className="form-group">
        <label className="form-label">Gounder Sub-Community</label>
        <select
          className="form-control"
          value={filters.subCommunity || 'All'}
          onChange={(e) => handleChange('subCommunity', e.target.value)}
        >
          <option value="All">All Gounder Sub-Communities</option>
          {GOUNDER_COMMUNITIES.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.categoryCode})
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="form-group">
        <label className="form-label">Classification Category</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
          {['All', 'BC', 'MBC'].map(cat => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${filters.category === cat ? 'btn-gold' : 'btn-secondary'}`}
              onClick={() => handleChange('category', cat)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.5rem' }}
            >
              {cat === 'All' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Age Filter Range */}
      <div className="form-group">
        <div className="form-label">
          <span>Age Range</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{filters.minAge} - {filters.maxAge} yrs</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="range"
            min="20"
            max="45"
            value={filters.minAge}
            onChange={(e) => handleChange('minAge', Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
          />
          <input
            type="range"
            min="20"
            max="45"
            value={filters.maxAge}
            onChange={(e) => handleChange('maxAge', Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
          />
        </div>
      </div>

      {/* District / Native Place Filter */}
      <div className="form-group">
        <label className="form-label">Native / Current District</label>
        <select
          className="form-control"
          value={filters.district || 'All'}
          onChange={(e) => handleChange('district', e.target.value)}
        >
          <option value="All">All Districts</option>
          {DISTRICTS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Marital Status */}
      <div className="form-group">
        <label className="form-label">Marital Status</label>
        <select
          className="form-control"
          value={filters.maritalStatus || 'All'}
          onChange={(e) => handleChange('maritalStatus', e.target.value)}
        >
          <option value="All">Any Marital Status</option>
          {MARITAL_STATUSES.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed #E2D9CF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span>Matches Found:</span>
        <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem' }}>{resultCount} Profiles</span>
      </div>
    </div>
  );
};
