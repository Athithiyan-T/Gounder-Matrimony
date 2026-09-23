import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Users, Heart, Sprout, Check } from 'lucide-react';

// Lotus SVG Icon Helper
const LotusIcon = ({ size = 24, color = "#C59B27" }) => (
  <svg width={size} height={Math.round(size * 0.75)} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C16 2 18.5 7.5 22 9.5C25.5 11.5 30 11 30 11C30 11 26.5 15 22 15.5C17.5 16 16 21 16 21C16 21 14.5 16 10 15.5C5.5 15 2 11 2 11C2 11 6.5 11.5 10 9.5C13.5 7.5 16 2 16 2Z" fill={color} opacity="0.95" />
    <path d="M16 5C16 5 18 9.5 21 11.5C24 13.5 28 13.5 28 13.5C28 13.5 24.5 16.5 21 17C17.5 17.5 16 21.5 16 21.5C16 21.5 14.5 17.5 11 17C7.5 16.5 4 13.5 4 13.5C4 13.5 8 13.5 11 11.5C14 9.5 16 5 16 5Z" stroke="#E5C158" strokeWidth="0.75" />
    <circle cx="16" cy="12" r="2.5" fill="#FFE899" />
  </svg>
);

// Social Media Icons
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.237a9.96 9.96 0 0 0 4.779 1.221h.005c5.505 0 9.988-4.478 9.989-9.984A9.98 9.98 0 0 0 12.012 2zm.005 18.257h-.004a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.134.741.755-3.045-.197-.314a8.27 8.27 0 0 1-1.267-4.316c0-4.562 3.712-8.274 8.275-8.274 4.561 0 8.273 3.712 8.273 8.274 0 4.563-3.712 8.274-8.273 8.274z"/>
  </svg>
);

