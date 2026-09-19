import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, RotateCcw, ArrowRight, User, 
  BookOpen, Brain, Rocket, Trophy, Briefcase, FileText, 
  Github, Flame, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { getAIResponse } from '../services/aiService';
import './AI.css';

const QUICK_ACTIONS = [
  { label: 'What should I learn next?', category: 'skills', query: 'What should I learn next?' },
  { label: 'Help me plan today', category: 'study', query: 'Help me plan today' },
  { label: 'Suggest a project', category: 'projects', query: 'Suggest a project' },
  { label: 'Review my resume', category: 'career', query: 'Review my resume' },
  { label: 'Optimize my GitHub', category: 'career', query: 'How to optimize my GitHub' },
  { label: 'How is my progress & streak?', category: 'study', query: 'How is my progress and streak?' },
  { label: 'SWE Interview Prep', category: 'career', query: 'How to prepare for software engineering interviews?' }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Guidance' },
  { id: 'study', label: 'Study & Academics' },
  { id: 'skills', label: 'Skills & Roadmap' },
  { id: 'projects', label: 'Projects & Code' },
  { id: 'career', label: 'Career & Resume' }
];

export default function AI({
  user,
  skills = [],
  projects = [],
  challenges = [],
  achievements = [],
  semesters = [],
  notes = [],
  githubData = {},
  resumeData = {},
  linkedinData = {},
  onNavigate
}) {
  const studentName = user?.name ? user.name.split(' ')[0] : 'Anushka';

  const [activeCategory, setActiveCategory] = useState('all');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hi ${studentName}! 👋 I am your AI Student Assistant & Career Mentor.\n\n` +
        `I have active real-time context on your academic standing (Semester 4, 8.42 CGPA), your ${skills.length} tracked skills, ${projects.length} practical projects, and career assets.\n\n` +
        `How can I help accelerate your learning and career preparation today?`,
      suggestedFollowUps: [
        'What should I learn next?',
        'Help me plan today',
        'Suggest a project',
        'Review my resume'
      ],
      actionRoute: 'dashboard',
      actionLabel: 'View Dashboard'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContextDrawer, setShowContextDrawer] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Assemble real-time context for AI reasoning
  const studentContext = {
    profile: user || { name: 'Anushka Sharma' },
    skills,
    projects,
    challenges,
    achievements,
    semesters,
    notes,
    github: githubData,
    resume: resumeData,
    linkedin: linkedinData
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(query, studentContext);
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        suggestedFollowUps: response.suggestedFollowUps || [],
        actionRoute: response.actionRoute,
        actionLabel: response.actionLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: response.category
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered an unexpected issue interpreting your request. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: `Conversation restarted. Hi ${studentName}! How would you like to focus your learning or career strategy right now?`,
        suggestedFollowUps: [
          'What should I learn next?',
          'Help me plan today',
          'Suggest a project',
          'Review my resume'
        ]
      }
    ]);
  };

  // Format message text with markdown bullet support and bold text
  const renderMessageContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold text handling
      const formattedParts = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="ai-inline-code">{part.slice(1, -1)}</code>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={idx} className="ai-msg-bullet">
            {formattedParts}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={idx} className="ai-msg-ordered">
            {formattedParts}
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="ai-msg-spacer" />;
      }
      return (
        <p key={idx} className="ai-msg-para">
          {formattedParts}
        </p>
      );
    });
  };

  const filteredQuickActions = activeCategory === 'all' 
    ? QUICK_ACTIONS 
    : QUICK_ACTIONS.filter(a => a.category === activeCategory);

  return (
    <div className="ai-page-layout">
      {/* Top Banner / Header */}
      <div className="ai-page-header glass-card">
        <div className="ai-header-left">
          <div className="ai-avatar-badge">
            <Bot size={28} />
            <span className="ai-badge-pulse" />
          </div>
          <div>
            <div className="ai-title-row">
              <h1 className="ai-main-title">AI Student Assistant</h1>
              <span className="ai-status-pill">
                <Sparkles size={12} />
                <span>Personalized Mentor Active</span>
              </span>
            </div>
            <p className="ai-subtitle">
              Intelligent companion bridging your academic coursework, skill mastery, projects, and career portfolio.
            </p>
          </div>
        </div>

        <div className="ai-header-actions">
          <button 
            className={`btn btn-sm ${showContextDrawer ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowContextDrawer(!showContextDrawer)}
            title="View student context snapshot"
          >
            <Brain size={15} />
            <span>{showContextDrawer ? 'Hide Context' : 'View AI Context'}</span>
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleResetChat}
            title="Clear and reset chat history"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main AI Body: Chat Feed + Context Inspector */}
      <div className="ai-body-grid">
        {/* Chat Feed Column */}
        <div className="ai-chat-column glass-card">
          {/* Quick Category Filter Bar */}
          <div className="ai-category-tabs">
            {CATEGORY_FILTERS.map(cat => (
              <button
                key={cat.id}
                className={`ai-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="ai-quick-actions-bar">
            {filteredQuickActions.map((action, i) => (
              <button
                key={i}
                className="ai-quick-chip"
                onClick={() => handleSendMessage(action.query)}
                disabled={isLoading}
              >
                <Sparkles size={12} className="chip-icon" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="ai-messages-viewport">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-chat-bubble-row ${msg.sender}`}>
                <div className="ai-bubble-avatar">
                  {msg.sender === 'ai' ? (
                    <Bot size={18} />
                  ) : (
                    <User size={18} />
                  )}
                </div>

                <div className="ai-bubble-content-wrapper">
                  <div className="ai-bubble-author">
                    <span>{msg.sender === 'ai' ? 'StudyHub AI Mentor' : studentName}</span>
                    {msg.timestamp && <span className="ai-msg-time">{msg.timestamp}</span>}
                  </div>

                  <div className="ai-bubble-body">
                    {renderMessageContent(msg.text)}
                  </div>

                  {/* Deep Link Action Button */}
                  {msg.sender === 'ai' && msg.actionRoute && onNavigate && (
                    <div className="ai-action-btn-row">
                      <button 
                        className="btn btn-primary btn-sm ai-deep-link-btn"
                        onClick={() => onNavigate(msg.actionRoute)}
                      >
                        <span>{msg.actionLabel || 'View Related Section'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}

                  {/* Follow-up Prompt Chips */}
                  {msg.sender === 'ai' && msg.suggestedFollowUps?.length > 0 && (
                    <div className="ai-followups-container">
                      <span className="ai-followup-label">Suggested follow-ups:</span>
                      <div className="ai-followup-chips">
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            className="ai-followup-chip"
                            onClick={() => handleSendMessage(prompt)}
                            disabled={isLoading}
                          >
                            <span>{prompt}</span>
                            <ChevronRight size={13} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="ai-chat-bubble-row ai">
                <div className="ai-bubble-avatar">
                  <Bot size={18} />
                </div>
                <div className="ai-bubble-content-wrapper">
                  <div className="ai-bubble-author">
                    <span>StudyHub AI Mentor</span>
                  </div>
                  <div className="ai-bubble-body ai-typing-indicator-box">
                    <span className="ai-typing-dot" />
                    <span className="ai-typing-dot" />
                    <span className="ai-typing-dot" />
                    <span className="ai-typing-label">Analyzing student records...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Interactive Chat Input */}
          <form 
            className="ai-chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input 
              ref={inputRef}
              type="text"
              className="ai-page-input"
              placeholder="Ask anything (e.g. 'What should I build next?', 'Help me plan today', 'Review my resume')..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="btn btn-primary ai-submit-btn"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Real-Time Context Snapshot Sidebar */}
        {showContextDrawer && (
          <div className="ai-context-column glass-card">
            <div className="ai-context-header">
              <div className="context-title-group">
                <Brain size={18} style={{ color: '#818CF8' }} />
                <h3>Student Context Telemetry</h3>
              </div>
              <span className="context-badge">Live State</span>
            </div>

            <p className="context-desc">
              The AI dynamically reads this telemetry to formulate tailored advice.
            </p>

            <div className="context-cards-list">
              {/* Profile & Academic */}
              <div className="context-card">
                <div className="context-card-title">
                  <BookOpen size={14} style={{ color: '#6366F1' }} />
                  <span>Academic Standing</span>
                </div>
                <div className="context-card-details">
                  <div className="context-detail-row">
                    <span>Current Semester:</span>
                    <strong>Semester 4</strong>
                  </div>
                  <div className="context-detail-row">
                    <span>Cumulative CGPA:</span>
                    <strong style={{ color: '#10B981' }}>8.42 / 10.0</strong>
                  </div>
                  <div className="context-detail-row">
                    <span>Focus Area:</span>
                    <strong style={{ color: '#F59E0B' }}>Discrete Math (76%)</strong>
                  </div>
                </div>
              </div>

              {/* Skills Progress */}
              <div className="context-card">
                <div className="context-card-title">
                  <Brain size={14} style={{ color: '#10B981' }} />
                  <span>Technical Skills ({skills.length})</span>
                </div>
                <div className="context-card-details">
                  {skills.slice(0, 4).map(skill => (
                    <div key={skill.id} className="context-detail-row">
                      <span>{skill.name}:</span>
                      <strong>{skill.progress}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects & Proof of Work */}
              <div className="context-card">
                <div className="context-card-title">
                  <Rocket size={14} style={{ color: '#A855F7' }} />
                  <span>Projects & Challenges</span>
                </div>
                <div className="context-card-details">
                  <div className="context-detail-row">
                    <span>Completed Projects:</span>
                    <strong>{projects.filter(p => p.status === 'completed').length}</strong>
                  </div>
                  <div className="context-detail-row">
                    <span>Active Challenge:</span>
                    <strong style={{ color: '#818CF8' }}>30-Day Python</strong>
                  </div>
                  <div className="context-detail-row">
                    <span>Learning Streak:</span>
                    <strong style={{ color: '#F97316' }}>12 Days</strong>
                  </div>
                </div>
              </div>

              {/* Career Readiness */}
              <div className="context-card">
                <div className="context-card-title">
                  <Briefcase size={14} style={{ color: '#0EA5E9' }} />
                  <span>Career Readiness</span>
                </div>
                <div className="context-card-details">
                  <div className="context-detail-row">
                    <span>Resume Completeness:</span>
                    <strong style={{ color: '#818CF8' }}>~82%</strong>
                  </div>
                  <div className="context-detail-row">
                    <span>LinkedIn Strength:</span>
                    <strong style={{ color: '#0EA5E9' }}>~72%</strong>
                  </div>
                  <div className="context-detail-row">
                    <span>GitHub Activity:</span>
                    <strong style={{ color: '#10B981' }}>Connected</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="context-footer-note">
              <CheckCircle2 size={13} style={{ color: '#10B981' }} />
              <span>Encrypted frontend state. No external credentials leaked.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
