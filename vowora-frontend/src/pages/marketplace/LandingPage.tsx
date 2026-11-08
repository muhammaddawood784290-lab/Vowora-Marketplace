import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import './LandingPage.css';

const categories = [
  {
    name: 'Reception Venues',
    slug: 'reception-venues',
    description: 'Ballrooms, gardens, and pavilions for celebrations',
    count: 42,
  },
  {
    name: 'Ceremony Venues',
    slug: 'ceremony-venues',
    description: 'Gardens, beaches, and historic settings for vows',
    count: 38,
  },
  {
    name: 'Catering',
    slug: 'catering',
    description: 'Full-service caterers and menu designers',
    count: 29,
  },
  {
    name: 'Photography',
    slug: 'photography',
    description: 'Candid moments and full-day coverage',
    count: 56,
  },
  {
    name: 'Floral Design',
    slug: 'floral-decoration',
    description: 'Centerpieces, arches, and complete styling',
    count: 48,
  },
  {
    name: 'Music & Entertainment',
    slug: 'music-entertainment',
    description: 'Bands, DJs, and live performers',
    count: 44,
  },
];

const features = [
  {
    title: 'Find the right team',
    description:
      'Browse vetted vendors and planners, compare packages, and make confident choices for your event.',
  },
  {
    title: 'Build your shortlist',
    description:
      'Save vendors to a shortlist, review proposals side by side, and share your curated list with collaborators.',
  },
  {
    title: 'Track everything in one place',
    description:
      'From briefs and quotes to bookings and invoices, manage your event progress from start to finish.',
  },
  {
    title: 'Grow your business',
    description:
      'Vendors and planners get a dedicated dashboard, CRM tools, portfolio management, and automation support.',
  },
];

export const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <div className="container landing-header-inner">
          <Link to="/" className="landing-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" fill="currentColor" />
              <path d="M8 24V8h4l8 10-4 2-8-10h-4v16z" fill="white" />
            </svg>
            <span>Vowora</span>
          </Link>
          <nav className="landing-nav">
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/login">Sign in</Link>
            <Link to="/signup" className="landing-nav-cta">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="landing-hero">
        <div className="container landing-hero-inner">
          <div className="landing-hero-content">
            <h1 className="landing-hero-title">
              Plan your event with the people who make it happen.
            </h1>
            <p className="landing-hero-subtitle">
              Vowora connects couples and event hosts with trusted vendors and planners
              worldwide. Browse, compare, and book with confidence.
            </p>
            <div className="landing-hero-actions">
              <Link to="/marketplace">
                <Button variant="primary" size="lg">
                  Explore the marketplace
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" size="lg">
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
          <div className="landing-hero-visual">
            <div className="landing-hero-card">
              <div className="landing-hero-card-image">
                <img
                  src="https://images.unsplash.com/photo-1516137418202-7deb7f11f440?w=800"
                  alt="Event venue"
                />
              </div>
              <div className="landing-hero-card-footer">
                <span className="landing-hero-card-category">Reception Venue</span>
                <span className="landing-hero-card-price">From $5,800</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="landing-categories">
        <div className="container">
          <div className="landing-section-header">
            <h2>Browse by category</h2>
            <p>
              Find the right professionals for every part of your event, from ceremony
              venues to photography and beyond.
            </p>
          </div>
          <div className="landing-categories-grid">
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                to={`/marketplace/category/${cat.slug}`}
                className="landing-category-card hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="landing-category-icon">
                  <CategoryIcon name={cat.slug} />
                </div>
                <div className="landing-category-content">
                  <h3 className="landing-category-name">{cat.name}</h3>
                  <p className="landing-category-description">{cat.description}</p>
                  <span className="landing-category-count">{cat.count} listings</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="landing-search">
        <div className="container">
          <div className="landing-search-inner">
            <h2>Start with a search</h2>
            <p>
              Search across vendors, services, and packages to find exactly what you need.
            </p>
            <form
              className="landing-search-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/marketplace?search=${encodeURIComponent(
                    searchQuery.trim()
                  )}`;
                }
              }}
            >
              <input
                type="search"
                className="landing-search-input"
                placeholder="Search vendors, services, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="container">
          <div className="landing-section-header">
            <h2>How Vowora works</h2>
            <p>
              A clear path from idea to celebration, whether you are planning a wedding or
              running a service business.
            </p>
          </div>
          <div className="landing-features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="landing-feature-card stagger-item"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="landing-feature-number">{index + 1}</div>
                <h3 className="landing-feature-title">{feature.title}</h3>
                <p className="landing-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="container landing-cta-inner">
          <h2>Ready to get started?</h2>
          <p>
            Join thousands of hosts and professionals already using Vowora to plan and grow
            their events.
          </p>
          <div className="landing-cta-actions">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Create your account
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="secondary" size="lg">
                Browse marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container landing-footer-inner">
          <div className="landing-footer-brand">
            <Link to="/" className="landing-logo">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" fill="currentColor" />
                <path d="M8 24V8h4l8 10-4 2-8-10h-4v16z" fill="white" />
              </svg>
              <span>Vowora</span>
            </Link>
            <p className="landing-footer-tagline">
              A global wedding and event marketplace owned and developed by Permetheon and
              Solvx.
            </p>
          </div>
          <div className="landing-footer-links">
            <div className="landing-footer-column">
              <h4>Marketplace</h4>
              <Link to="/marketplace">Browse all</Link>
              <Link to="/marketplace/category/reception-venues">Venues</Link>
              <Link to="/marketplace/category/catering">Catering</Link>
              <Link to="/marketplace/category/photography">Photography</Link>
            </div>
            <div className="landing-footer-column">
              <h4>Account</h4>
              <Link to="/signup">Sign up</Link>
              <Link to="/login">Sign in</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="landing-footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        <div className="container landing-footer-bottom">
          <p>
            {new Date().getFullYear()} Vowora. All rights reserved. Black and white by
            design.
          </p>
        </div>
      </footer>
    </div>
  );
};

const categoryIcons: Record<string, React.ReactNode> = {
  'reception-venues': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </svg>
  ),
  'ceremony-venues': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  'catering': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v4" />
      <path d="M18 2v4" />
      <path d="M3 10h18" />
      <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  ),
  'photography': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  'floral-decoration': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 9a4 4 0 0 0-7.46-2" />
      <path d="M5 9a4 4 0 0 0 7.46-2" />
      <path d="M12 22v-4" />
      <path d="M12 18c-2 0-4-1-4-3 0-1.5 1-3 4-5 3 2 4 3.5 4 5 0 2-2 3-4 3z" />
    </svg>
  ),
  'music-entertainment': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
};

function CategoryIcon({ name }: { name: string }) {
  return categoryIcons[name] || (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

export default LandingPage;
