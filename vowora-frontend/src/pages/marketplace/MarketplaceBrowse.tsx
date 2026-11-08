import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar';
import { TopNav } from '../../components/layout/TopNav';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useMobileSidebar } from '../../hooks/useMobileSidebar';
import type { Category, Listing } from '../../types';
import { mockData } from '../../services/mockData';
import './MarketplaceBrowse.css';

export const MarketplaceBrowse: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const cats = mockData.marketplace.getCategories();
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const result = mockData.marketplace.getListings({
        categoryId: currentCategory || undefined,
        search: search || undefined,
        page,
        pageSize,
      });
      setListings(result.listings);
      setTotal(result.total);
      setLoading(false);
    }
    fetchListings();
  }, [currentCategory, search, page]);

  const featuredListings = mockData.marketplace.getListings({
    featured: true,
    pageSize: 6,
  }).listings;

  const activeCategory = categories.find((c) => c.id === currentCategory);

  return (
    <div className="marketplace-browse">
      <Sidebar />

      {isMobileSidebarOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={() => toggleMobileSidebar(false)}
        />
      )}

      <div className="marketplace-main">
        <TopNav
          onMenuClick={() => toggleMobileSidebar(true)}
          pageTitle={activeCategory?.name || 'Marketplace'}
        />

        <div className="marketplace-content">
          {/* Search */}
          <div className="marketplace-search-bar">
            <form className="marketplace-search-form">
              <input
                type="search"
                className="marketplace-search-input"
                placeholder="Search vendors, services, packages..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                aria-label="Search marketplace"
              />
              <Button type="submit" variant="secondary" iconRight={<SearchIcon />}>
                Search
              </Button>
            </form>
          </div>

          {/* Category filters */}
          <div className="marketplace-category-filters">
            <Link
              to="/marketplace"
              className={`marketplace-category-chip ${!currentCategory ? 'active' : ''}`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace/category/${cat.slug}`}
                className={`marketplace-category-chip ${currentCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Featured listings */}
          {!currentCategory && featuredListings.length > 0 && (
            <section className="marketplace-featured">
              <div className="section-header">
                <h2>Featured listings</h2>
                <Link to="/marketplace" className="section-link">
                  View all
                </Link>
              </div>
              <div className="featured-grid">
                {featuredListings.map((listing, index) => (
                  <Link
                    key={listing.id}
                    to={`/marketplace/listing/${listing.id}`}
                    className="featured-card hover-lift stagger-item"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="featured-card-image">
                      {listing.imageUrl ? (
                        <img src={listing.imageUrl} alt={listing.title} />
                      ) : (
                        <div className="listing-image-placeholder">
                          <CategoryIcon name={listing.categoryId} />
                        </div>
                      )}
                      {listing.isFeatured && (
                        <span className="featured-card-badge">Featured</span>
                      )}
                    </div>
                    <div className="featured-card-content">
                      <span className="featured-card-category">
                        {categories.find((c) => c.id === listing.categoryId)?.name}
                      </span>
                      <h3 className="featured-card-title">{listing.title}</h3>
                      <div className="featured-card-rating">
                        <StarIcon />
                        <span>{listing.rating.toFixed(1)}</span>
                        <span className="featured-card-review-count">
                          ({listing.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="featured-card-price">
                        <span className="featured-card-price-amount">
                          {listing.price.toLocaleString()}
                        </span>
                        <span className="featured-card-price-currency">{listing.currency}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Listings grid */}
          <section className="marketplace-listings">
            <div className="section-header">
              <h2>
                {currentCategory
                  ? `${activeCategory?.name} — ${total} listings`
                  : search
                  ? `Results for "${search}" — ${total} listings`
                  : `All listings — ${total} total`}
              </h2>
              <div className="section-header-controls">
                <span className="results-count">{total} results</span>
                <select
                  className="sort-select"
                  value="rating"
                  onChange={() => {}}
                  aria-label="Sort by"
                >
                  <option value="rating">Highest rated</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="listings-loading">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="listing-skeleton stagger-item">
                    <div className="skeleton skeleton-image" />
                    <div className="listing-skeleton-content">
                      <div className="skeleton skeleton-text" style={{ width: '40%' }} />
                      <div className="skeleton skeleton-heading" />
                      <div className="skeleton skeleton-text" style={{ width: '60%' }} />
                      <div className="skeleton skeleton-text" style={{ width: '30%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <EmptyState
                title="No listings found"
                description={
                  search
                    ? `We couldn't find any listings matching "${search}". Try different keywords or browse categories.`
                    : 'There are no listings in this category yet. Check back soon or browse other categories.'
                }
                action={
                  !currentCategory ? (
                    <Link to="/marketplace">
                      <Button variant="secondary">Browse all</Button>
                    </Link>
                  ) : (
                    <Link to="/marketplace">
                      <Button variant="secondary">Back to all listings</Button>
                    </Link>
                  )
                }
              />
            ) : (
              <div className="listings-grid">
                {listings.map((listing, index) => (
                  <Link
                    key={listing.id}
                    to={`/marketplace/listing/${listing.id}`}
                    className="listing-card hover-lift stagger-item"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <div className="listing-card-image">
                      {listing.imageUrl ? (
                        <img src={listing.imageUrl} alt={listing.title} />
                      ) : (
                        <div className="listing-image-placeholder">
                          <CategoryIcon name={listing.categoryId} />
                        </div>
                      )}
                      {listing.isFeatured && (
                        <span className="listing-card-badge">Featured</span>
                      )}
                      {!listing.isAvailable && (
                        <span className="listing-card-unavailable">Unavailable</span>
                      )}
                    </div>
                    <div className="listing-card-content">
                      <span className="listing-card-category">
                        {categories.find((c) => c.id === listing.categoryId)?.name}
                      </span>
                      <h3 className="listing-card-title">{listing.title}</h3>
                      <p className="listing-card-description">
                        {listing.description.slice(0, 120)}
                        {listing.description.length > 120 ? '...' : ''}
                      </p>
                      <div className="listing-card-rating">
                        <StarIcon />
                        <span>{listing.rating.toFixed(1)}</span>
                        <span className="listing-card-review-count">
                          ({listing.reviewCount})
                        </span>
                      </div>
                      <div className="listing-card-footer">
                        <span className="listing-card-price">
                          {listing.price.toLocaleString()} {listing.currency}
                        </span>
                        <span className="listing-card-status">
                          <StatusBadge status={listing.isAvailable ? 'available' : 'unavailable'} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && listings.length > 0 && total > pageSize && (
              <div className="listings-pagination">
                <Button
                  variant="ghost"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="pagination-info">
                  Page {page} of {Math.ceil(total / pageSize)}
                </span>
                <Button
                  variant="ghost"
                  disabled={page * pageSize >= total}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </section>

          {/* Login prompt */}
          {!isAuthenticated && (
            <div className="marketplace-auth-prompt">
              <div className="auth-prompt-inner">
                <h3>Get the full experience</h3>
                <p>
                  Create a free account to shortlist vendors, save your favorites, and manage
                  your events.
                </p>
                <div className="auth-prompt-actions">
                  <Link to="/signup">
                    <Button variant="primary">Create an account</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary">Sign in</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    'cat-venue-reception': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
      </svg>
    ),
    'cat-venue-ceremony': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    'cat-catering': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2v4" />
        <path d="M18 2v4" />
        <path d="M3 10h18" />
        <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      </svg>
    ),
    'cat-photography': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    'cat-video': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    'cat-floral-decoration': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 9a4 4 0 0 0-7.46-2" />
        <path d="M5 9a4 4 0 0 0 7.46-2" />
        <path d="M12 22v-4" />
      </svg>
    ),
    'cat-music-entertainment': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    'cat-transportation': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 16H9" />
        <path d="M11 12H9" />
        <path d="M12.5 18.5A2.5 2.5 0 0 1 9 17V9H7v2h2V7.5C7 5.5 8.5 4 10.5 4s3.5 1.5 3.5 3.5V13h2V9H14V7c0-1 1.5-2 3-2s3 1 3 2v1h-2v2h2v2h-2l-1.5 9h-3z" />
      </svg>
    ),
    'cat-accommodation': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  };
  return icons[name] || (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

export default MarketplaceBrowse;
