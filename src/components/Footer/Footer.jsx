import React from 'react';
import { Sparkles, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer({ onNavigate, user }) {
  const handleSectionClick = (target) => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Brand & Mission Column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <div className="brand-icon-box">
              <Sparkles size={18} />
            </div>
            <span className="brand-name">
              Study<span className="brand-accent">Hub</span>
            </span>
          </div>

          <p className="footer-mission">
            The growth acceleration platform built for engineering and computer science students. 
            Transform daily learning into verifiable proof of work.
          </p>

          <div className="footer-social-links">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub"
              className="social-icon-btn"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn"
              className="social-icon-btn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Twitter"
              className="social-icon-btn"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Product</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleSectionClick('#features')}>Features</button></li>
            <li><button onClick={() => handleSectionClick('#how-it-works')}>How It Works</button></li>
            <li><button onClick={() => handleSectionClick('#preview')}>Progress Analytics</button></li>
            <li><button onClick={() => onNavigate(user ? 'achievements' : 'signup')}>Unlock Badges</button></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Resources</h4>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate(user ? 'skills' : 'signup')}>Technical Skills</button></li>
            <li><button onClick={() => onNavigate(user ? 'projects' : 'signup')}>Project Gallery</button></li>
            <li><button onClick={() => onNavigate(user ? 'github' : 'signup')}>GitHub Integration</button></li>
            <li><button onClick={() => onNavigate(user ? 'resume' : 'signup')}>Resume Builder</button></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><button onClick={() => alert('StudyHub: Empowering engineering students worldwide.')}>About Platform</button></li>
            <li><button onClick={() => alert('Contact: support@studyhub.dev')}>Contact Support</button></li>
            <li><button onClick={() => alert('Privacy Policy: All student data is stored locally and private.')}>Privacy Policy</button></li>
            <li><button onClick={() => alert('Terms of Service: Free educational platform for college students.')}>Terms of Service</button></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-flex">
          <p>© 2026 StudyHub. All rights reserved.</p>
          <p className="built-with-text">
            Built with <Heart size={14} className="heart-icon" /> for passionate student builders.
          </p>
        </div>
      </div>
    </footer>
  );
}
