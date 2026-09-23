import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { FilterPanel } from '../components/common/FilterPanel';
import { ProfileCard } from '../components/common/ProfileCard';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../context/AuthContext';

export const Profiles = () => {
  const [searchParams] = useSearchParams();
  const { expressInterest } = useAuth();

  // Initial Filter State parsed from URL parameters if available
  const [filters, setFilters] = useState({
    gender: searchParams.get('gender') || 'All',
    subCommunity: searchParams.get('subCommunity') || 'All',
    category: 'All',
    minAge: Number(searchParams.get('minAge')) || 20,
    maxAge: Number(searchParams.get('maxAge')) || 45,
    district: 'All',
    maritalStatus: 'All',
    searchQuery: searchParams.get('searchQuery') || ''
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedInterestProfile, setSelectedInterestProfile] = useState(null);

  const resetFilters = () => {
    setFilters({
      gender: 'All',
      subCommunity: 'All',
      category: 'All',
      minAge: 20,
      maxAge: 45,
      district: 'All',
      maritalStatus: 'All',
      searchQuery: ''
    });
  };

  // Filter Computation Logic
  const filteredProfiles = useMemo(() => {
    return MOCK_PROFILES.filter(profile => {
      // Gender Filter
      if (filters.gender !== 'All' && profile.gender.toLowerCase() !== filters.gender.toLowerCase()) {
        return false;
      }

      // Sub-Community Filter
      if (filters.subCommunity !== 'All' && profile.subCommunityId !== filters.subCommunity) {
        return false;
      }

      // Category Filter (BC / MBC)
      if (filters.category !== 'All' && profile.categoryCode !== filters.category) {
        return false;
      }

      // Age Range Filter
      if (profile.age < filters.minAge || profile.age > filters.maxAge) {
        return false;
      }

      // District Filter
      if (filters.district !== 'All' && !profile.district.includes(filters.district) && !profile.nativePlace.includes(filters.district)) {
        return false;
      }

      // Marital Status Filter
      if (filters.maritalStatus !== 'All' && profile.maritalStatus !== filters.maritalStatus) {
        return false;
      }

      // Search Query (ID, Name, Education, Occupation, Location)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = profile.name.toLowerCase().includes(q);
        const matchesId = profile.id.toLowerCase().includes(q);
        const matchesEd = profile.education.toLowerCase().includes(q);
        const matchesOcc = profile.occupation.toLowerCase().includes(q);
        const matchesLoc = profile.nativePlace.toLowerCase().includes(q);

        if (!matchesName && !matchesId && !matchesEd && !matchesOcc && !matchesLoc) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleOpenInterestModal = (profile) => {
    setSelectedInterestProfile(profile);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '3rem 0', minHeight: '90vh' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--color-primary-dark)', margin: 0, fontFamily: 'var(--font-heading)' }}>
              Browse Gounder Matrimonial Profiles
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Filter verified profiles by Gounder sub-community, BC/MBC classification, age, education, and district.
            </p>
          </div>

          {/* View Mode Toggle Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="btn btn-outline btn-sm mobile-filter-btn"
              style={{ display: 'none' }}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            <div style={{ background: '#FFF', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid #E2D9CF', display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.6rem' }}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.6rem' }}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Filter Sidebar + Profile Cards List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) 1fr', gap: '2rem' }}>
          
          {/* Desktop Filter Panel Sidebar */}
          <div className="desktop-filter-sidebar">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              onReset={resetFilters}
              resultCount={filteredProfiles.length}
            />
          </div>

          {/* Profiles Content Area */}
          <div>
            {filteredProfiles.length === 0 ? (
              <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', background: '#FFF' }}>
                <Search size={48} color="var(--color-gold)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                  No Matching Profiles Found
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                  Try broadening your search criteria or resetting filters to view more profiles.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  <RotateCcw size={16} /> Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Showing <strong>{filteredProfiles.length}</strong> verified profiles</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-hover)', fontWeight: 600 }}>Demo Matches</span>
                </div>

                <div style={{
                  display: viewMode === 'grid' ? 'grid' : 'flex',
                  flexDirection: viewMode === 'list' ? 'column' : 'none',
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(270px, 1fr))' : 'none',
                  gap: '1.5rem'
                }}>
                  {filteredProfiles.map(p => (
                    <ProfileCard
                      key={p.id}
                      profile={p}
                      viewMode={viewMode}
                      onExpressInterest={handleOpenInterestModal}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer Modal */}
      <Modal
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Profile Matches"
      >
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onReset={() => { resetFilters(); setMobileFilterOpen(false); }}
          resultCount={filteredProfiles.length}
        />
        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setMobileFilterOpen(false)}>
          Apply Filters ({filteredProfiles.length} Results)
        </button>
      </Modal>

      {/* Express Interest Modal */}
      <Modal
        isOpen={!!selectedInterestProfile}
        onClose={() => setSelectedInterestProfile(null)}
        title={`Express Interest in ${selectedInterestProfile?.name}`}
      >
        <div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Send an interest request to {selectedInterestProfile?.name} ({selectedInterestProfile?.id}).
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={() => setSelectedInterestProfile(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => { expressInterest(selectedInterestProfile?.id); setSelectedInterestProfile(null); }}>
              Confirm & Send Interest
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
