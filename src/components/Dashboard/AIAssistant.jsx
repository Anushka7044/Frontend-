import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, User, ChevronDown, RotateCcw, Maximize2, ArrowRight } from 'lucide-react';
import { AI_SUGGESTIONS } from '../../data/dashboardData';
import { getAIResponse } from '../../services/aiService';
import './AIAssistant.css';

export default function AIAssistant({ onNavigate, studentContext = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Hi Anushka! 👋 I am your AI Student Mentor. How can I help accelerate your learning today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendQuery = async (queryText) => {
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(queryText, studentContext);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: response.text,
          actionRoute: response.actionRoute,
          actionLabel: response.actionLabel,
          suggestedFollowUps: response.suggestedFollowUps
        }
      ]);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'I could not process your query right now. Please try asking again!'
        }
      ]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'init-1',
        sender: 'ai',
        text: 'Chat reset. Hi Anushka! Pick a suggestion below or ask any question about your studies.'
      }
    ]);
  };

  return (
    <div className="ai-assistant-container">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          className="ai-floating-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Student Assistant"
        >
          <div className="ai-floating-icon">
            <Bot size={20} />
          </div>
          <span className="ai-floating-text">Ask your assistant</span>
          <span className="ai-pulse-dot" />
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="ai-chat-panel glass-card" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="ai-panel-header">
            <div className="ai-header-title">
              <div className="ai-avatar-icon">
                <Bot size={18} />
              </div>
              <div>
                <h4>AI Study Assistant</h4>
                <div className="ai-online-status">
                  <span className="online-dot" />
                  <span>Interactive Preview</span>
                </div>
              </div>
            </div>

            <div className="ai-header-controls">
              {onNavigate && (
                <button 
                  className="ai-tool-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('ai');
                  }}
                  title="Open Full AI Assistant"
                >
                  <Maximize2 size={14} />
                </button>
              )}
              <button 
                className="ai-tool-btn" 
                onClick={handleResetChat}
                title="Clear conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button 
                className="ai-tool-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="ai-chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
                <div className="ai-message-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="ai-msg-line">{line}</p>
                  ))}

                  {msg.actionRoute && onNavigate && (
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate(msg.actionRoute);
                      }}
                    >
                      <span>{msg.actionLabel || 'Go to Section'}</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row ai">
                <div className="ai-typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="ai-prompts-section">
            <span className="prompts-label">Suggested questions:</span>
            <div className="prompts-chips-grid">
              {AI_SUGGESTIONS.map(sug => (
                <button 
                  key={sug.query}
                  className="prompt-chip"
                  onClick={() => handleSendQuery(sug.query)}
                >
                  <Sparkles size={11} className="chip-sparkle" />
                  <span>{sug.query}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Field */}
          <form 
            className="ai-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputValue);
            }}
          >
            <input 
              type="text"
              placeholder="Ask about skills, GPA, roadmap..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="ai-text-input"
            />
            <button 
              type="submit" 
              className="ai-send-btn" 
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
