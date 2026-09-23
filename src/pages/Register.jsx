import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Save, ShieldCheck, UserCheck, Heart, User, Sparkles, Loader2 } from 'lucide-react';
import { GOUNDER_COMMUNITIES, DISTRICTS, EDUCATION_LEVELS, OCCUPATIONS, MARITAL_STATUSES } from '../data/communities';
import { useAuth } from '../context/AuthContext';
import { CommunityBadge } from '../components/common/CommunityBadge';
import { updateProfileApi } from '../services/api';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveDraft, showToast, loginDemoUser } = useAuth();

  const verifiedMobile = location.state?.mobileNumber || '9876543210';
  const isMobileVerified = location.state?.isVerified || false;

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    profileFor: 'Self',
    gender: 'Female',
    fullName: '',
    dob: '1998-05-15',
    mobileNumber: verifiedMobile,
    email: 'user@example.com',
    password: '',
    confirmPassword: '',
    subCommunityId: 'kongu-vellalar',
    nativePlace: 'Coimbatore',
    currentLocation: 'Coimbatore, Tamil Nadu',
    height: "5' 5\" (165 cm)",
    education: 'B.E. Computer Science',
    occupation: 'Software Engineer',
    incomeRange: '15-25L',
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    aboutMe: 'I am a well-educated Gounder professional looking for a life partner with good family background.',
    fatherOccupation: 'Business Owner & Farm Owner',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother (B.E)',
    familyType: 'Joint Family',
    familyLocation: 'Coimbatore',
    familyDescription: 'Traditional Kongu family with high values and respect for culture.',
    preferredGender: 'Male',
    preferredAgeMin: 26,
    preferredAgeMax: 32,
    preferredHeight: "5' 8\" to 6' 0\"",
    preferredSubCommunity: 'Kongu Vellalar Gounder',
    preferredEducation: 'B.E / B.Tech / MBA / MBBS',
    preferredOccupation: 'Software / Engineer / Business / Govt',
    preferredLocation: 'Coimbatore / Erode / Tiruppur / Overseas',
    preferredMaritalStatus: 'Never Married',
    customExpectations: 'Looking for a supportive, family-oriented partner.'
  });

  const selectedCommunityObj = GOUNDER_COMMUNITIES.find(c => c.id === formData.subCommunityId) || GOUNDER_COMMUNITIES[0];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    // Basic Step Validation
    if (currentStep === 2 && !formData.fullName) {
      showToast('Please enter your full name', 'warning');
      return;
    }
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    saveDraft(formData);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (!formData.fullName || formData.fullName.trim().length === 0) {
      showToast('Please enter your full name before submitting', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await updateProfileApi(formData);
      showToast('🎉 Profile created successfully! Welcome to Gounder Matrimony.', 'success');
      loginDemoUser('GM-1001');
      navigate('/dashboard');
    } catch (err) {
      console.warn('Backend update notice:', err);
      showToast('Profile created successfully! Welcome to Gounder Matrimony.', 'success');
      loginDemoUser('GM-1001');
      navigate('/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  const STEPS_LIST = [
    "Account Type",
    "Basic Info",
    "Community Details",
    "Personal Details",
    "Family Details",
    "Partner Preferences"
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header Card */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="subtitle-badge">Free Community Registration</span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Create Your Gounder Matrimony Profile
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Join thousands of verified Gounder brides and grooms seeking authentic life matches.
          </p>
        </div>

        {/* Multi-Step Visual Progress Bar */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', background: '#FFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            {/* Step Nodes */}
            {STEPS_LIST.map((stepTitle, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div
                  key={idx}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 2 }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? 'var(--color-primary)' : isCurrent ? 'var(--color-gold)' : 'var(--color-bg-alt)',
                    color: isCompleted || isCurrent ? '#FFF' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    border: isCurrent ? '3px solid var(--color-primary)' : '2px solid transparent',
                    transition: 'all 0.3s ease'
                  }}>
                    {isCompleted ? <Check size={18} /> : stepNum}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--color-primary-dark)' : 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
                    {stepTitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Form Wrapper Card */}
        <div className="card" style={{ padding: '2.5rem', background: '#FFF' }}>
          <form onSubmit={handleSubmitProfile}>
            
            {/* STEP 1: ACCOUNT TYPE & PROFILE FOR */}
            {currentStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold-border)', paddingBottom: '0.5rem' }}>
                  Step 1: Select Account Type & Creator
                </h3>

                <div className="form-group">
                  <label className="form-label">This Matrimonial Profile is being created for</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                    {['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative'].map(creator => (
                      <button
                        key={creator}
                        type="button"
                        className={`btn ${formData.profileFor === creator ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleChange('profileFor', creator)}
                      >
                        {creator}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Gender of the Candidate</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div
                      onClick={() => { handleChange('gender', 'Female'); handleChange('preferredGender', 'Male'); }}
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: formData.gender === 'Female' ? '2px solid var(--color-primary)' : '1.5px solid #E2D9CF',
                        backgroundColor: formData.gender === 'Female' ? 'var(--color-primary-light)' : '#FFF',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <User size={36} color={formData.gender === 'Female' ? 'var(--color-primary)' : '#888'} style={{ margin: '0 auto 0.5rem auto' }} />
                      <h4 style={{ margin: 0, color: 'var(--color-primary-dark)' }}>Bride (Female)</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Seeking Groom</span>
                    </div>

                    <div
                      onClick={() => { handleChange('gender', 'Male'); handleChange('preferredGender', 'Female'); }}
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: formData.gender === 'Male' ? '2px solid var(--color-primary)' : '1.5px solid #E2D9CF',
                        backgroundColor: formData.gender === 'Male' ? 'var(--color-primary-light)' : '#FFF',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <User size={36} color={formData.gender === 'Male' ? 'var(--color-primary)' : '#888'} style={{ margin: '0 auto 0.5rem auto' }} />
                      <h4 style={{ margin: 0, color: 'var(--color-primary-dark)' }}>Groom (Male)</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Seeking Bride</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: BASIC INFORMATION */}
            {currentStep === 2 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold-border)', paddingBottom: '0.5rem' }}>
                  Step 2: Basic Contact & Security Credentials
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name of Candidate *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Karthik Subramanian"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dob}
                      onChange={(e) => handleChange('dob', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number (for OTP Verification) *</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) => handleChange('mobileNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Create Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: COMMUNITY DETAILS (Gounder Classification Selector) */}
            {currentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', borderBottom: '2px solid var(--color-gold-border)', paddingBottom: '0.5rem' }}>
                  Step 3: Gounder Community & Regional Heritage
                </h3>

                <div style={{ background: 'var(--color-bg-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ShieldCheck size={24} color="var(--color-gold)" />
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    Selection is categorized based on reference community records (Kongu Vellalar BC, Vannia MBC, Kurumba MBC, Vettuva MBC, Punnan Vettuva MBC).
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Gounder Sub-Community *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                    {GOUNDER_COMMUNITIES.map(c => (
                      <div
                        key={c.id}
                        onClick={() => handleChange('subCommunityId', c.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          border: formData.subCommunityId === c.id ? '2px solid var(--color-primary)' : '1.5px solid #E2D9CF',
                          backgroundColor: formData.subCommunityId === c.id ? 'var(--color-primary-light)' : '#FFF',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                            {c.name}
                          </span>
                          <span className={c.badgeClass}>{c.categoryCode}</span>
                        </div>
                        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{c.category}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Classification Card Summary */}
                <div style={{ background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: 0, color: '#4A3B0A', fontSize: '0.95rem' }}>
                    Selected Category: {selectedCommunityObj.name} - <span style={{ color: 'var(--color-primary-dark)' }}>{selectedCommunityObj.category}</span>
                  </h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.825rem', color: '#6A5B2A' }}>
                    {selectedCommunityObj.description}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Native Place / Town</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Erode, Kangeyam, Pollachi..."
                      value={formData.nativePlace}
                      onChange={(e) => handleChange('nativePlace', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Current Resident Location</label>
                    <select
                      className="form-control"
                      value={formData.currentLocation}
                      onChange={(e) => handleChange('currentLocation', e.target.value)}
                    >
                      {DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: PERSONAL DETAILS */}
            {currentStep === 4 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold-border)', paddingBottom: '0.5rem' }}>
                  Step 4: Education, Profession & Personal Background
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Height</label>
                    <select
                      className="form-control"
                      value={formData.height}
                      onChange={(e) => handleChange('height', e.target.value)}
                    >
                      <option value="5' 0&quot; (152 cm)">5' 0" (152 cm)</option>
                      <option value="5' 3&quot; (160 cm)">5' 3" (160 cm)</option>
                      <option value="5' 5&quot; (165 cm)">5' 5" (165 cm)</option>
                      <option value="5' 8&quot; (172 cm)">5' 8" (172 cm)</option>
                      <option value="5' 11&quot; (180 cm)">5' 11" (180 cm)</option>
                      <option value="6' 0&quot; (183 cm)">6' 0" (183 cm)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Marital Status</label>
                    <select
                      className="form-control"
                      value={formData.maritalStatus}
                      onChange={(e) => handleChange('maritalStatus', e.target.value)}
                    >
                      {MARITAL_STATUSES.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Education Qualification</label>
                    <select
                      className="form-control"
                      value={formData.education}
                      onChange={(e) => handleChange('education', e.target.value)}
                    >
                      {EDUCATION_LEVELS.map(ed => (
                        <option key={ed} value={ed}>{ed}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Occupation Field</label>
                    <select
                      className="form-control"
                      value={formData.occupation}
                      onChange={(e) => handleChange('occupation', e.target.value)}
                    >
                      {OCCUPATIONS.map(occ => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Annual Income Range</label>
                  <select
                    className="form-control"
                    value={formData.incomeRange}
                    onChange={(e) => handleChange('incomeRange', e.target.value)}
                  >
                    <option value="5-10L">₹ 5 - 10 Lakhs per annum</option>
                    <option value="10-15L">₹ 10 - 15 Lakhs per annum</option>
                    <option value="15-25L">₹ 15 - 25 Lakhs per annum</option>
                    <option value="25L+">₹ 25+ Lakhs per annum</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">About Candidate (Personal Bio)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Describe hobbies, personality traits, cultural interests..."
                    value={formData.aboutMe}
                    onChange={(e) => handleChange('aboutMe', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 5: FAMILY DETAILS */}
            {currentStep === 5 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold-border)', paddingBottom: '0.5rem' }}>
                  Step 5: Family Status & Relatives
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Father's Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Farm Owner, Businessman..."
                      value={formData.fatherOccupation}
                      onChange={(e) => handleChange('fatherOccupation', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mother's Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Homemaker, Teacher..."
                      value={formData.motherOccupation}
                      onChange={(e) => handleChange('motherOccupation', e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Siblings Information</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 1 Sister (Married)"
                      value={formData.siblings}
                      onChange={(e) => handleChange('siblings', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Family Setup</label>
                    <select
                      className="form-control"
                      value={formData.familyType}
                      onChange={(e) => handleChange('familyType', e.target.value)}
                    >
                      <option value="Joint Family">Joint Family</option>
                      <option value="Nuclear Family">Nuclear Family</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Short Family Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Brief details about family roots and traditions..."
                    value={formData.familyDescription}
                    onChange={(e) => handleChange('familyDescription', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 6: PARTNER PREFERENCES */}
            {currentStep === 6 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold-border)', paddingBottom: '0.5rem' }}>
                  Step 6: Partner Preferences & Expectations
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Preferred Partner Age Range</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.preferredAgeMin}
                        onChange={(e) => handleChange('preferredAgeMin', e.target.value)}
                      />
                      <span>to</span>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.preferredAgeMax}
                        onChange={(e) => handleChange('preferredAgeMax', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Sub-Community</label>
                    <select
                      className="form-control"
                      value={formData.preferredSubCommunity}
                      onChange={(e) => handleChange('preferredSubCommunity', e.target.value)}
                    >
                      <option value="Kongu Vellalar Gounder">Kongu Vellalar Gounder</option>
                      <option value="Vannia Gounder">Vannia Gounder (Vanniyar)</option>
                      <option value="Kurumba Gounder">Kurumba Gounder</option>
                      <option value="Vettuva Gounder">Vettuva Gounder</option>
                      <option value="Punnan Vettuva Gounder">Punnan Vettuva Gounder</option>
                      <option value="Any Gounder Sub-group">Any Gounder Sub-group</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Preferred Education</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.preferredEducation}
                      onChange={(e) => handleChange('preferredEducation', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Locations</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.preferredLocation}
                      onChange={(e) => handleChange('preferredLocation', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Custom Requirements</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Describe specific preferences for family values, horoscope alignment, habits..."
                    value={formData.customExpectations}
                    onChange={(e) => handleChange('customExpectations', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ACTION BUTTONS & DRAFT SAVE */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E2D9CF', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                {currentStep > 1 && (
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                    <ArrowLeft size={16} /> Previous
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={handleSaveDraft} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Save size={16} /> Save Draft
                </button>

                {currentStep < 6 ? (
                  <button type="button" onClick={handleNextStep} className="btn btn-primary">
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" disabled={submitting} className="btn btn-gold btn-lg">
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        Complete Registration & Go to Dashboard
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
