import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, logout } = useAuth();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Helper for navigating to section IDs on the home page
  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (sectionId === 'top') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar-sticky">
        <div className="container nav-container">
          
          {/* Brand Logo matching exact image: Heart icon emblem + Gounder Matrimony title + tagline */}
          <Link to="/" onClick={() => handleNavClick('top')} className="brand-logo">
            <div className="brand-icon-wrapper">
              <Heart size={22} fill="currentColor" />
            </div>
            <div className="brand-text-wrapper">
              <div className="brand-title-flex">
                <span className="brand-title-gounder">Gounder</span>
                <span className="brand-title-matrimony">Matrimony</span>
              </div>
              <div className="brand-tagline">Tradition | Trust | Together Forever</div>
            </div>
          </Link>

          {/* Desktop Nav Links matching exact image reference */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/membership"
                  className={`nav-link ${location.pathname === '/membership' ? 'active' : ''}`}
                >
                  Membership
                </Link>
              </li>
              <li>
                <span
                  onClick={() => handleNavClick('success-stories')}
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  Success Stories
                </span>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop & Mobile Right Action Buttons */}
          <div className="nav-actions">
            {isLoggedIn ? (
              <Link to="/dashboard" className="nav-account-btn" title="My Account & Profile">
                <User size={17} color="#FFD700" />
                <span className="nav-btn-text">Account</span>
              </Link>
            ) : (
              <Link to="/login" className="nav-account-btn" title="Login to Account">
                <LogIn size={17} color="#FFD700" />
                <span className="nav-btn-text">Login</span>
              </Link>
            )}

            {/* Mobile Navigation Drawer Toggle Button */}
            <button
              className="mobile-nav-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle Navigation Slide Drawer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Backdrop & Slide Bar Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={toggleMobileMenu} />
      )}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div className="brand-logo" style={{ fontSize: '1.15rem' }}>
            <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
              <Heart size={18} fill="currentColor" />
            </div>
            <div>
              <div style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Gounder Matrimony</div>
              <div className="brand-tagline">Tradition Meets Togetherness</div>
            </div>
          </div>
          <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={24} color="var(--color-primary)" />
          </button>
        </div>

        <hr style={{ borderColor: 'rgba(122,28,41,0.1)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <Link
            to="/"
            onClick={toggleMobileMenu}
            style={{ fontWeight: 600, fontSize: '1rem', color: location.pathname === '/' ? 'var(--color-primary)' : 'inherit', textDecoration: 'none' }}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={toggleMobileMenu}
            style={{ fontWeight: 600, fontSize: '1rem', color: location.pathname === '/about' ? 'var(--color-primary)' : 'inherit', textDecoration: 'none' }}
          >
            About Us
          </Link>
          <Link
            to="/membership"
            onClick={toggleMobileMenu}
            style={{ fontWeight: 600, fontSize: '1rem', color: location.pathname === '/membership' ? 'var(--color-primary)' : 'inherit', textDecoration: 'none' }}
          >
            Membership Plans
          </Link>
          <Link
            to="/how-it-works"
            onClick={toggleMobileMenu}
            style={{ fontWeight: 600, fontSize: '1rem', color: location.pathname === '/how-it-works' ? 'var(--color-primary)' : 'inherit', textDecoration: 'none' }}
          >
            How It Works & FAQ
          </Link>
          <span
            onClick={() => handleNavClick('success-stories')}
            style={{ fontWeight: 600, fontSize: '1rem', cursor: 'pointer', padding: '0.2rem 0' }}
          >
            Success Stories
          </span>
          <Link
            to="/contact"
            onClick={toggleMobileMenu}
            style={{ fontWeight: 600, fontSize: '1rem', color: location.pathname === '/contact' ? 'var(--color-primary)' : 'inherit', textDecoration: 'none' }}
          >
            Contact Support
          </Link>

          <Link
            to="/profiles"
            onClick={toggleMobileMenu}
            style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-gold-hover)', textDecoration: 'none' }}
          >
            Search Matching Profiles
          </Link>

          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={toggleMobileMenu}
              style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-primary)', textDecoration: 'none' }}
            >
              My Dashboard & Profile
            </Link>
          )}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px dashed #E2D9CF' }}>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={toggleMobileMenu} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#7A1C29', color: '#FFF', fontWeight: 700 }}>
                <User size={18} />
                My Account & Profile
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                  toggleMobileMenu();
                }}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', backgroundColor: '#FDF2F4', color: '#7A1C29', border: '1px solid #F3CFD4', fontWeight: 700 }}
              >
                <LogOut size={18} />
                Logout Account
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#7A1C29', color: '#FFF', fontWeight: 700 }}>
                <LogIn size={18} />
                Login to Account
              </Link>
              <Link to="/register" onClick={toggleMobileMenu} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}>
                <UserPlus size={18} />
                Register Free Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

