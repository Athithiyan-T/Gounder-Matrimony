import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Sparkles, UserCheck, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendOtpApi } from '../services/api';

export const Login = () => {
  const navigate = useNavigate();
  const { loginDemoUser, showToast } = useAuth();
  const [identifier, setIdentifier] = useState('9876543210');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || identifier.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }

    setLoading(true);
    try {
      await sendOtpApi(identifier);
      showToast('Login OTP sent successfully to your mobile number!', 'success');
      navigate('/verify-otp', {
        state: {
          mobileNumber: identifier
        }
      });
    } catch (err) {
      showToast(err.message || 'Failed to send OTP to backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (profileId) => {
    loginDemoUser(profileId);
    navigate('/dashboard');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '3.5rem 1rem', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        <div className="card" style={{ padding: '2.25rem 1.75rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EFE4DC', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#7A1C29',
              color: '#FFD700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.1rem auto',
              boxShadow: '0 4px 14px rgba(122, 28, 41, 0.25)'
            }}>
              <Phone size={26} />
            </div>
            <h2 style={{ fontSize: '1.65rem', color: '#7A1C29', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              Member Login
            </h2>
            <p style={{ color: '#7A6B6D', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
              Enter your mobile number to receive a secure 6-digit OTP code to enter your profile account.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: 700, color: '#33292A', marginBottom: '0.4rem' }}>
                10-Digit Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="e.g. 9876543210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    paddingLeft: '2.6rem',
                    paddingRight: '0.85rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}
                  required
                />
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7A1C29' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{
                width: '100%',
                backgroundColor: '#7A1C29',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '0.8rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(122, 28, 41, 0.2)'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Get Mobile OTP <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security & Verification Callout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', color: '#2E7D32', fontSize: '0.775rem', fontWeight: 700 }}>
            <ShieldCheck size={16} />
            <span>Secure 100% Instant Mobile OTP Authentication</span>
          </div>

          {/* Quick Demo Reviewer Logins */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px dashed #E2D9CF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', color: '#856404', fontWeight: 700, marginBottom: '0.75rem' }}>
              <Sparkles size={15} color="#D4AF37" />
              <span>Quick Reviewer Demo Logins:</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('GM-1001')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '0.825rem', padding: '0.45rem 0.75rem' }}
              >
                <UserCheck size={14} color="#7A1C29" />
                Karthik (Groom - Kongu Vellalar BC)
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('GM-1002')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '0.825rem', padding: '0.45rem 0.75rem' }}
              >
                <UserCheck size={14} color="#7A1C29" />
                Priya (Bride - Kongu Vellalar BC)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
