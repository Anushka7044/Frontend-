import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './AuthForm.css';

export default function PasswordInput({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder = "Enter password", 
  label = "Password",
  error,
  required = true,
  autoComplete = "current-password"
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="required-star">*</span>}
      </label>

      <div className={`input-wrapper ${error ? 'input-error-border' : ''}`}>
        <Lock size={18} className="input-icon-left" />
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input password-input"
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex="-1"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="form-error-msg">{error}</p>}
    </div>
  );
}
