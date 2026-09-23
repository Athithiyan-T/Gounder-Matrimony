import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Briefcase, GraduationCap, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { CommunityBadge } from './CommunityBadge';
import { useAuth } from '../../context/AuthContext';

export const ProfileCard = ({ profile, viewMode = "grid", onExpressInterest }) => {
  const { shortlist, toggleShortlist, interestsSent } = useAuth();
  const isShortlisted = shortlist.includes(profile.id);
  const isInterestSent = interestsSent.includes(profile.id);

  if (viewMode === 'list') {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Photo Container */}
        <div style={{ position: 'relative', width: '180px', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={profile.photos[0]}
            alt={profile.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#FFF', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
            {profile.id}
          </span>
          {profile.verified && (
            <span style={{ position: 'absolute', bottom: '10px', left: '10px' }} className="verified-pill">
              <ShieldCheck size={12} /> Verified
            </span>
          )}
        </div>

        {/* Info Column */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Link to={`/profile/${profile.id}`} style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>
                {profile.name}, <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{profile.age} yrs</span>
              </Link>
              <button
                onClick={() => toggleShortlist(profile.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isShortlisted ? '#E63946' : 'var(--text-light)', padding: '0.25rem' }}
                title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
              >
                <Heart size={22} fill={isShortlisted ? '#E63946' : 'none'} />
              </button>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <CommunityBadge communityName={profile.subCommunity} categoryCode={profile.categoryCode} categoryFull={profile.category} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={16} color="var(--color-primary)" />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{profile.education}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={16} color="var(--color-primary)" />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{profile.occupation}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--color-primary)" />
                <span>{profile.nativePlace} / {profile.currentLocation.split(',')[0]}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {profile.about}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
            <Link to={`/profile/${profile.id}`} className="btn btn-outline btn-sm">
              View Profile
            </Link>
            <button
              onClick={() => onExpressInterest ? onExpressInterest(profile) : null}
              className={`btn btn-sm ${isInterestSent ? 'btn-secondary' : 'btn-primary'}`}
            >
              <Send size={14} />
              {isInterestSent ? 'Interest Sent' : 'Express Interest'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Default)
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '12px', border: '1px solid #EFE4DC' }}>
      {/* Photo header */}
      <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden', borderTopLeftRadius: '11px', borderTopRightRadius: '11px' }}>
        <img
          src={profile.photos[0]}
          alt={profile.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="profile-card-img"
        />

        {/* Online badge top left */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, color: '#137333', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#137333' }} />
          Online
        </div>

        {/* Heart top right */}
        <button
          onClick={(e) => { e.preventDefault(); toggleShortlist(profile.id); }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}
          title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
        >
          <Heart size={16} color={isShortlisted ? '#E63946' : '#666'} fill={isShortlisted ? '#E63946' : 'none'} />
        </button>

        {profile.verified && (
          <span style={{ position: 'absolute', bottom: '10px', left: '10px' }} className="verified-pill">
            <ShieldCheck size={12} /> Verified
          </span>
        )}
      </div>

      {/* Body Content */}
      <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <Link to={`/profile/${profile.id}`} style={{ fontSize: '1.1rem', color: '#7A1C29', fontWeight: 800 }}>
            {profile.name}
          </Link>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#6B5E5F' }}>
            {profile.age} Yrs
          </span>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <CommunityBadge communityName={profile.subCommunity} categoryCode={profile.categoryCode} size="sm" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem', color: '#4A3E40', marginBottom: '1.15rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={14} color="#7A1C29" style={{ flexShrink: 0 }} />
            <span>{profile.nativePlace}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Briefcase size={14} color="#7A1C29" style={{ flexShrink: 0 }} />
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{profile.occupation}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <GraduationCap size={14} color="#7A1C29" style={{ flexShrink: 0 }} />
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{profile.education}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <Link to={`/profile/${profile.id}`} className="btn btn-outline btn-sm" style={{ width: '100%', borderColor: '#7A1C29', color: '#7A1C29', borderRadius: '6px' }}>
            View Profile
          </Link>
          <button
            onClick={() => onExpressInterest ? onExpressInterest(profile) : null}
            className="btn btn-sm"
            style={{
              width: '100%',
              fontSize: '0.8rem',
              backgroundColor: isInterestSent ? '#FAF4EF' : '#7A1C29',
              color: isInterestSent ? '#7A1C29' : '#FFFFFF',
              border: isInterestSent ? '1px solid #7A1C29' : 'none',
              borderRadius: '6px'
            }}
          >
            {isInterestSent ? 'Interest Sent' : 'Express Interest'}
          </button>
        </div>
      </div>
    </div>
  );
};

