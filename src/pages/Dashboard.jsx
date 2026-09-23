import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, ShieldCheck, Edit3, Bell, CheckCircle2, Eye, Send, Sparkles, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { CommunityBadge } from '../components/common/CommunityBadge';
import { ProfileCard } from '../components/common/ProfileCard';
import { Modal } from '../components/common/Modal';
import { ProfileUpdateForm } from '../components/common/ProfileUpdateForm';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, shortlist, interestsSent, showToast, expressInterest, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('edit-profile'); // 'edit-profile', 'recommended', 'shortlist', 'activity'
  const [selectedInterestProfile, setSelectedInterestProfile] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const shortlistedProfiles = MOCK_PROFILES.filter(p => shortlist.includes(p.id));

  // Filter recommended profiles according to current user's opposite gender
  const oppositeGender = currentUser?.gender === 'Male' ? 'Female' : 'Male';
  const recommendedProfiles = MOCK_PROFILES.filter(p => p.gender === oppositeGender);

  const handleOpenInterestModal = (profile) => {
    setSelectedInterestProfile(profile);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '2.5rem 0 4rem 0', minHeight: '90vh' }}>
      <div className="container">
        
        {/* Welcome Header & Completion Banner */}
        <div
          className="card"
          style={{
            padding: '2rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #7A1C29 0%, #4A0E17 100%)',
            color: '#FFF',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(122,28,41,0.15)'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,0.2)', color: 'var(--color-gold)', padding: '0.25rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <ShieldCheck size={15} /> Account Verified ({currentUser?.id || 'GM-1001'})
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', color: '#FFF', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              Welcome back, {currentUser?.name}!
            </h1>
            <p style={{ margin: '0.35rem 0 0 0', color: '#E8DEDE', fontSize: '0.925rem' }}>
              Sub-Community: {currentUser?.subCommunity} ({currentUser?.categoryCode || 'BC'})
            </p>
          </div>

          {/* Profile Completion Meter */}
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '1.15rem 1.5rem', borderRadius: '14px', backdropFilter: 'blur(8px)', minWidth: '260px', width: '100%', maxWidth: '340px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <span>Profile Strength</span>
              <strong style={{ color: 'var(--color-gold)', fontSize: '1.1rem' }}>90%</strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.25)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', background: 'linear-gradient(90deg, var(--color-gold) 0%, #FFF 100%)' }} />
            </div>
            <span style={{ fontSize: '0.775rem', color: '#E2D8D8', display: 'block', marginTop: '0.5rem' }}>
              ✓ Verified Phone OTP & Sub-community status
            </span>
          </div>
        </div>

        {/* Dashboard Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          
          {/* LEFT SIDEBAR: PROFILE SUMMARY & PREFERENCES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '360px', width: '100%' }}>
            
            {/* User Profile Card */}
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: '#FFF', borderRadius: '16px', border: '1px solid #EFE4DC' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem auto', border: '3px solid var(--color-gold)', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
                <img src={currentUser?.photos?.[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'} alt={currentUser?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#7A1C29', marginBottom: '0.25rem', fontWeight: 800 }}>
                {currentUser?.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {currentUser?.age} yrs • {currentUser?.height?.split(' ')?.[0]} {currentUser?.height?.split(' ')?.[1]}
              </p>

              <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <CommunityBadge communityName={currentUser?.subCommunity} categoryCode={currentUser?.categoryCode} size="sm" />
              </div>

              <button
                onClick={() => setActiveTab('edit-profile')}
                className={`btn ${activeTab === 'edit-profile' ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%', fontSize: '0.875rem', fontWeight: 700 }}
              >
                <Edit3 size={15} /> Update Profile Details
              </button>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="card" style={{ padding: '1.25rem', background: '#FFF', borderRadius: '16px', border: '1px solid #EFE4DC' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#7A1C29', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.85rem', fontWeight: 800 }}>
                Account Navigation
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('edit-profile')}
                  className={`btn btn-sm ${activeTab === 'edit-profile' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontWeight: 700 }}
                >
                  <Edit3 size={16} /> Update My Details
                </button>

                <button
                  onClick={() => setActiveTab('recommended')}
                  className={`btn btn-sm ${activeTab === 'recommended' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontWeight: 700 }}
                >
                  <Heart size={16} /> Recommended Matches ({recommendedProfiles.length})
                </button>

                <button
                  onClick={() => setActiveTab('shortlist')}
                  className={`btn btn-sm ${activeTab === 'shortlist' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontWeight: 700 }}
                >
                  <CheckCircle2 size={16} /> Shortlisted Profiles ({shortlistedProfiles.length})
                </button>

                <button
                  onClick={() => setActiveTab('activity')}
                  className={`btn btn-sm ${activeTab === 'activity' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontWeight: 700 }}
                >
                  <Bell size={16} /> Activity & Views Feed
                </button>

                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontWeight: 700, marginTop: '0.4rem', backgroundColor: '#FDF2F4', color: '#7A1C29', border: '1px solid #F3CFD4' }}
                >
                  <LogOut size={16} /> Logout Account
                </button>
              </div>
            </div>

            {/* Quick Partner Expectations Summary */}
            <div className="card" style={{ padding: '1.5rem', background: '#FFF', borderRadius: '16px', border: '1px solid #EFE4DC' }}>
              <h4 style={{ fontSize: '1rem', color: '#7A1C29', marginBottom: '1rem', borderBottom: '1.5px solid var(--color-gold-border)', paddingBottom: '0.4rem', fontWeight: 800 }}>
                Partner Expectations
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Age Preference</span>
                  <strong>{currentUser?.preferences?.ageMin || 22} - {currentUser?.preferences?.ageMax || 28} Years</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Sub-Community</span>
                  <strong>{currentUser?.preferences?.subCommunity || currentUser?.subCommunity}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Education</span>
                  <strong>{currentUser?.preferences?.education || 'Graduate'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Preferred Location</span>
                  <strong>{currentUser?.preferences?.location || 'Tamil Nadu'}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* MAIN CONTENT AREA */}
          <div style={{ flex: 1, minWidth: 0 }}>
            
            {/* TAB 1: UPDATE PROFILE FORM */}
            {activeTab === 'edit-profile' && (
              <ProfileUpdateForm />
            )}

            {/* TAB 2: RECOMMENDED MATCHES */}
            {activeTab === 'recommended' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', color: '#7A1C29', margin: 0, fontWeight: 800 }}>
                      Recommended Matches ({oppositeGender})
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Matched based on your partner expectations & Gounder sub-community</span>
                  </div>
                  <Link to="/profiles" className="btn btn-outline btn-sm">
                    Browse All Profiles
                  </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  {recommendedProfiles.map(p => (
                    <ProfileCard
                      key={p.id}
                      profile={p}
                      viewMode="grid"
                      onExpressInterest={handleOpenInterestModal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SHORTLISTED PROFILES */}
            {activeTab === 'shortlist' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', color: '#7A1C29', marginBottom: '0.25rem', fontWeight: 800 }}>
                  My Shortlisted Profiles ({shortlistedProfiles.length})
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Profiles you saved for family discussion and horoscope exchange.
                </p>

                {shortlistedProfiles.length === 0 ? (
                  <div className="card" style={{ padding: '3rem', textAlign: 'center', background: '#FFF', borderRadius: '16px' }}>
                    <Heart size={48} color="var(--color-gold)" style={{ margin: '0 auto 1rem auto' }} />
                    <h3 style={{ color: '#7A1C29' }}>No Shortlisted Profiles Yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      Browse profiles and click the heart icon to save matches here.
                    </p>
                    <Link to="/profiles" className="btn btn-primary">Browse Profiles</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {shortlistedProfiles.map(p => (
                      <ProfileCard
                        key={p.id}
                        profile={p}
                        viewMode="list"
                        onExpressInterest={handleOpenInterestModal}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: RECENT ACTIVITY */}
            {activeTab === 'activity' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', color: '#7A1C29', marginBottom: '1.25rem', fontWeight: 800 }}>
                  Recent Account Activity & Views
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFF', borderRadius: '14px' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', background: '#FDF2F4', color: '#7A1C29' }}>
                      <Eye size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#7A1C29', fontSize: '1rem' }}>5 New Families Viewed Your Profile</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 hours ago • Families from Erode, Tiruppur & Coimbatore</span>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFF', borderRadius: '14px' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold)' }}>
                      <Send size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#7A1C29', fontSize: '1rem' }}>Interest Request Sent to Profile GM-1002</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Yesterday at 4:30 PM • Pending response</span>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFF', borderRadius: '14px' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', background: '#E6F4EA', color: '#137333' }}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#7A1C29', fontSize: '1rem' }}>Account & Sub-Community Verification Approved</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sub-community status verified: {currentUser?.subCommunity}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

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
              Confirm & Send
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Dashboard;
