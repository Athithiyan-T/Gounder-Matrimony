import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Phone, RefreshCw, CheckCircle2, ArrowRight, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/common/Modal';
import { sendOtpApi, verifyOtpApi } from '../services/api';

export const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast, loginDemoUser } = useAuth();

  const initialMobile = location.state?.mobileNumber || '9876543210';
  const [mobileNumber, setMobileNumber] = useState(initialMobile);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isChangingPhone, setIsChangingPhone] = useState(false);
  const [newMobile, setNewMobile] = useState('');

  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleDigitChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const [verifying, setVerifying] = useState(false);

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await sendOtpApi(mobileNumber);
      setTimer(45);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
      showToast('A new OTP has been sent to your mobile number via Django API', 'info');
    } catch (err) {
      showToast(err.message || 'Failed to resend OTP', 'error');
    }
  };

  const isRegistration = location.state?.isRegistration || location.state?.fromRegister;

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');
    if (enteredCode.length < 6) {
      showToast('Please enter all 6 digits of the OTP code', 'warning');
      return;
    }

    setVerifying(true);
    try {
      await verifyOtpApi(mobileNumber, enteredCode);
      
      showToast('OTP Verified Successfully! Welcome to your Gounder Matrimony Account', 'success');
      loginDemoUser('GM-1001');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Invalid OTP code. Please check and try again.', 'error');
    } finally {
      setVerifying(false);
    }
  };

  const handleChangePhoneSubmit = async (e) => {
    e.preventDefault();
    if (newMobile.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    try {
      await sendOtpApi(newMobile);
      setMobileNumber(newMobile);
      setIsChangingPhone(false);
      setTimer(45);
      setCanResend(false);
      showToast(`Mobile number updated to +91 ${newMobile}. OTP sent!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to send OTP to new mobile number', 'error');
    }
  };

  const maskedPhone = `+91 ${mobileNumber.slice(0, 2)}****${mobileNumber.slice(-4)}`;

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '4rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        
        <div className="card" style={{ padding: '2.5rem', background: '#FFF', textAlign: 'center' }}>
          
          {/* Icon Header */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <ShieldCheck size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Mobile OTP Verification
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            We have sent a 6-digit verification code to <br />
            <strong style={{ color: 'var(--text-main)' }}>{maskedPhone}</strong>
            <button
              onClick={() => setIsChangingPhone(true)}
              style={{ background: 'none', border: 'none', color: 'var(--color-gold-hover)', fontSize: '0.85rem', fontWeight: 700, marginLeft: '0.5rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
            >
              <Edit3 size={14} /> Change
            </button>
          </p>

          {/* Frontend Demo Banner */}
          <div style={{ background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.825rem', color: '#5C4A0E', marginBottom: '1.75rem' }}>
            <strong>Demo Simulation:</strong> Enter any 6 digits (e.g. <code>123456</code>) to complete verification.
          </div>

          <form onSubmit={handleVerify}>
            
            {/* 6 Digit Input Grid */}
            <div style={{ display: 'flex', gap: 'clamp(0.25rem, 1.5vw, 0.6rem)', justifyContent: 'center', marginBottom: '2rem' }}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  style={{
                    width: 'clamp(36px, 11vw, 46px)',
                    height: 'clamp(44px, 13vw, 54px)',
                    fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    border: digit ? '2px solid #7A1C29' : '1.5px solid #E2D9CF',
                    borderRadius: '8px',
                    backgroundColor: digit ? '#FDF2F4' : '#FFF',
                    outline: 'none',
                    color: '#7A1C29'
                  }}
                />
              ))}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={20} />
              Verify & Access Dashboard
            </button>

          </form>

          {/* Resend & Timer Footer */}
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {!canResend ? (
              <span>Resend OTP available in <strong style={{ color: 'var(--color-primary)' }}>{timer}s</strong></span>
            ) : (
              <button
                onClick={handleResend}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <RefreshCw size={16} /> Resend OTP Code
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Change Mobile Modal */}
      <Modal
        isOpen={isChangingPhone}
        onClose={() => setIsChangingPhone(false)}
        title="Change Registered Mobile Number"
      >
        <form onSubmit={handleChangePhoneSubmit}>
          <div className="form-group">
            <label className="form-label">New 10-Digit Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="e.g. 9876543210"
              value={newMobile}
              onChange={(e) => setNewMobile(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsChangingPhone(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send OTP to New Number
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
