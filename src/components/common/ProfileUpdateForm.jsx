import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, GraduationCap, MapPin, Heart, ShieldCheck, Save, Sparkles, CheckCircle, Home, Award, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GOUNDER_COMMUNITIES } from '../../data/communities';
import { updateProfileApi } from '../../services/api';

export const ProfileUpdateForm = () => {
  const navigate = useNavigate();
  const { currentUser, updateUserProfile, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    gender: currentUser?.gender || 'Male',
    age: currentUser?.age || 26,
    height: currentUser?.height || `5' 10" (178 cm)`,
    maritalStatus: currentUser?.maritalStatus || 'Never Married',
    motherTongue: currentUser?.motherTongue || 'Tamil',
    religion: currentUser?.religion || 'Hindu',
    
    // Gounder Sub-Community details
    subCommunity: currentUser?.subCommunity || 'Kongu Vellalar Gounder',
    categoryCode: currentUser?.categoryCode || 'BC',
    kulam: currentUser?.kulam || 'Sempoothan Kootam',
    gothram: currentUser?.gothram || 'Siva Gothram',
    nativePlace: currentUser?.nativePlace || 'Erode',
    currentLocation: currentUser?.currentLocation || 'Coimbatore, Tamil Nadu',
    
    // Education & Occupation
    education: currentUser?.education || 'B.E. Computer Science',
    occupation: currentUser?.occupation || 'Software Engineer',
    company: currentUser?.company || 'Zoho Corporation',
    annualIncome: currentUser?.annualIncome || '₹ 15 - 20 Lakhs',
    
    // Family & Horoscope
    familyType: currentUser?.familyType || 'Joint Family',
    familyStatus: currentUser?.familyStatus || 'Upper Middle Class',
    fatherOccupation: currentUser?.fatherOccupation || 'Agriculturalist & Textile',
    motherOccupation: currentUser?.motherOccupation || 'Homemaker',
    siblings: currentUser?.siblings || '1 Sister',
    raasi: currentUser?.raasi || 'Kanni (Virgo)',
    natchathiram: currentUser?.natchathiram || 'Uttiram',
    chevvaiDosham: currentUser?.chevvaiDosham || 'No',
    
    // Bio & Preferences
    about: currentUser?.about || '',
    prefAgeMin: currentUser?.preferences?.ageMin || 22,
    prefAgeMax: currentUser?.preferences?.ageMax || 28,
    prefSubCommunity: currentUser?.preferences?.subCommunity || 'Kongu Vellalar Gounder',
    prefEducation: currentUser?.preferences?.education || 'B.E / B.Tech / M.Sc / MBA',
    prefLocation: currentUser?.preferences?.location || 'Coimbatore / Erode / Salem'
  });

  const [activeSection, setActiveSection] = useState('personal'); // personal, community, education, family, preferences

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...formData,
      preferences: {
        ...currentUser?.preferences,
        ageMin: formData.prefAgeMin,
        ageMax: formData.prefAgeMax,
        subCommunity: formData.prefSubCommunity,
        education: formData.prefEducation,
        location: formData.prefLocation
      }
    };

    try {
      await updateProfileApi(updatedUser);
    } catch (err) {
      console.warn('Backend profile update warning (falling back to client context):', err);
    }

    updateUserProfile(updatedUser);
  };

  return (
    <div className="card" style={{ padding: '1.75rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EFE4DC', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
      
      <div style={{ borderBottom: '1px solid #EFE4DC', paddingBottom: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#7A1C29', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            Update Profile Information
          </h2>
          <p style={{ color: '#7A6B6D', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
            Keep your matrimony details up to date to receive top quality matching proposals.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#FDF2F4', color: '#7A1C29', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
          <ShieldCheck size={16} /> 100% Confidential & Verified
        </div>
      </div>

      {/* Section Navigation Tabs (Responsive) */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px dashed #E2D9CF' }}>
        {[
          { id: 'personal', label: 'Basic Info', icon: User },
          { id: 'community', label: 'Community & Kulam', icon: Home },
          { id: 'education', label: 'Education & Career', icon: GraduationCap },
          { id: 'family', label: 'Family & Horoscope', icon: Heart },
          { id: 'preferences', label: 'Partner Expectations', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: isActive ? '#7A1C29' : '#F4ECEB',
                color: isActive ? '#FFFFFF' : '#5C4E50',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* SECTION 1: PERSONAL & BASIC DETAILS */}
        {activeSection === 'personal' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Full Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Gender</label>
              <select
                className="form-control"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              >
                <option value="Male">Male (Groom)</option>
                <option value="Female">Female (Bride)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Age (Years)</label>
              <input
                type="number"
                className="form-control"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || 20)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Height</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 5' 10&quot; (178 cm)"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Marital Status</label>
              <select
                className="form-control"
                value={formData.maritalStatus}
                onChange={(e) => handleChange('maritalStatus', e.target.value)}
              >
                <option value="Never Married">Never Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
                <option value="Awaiting Divorce">Awaiting Divorce</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Mother Tongue</label>
              <input
                type="text"
                className="form-control"
                value={formData.motherTongue}
                onChange={(e) => handleChange('motherTongue', e.target.value)}
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>About Myself (Bio)</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Share a short introduction about your family values, personality, and career goals..."
                value={formData.about}
                onChange={(e) => handleChange('about', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* SECTION 2: GOUNDER COMMUNITY & KULAM */}
        {activeSection === 'community' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Sub-Community *</label>
              <select
                className="form-control"
                value={formData.subCommunity}
                onChange={(e) => handleChange('subCommunity', e.target.value)}
              >
                {GOUNDER_COMMUNITIES.map(sc => (
                  <option key={sc.id} value={sc.name}>{sc.name} ({sc.categoryCode})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Category Code</label>
              <select
                className="form-control"
                value={formData.categoryCode}
                onChange={(e) => handleChange('categoryCode', e.target.value)}
              >
                <option value="BC">BC (Backward Class)</option>
                <option value="MBC">MBC (Most Backward Class)</option>
                <option value="OC">OC (Open Category)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Kootam / Kulam</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Sempoothan, Pavalan, Porulanthi, Kanthar"
                value={formData.kulam}
                onChange={(e) => handleChange('kulam', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Gothram</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Siva Gothram"
                value={formData.gothram}
                onChange={(e) => handleChange('gothram', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Native Place / Village</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Erode, Gobichettipalayam, Pollachi"
                value={formData.nativePlace}
                onChange={(e) => handleChange('nativePlace', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Current Living City</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Coimbatore, Tamil Nadu"
                value={formData.currentLocation}
                onChange={(e) => handleChange('currentLocation', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* SECTION 3: EDUCATION & CAREER */}
        {activeSection === 'education' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Highest Educational Qualification</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. B.E. Computer Science / MBA / MBBS"
                value={formData.education}
                onChange={(e) => handleChange('education', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Occupation / Designation</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Senior Software Engineer / Bank Manager"
                value={formData.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Company / Organization Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Zoho Corp / TCS / Government Service"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Annual Income</label>
              <select
                className="form-control"
                value={formData.annualIncome}
                onChange={(e) => handleChange('annualIncome', e.target.value)}
              >
                <option value="Below ₹ 5 Lakhs">Below ₹ 5 Lakhs</option>
                <option value="₹ 5 - 10 Lakhs">₹ 5 - 10 Lakhs</option>
                <option value="₹ 10 - 15 Lakhs">₹ 10 - 15 Lakhs</option>
                <option value="₹ 15 - 20 Lakhs">₹ 15 - 20 Lakhs</option>
                <option value="₹ 20 - 30 Lakhs">₹ 20 - 30 Lakhs</option>
                <option value="Above ₹ 30 Lakhs">Above ₹ 30 Lakhs</option>
              </select>
            </div>
          </div>
        )}

        {/* SECTION 4: FAMILY & HOROSCOPE */}
        {activeSection === 'family' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Father's Occupation</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Textile Mill Owner & Agriculturalist"
                value={formData.fatherOccupation}
                onChange={(e) => handleChange('fatherOccupation', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Mother's Occupation</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Homemaker / School Teacher"
                value={formData.motherOccupation}
                onChange={(e) => handleChange('motherOccupation', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Siblings Summary</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 1 Sister (Married), 1 Brother"
                value={formData.siblings}
                onChange={(e) => handleChange('siblings', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Family Status</label>
              <select
                className="form-control"
                value={formData.familyStatus}
                onChange={(e) => handleChange('familyStatus', e.target.value)}
              >
                <option value="Upper Middle Class">Upper Middle Class</option>
                <option value="Middle Class">Middle Class</option>
                <option value="Affluent / Wealthy">Affluent / Wealthy</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Raasi (Moon Sign)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Kanni, Rishabam, Mesham"
                value={formData.raasi}
                onChange={(e) => handleChange('raasi', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Natchathiram (Star)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Uttiram, Rohini, Aswini"
                value={formData.natchathiram}
                onChange={(e) => handleChange('natchathiram', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Chevvai Dosham Status</label>
              <select
                className="form-control"
                value={formData.chevvaiDosham}
                onChange={(e) => handleChange('chevvaiDosham', e.target.value)}
              >
                <option value="No">No (Sevva Dosham Illai)</option>
                <option value="Yes">Yes (Sevva Dosham Undu)</option>
                <option value="Don't Know">Don't Know / Consult Astrologer</option>
              </select>
            </div>
          </div>
        )}

        {/* SECTION 5: PARTNER PREFERENCES */}
        {activeSection === 'preferences' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Preferred Partner Age Range</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={formData.prefAgeMin}
                  onChange={(e) => handleChange('prefAgeMin', parseInt(e.target.value) || 20)}
                />
                <span>to</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={formData.prefAgeMax}
                  onChange={(e) => handleChange('prefAgeMax', parseInt(e.target.value) || 35)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Preferred Sub-Community</label>
              <input
                type="text"
                className="form-control"
                value={formData.prefSubCommunity}
                onChange={(e) => handleChange('prefSubCommunity', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Preferred Education</label>
              <input
                type="text"
                className="form-control"
                value={formData.prefEducation}
                onChange={(e) => handleChange('prefEducation', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Preferred Location</label>
              <input
                type="text"
                className="form-control"
                value={formData.prefLocation}
                onChange={(e) => handleChange('prefLocation', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Submit & Account Logout Action Bar */}
        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #EFE4DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.825rem', color: '#6B5E5F' }}>
            * Changes are immediately updated across your matrimony profile.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', width: '100%', maxWidth: 'max-content' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '0.75rem 1.6rem',
                borderRadius: '8px',
                backgroundColor: '#7A1C29',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(122,28,41,0.2)',
                flex: '1 1 auto'
              }}
            >
              <Save size={18} />
              Save Profile Changes
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#F4ECEB',
                color: '#7A1C29',
                border: '1px solid #E2D9CF',
                cursor: 'pointer',
                flex: '1 1 auto'
              }}
            >
              <LogOut size={18} />
              Logout Account
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ProfileUpdateForm;
