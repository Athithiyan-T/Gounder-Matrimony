import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Send, ShieldCheck, MapPin, Briefcase, GraduationCap, Calendar, Check, User, Users, FileText, Phone } from 'lucide-react';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { CommunityBadge } from '../components/common/CommunityBadge';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../context/AuthContext';

export const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shortlist, toggleShortlist, interestsSent, expressInterest } = useAuth();

  const profile = MOCK_PROFILES.find(p => p.id === id) || MOCK_PROFILES[0];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [interestMsg, setInterestMsg] = useState('Our family reviewed your profile and would like to express interest in exploring a matrimonial match.');

  const isShortlisted = shortlist.includes(profile.id);
  const isInterestSent = interestsSent.includes(profile.id);

  const handleSendInterest = () => {
    expressInterest(profile.id, interestMsg);
    setIsInterestModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '3rem 0', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Top Back Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Back to Profiles
          </button>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => toggleShortlist(profile.id)}
              className="btn btn-outline btn-sm"
              style={{ color: isShortlisted ? '#E63946' : 'var(--color-primary)' }}
            >
              <Heart size={16} fill={isShortlisted ? '#E63946' : 'none'} />
              {isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
            </button>
            <button
              onClick={() => setIsInterestModalOpen(true)}
              className={`btn btn-sm ${isInterestSent ? 'btn-secondary' : 'btn-primary'}`}
            >
              <Send size={16} />
              {isInterestSent ? 'Interest Sent' : 'Express Interest'}
            </button>
          </div>
        </div>

        {/* Header Profile Summary Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: '#FFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            {/* Gallery Column */}
            <div>
              <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.75rem' }}>
                <img
                  src={profile.photos[activePhotoIdx]}
                  alt={profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.65)', color: '#FFF', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  {profile.id}
                </span>
                {profile.verified && (
                  <span style={{ position: 'absolute', bottom: '12px', left: '12px' }} className="verified-pill">
                    <ShieldCheck size={14} /> Verified Member
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {profile.photos.map((photoUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activePhotoIdx === idx ? '3px solid var(--color-primary)' : '1px solid #DDD'
                    }}
                  >
                    <img src={photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Profile Summary Details */}
            <div>
              <div style={{ marginBottom: '0.5rem' }}>
                <CommunityBadge communityName={profile.subCommunity} categoryCode={profile.categoryCode} categoryFull={profile.category} />
              </div>

              <h1 style={{ fontSize: '2.4rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                {profile.name}
              </h1>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                {profile.age} Years • {profile.height} • {profile.maritalStatus}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1.5rem', background: 'var(--color-bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <GraduationCap size={18} color="var(--color-primary)" />
                  <span><strong>Education:</strong> {profile.education}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Briefcase size={18} color="var(--color-primary)" />
                  <span><strong>Profession:</strong> {profile.occupation} ({profile.company})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={18} color="var(--color-primary)" />
                  <span><strong>Native & Resident:</strong> {profile.nativePlace} / {profile.currentLocation}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setIsInterestModalOpen(true)} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                  <Send size={18} /> Express Interest
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs & Sections Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          
          {/* Column 1: Personal & Family Background */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* About Me Card */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', borderBottom: '1.5px solid var(--color-gold-border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="var(--color-gold)" /> About Candidate
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {profile.about}
              </p>
            </div>

            {/* Gounder Community & Family Background */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', borderBottom: '1.5px solid var(--color-gold-border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} color="var(--color-gold)" /> Community & Family Background
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Gounder Sub-Community</span>
                  <strong>{profile.subCommunity}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Classification Category</span>
                  <span className={profile.categoryCode === 'BC' ? 'badge-bc' : 'badge-mbc'}>
                    {profile.category}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Father's Occupation</span>
                  <strong>{profile.fatherOccupation}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Mother's Occupation</span>
                  <strong>{profile.motherOccupation}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Family Setup</span>
                  <strong>{profile.familyType}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Siblings</span>
                  <strong>{profile.siblings}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Partner Preference Checklist & Horoscope */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Partner Expectations Checklist Matrix */}
            <div className="card" style={{ padding: '1.75rem', background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#4A3B0A', marginBottom: '1rem', borderBottom: '1.5px solid var(--color-gold-border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={20} color="var(--color-gold-hover)" /> Partner Expectation Matrix
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#3D3008' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2D9CF', paddingBottom: '0.4rem' }}>
                  <span>Preferred Age Range:</span>
                  <strong>{profile.preferences.ageMin} - {profile.preferences.ageMax} Years</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2D9CF', paddingBottom: '0.4rem' }}>
                  <span>Sub-Community Preference:</span>
                  <strong>{profile.preferences.subCommunity}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2D9CF', paddingBottom: '0.4rem' }}>
                  <span>Preferred Education:</span>
                  <strong>{profile.preferences.education}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #E2D9CF', paddingBottom: '0.4rem' }}>
                  <span>Preferred Location:</span>
                  <strong>{profile.preferences.location}</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#5C480E', marginTop: '1rem', fontStyle: 'italic' }}>
                "{profile.preferences.notes}"
              </p>
            </div>

            {/* Horoscope & Contact Request Notice */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} color="var(--color-primary)" /> Contact & Horoscope Access
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Horoscope matching chart and contact details are available upon mutual interest acceptance for complete family privacy.
              </p>
              <button onClick={() => setIsInterestModalOpen(true)} className="btn btn-gold" style={{ width: '100%' }}>
                Request Contact & Horoscope Access
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Express Interest Modal */}
      <Modal
        isOpen={isInterestModalOpen}
        onClose={() => setIsInterestModalOpen(false)}
        title={`Express Interest in ${profile.name}`}
      >
        <div>
          <div className="form-group">
            <label className="form-label">Message for {profile.name}'s Family</label>
            <textarea
              className="form-control"
              rows={4}
              value={interestMsg}
              onChange={(e) => setInterestMsg(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button className="btn btn-secondary" onClick={() => setIsInterestModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSendInterest}>
              <Send size={16} /> Send Interest Request
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
