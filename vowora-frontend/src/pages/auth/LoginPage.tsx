import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import './AuthPages.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = login(email, password);
    if (user) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Use the demo credentials below.');
    }
    setLoading(false);
  };

  if (isAuthenticated) return null;

  return (
    <div className="auth-page">
      <div className="auth-page-left">
        <div className="auth-page-brand">
          <Link to="/" className="auth-brand-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" fill="currentColor" />
              <path d="M8 24V8h4l8 10-4 2-8-10h-4v16z" fill="white" />
            </svg>
            <span>Vowora</span>
          </Link>
          <div className="auth-brand-text">
            <h1>Plan your event with the people who make it happen.</h1>
            <p>Browse trusted vendors, compare packages, and book with confidence.</p>
          </div>
        </div>
      </div>

      <div className="auth-page-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Sign in to your account</h2>
            <p>Welcome back! Enter your credentials to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-form-error" role="alert">
                {error}
              </div>
            )}

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            <div className="auth-form-options">
              <label className="auth-form-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="auth-form-link">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              Sign in
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="auth-demo-credentials">
            <h4>Demo credentials</h4>
            <div className="auth-demo-list">
              <div className="auth-demo-item">
                <span className="auth-demo-role">Customer</span>
                <code>customer@vowora.com</code>
              </div>
              <div className="auth-demo-item">
                <span className="auth-demo-role">Vendor</span>
                <code>vendor@vowora.com</code>
              </div>
              <div className="auth-demo-item">
                <span className="auth-demo-role">Planner</span>
                <code>planner@vowora.com</code>
              </div>
              <div className="auth-demo-item">
                <span className="auth-demo-role">Admin</span>
                <code>admin@vowora.com</code>
              </div>
            </div>
            <p className="auth-demo-password">Password for all: <code>demo123</code></p>
          </div>

          <p className="auth-form-alternate">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-form-link-primary">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
