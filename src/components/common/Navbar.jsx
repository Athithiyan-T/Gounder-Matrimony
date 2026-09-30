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
          
          {/* Brand Logo matching exact image: Heart emblem inside maroon circle + GOUNDER MATRIMONY title + tagline */}
          <Link to="/" onClick={() => handleNavClick('top')} className="brand-logo">
            <div className="brand-icon-wrapper">
              <Heart size={20} fill="#FFD700" color="#FFD700" />
            </div>
            <div className="brand-text-wrapper">
              <div className="brand-title-flex">
                <span className="brand-title-gounder">GOUNDER</span>
                <span className="brand-title-matrimony">MATRIMONY</span>
              </div>
              <div className="brand-tagline">Tradition | Trust | Together Forever</div>
            </div>
          </Link>

          {/* Desktop Nav Links matching exact reference image with hover animation */}
          <nav className="desktop-nav">
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
                <User size={16} color="#FFD700" />
                <span className="nav-btn-text">Account</span>
              </Link>
            ) : (
              <Link to="/login" className="nav-account-btn" title="Login to Account">
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div className="brand-logo" style={{ fontSize: '1.1rem' }}>
            <div className="brand-icon-wrapper" style={{ width: '38px', height: '38px' }}>
              <Heart size={18} fill="#FFD700" color="#FFD700" />
            </div>
            <div>
              <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.5px' }}>GOUNDER MATRIMONY</div>
              <div className="brand-tagline" style={{ display: 'block', fontSize: '0.68rem' }}>Tradition | Trust | Together Forever</div>
            </div>
          </div>
          <button onClick={toggleMobileMenu} className="mobile-close-btn" aria-label="Close menu">
            <X size={22} color="var(--color-primary)" />
          </button>
        </div>

        <hr style={{ borderColor: 'rgba(122,28,41,0.1)', marginBottom: '1rem' }} />

        <div className="mobile-nav-list">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={toggleMobileMenu}
            className={`mobile-nav-item ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About Us
          </Link>
          <Link
            to="/membership"
            onClick={toggleMobileMenu}
            className={`mobile-nav-item ${location.pathname === '/membership' ? 'active' : ''}`}
          >
            Membership
          </Link>
          <span
            onClick={() => handleNavClick('success-stories')}
            className="mobile-nav-item"
          >
            Success Stories
          </span>
          <Link
            to="/contact"
            onClick={toggleMobileMenu}
            className={`mobile-nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
          <Link
            to="/profiles"
            onClick={toggleMobileMenu}
            className="mobile-nav-item highlight"
          >
            Search Matching Profiles
          </Link>
        </div>

        <div className="mobile-drawer-footer">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={toggleMobileMenu} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <User size={18} />
                My Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                  toggleMobileMenu();
                }}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <LogIn size={18} />
                Login
              </Link>
              <Link to="/register" onClick={toggleMobileMenu} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <UserPlus size={18} />
                Register Free
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};


     