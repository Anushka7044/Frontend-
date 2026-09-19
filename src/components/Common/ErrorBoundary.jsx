import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-card glass-card">
          <div className="error-boundary-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="error-boundary-content">
            <h3 className="error-boundary-title">Something went wrong in this section</h3>
            <p className="error-boundary-desc">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button 
              className="btn btn-primary btn-sm error-boundary-reset-btn"
              onClick={this.handleReset}
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
