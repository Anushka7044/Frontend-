import React from 'react';
import './AuthForm.css';

export function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '', percent: 0 };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return { score: 1, label: 'Weak', color: '#EF4444', percent: 25 };
  } else if (score <= 2) {
    return { score: 2, label: 'Fair', color: '#F59E0B', percent: 50 };
  } else if (score === 3) {
    return { score: 3, label: 'Good', color: '#38BDF8', percent: 75 };
  } else {
    return { score: 4, label: 'Strong', color: '#10B981', percent: 100 };
  }
}

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;

  const { label, color, percent } = calculatePasswordStrength(password);

  return (
    <div className="strength-meter-box">
      <div className="strength-meter-header">
        <span className="strength-label">Password strength:</span>
        <span className="strength-value" style={{ color }}>{label}</span>
      </div>
      <div className="strength-bar-track">
        <div 
          className="strength-bar-fill" 
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <ul className="strength-rules">
        <li className={password.length >= 8 ? 'rule-met' : ''}>8+ characters</li>
        <li className={/[0-9]/.test(password) ? 'rule-met' : ''}>1 number</li>
        <li className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'rule-met' : ''}>Upper & lower case</li>
      </ul>
    </div>
  );
}