export const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleFooterNav = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="gm-footer">
      {/* Decorative Top Border Wave Accent */}
      <div className="gm-footer-top-wave">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 48C240 16 480 0 720 16C960 32 1200 16 1440 32V0H0V48Z" fill="var(--color-bg-main)" />
          <path d="M0 46C240 14 480 -2 720 14C960 30 1200 14 1440 30" stroke="#D4AF37" strokeWidth="2" opacity="0.65" fill="none" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="container gm-footer-container">
        
        {/* Background Decorative Overlay Artworks */}
        <div className="gm-footer-bg-left" style={{ backgroundImage: `url('/temple-footer.jpg')` }}>
          <div className="gm-footer-temple-script">
            Better Families<br />Brighter Tomorrows
          </div>
        </div>

        <div className="gm-footer-bg-right" style={{ backgroundImage: `url('/couple-footer.jpg')` }}>
          <div className="gm-footer-couple-script">
            Tradition Brings Us Together <span className="gm-heart-doodle">♡</span>
          </div>
        </div>

        {/* 5 Column Main Grid */}
        <div className="gm-footer-grid">
          
          {/* Column 1: Logo & Brand Description */}
          <div className="gm-footer-col gm-footer-brand-col">
            <div className="gm-footer-logo-wrapper">
              <div className="gm-logo-badge">
                <div className="gm-logo-badge-inner">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1.5" fill="#3D0610" />
                    <path d="M12 6C9.23858 6 7 8.23858 7 11C7 13.5 9 15.5 11 17L12 18L13 17C15 15.5 17 13.5 17 11C17 8.23858 14.7614 6 12 6Z" fill="#D4AF37" opacity="0.9" />
                    <path d="M10 10C10 9 11 8 12 8C13 8 14 9 14 10C14 11.5 12 13 12 13C12 13 10 11.5 10 10Z" fill="#3D0610" />
                  </svg>
                </div>
              </div>
              <div className="gm-logo-text-block">
                <div className="gm-logo-title">
                  GOUNDER <span className="gm-logo-gold">MATRIMONY</span>
                </div>
                <div className="gm-logo-subtitle">
                  TRADITION | TRUST | TOGETHER FOREVER
                </div>
              </div>
            </div>

            <p className="gm-footer-brand-desc">
              A trusted matrimonial platform for Gounder families, connecting hearts with shared values and a brighter tomorrow.
            </p>

            {/* Social Icons Row */}
            <div className="gm-footer-socials">
              <a href="#facebook" aria-label="Facebook" className="gm-social-btn">
                <FacebookIcon />
              </a>
              <a href="#instagram" aria-label="Instagram" className="gm-social-btn">
                <InstagramIcon />
              </a>
              <a href="#youtube" aria-label="YouTube" className="gm-social-btn">
                <YoutubeIcon />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="gm-social-btn">
                <LinkedinIcon />
              </a>
              <a href="#whatsapp" aria-label="WhatsApp" className="gm-social-btn">
                <WhatsappIcon />
              </a>
            </div>
          </div>

          <div className="gm-v-divider"></div>

          {/* Column 2: Quick Links */}
          <div className="gm-footer-col">
            <div className="gm-col-header">
              <LotusIcon size={22} color="#C59B27" />
              <h3>Quick Links</h3>
            </div>
            <ul className="gm-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/profiles">Search Profiles</Link></li>
              <li><Link to="/membership">Membership Plans</Link></li>
              <li><span onClick={() => handleFooterNav('success-stories')} className="gm-link-action">Success Stories</span></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="gm-v-divider"></div>

          {/* Column 3: Help & Support */}
          <div className="gm-footer-col">
            <div className="gm-col-header">
              <LotusIcon size={22} color="#C59B27" />
              <h3>Help & Support</h3>
            </div>
            <ul className="gm-footer-links">
              <li><Link to="/how-it-works">FAQ</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/about">Safety Tips</Link></li>
              <li><Link to="/about">Privacy Policy</Link></li>
              <li><Link to="/about">Terms & Conditions</Link></li>
              <li><Link to="/contact">Report a Problem</Link></li>
            </ul>
          </div>

          <div className="gm-v-divider"></div>

          {/* Column 4: For Members */}
          <div className="gm-footer-col">
            <div className="gm-col-header">
              <LotusIcon size={22} color="#C59B27" />
              <h3>For Members</h3>
            </div>
            <ul className="gm-footer-links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register Free</Link></li>
              <li><Link to="/how-it-works">Profile Creation Guide</Link></li>
              <li><Link to="/how-it-works">Verification Process</Link></li>
              <li><Link to="/membership">Premium Benefits</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          <div className="gm-v-divider"></div>

          {/* Column 5: Stay Updated (Newsletter) */}
          <div className="gm-footer-col gm-footer-newsletter-col">
            <div className="gm-col-header gm-header-with-icon">
              <div className="gm-mail-badge">
                <Mail size={16} color="#FFE899" />
              </div>
              <h3>Stay Updated</h3>
            </div>

            <p className="gm-newsletter-desc">
              Get the latest updates, success stories and matrimony tips.
            </p>

            <form onSubmit={handleSubscribe} className="gm-newsletter-form">
              <div className="gm-input-pill-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="gm-newsletter-input"
                  required
                />
                <button type="submit" className="gm-newsletter-submit" aria-label="Subscribe">
                  {subscribed ? <Check size={16} color="#FFFFFF" /> : <ArrowRight size={16} color="#FFFFFF" />}
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="gm-subscribe-toast">
                Thank you for subscribing! ✨
              </div>
            )}

            {/* Lotus Decorative Line */}
            <div className="gm-newsletter-lotus-divider">
              <span className="gm-divider-line"></span>
              <LotusIcon size={20} color="#D4AF37" />
              <span className="gm-divider-line"></span>
            </div>
          </div>

        </div>

        {/* Middle Trust Stats Strip */}
        <div className="gm-footer-trust-banner">
          <div className="gm-trust-item">
            <div className="gm-trust-icon">
              <Users size={22} />
            </div>
            <div className="gm-trust-text">
              <div className="gm-trust-val">25,000+</div>
              <div className="gm-trust-lbl">Happy Families</div>
            </div>
          </div>

          <div className="gm-trust-divider"></div>

          <div className="gm-trust-item">
            <div className="gm-trust-icon">
              <Heart size={22} fill="rgba(212,175,55,0.2)" />
            </div>
            <div className="gm-trust-text">
              <div className="gm-trust-sub">Trusted by</div>
              <div className="gm-trust-lbl-bold">Gounder Community</div>
            </div>
          </div>

          <div className="gm-trust-divider"></div>

          <div className="gm-trust-item">
            <div className="gm-trust-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="gm-trust-text">
              <div className="gm-trust-val">100%</div>
              <div className="gm-trust-lbl">Secure & Private</div>
            </div>
          </div>

          <div className="gm-trust-divider"></div>

          <div className="gm-trust-item">
            <div className="gm-trust-icon">
              <Sprout size={22} />
            </div>
            <div className="gm-trust-text">
              <div className="gm-trust-sub">Built on</div>
              <div className="gm-trust-lbl-bold">Traditional Values</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="gm-footer-bottom-bar">
          <div className="gm-copyright">
            © {new Date().getFullYear()} Gounder Matrimony. All rights reserved.
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
