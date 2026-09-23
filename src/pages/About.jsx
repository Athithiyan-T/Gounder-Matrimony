import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Users, Award, Lock, CheckCircle2 } from 'lucide-react';
import { GOUNDER_COMMUNITIES } from '../data/communities';

export const About = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '4rem 0' }}>
      <div className="container">
        
        {/* Banner Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <span className="subtitle-badge">Our Legacy & Mission</span>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
            About Gounder Matrimony
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Dedicated to helping Gounder families discover harmonious, long-lasting matrimonial unions across all regional sub-communities with complete trust and privacy.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div className="card" style={{ padding: '2.5rem', background: '#FFF' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              Preserving Values, Embracing Modern Technology
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.6 }}>
              The Gounder community—spanning the fertile Kongu region and neighboring western and northern Tamil Nadu districts—is celebrated for its strong family traditions, agricultural heritage, and pioneering industrial achievements.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Gounder Matrimony provides a clean, modern digital interface tailored specifically for parents, brides, and grooms to find compatible matches with shared cultural understanding.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#4A3B0A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={24} color="var(--color-gold)" /> Authenticated Sub-Community Classification
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#5C4B0F', marginBottom: '1.25rem' }}>
              We respect official community records for sub-group categorization:
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#4A3B0A' }}>
              {GOUNDER_COMMUNITIES.map(c => (
                <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E2D9CF', paddingBottom: '0.35rem' }}>
                  <strong>{c.name}</strong>
                  <span className={c.badgeClass}>{c.categoryCode}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Pillars */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-main-heading">Our Core Pillars of Service</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>Verified Accounts</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Every candidate undergoes OTP verification and mobile checks to ensure genuine family entries.</p>
          </div>

          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Lock size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>Family Privacy First</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Photos and contact numbers remain protected until mutual interest is approved by both families.</p>
          </div>

          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Users size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>Sub-Community Filters</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Targeted search options allow filtering by sub-community, district, education, and career profile.</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #7A1C29 0%, #4A0E17 100%)', color: '#FFF' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Start Your Matrimonial Journey Today
          </h2>
          <p style={{ color: '#E8DEDE', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Register your profile for free and discover verified matches in your preferred Gounder sub-community.
          </p>
          <Link to="/register" className="btn btn-gold btn-lg">
            Create Free Profile Now
          </Link>
        </div>

      </div>
    </div>
  );
};
