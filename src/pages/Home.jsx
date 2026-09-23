import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Heart, ShieldCheck, Users, Lock, ChevronRight, ChevronLeft,
  User, CheckCircle2, Phone, Mail, MapPin, Sparkles, Award, UserCheck, Briefcase, GraduationCap, Building2
} from 'lucide-react';
import { GOUNDER_COMMUNITIES, DISTRICTS } from '../data/communities';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { TESTIMONIALS } from '../data/staticData';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../context/AuthContext';

const SUCCESS_STORIES = [
  {
    id: 1,
    couple: "Karthik & Divya",
    date: "Married on 12 Jan 2024",
    quote: "We found each other through Gounder Matrimony. The platform made our journey easy and trustworthy. Thank you for being a part of our beautiful start!",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    couple: "Suresh & Priya",
    date: "Married on 28 Nov 2023",
    quote: "Our families connected seamlessly through this portal. Finding a compatible match from our Kongu Gounder sub-community was effortless and transparent.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    couple: "Dharshan & Kavitha",
    date: "Married on 15 Feb 2024",
    quote: "The detailed family background and verified profile details gave both our parents complete peace of mind. Highly recommended for all Gounder families!",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    couple: "Gokul & Sowmya",
    date: "Married on 05 Mar 2024",
    quote: "A modern yet traditional matrimony service! From initial interest acceptance to horoscope exchange, everything was smooth and respectful of our values.",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80"
  }
];

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { expressInterest, toggleShortlist, shortlist } = useAuth();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [location]);

  // Quick Search Form State matching reference design
  const [searchTab, setSearchTab] = useState('match');
  const [lookingFor, setLookingFor] = useState('Bride');
  const [minAge, setMinAge] = useState('21');
  const [maxAge, setMaxAge] = useState('35');
  const [community, setCommunity] = useState('Gounder');
  const [district, setDistrict] = useState('Tamil Nadu');
  const [education, setEducation] = useState('Any');

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [interestMessage, setInterestMessage] = useState('We are interested in your profile for our family. Please accept to exchange contact details.');

  const handleNextStory = () => {
    setActiveStoryIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const handlePrevStory = () => {
    setActiveStoryIndex((prev) => (prev === 0 ? SUCCESS_STORIES.length - 1 : prev - 1));
  };

  const currentStory = SUCCESS_STORIES[activeStoryIndex];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      gender: lookingFor === 'Bride' ? 'Female' : 'Male',
      subCommunity: community,
      district: district === 'Tamil Nadu' ? 'All' : district,
      education: education
    }).toString();
    navigate(`/profiles?${query}`);
  };

  const handleNextProfiles = () => {
    setCarouselIndex((prev) => (prev + 3 >= MOCK_PROFILES.length ? 0 : prev + 1));
  };

  const handlePrevProfiles = () => {
    setCarouselIndex((prev) => (prev === 0 ? Math.max(0, MOCK_PROFILES.length - 3) : prev - 1));
  };

  const visibleProfiles = MOCK_PROFILES.slice(carouselIndex, carouselIndex + 6);

  const handleSendInterest = () => {
    if (selectedProfile) {
      expressInterest(selectedProfile.id, interestMessage);
      setSelectedProfile(null);
    }
  };

  const LOCATIONS = [
    { name: 'Chennai', count: '(5,200+)', img: '/locations/chennai.jpg' },
    { name: 'Coimbatore', count: '(8,400+)', img: '/locations/coimbatore.jpg' },
    { name: 'Erode', count: '(6,100+)', img: '/locations/erode.jpg' },
    { name: 'Tiruppur', count: '(4,800+)', img: '/locations/tiruppur.jpg' },
    { name: 'Salem', count: '(4,500+)', img: '/locations/salem.jpg' },
    { name: 'Namakkal', count: '(3,900+)', img: '/locations/namakkal.jpg' },
    { name: 'Madurai', count: '(3,700+)', img: '/locations/madurai.jpg' },
    { name: 'Bengaluru', count: '(3,200+)', img: '/locations/bengaluru.jpg' }
  ];

  return (
    <div>
      {/* 1. HERO SECTION WITH FULL-BACKGROUND COVER IMAGE */}
      <section
        id="hero"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(20, 10, 14, 0.72) 0%, rgba(20, 10, 14, 0.35) 45%, rgba(20, 10, 14, 0.15) 70%, rgba(20, 10, 14, 0.65) 100%), url(/hero-couple-main.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          paddingTop: '3.5rem',
          paddingBottom: '4rem',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF'
        }}
        className="hero-full-bg-section"
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 320px', gap: '2rem', alignItems: 'center' }} className="hero-full-grid">
            
            {/* Left Hero Text Column */}
            <div>
              <div style={{
                fontSize: '0.775rem',
                fontWeight: 800,
                color: '#FFD700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)'
              }}>
                TRADITIONAL VALUES • FOR A BRIGHTER TOMORROW
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                textShadow: '0 3px 12px rgba(0,0,0,0.8)'
              }}>
                Find Your <br />
                <span style={{ color: '#FFD1DC' }}>Perfect Life Partner</span>
              </h1>

              <p style={{
                fontSize: '0.975rem',
                color: '#FFFFFF',
                marginBottom: '2rem',
                maxWidth: '460px',
                lineHeight: 1.6,
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
              }}>
                A trusted matrimonial platform for Gounder community, bringing families together with trust and tradition.
              </p>

              {/* 3 Metrics Stats Bar below text */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '460px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                    <Users size={18} color="#FFD700" />
                    <span>50,000+</span>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#FFFFFF', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Happy Members</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                    <Heart size={18} color="#FFD1DC" fill="#FFD1DC" />
                    <span>5,000+</span>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#FFFFFF', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Successful Matches</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                    <ShieldCheck size={18} color="#FFD700" />
                    <span>100%</span>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#FFFFFF', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Verified Profiles</span>
                </div>
              </div>
            </div>

            {/* Right Compact Floating Quick Search Card */}
            <div className="card hero-quick-search-card">
              
              {/* Compact Search Box Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #EFE4DC' }}>
                <button
                  type="button"
                  onClick={() => setSearchTab('match')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.85rem',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    border: 'none',
                    background: searchTab === 'match' ? '#7A1C29' : '#F7F1E9',
                    color: searchTab === 'match' ? '#FFFFFF' : '#6B5E5F',
                    borderTopLeftRadius: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Find Your Match
                </button>
                <button
                  type="button"
                  onClick={() => setSearchTab('quick')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.85rem',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    border: 'none',
                    background: searchTab === 'quick' ? '#7A1C29' : '#F7F1E9',
                    color: searchTab === 'quick' ? '#FFFFFF' : '#6B5E5F',
                    borderTopRightRadius: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Quick Search
                </button>
              </div>

              {/* Form Fields Inside Card */}
              <form onSubmit={handleSearchSubmit} style={{ padding: '1.15rem 1.25rem' }}>
                
                {/* Touch-Friendly Gender Toggle */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <label className="form-label" style={{ fontSize: '0.775rem', fontWeight: 800, color: '#33292A', marginBottom: '0.3rem', display: 'block' }}>
                    I'm Looking For
                  </label>
                  <div className="gender-toggle-group">
                    <button
                      type="button"
                      className={`gender-toggle-btn ${lookingFor === 'Bride' ? 'active' : ''}`}
                      onClick={() => setLookingFor('Bride')}
                    >
                      👰 Bride
                    </button>
                    <button
                      type="button"
                      className={`gender-toggle-btn ${lookingFor === 'Groom' ? 'active' : ''}`}
                      onClick={() => setLookingFor('Groom')}
                    >
                      🤵 Groom
                    </button>
                  </div>
                </div>

                {/* Age Select Dropdowns Row */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.775rem', fontWeight: 800, color: '#33292A', marginBottom: '0.25rem', display: 'block' }}>
                    Age Expectations
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.4rem', alignItems: 'center' }}>
                    <select
                      className="form-control"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                      style={{ padding: '0.45rem 0.5rem', fontSize: '0.85rem', borderRadius: '8px', height: '42px', fontWeight: 600 }}
                    >
                      <option value="18">18 Yrs</option>
                      <option value="21">21 Yrs</option>
                      <option value="23">23 Yrs</option>
                      <option value="25">25 Yrs</option>
                      <option value="28">28 Yrs</option>
                    </select>
                    <span style={{ fontSize: '0.8rem', color: '#7A6B6D', fontWeight: 700 }}>to</span>
                    <select
                      className="form-control"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                      style={{ padding: '0.45rem 0.5rem', fontSize: '0.85rem', borderRadius: '8px', height: '42px', fontWeight: 600 }}
                    >
                      <option value="30">30 Yrs</option>
                      <option value="35">35 Yrs</option>
                      <option value="40">40 Yrs</option>
                      <option value="45">45 Yrs</option>
                      <option value="50">50 Yrs</option>
                    </select>
                  </div>
                </div>

                {/* Sub-Community Dropdown */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.775rem', fontWeight: 800, color: '#33292A', marginBottom: '0.25rem', display: 'block' }}>
                    Gounder Sub-Community
                  </label>
                  <select
                    className="form-control"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    style={{ padding: '0.45rem 0.5rem', fontSize: '0.85rem', borderRadius: '8px', height: '42px', fontWeight: 600 }}
                  >
                    <option value="Gounder">All Gounder Sub-Communities</option>
                    {GOUNDER_COMMUNITIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Location Dropdown */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.775rem', fontWeight: 800, color: '#33292A', marginBottom: '0.25rem', display: 'block' }}>
                    Preferred Location / District
                  </label>
                  <select
                    className="form-control"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{ padding: '0.45rem 0.5rem', fontSize: '0.85rem', borderRadius: '8px', height: '42px', fontWeight: 600 }}
                  >
                    <option value="Tamil Nadu">All Tamil Nadu</option>
                    {DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Education Dropdown */}
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.775rem', fontWeight: 800, color: '#33292A', marginBottom: '0.25rem', display: 'block' }}>
                    Education Qualification
                  </label>
                  <select
                    className="form-control"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    style={{ padding: '0.45rem 0.5rem', fontSize: '0.85rem', borderRadius: '8px', height: '42px', fontWeight: 600 }}
                  >
                    <option value="Any">Any Qualification</option>
                    <option value="B.E / B.Tech">B.E / B.Tech</option>
                    <option value="M.E / M.Tech">M.E / M.Tech</option>
                    <option value="MBA / PGDM">MBA / PGDM</option>
                    <option value="MBBS / MD">MBBS / MD</option>
                    <option value="CA / CS">CA / CS</option>
                  </select>
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="btn"
                  style={{
                    width: '100%',
                    backgroundColor: '#7A1C29',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.925rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(122, 28, 41, 0.25)',
                    cursor: 'pointer'
                  }}
                >
                  <Search size={18} color="#FFD700" />
                  Search Matching Profiles
                </button>

              </form>

            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST FEATURES BANNER matching reference image */}
      <section style={{ backgroundColor: '#FDF2F4', padding: '1.75rem 0', borderTop: '1px solid #F8DFE3', borderBottom: '1px solid #F8DFE3' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            
            <div style={{ padding: '0.5rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#F8CFD4', color: '#7A1C29', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.65rem auto' }}>
                <CheckCircle2 size={22} />
              </div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#7A1C29', fontWeight: 700 }}>Verified Profiles</h4>
              <span style={{ fontSize: '0.775rem', color: '#6B5E5F' }}>Authentic and manually verified profiles</span>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#F8CFD4', color: '#7A1C29', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.65rem auto' }}>
                <Heart size={22} fill="#7A1C29" color="#7A1C29" />
              </div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#7A1C29', fontWeight: 700 }}>Genuine Relationships</h4>
              <span style={{ fontSize: '0.775rem', color: '#6B5E5F' }}>Build meaningful connections</span>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#F8CFD4', color: '#7A1C29', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.65rem auto' }}>
                <Users size={22} />
              </div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#7A1C29', fontWeight: 700 }}>Family Friendly</h4>
              <span style={{ fontSize: '0.775rem', color: '#6B5E5F' }}>A trusted platform for families</span>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#F8CFD4', color: '#7A1C29', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.65rem auto' }}>
                <Lock size={22} />
              </div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#7A1C29', fontWeight: 700 }}>Safe & Secure</h4>
              <span style={{ fontSize: '0.775rem', color: '#6B5E5F' }}>Your privacy is our priority</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED PROFILES CAROUSEL SECTION matching reference image */}
      <section id="featured-profiles" className="section-padding" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#A82B3E', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                REAL PEOPLE. REAL STORIES.
              </span>
              <h2 style={{ fontSize: '2.1rem', color: '#7A1C29', margin: '0.2rem 0 0.2rem 0', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                Featured Profiles
              </h2>
              <span style={{ fontSize: '0.875rem', color: '#6B5E5F' }}>Discover some of our verified members</span>
            </div>
            
            <div>
              <Link to="/profiles" className="btn btn-outline btn-sm" style={{ borderColor: '#7A1C29', color: '#7A1C29', borderRadius: '6px' }}>
                View All Profiles →
              </Link>
            </div>
          </div>

          {/* 6 Featured Profile Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.15rem' }}>
            {visibleProfiles.map((p) => {
              const isShortlisted = shortlist.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="card"
                  style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '10px', border: '1px solid #EFE4DC' }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <img src={p.photos[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {/* Online badge top left */}
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.675rem', fontWeight: 700, color: '#137333', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#137333' }} />
                      Online
                    </div>

                    {/* Heart top right */}
                    <button
                      onClick={() => toggleShortlist(p.id)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={13} color={isShortlisted ? '#E63946' : '#666'} fill={isShortlisted ? '#E63946' : 'none'} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 800, color: '#7A1C29', fontSize: '0.9rem' }}>{p.name}</div>
                    <div style={{ color: '#6B5E5F', fontSize: '0.75rem', marginBottom: '0.4rem' }}>{p.age} Years</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: '#4A3E40', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={12} color="#7A1C29" />
                        <span>{p.nativePlace}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Briefcase size={12} color="#7A1C29" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.occupation}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <GraduationCap size={12} color="#7A1C29" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.education.split(' ')[0]}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Users size={12} color="#7A1C29" />
                        <span>Gounder</span>
                      </div>
                    </div>

                    <Link
                      to={`/profiles/${p.id}`}
                      className="btn btn-outline btn-sm"
                      style={{ width: '100%', padding: '0.35rem', fontSize: '0.75rem', borderColor: '#7A1C29', color: '#7A1C29', borderRadius: '6px' }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. BROWSE PROFILES BY LOCATION matching exact reference image */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#A82B3E', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                FIND YOUR MATCH
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', color: '#221417', margin: '0.2rem 0', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                Browse Profiles By Location
              </h2>
              <span style={{ fontSize: '0.875rem', color: '#6B5E5F' }}>Find potential matches from your preferred city</span>
            </div>

            <div>
              <Link
                to="/profiles"
                className="btn btn-outline btn-sm"
                style={{
                  borderColor: '#7A1C29',
                  color: '#7A1C29',
                  borderRadius: '8px',
                  fontWeight: 700,
                  padding: '0.45rem 1.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                View All Locations <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* 8 Location Cards Responsive Grid matching reference image */}
          <div className="location-cards-grid">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                onClick={() => navigate(`/profiles?district=${loc.name}`)}
                className="location-card"
              >
                <div className="location-card-img-wrapper">
                  <img src={loc.img} alt={loc.name} />
                </div>
                <div className="location-card-info">
                  <div className="location-card-title">{loc.name}</div>
                  <div className="location-card-count">{loc.count}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SUCCESS STORIES SECTION matching exact reference image */}
      <section id="success-stories" className="section-padding success-stories-section" style={{ backgroundColor: '#FAF4EF', position: 'relative', overflow: 'hidden' }}>
        
        {/* Top-Right Decorative Floral Indian Artwork SVG */}
        <div className="decorative-floral-art" aria-hidden="true">
          <svg viewBox="0 0 160 160" fill="none" style={{ width: '160px', height: '160px' }}>
            <g opacity="0.85">
              <path d="M160 0 C120 20 80 60 70 120 M160 30 C130 50 100 80 90 140" stroke="#7A1C29" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
              <path d="M120 0 Q140 30 160 40 Q130 50 120 0 Z" fill="#7A1C29" opacity="0.8" />
              <path d="M140 10 Q155 35 160 60 Q135 50 140 10 Z" fill="#A82B3E" opacity="0.7" />
              <path d="M100 20 Q125 30 135 55 Q110 45 100 20 Z" fill="#D4AF37" opacity="0.75" />
              <circle cx="145" cy="25" r="7" fill="#7A1C29" />
              <circle cx="145" cy="25" r="3" fill="#FFD700" />
              <circle cx="125" cy="45" r="5" fill="#A82B3E" />
              <path d="M90 60 C110 50 130 70 150 75" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#A82B3E', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              HAPPY FAMILIES. BRIGHTER TOMORROWS.
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', color: '#7A1C29', margin: '0.2rem 0', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              Success Stories
            </h2>
            <span style={{ fontSize: '0.875rem', color: '#6B5E5F' }}>Real people, Real happiness</span>
          </div>

          {/* Slider Layout with Floating Arrow Buttons */}
          <div className="success-slider-container">
            
            {/* Left Chevron Button */}
            <button
              onClick={handlePrevStory}
              className="slider-arrow-btn prev-arrow"
              aria-label="Previous Success Story"
            >
              <ChevronLeft size={22} color="#4A3E40" />
            </button>

            {/* Central Success Story Card */}
            <div className="success-story-card">
              
              {/* Couple Image Left */}
              <div className="success-card-img-wrapper">
                <img
                  src={currentStory.image}
                  alt={`${currentStory.couple} Matrimony Match`}
                />
              </div>

              {/* Testimonial Quote Right */}
              <div className="success-card-content">
                
                {/* Top Quote Mark */}
                <div style={{ color: '#A82B3E', fontSize: '2.8rem', lineHeight: 0.8, fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  “
                </div>

                <p className="success-quote-text">
                  {currentStory.quote}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.975rem', color: '#7A1C29' }}>
                    — {currentStory.couple}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: '#7A6B6D', marginTop: '0.15rem' }}>
                    {currentStory.date}
                  </div>
                </div>

                {/* Bottom-right Golden Quote Mark */}
                <div className="quote-mark-bottom">
                  ”
                </div>

              </div>

            </div>

            {/* Right Chevron Button */}
            <button
              onClick={handleNextStory}
              className="slider-arrow-btn next-arrow"
              aria-label="Next Success Story"
            >
              <ChevronRight size={22} color="#4A3E40" />
            </button>

          </div>

          {/* Bottom Pagination Dots & Read More Button */}
          <div className="success-stories-footer">
            <div className="pagination-dots">
              {SUCCESS_STORIES.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`dot ${activeStoryIndex === idx ? 'active' : ''}`}
                />
              ))}
            </div>

            <Link
              to="/about"
              className="btn btn-outline btn-sm"
              style={{ borderColor: '#7A1C29', color: '#7A1C29', borderRadius: '8px', fontWeight: 700, padding: '0.45rem 1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              Read More Stories <ChevronRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. TAKE THE FIRST STEP TOWARDS A HAPPIER TOMORROW CTA BANNER matching reference image */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FAF7F2' }}>
        <div className="container">
          <div
            className="card"
            style={{
              padding: '3rem 3.5rem',
              background: 'linear-gradient(135deg, #7A1C29 0%, #A32338 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem',
              boxShadow: '0 16px 40px rgba(122, 28, 41, 0.25)'
            }}
          >
            <div>
              <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                Take the First Step Towards <br /> a Happier Tomorrow
              </h2>
              <p style={{ color: '#FDF2F4', fontSize: '0.95rem', margin: 0 }}>
                Join thousands of happy families who found their perfect match.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link
                to="/register"
                className="btn"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#7A1C29',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  padding: '0.85rem 2.25rem',
                  borderRadius: '30px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                }}
              >
                Register Free Now →
              </Link>
              <div style={{ fontSize: '0.725rem', color: '#F8DFE3', marginTop: '0.5rem' }}>
                It's quick, easy and secure!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Express Interest Modal */}
      <Modal
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        title={`Express Interest in ${selectedProfile?.name}`}
      >
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows={4}
            value={interestMessage}
            onChange={(e) => setInterestMessage(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setSelectedProfile(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSendInterest}>Send Interest Request</button>
        </div>
      </Modal>

    </div>
  );
};

