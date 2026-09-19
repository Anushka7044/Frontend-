import React, { useState } from 'react';
import { Mail, Sparkles, LogIn, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import AuthLayout from '../components/Auth/AuthLayout';
import PasswordInput from '../components/Auth/PasswordInput';
import './Login.css';

export default function Login({ onNavigate, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');

    // Simulate frontend mock authentication
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Welcome back! Login successful.');

      // Notify parent app state
      if (onLoginSuccess) {
        onLoginSuccess({
          name: formData.email.split('@')[0] || 'Student',
          email: formData.email,
          year: '2nd Year',
          college: 'Engineering Institute'
        });
      }

      // Navigate to dashboard placeholder after simulated delay
      setTimeout(() => {
        onNavigate('dashboard');
      }, 1200);
    }, 1200);
  };

  return (
    <AuthLayout onNavigate={onNavigate} activePage="login">
      <div className="login-card-content">
        {/* Header */}
        <div className="auth-form-header">
          <div className="mobile-brand-tag">
            <Sparkles size={16} />
            <span>StudyHub</span>
          </div>
          <h2 className="auth-title">Welcome Back 👋</h2>
          <p className="auth-subtitle">Continue your student growth journey.</p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="auth-alert success-alert" role="alert">
            <CheckCircle2 size={18} />
            <div>
              <strong>Login Successful!</strong>
              <p>Redirecting to your student command center...</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email Address <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.email ? 'input-error-border' : ''}`}>
              <Mail size={18} className="input-icon-left" />
              <input
                type="email"
                id="login-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your student email"
                className="form-input"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="form-error-msg">{errors.email}</p>}
          </div>

          {/* Password field with show/hide */}
          <PasswordInput
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
            error={errors.password}
            required={true}
            autoComplete="current-password"
          />

          {/* Remember me & Forgot password row */}
          <div className="auth-options-row">
            <label className="checkbox-group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="custom-checkbox"
              />
              <span className="checkbox-label">Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-pass-btn"
              onClick={() => setForgotModalOpen(true)}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In to Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer link to Signup */}
        <div className="auth-form-footer">
          <p>
            Don't have an account yet?{' '}
            <button 
              className="auth-switch-btn"
              onClick={() => onNavigate('signup')}
            >
              Create Account
            </button>
          </p>
        </div>

        {/* Forgot Password Modal (Frontend Simulation) */}
        {forgotModalOpen && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-card glass-card">
              <div className="modal-icon-box">
                <AlertCircle size={24} />
              </div>
              <h3>Reset Password</h3>
              <p>
                In Stage 2, backend email verification is not active yet. 
                For testing this frontend demonstration, you can log in directly with any sample email!
              </p>
              <button 
                className="btn btn-primary btn-block"
                onClick={() => setForgotModalOpen(false)}
              >
                Understood, Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
