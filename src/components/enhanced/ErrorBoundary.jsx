import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-tertiary/30 rounded-lg p-8">
          <h2 className="mb-4 text-2xl font-bold text-secondary">Something went wrong</h2>
          <p className="mb-6 text-center text-secondary/80">
            {this.state.error?.message || 'An unexpected error occurred while loading the 3D model.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white rounded-full transition-colors bg-primary hover:bg-primary/80"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;