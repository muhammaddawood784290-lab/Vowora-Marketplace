import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input, TextArea, Select } from '../../components/common/Input';
import './EventPages.css';

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'engagement-party', label: 'Engagement Party' },
  { value: 'rehearsal-dinner', label: 'Rehearsal Dinner' },
  { value: 'bridal-shower', label: 'Bridal Shower' },
  { value: 'birthday', label: 'Birthday Celebration' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'private-party', label: 'Private Party' },
  { value: 'other', label: 'Other' },
];

export const CreateEventBrief: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    eventName: '',
    eventType: '',
    description: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    city: '',
    country: '',
    guestCount: '',
    budget: '',
    currency: 'USD',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="event-page">
        <div className="event-page-inner">
          <div className="event-success-card">
            <div className="event-success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2>Event brief created</h2>
            <p>
              Your event brief for <strong>{form.eventName}</strong> has been created. You can now
              browse vendors and planners, or assign a planner to your event.
            </p>
            <div className="event-success-actions">
              <Link to="/dashboard">
                <Button variant="primary">Back to dashboard</Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="secondary">Browse marketplace</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="event-page">
      <div className="event-page-inner">
        <div className="event-page-header">
          <h1>Create event brief</h1>
          <p>
            Tell us about your event so we can help you find the right vendors and planners.
          </p>
        </div>

        <form className="event-form" onSubmit={handleSubmit}>
          {/* Step indicator */}
          <div className="event-steps">
            {['Details', 'Date & Venue', 'Guest & Budget', 'Review'].map((s, i) => (
              <div
                key={s}
                className={`event-step ${step === i + 1 ? 'active' : ''} ${
                  step > i + 1 ? 'completed' : ''
                }`}
              >
                <span className="event-step-number">{i + 1}</span>
                <span className="event-step-label">{s}</span>
              </div>
            ))}
          </div>

          <div className="event-form-section">
            {/* Step 1: Basic details */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label className="form-label">Event name *</label>
                  <input
                    type="text"
                    name="eventName"
                    value={form.eventName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Chen Memorial Wedding"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Event type *</label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us about your vision, style, and any specific requirements..."
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Step 2: Date & venue */}
            {step === 2 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Event date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event time *</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={form.eventTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Venue or location name</label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Monterey Coastal Gardens"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Monterey"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="United States"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Guests & budget */}
            {step === 3 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Number of guests *</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="140"
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget *</label>
                    <input
                      type="number"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="45000"
                      min="0"
                      step="100"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="CAD">CAD — Canadian Dollar</option>
                  </select>
                </div>

                <div className="form-section-title">Contact information</div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Contact name *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={form.contactName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Sophia Chen"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={form.contactPhone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+1 415 555 0123"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Contact email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={form.contactEmail}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="sophia.chen@email.com"
                    required
                  />
                </div>
              </>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="event-review">
                <h3 className="event-review-title">Review your event brief</h3>
                <dl className="event-review-list">
                  <dt>Event name</dt>
                  <dd>{form.eventName}</dd>
                  <dt>Event type</dt>
                  <dd>
                    {eventTypes.find((t) => t.value === form.eventType)?.label || form.eventType}
                  </dd>
                  <dt>Description</dt>
                  <dd>{form.description || '—'}</dd>
                  <dt>Date and time</dt>
                  <dd>
                    {form.eventDate && formatDate(form.eventDate)} at {form.eventTime || '—'}
                  </dd>
                  <dt>Venue</dt>
                  <dd>{form.venue || '—'}</dd>
                  <dt>Location</dt>
                  <dd>
                    {form.city}, {form.country}
                  </dd>
                  <dt>Guests</dt>
                  <dd>{form.guestCount}</dd>
                  <dt>Budget</dt>
                  <dd>
                    {form.budget ? formatCurrency(Number(form.budget), form.currency) : '—'}
                  </dd>
                  <dt>Contact</dt>
                  <dd>
                    {form.contactName} — {form.contactEmail}
                  </dd>
                </dl>
              </div>
            )}

            {/* Navigation */}
            <div className="event-form-nav">
              {step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              <div className="event-form-nav-right">
                {step < 4 && (
                  <Button type="button" variant="secondary" onClick={() => setStep(step + 1)}>
                    Continue
                  </Button>
                )}
                {step === 4 && (
                  <Button type="submit" variant="primary" loading={loading}>
                    Create event brief
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default CreateEventBrief;
