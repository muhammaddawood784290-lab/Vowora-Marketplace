import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import './AuthPages.css';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.role) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Demo: login with created account
    const demoUser = login(form.email, form.password);
    if (demoUser) {
      navigate('/dashboard');
    } else {
      // For demo, auto-create by logging in as a matching role demo user
      const fallbackUsers: Record<string, string> = {
        customer: 'customer@vowora.com',
        vendor: 'vendor@vowora.com',
        planner: 'planner@vowora.com',
        admin: 'admin@vowora.com',
      };
      const fallbackEmail = fallbackUsers[form.role];
      if (fallbackEmail) {
        login(fallbackEmail, 'demo123');
        navigate('/dashboard');
      } else {
        setError('Account creation requires backend integration. Use a demo account for now.');
      }
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
            <h1>Join Vowora today</h1>
            <p>Create an account to browse vendors, plan events, or grow your business.</p>
          </div>
        </div>
      </div>

      <div className="auth-page-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Create your account</h2>
            <p>Start planning or listing your services in minutes.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-form-error" role="alert">
                {error}
              </div>
            )}

            <div className="auth-form-row">
              <Input
                label="First name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
                required
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                autoComplete="family-name"
              />
            </div>

            <Input
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <Select
              label="I am a..."
              name="role"
              value={form.role}
              onChange={handleChange}
              options={[
                { value: 'customer', label: 'Customer (plan events)' },
                { value: 'vendor', label: 'Vendor (list services)' },
                { value: 'planner', label: 'Planner (coordinate events)' },
              ]}
              placeholder="Select your role"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
              autoComplete="new-password"
              hint="Minimum 8 characters"
            />

            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              autoComplete="new-password"
            />

            <div className="auth-form-terms">
              By creating an account, you agree to our{' '}
              <a href="#" className="auth-form-link">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="auth-form-link">
                Privacy Policy
              </a>.
            </div>

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              Create account
            </Button>
          </form>

          <p className="auth-form-alternate">
            Already have an account?{' '}
            <Link to="/login" className="auth-form-link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
