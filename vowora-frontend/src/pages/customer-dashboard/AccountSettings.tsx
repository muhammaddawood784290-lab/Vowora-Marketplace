import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import './EventPages.css';

export const AccountSettings: React.FC = () => {
  const [form, setForm] = useState({
    firstName: 'Sophia',
    lastName: 'Chen',
    email: 'sophia.chen@email.com',
    phone: '+1 415 555 0123',
    company: 'Chen & Partners Law',
    city: 'San Francisco',
    country: 'United States',
    bio: 'Planning a destination wedding on the Monterey Peninsula.',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
  };

  return (
    <div className="event-page">
      <div className="event-page-inner">
        <div className="event-page-header">
          <h1>Account settings</h1>
          <p>
            Manage your profile information, contact details, and account preferences.
          </p>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <Card>
            <h3 className="settings-section-title">Profile information</h3>
            <p className="settings-section-description">
              This information is visible on your account and event details.
            </p>

            <div className="settings-form-row">
              <Input
                label="First name"
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                required
              />
              <Input
                label="Last name"
                value={form.lastName}
                onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                required
              />
            </div>

            <div className="settings-form-row">
              <Input
                label="Email address"
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <Input
                label="Phone number"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>

            <div className="settings-form-row">
              <Input
                label="Company (optional)"
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
              />
              <Input
                label="City"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              />
            </div>

            <div className="settings-form-row">
              <Input
                label="Country"
                value={form.country}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
              />
              <Input
                label="Bio"
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                hint="A short description about you or your event"
              />
            </div>

            <div className="settings-form-actions">
              <Button type="submit" variant="primary" loading={loading}>
                Save changes
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="settings-section-title">Notification preferences</h3>
            <p className="settings-section-description">
              Choose how you want to receive notifications about your events and account.
            </p>

            <div className="settings-notifications">
              <label className="settings-notification-item">
                <input type="checkbox" defaultChecked />
                <span>Event updates and status changes</span>
              </label>
              <label className="settings-notification-item">
                <input type="checkbox" defaultChecked />
                <span>Vendor and planner messages</span>
              </label>
              <label className="settings-notification-item">
                <input type="checkbox" defaultChecked />
                <span>Invoice and payment reminders</span>
              </label>
              <label className="settings-notification-item">
                <input type="checkbox" defaultChecked />
                <span>Quote and proposal updates</span>
              </label>
              <label className="settings-notification-item">
                <input type="checkbox" />
                <span>Marketing and feature announcements</span>
              </label>
            </div>
          </Card>

          <Card>
            <h3 className="settings-section-title">Security</h3>
            <p className="settings-section-description">
              Manage your password and connected accounts.
            </p>

            <div className="settings-security-actions">
              <Button variant="secondary" fullWidth>
                Change password
              </Button>
              <Button variant="ghost" fullWidth disabled>
                Two-factor authentication
              </Button>
            </div>
          </Card>

          <Card className="settings-danger-card">
            <h3 className="settings-section-title">Danger zone</h3>
            <p className="settings-section-description">
              Permanently delete your account and all associated data.
            </p>
            <Button
              variant="danger"
              fullWidth
              disabled
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              }
            >
              Delete account
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
