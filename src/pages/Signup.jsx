import React, { useState } from 'react';
import { 
  User, Mail, Building, BookOpen, Calendar, GraduationCap, 
  Sparkles, CheckCircle2, UserPlus, Loader2 
} from 'lucide-react';
import AuthLayout from '../components/Auth/AuthLayout';
import PasswordInput from '../components/Auth/PasswordInput';
import PasswordStrengthMeter, { calculatePasswordStrength } from '../components/Auth/PasswordStrengthMeter';
import { EDUCATION_OPTIONS } from '../data/mockData';
import './Signup.css';

export default function Signup({ onNavigate, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    course: '',
    year: '2nd Year',
    semester: 'Semester 4',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // College
    if (!formData.college.trim()) {
      newErrors.college = 'College or University name is required.';
    }

    // Course
    if (!formData.course.trim()) {
      newErrors.course = 'Please select or enter your course / branch.';
    }

    // Year & Semester
    if (!formData.year) {
      newErrors.year = 'Please select your academic year.';
    }
    if (!formData.semester) {
      newErrors.semester = 'Please select your semester.';
    }

    // Terms
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms and Privacy Policy to create an account.';
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

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');

    // Simulate frontend mock registration
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account setup complete! Welcome to your student growth journey.');

      const studentProfile = {
        name: formData.fullName,
        email: formData.email,
        college: formData.college,
        course: formData.course,
        year: formData.year,
        semester: formData.semester
      };

      if (onSignupSuccess) {
        onSignupSuccess(studentProfile);
      }

      setTimeout(() => {
        onNavigate('dashboard');
      }, 1400);
    }, 1400);
  };

  // Determine if submit is enabled
  const isFormFilled = 
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.password &&
    formData.confirmPassword &&
    formData.college.trim() &&
    formData.agreeTerms;

  return (
    <AuthLayout onNavigate={onNavigate} activePage="signup">
      <div className="signup-card-content">
        {/* Header */}
        <div className="auth-form-header">
          <div className="mobile-brand-tag">
            <Sparkles size={16} />
            <span>StudyHub</span>
          </div>
          <h2 className="auth-title">Create Your Account</h2>
          <p className="auth-subtitle">Start building your skills, projects, and career journey.</p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="auth-alert success-alert" role="alert">
            <CheckCircle2 size={18} />
            <div>
              <strong>Registration Complete!</strong>
              <p>{successMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Personal Info */}
          <div className="form-subheading">
            <span className="subheading-num">1</span>
            <span>Personal Information</span>
          </div>

          <div className="form-group">
            <label htmlFor="signup-name" className="form-label">
              Full Name <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.fullName ? 'input-error-border' : ''}`}>
              <User size={18} className="input-icon-left" />
              <input
                type="text"
                id="signup-name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Anushka Sharma"
                className="form-input"
                autoComplete="name"
              />
            </div>
            {errors.fullName && <p className="form-error-msg">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="signup-email" className="form-label">
              Email Address <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.email ? 'input-error-border' : ''}`}>
              <Mail size={18} className="input-icon-left" />
              <input
                type="email"
                id="signup-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu or personal email"
                className="form-input"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="form-error-msg">{errors.email}</p>}
          </div>

          {/* Section 2: Education Info */}
          <div className="form-subheading">
            <span className="subheading-num">2</span>
            <span>College & Academic Details</span>
          </div>

          <div className="form-group">
            <label htmlFor="signup-college" className="form-label">
              College / University <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.college ? 'input-error-border' : ''}`}>
              <Building size={18} className="input-icon-left" />
              <input
                type="text"
                id="signup-college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your college or university"
                className="form-input"
              />
            </div>
            {errors.college && <p className="form-error-msg">{errors.college}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="signup-course" className="form-label">
              Course / Degree <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.course ? 'input-error-border' : ''}`}>
              <BookOpen size={18} className="input-icon-left" />
              <input
                type="text"
                id="signup-course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science & Engineering"
                className="form-input"
                list="popular-courses"
              />
              <datalist id="popular-courses">
                {EDUCATION_OPTIONS.popularCourses.map(course => (
                  <option key={course} value={course} />
                ))}
              </datalist>
            </div>
            {errors.course && <p className="form-error-msg">{errors.course}</p>}
          </div>

          {/* Academic Year & Semester Row */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="signup-year" className="form-label">
                Current Year <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.year ? 'input-error-border' : ''}`}>
                <Calendar size={18} className="input-icon-left" />
                <select
                  id="signup-year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-select"
                >
                  {EDUCATION_OPTIONS.years.map(yr => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
              {errors.year && <p className="form-error-msg">{errors.year}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-semester" className="form-label">
                Semester <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.semester ? 'input-error-border' : ''}`}>
                <GraduationCap size={18} className="input-icon-left" />
                <select
                  id="signup-semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="form-select"
                >
                  {EDUCATION_OPTIONS.semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
              {errors.semester && <p className="form-error-msg">{errors.semester}</p>}
            </div>
          </div>

          {/* Section 3: Account Security */}
          <div className="form-subheading">
            <span className="subheading-num">3</span>
            <span>Account Security</span>
          </div>

          <PasswordInput
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            label="Password"
            error={errors.password}
            required={true}
            autoComplete="new-password"
          />

          <PasswordStrengthMeter password={formData.password} />

          <PasswordInput
            id="signup-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            label="Confirm Password"
            error={errors.confirmPassword}
            required={true}
            autoComplete="new-password"
          />

          {/* Terms and Conditions Checkbox */}
          <label className="checkbox-group terms-checkbox">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="custom-checkbox"
            />
            <span className="checkbox-label">
              I agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Free student education platform.'); }}>Terms of Service</a> and <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All data is secure.'); }}>Privacy Policy</a>.
            </span>
          </label>
          {errors.agreeTerms && <p className="form-error-msg terms-error">{errors.agreeTerms}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg auth-submit-btn"
            disabled={!isFormFilled || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Student Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer link to Login */}
        <div className="auth-form-footer">
          <p>
            Already have an account?{' '}
            <button 
              className="auth-switch-btn"
              onClick={() => onNavigate('login')}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
