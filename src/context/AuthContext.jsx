import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROFILES } from '../data/mockProfiles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Demo logged in user state (default: Karthik GM-1001)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gm_user');
    return saved ? JSON.parse(saved) : MOCK_PROFILES[0];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Shortlisted Profile IDs state
  const [shortlist, setShortlist] = useState(() => {
    const saved = localStorage.getItem('gm_shortlist');
    return saved ? JSON.parse(saved) : ["GM-1002", "GM-1004"];
  });

  // Expressed Interest IDs state
  const [interestsSent, setInterestsSent] = useState(() => {
    const saved = localStorage.getItem('gm_interests');
    return saved ? JSON.parse(saved) : ["GM-1002"];
  });

  // Draft registration state
  const [registrationDraft, setRegistrationDraft] = useState(() => {
    const saved = localStorage.getItem('gm_draft');
    return saved ? JSON.parse(saved) : null;
  });

  // Global Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    localStorage.setItem('gm_shortlist', JSON.stringify(shortlist));
  }, [shortlist]);

  useEffect(() => {
    localStorage.setItem('gm_interests', JSON.stringify(interestsSent));
  }, [interestsSent]);

  const toggleShortlist = (profileId) => {
    if (shortlist.includes(profileId)) {
      setShortlist(prev => prev.filter(id => id !== profileId));
      showToast('Profile removed from your shortlist', 'info');
    } else {
      setShortlist(prev => [...prev, profileId]);
      showToast('Profile added to your shortlist!', 'success');
    }
  };

  const expressInterest = (profileId, message = "") => {
    if (!interestsSent.includes(profileId)) {
      setInterestsSent(prev => [...prev, profileId]);
      showToast(`Interest request sent to Profile ${profileId}!`, 'success');
    } else {
      showToast(`You have already expressed interest in Profile ${profileId}`, 'info');
    }
  };

  const loginDemoUser = (profileId) => {
    const found = MOCK_PROFILES.find(p => p.id === profileId) || MOCK_PROFILES[0];
    setCurrentUser(found);
    setIsLoggedIn(true);
    localStorage.setItem('gm_user', JSON.stringify(found));
    showToast(`Logged in as ${found.name} (${found.gender})`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('gm_user');
    showToast('Logged out successfully', 'info');
  };

  const saveDraft = (formData) => {
    setRegistrationDraft(formData);
    localStorage.setItem('gm_draft', JSON.stringify(formData));
    showToast('Registration draft saved locally!', 'success');
  };

  const updateUserProfile = (updatedData) => {
    setCurrentUser(prev => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem('gm_user', JSON.stringify(merged));
      return merged;
    });
    showToast('Profile details updated successfully!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        shortlist,
        interestsSent,
        registrationDraft,
        toast,
        showToast,
        toggleShortlist,
        expressInterest,
        loginDemoUser,
        logout,
        saveDraft,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
