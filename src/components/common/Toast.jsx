import React from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Toast = () => {
  const { toast } = useAuth();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'info':
        return <Info size={20} color="var(--color-gold)" />;
      case 'warning':
        return <AlertTriangle size={20} color="#FF9800" />;
      default:
        return <CheckCircle size={20} color="#4CAF50" />;
    }
  };

  return (
    <div className="toast-container">
      <div className="toast-message">
        {getIcon()}
        <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{toast.message}</span>
      </div>
    </div>
  );
};
