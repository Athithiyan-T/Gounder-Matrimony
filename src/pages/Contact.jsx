import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { GOUNDER_COMMUNITIES } from '../data/communities';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    community: 'Kongu Gounder',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const OFFICES = [
    {
      city: 'Coimbatore Head Office',
      address: '104, Avinashi Road, Peelamedu, Near PSG College, Coimbatore - 641004',
      phone: '+91 98765 43210',
      email: 'cbe@goundermatrimony.com',
      isHQ: true
    },
    {
      city: 'Erode Regional Office',
      address: '45, Brough Road, Near Collectorate, Erode - 638001',
      phone: '+91 98765 43211',
      email: 'erode@goundermatrimony.com',
      isHQ: false
    },
    {
      city: 'Salem Branch',
      address: '12, Swarnapuri Main Road, Near New Bus Stand, Salem - 636004',
      phone: '+91 98765 43212',
      email: 'salem@goundermatrimony.com',
      isHQ: false
    },
    {
      city: 'Tiruppur Branch',
      address: '88, PN Road, Near Old Bus Stand, Tiruppur - 641602',
      phone: '+91 98765 43213',
      email: 'tiruppur@goundermatrimony.com',
      isHQ: false
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '3.5rem 0' }}>
      <div className="container">

        {/* Header Banner */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <span className="subtitle-badge">Reach Out to Our Team</span>
          <h1 style={{ fontSize: '2.6rem', color: '#7A1C29', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            Contact Gounder Matrimony
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#6B5E5F', lineHeight: 1.6 }}>
            Have questions about profile verification, horoscope matching, or membership plans? Our dedicated family support representatives are happy to assist you.
          </p>
        </div>

        {/* 2 Column Section: Contact Form + Direct Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4.5rem', alignItems: 'start' }}>

          {/* Left: Interactive Form */}
          <div className="card" style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #EFE4DC', boxShadow: '0 6px 24px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#7A1C29', marginBottom: '0.5rem', fontWeight: 800 }}>
              Send Us a Message
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#7A6B6D', marginBottom: '1.75rem' }}>
              Fill in your details below and our family support team will reach back within 24 hours.
            </p>

            {submitted ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', background: '#F0F9F1', borderRadius: '12px', border: '1px solid #C8E6C9' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#2E7D32', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ color: '#2E7D32', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                  Thank You, {formData.name || 'Member'}!
                </h3>
                <p style={{ color: '#33292A', fontSize: '0.925rem', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                  Your message regarding <strong>"{formData.subject}"</strong> has been received. Our team will contact you at <strong>{formData.phone || formData.email || 'your contact details'}</strong> shortly.
                </p>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', community: 'Kongu Gounder', subject: 'General Inquiry', message: '' }); }}
                  style={{ borderColor: '#2E7D32', color: '#2E7D32' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-control"
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '6px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.35rem' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 00000"
                      className="form-control"
                      style={{ padding: '0.65rem 0.85rem', borderRadius: '6px' }}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.35rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="form-control"
                      style={{ padding: '0.65rem 0.85rem', borderRadius: '6px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.35rem' }}>
                      Sub-Community
                    </label>
                    <select
                      name="community"
                      value={formData.community}
                      onChange={handleChange}
                      className="form-control"
                      style={{ padding: '0.65rem 0.85rem', borderRadius: '6px' }}
                    >
                      {GOUNDER_COMMUNITIES.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.35rem' }}>
                      Inquiry Topic
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control"
                      style={{ padding: '0.65rem 0.85rem', borderRadius: '6px' }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Upgrade">Membership & Pricing</option>
                      <option value="Profile Verification">Profile Verification</option>
                      <option value="Horoscope Matching">Horoscope Matching Support</option>
                      <option value="Technical Support">Technical / Website Issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.35rem' }}>
                    Your Message / Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe how we can help you or your family..."
                    className="form-control"
                    style={{ padding: '0.65rem 0.85rem', borderRadius: '6px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    backgroundColor: '#7A1C29',
                    fontSize: '0.95rem',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Contact Cards & Working Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="card" style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '14px', border: '1px solid #EFE4DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F8CFD4', color: '#7A1C29', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#7A1C29', fontWeight: 800 }}>Phone Helpline</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#7A6B6D' }}>Available Mon - Sat, 9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2C1810', marginBottom: '0.25rem' }}>
                +91 98765 43210 / +91 98765 43211
              </div>
              <span style={{ fontSize: '0.775rem', color: '#6B5E5F' }}>Direct support for family profile assistance</span>
            </div>

            <div className="card" style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '14px', border: '1px solid #EFE4DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F8CFD4', color: '#7A1C29', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#7A1C29', fontWeight: 800 }}>Email Support</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#7A6B6D' }}>24/7 Inquiry inbox</p>
                </div>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#7A1C29', marginBottom: '0.25rem' }}>
                support@goundermatrimony.com
              </div>
              <span style={{ fontSize: '0.775rem', color: '#6B5E5F' }}>Replies sent within 24 business hours</span>
            </div>

            <div className="card" style={{ background: '#FAF4EF', padding: '1.75rem', borderRadius: '14px', border: '1px solid #EFE4DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <Clock size={22} color="#7A1C29" />
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#7A1C29', fontWeight: 800 }}>Working Hours</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#4A3E40', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Monday - Saturday:</span>
                  <strong>9:00 AM - 7:00 PM IST</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sunday:</span>
                  <strong>10:00 AM - 2:00 PM IST</strong>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Regional Office Locations Grid */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="subtitle-badge">Kongu Regional Branches</span>
            <h2 style={{ fontSize: '2rem', color: '#7A1C29', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              Visit Our Support Centers
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {OFFICES.map((off, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  background: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: off.isHQ ? '2px solid #7A1C29' : '1px solid #EFE4DC',
                  position: 'relative'
                }}
              >
                {off.isHQ && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#7A1C29', color: '#FFF', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>
                    HEADQUARTERS
                  </span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#7A1C29', fontWeight: 800, fontSize: '1.1rem' }}>
                  <MapPin size={18} />
                  {off.city}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#4A3E40', lineHeight: 1.5, marginBottom: '1rem', minHeight: '50px' }}>
                  {off.address}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#7A6B6D', display: 'flex', flexDirection: 'column', gap: '0.25rem', borderTop: '1px dashed #E2D9CF', paddingTop: '0.75rem' }}>
                  <div><strong>Phone:</strong> {off.phone}</div>
                  <div><strong>Email:</strong> {off.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
