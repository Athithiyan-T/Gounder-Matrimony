import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ShieldCheck, Sparkles, Star, Heart, PhoneCall, Award, HelpCircle } from 'lucide-react';

export const Membership = () => {
  const [billingCycle, setBillingCycle] = useState('3months');

  const PLANS = [
    {
      id: 'free',
      name: 'Free Basic',
      tagline: 'Ideal to get started & explore',
      price: '₹0',
      period: 'Forever Free',
      popular: false,
      badge: 'Starter',
      btnText: 'Register Free Now',
      btnLink: '/register',
      btnClass: 'btn-outline',
      features: [
        { text: 'Create Detailed Matrimony Profile', included: true },
        { text: 'Search Profiles by Gounder Sub-Community', included: true },
        { text: 'Send up to 5 Express Interests / month', included: true },
        { text: 'Receive Proposals & Member Messages', included: true },
        { text: 'View Verified Contact Details & Phone Numbers', included: false },
        { text: 'Direct Horoscope & Star Compatibility Matching', included: false },
        { text: 'Highlighted Profile & Priority Search Result', included: false },
        { text: 'Dedicated Relationship Manager Support', included: false },
      ]
    },
    {
      id: 'gold',
      name: 'Gold Package',
      tagline: 'Most popular choice for active searches',
      price: billingCycle === '3months' ? '₹2,499' : '₹4,499',
      period: billingCycle === '3months' ? 'for 3 Months' : 'for 6 Months',
      popular: true,
      badge: 'Most Popular',
      btnText: 'Upgrade to Gold',
      btnLink: '/register',
      btnClass: 'btn-primary',
      features: [
        { text: 'Create Detailed Matrimony Profile', included: true },
        { text: 'Search Profiles by Gounder Sub-Community', included: true },
        { text: 'Unlimited Express Interests & Acceptances', included: true },
        { text: 'View up to 30 Verified Contact Numbers', included: true },
        { text: 'Direct Horoscope & Star Compatibility Matching', included: true },
        { text: 'Highlighted Profile & Priority Search Result', included: true },
        { text: 'SMS & WhatsApp Express Interest Alerts', included: true },
        { text: 'Dedicated Relationship Manager Support', included: false },
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond VIP',
      tagline: 'Complete assistance & unlimited access',
      price: billingCycle === '3months' ? '₹4,999' : '₹8,499',
      period: billingCycle === '3months' ? 'for 3 Months' : 'for 6 Months',
      popular: false,
      badge: 'VIP Concierge',
      btnText: 'Get VIP Plan',
      btnLink: '/register',
      btnClass: 'btn-gold',
      features: [
        { text: 'Create Detailed Matrimony Profile', included: true },
        { text: 'Search Profiles by Gounder Sub-Community', included: true },
        { text: 'Unlimited Express Interests & Acceptances', included: true },
        { text: 'View UNLIMITED Verified Contact Numbers', included: true },
        { text: 'Direct Horoscope & Star Compatibility Matching', included: true },
        { text: 'Top Carousel Placement & VIP Profile Shield', included: true },
        { text: 'SMS & WhatsApp Express Interest Alerts', included: true },
        { text: 'Personal Dedicated Relationship Manager', included: true },
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '3.5rem 0' }}>
      <div className="container">

        {/* Page Banner Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span className="subtitle-badge">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Transparent & Affordable Pricing
          </span>
          <h1 style={{ fontSize: '2.6rem', color: '#7A1C29', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            Choose the Perfect Membership Plan
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#6B5E5F', lineHeight: 1.6 }}>
            Connect directly with verified Gounder families. Upgrade to unlock full contact numbers, horoscope matching, and priority placement.
          </p>

          {/* Billing Cycle Toggle */}
          <div style={{ display: 'inline-flex', background: '#FFFFFF', padding: '0.3rem', borderRadius: '30px', border: '1px solid #E2D9CF', marginTop: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <button
              onClick={() => setBillingCycle('3months')}
              style={{
                border: 'none',
                padding: '0.5rem 1.4rem',
                borderRadius: '25px',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                background: billingCycle === '3months' ? '#7A1C29' : 'transparent',
                color: billingCycle === '3months' ? '#FFFFFF' : '#6B5E5F',
                transition: '0.2s ease'
              }}
            >
              3 Months Plan
            </button>
            <button
              onClick={() => setBillingCycle('6months')}
              style={{
                border: 'none',
                padding: '0.5rem 1.4rem',
                borderRadius: '25px',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                background: billingCycle === '6months' ? '#7A1C29' : 'transparent',
                color: billingCycle === '6months' ? '#FFFFFF' : '#6B5E5F',
                transition: '0.2s ease'
              }}
            >
              6 Months Plan <span style={{ fontSize: '0.7rem', color: billingCycle === '6months' ? '#FFD700' : '#7A1C29', marginLeft: '3px' }}>(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem', alignItems: 'stretch', marginBottom: '4.5rem' }}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="card"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '2.25rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular ? '2px solid #7A1C29' : '1px solid #EFE4DC',
                boxShadow: plan.popular ? '0 12px 32px rgba(122, 28, 41, 0.15)' : '0 4px 16px rgba(0,0,0,0.04)',
                transform: plan.popular ? 'scale(1.02)' : 'none',
                zIndex: plan.popular ? 2 : 1
              }}
            >
              {/* Top Badge */}
              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.725rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: plan.popular ? '#7A1C29' : '#F4ECE1',
                color: plan.popular ? '#FFFFFF' : '#7A1C29',
                marginBottom: '1rem'
              }}>
                {plan.badge}
              </div>

              <h2 style={{ fontSize: '1.6rem', color: '#7A1C29', margin: '0 0 0.25rem 0', fontWeight: 800 }}>
                {plan.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#7A6B6D', margin: '0 0 1.25rem 0' }}>
                {plan.tagline}
              </p>

              {/* Pricing Display */}
              <div style={{ borderTop: '1px dashed #E2D9CF', borderBottom: '1px dashed #E2D9CF', padding: '1rem 0', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2C1810', lineHeight: 1 }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#7A6B6D', marginTop: '0.35rem', fontWeight: 600 }}>
                  {plan.period}
                </div>
              </div>

              {/* Features List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {plan.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem', color: feat.included ? '#33292A' : '#A39698' }}>
                    <div style={{
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: feat.included ? '#E8F5E9' : '#F5F5F5',
                      color: feat.included ? '#2E7D32' : '#B0BEC5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px'
                    }}>
                      {feat.included ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={2} />}
                    </div>
                    <span style={{ fontWeight: feat.included ? 600 : 400 }}>{feat.text}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <Link
                to={plan.btnLink}
                className={`btn ${plan.btnClass}`}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  textAlign: 'center',
                  fontSize: '0.925rem',
                  backgroundColor: plan.id === 'gold' ? '#7A1C29' : plan.id === 'diamond' ? '#D4AF37' : 'transparent',
                  color: plan.id === 'free' ? '#7A1C29' : '#FFFFFF',
                  borderColor: '#7A1C29'
                }}
              >
                {plan.btnText} →
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="card" style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #EFE4DC', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="subtitle-badge">Detailed Breakdown</span>
            <h2 style={{ fontSize: '1.8rem', color: '#7A1C29', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: '0.3rem 0' }}>
              Compare Membership Features
            </h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #7A1C29' }}>
                  <th style={{ padding: '1rem', color: '#7A1C29', fontWeight: 800 }}>Feature Details</th>
                  <th style={{ padding: '1rem', color: '#6B5E5F', textAlign: 'center' }}>Free Basic</th>
                  <th style={{ padding: '1rem', color: '#7A1C29', textAlign: 'center', fontWeight: 800 }}>Gold Member</th>
                  <th style={{ padding: '1rem', color: '#B38B00', textAlign: 'center', fontWeight: 800 }}>Diamond VIP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Profile Registration & Photo Upload', free: 'Yes', gold: 'Yes', vip: 'Yes' },
                  { name: 'Sub-Community & District Filters', free: 'Basic', gold: 'Advanced', vip: 'Advanced' },
                  { name: 'Express Interest Requests', free: '5 / month', gold: 'Unlimited', vip: 'Unlimited' },
                  { name: 'View Verified Mobile & Address', free: 'No', gold: '30 Profiles', vip: 'Unlimited' },
                  { name: 'Star & Horoscope Compatibility Matching', free: 'Basic View', gold: 'Detailed Chart', vip: 'Full Horoscope Matching' },
                  { name: 'Direct WhatsApp Contact Sharing', free: 'No', gold: 'Yes', vip: 'Yes' },
                  { name: 'Search Result Priority Rank', free: 'Standard', gold: 'High Priority', vip: 'Top VIP Ranking' },
                  { name: 'Dedicated Matchmaker Assistance', free: 'No', gold: 'No', vip: 'Personal Relationship Manager' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #EFE4DC', background: idx % 2 === 0 ? '#FAF7F2' : '#FFFFFF' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#33292A' }}>{row.name}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#6B5E5F' }}>{row.free}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', fontWeight: 700, color: '#7A1C29' }}>{row.gold}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', fontWeight: 800, color: '#856404' }}>{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & Family Assurance Callout */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #7A1C29 0%, #4A0E17 100%)', color: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              Need Help Choosing the Right Package?
            </h3>
            <p style={{ color: '#FDF2F4', margin: 0, fontSize: '0.95rem' }}>
              Our support team is available 6 days a week to help Gounder families find the perfect plan for their partner search.
            </p>
          </div>
          <div>
            <Link to="/contact" className="btn" style={{ backgroundColor: '#FFFFFF', color: '#7A1C29', fontWeight: 800, padding: '0.75rem 1.75rem', borderRadius: '8px', whiteSpace: 'nowrap' }}>
              <PhoneCall size={16} /> Contact Support Team
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Membership;
