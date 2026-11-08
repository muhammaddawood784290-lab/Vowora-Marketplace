import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './TopNav.css';

interface TopNavProps {
  onMenuClick?: () => void;
  pageTitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export const TopNav: React.FC<TopNavProps> = ({
  onMenuClick,
  pageTitle,
  breadcrumbs,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topnav">
      <button className="topnav-menu" onClick={onMenuClick} aria-label="Open menu">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="topnav-left">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="topnav-breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className="topnav-breadcrumb-separator" aria-hidden="true">
                    /
                  </span>
                )}
                {crumb.path ? (
                  <Link to={crumb.path} className="topnav-breadcrumb-link">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="topnav-breadcrumb-current" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <h1 className="topnav-page-title">{pageTitle || 'Dashboard'}</h1>
        )}
      </div>

      <div className="topnav-right">
        {user ? (
          <div className="topnav-user">
            <span className="topnav-greeting">
              {new Date().getHours() < 12
                ? 'Good morning'
                : new Date().getHours() < 18
                ? 'Good afternoon'
                : 'Good evening'}{' '}
              {user.firstName}
            </span>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="topnav-avatar"
              />
            ) : (
              <div className="topnav-avatar topnav-avatar-placeholder">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            )}
          </div>
        ) : (
          <div className="topnav-auth">
            <Link to="/login" className="topnav-link">
              Sign in
            </Link>
            <Link to="/signup" className="topnav-link topnav-link-primary">
              Get started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
