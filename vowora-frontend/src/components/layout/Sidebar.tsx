import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

interface NavItem {
  label: string;
  path: string;
  roles?: string[];
  badge?: number | string;
}

interface SidebarProps {
  title?: string;
  logo?: React.ReactNode;
  items?: NavItem[];
  className?: string;
}

const defaultItems = (role: string): NavItem[] => {
  const baseItems: NavItem[] = [
    { label: 'Overview', path: '/dashboard' },
    { label: 'CRM', path: '/dashboard/crm', roles: ['vendor', 'planner'] },
    { label: 'Profile', path: '/dashboard/profile', roles: ['vendor', 'planner'] },
    { label: 'Portfolio', path: '/dashboard/portfolio', roles: ['vendor', 'planner'] },
    { label: 'Services', path: '/dashboard/services', roles: ['vendor', 'planner'] },
    { label: 'Packages', path: '/dashboard/packages', roles: ['vendor', 'planner'] },
    { label: 'Rates', path: '/dashboard/rates', roles: ['vendor', 'planner'] },
    { label: 'Availability', path: '/dashboard/availability', roles: ['vendor', 'planner'] },
    { label: 'Team', path: '/dashboard/team', roles: ['vendor', 'planner'] },
    { label: 'Proposals', path: '/dashboard/proposals', roles: ['vendor', 'planner'] },
    { label: 'Invoices', path: '/dashboard/invoices', roles: ['vendor', 'planner', 'customer'] },
    { label: 'Automation', path: '/dashboard/automation', roles: ['vendor', 'planner'] },
    { label: 'Notifications', path: '/dashboard/notifications', roles: ['vendor', 'planner', 'customer'] },
    { label: 'Analytics', path: '/dashboard/analytics', roles: ['vendor', 'planner'] },
    { label: 'Branding', path: '/dashboard/branding', roles: ['vendor', 'planner'] },
    { label: 'Settings', path: '/dashboard/settings', roles: ['vendor', 'planner', 'customer'] },
  ];

  if (role === 'vendor') {
    return [
      ...baseItems,
      { label: 'Incoming Requests', path: '/dashboard/requests', roles: ['vendor'] },
      { label: 'Quotes', path: '/dashboard/quotes', roles: ['vendor'] },
    ];
  }

  if (role === 'planner') {
    return [
      ...baseItems,
      { label: 'Assigned Events', path: '/dashboard/events', roles: ['planner'] },
      { label: 'Event Workspace', path: '/dashboard/event-workspace/:eventId', roles: ['planner'] },
    ];
  }

  if (role === 'customer') {
    return [
      { label: 'Overview', path: '/dashboard' },
      { label: 'Event Brief', path: '/dashboard/event-brief', roles: ['customer'] },
      { label: 'Event Details', path: '/dashboard/event/:eventId', roles: ['customer'] },
      { label: 'Planner Selection', path: '/dashboard/planner-selection', roles: ['customer'] },
      { label: 'Vendor Shortlist', path: '/dashboard/shortlist', roles: ['customer'] },
      { label: 'Proposal Review', path: '/dashboard/proposal/:proposalId', roles: ['customer'] },
      { label: 'Booking Status', path: '/dashboard/bookings', roles: ['customer'] },
      { label: 'Invoices', path: '/dashboard/invoices', roles: ['customer'] },
      { label: 'Notifications', path: '/dashboard/notifications', roles: ['customer'] },
      { label: 'Account Settings', path: '/dashboard/settings', roles: ['customer'] },
    ];
  }

  if (role === 'admin') {
    return [
      { label: 'Overview', path: '/admin' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Vendors', path: '/admin/vendors' },
      { label: 'Planners', path: '/admin/planners' },
      { label: 'Categories', path: '/admin/categories' },
      { label: 'Subscription Plans', path: '/admin/plans' },
      { label: 'Verification', path: '/admin/verification' },
      { label: 'Audit Activity', path: '/admin/audit' },
    ];
  }

  return baseItems;
};

export const Sidebar: React.FC<SidebarProps> = ({ title = 'Vowora', logo }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role || '';

  const items = defaultItems(role);
  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {logo || (
          <div className="sidebar-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" fill="currentColor" />
              <path
                d="M8 24V8h4l8 10-4 2-8-10h-4v16z"
                fill="white"
              />
            </svg>
            <span className="sidebar-title">{title}</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {filteredItems.map((item) => {
            const isActive =
              item.path === '/dashboard'
                ? location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/') && !location.pathname.includes('/event/') && !location.pathname.includes('/proposal/')
                : item.path === '/dashboard/crm'
                ? location.pathname === '/dashboard/crm'
                : item.path === '/dashboard/profile'
                ? location.pathname === '/dashboard/profile'
                : item.path === '/dashboard/portfolio'
                ? location.pathname === '/dashboard/portfolio'
                : item.path === '/dashboard/services'
                ? location.pathname === '/dashboard/services'
                : item.path === '/dashboard/packages'
                ? location.pathname === '/dashboard/packages'
                : item.path === '/dashboard/rates'
                ? location.pathname === '/dashboard/rates'
                : item.path === '/dashboard/availability'
                ? location.pathname === '/dashboard/availability'
                : item.path === '/dashboard/team'
                ? location.pathname === '/dashboard/team'
                : item.path === '/dashboard/proposals'
                ? location.pathname === '/dashboard/proposals'
                : item.path === '/dashboard/invoices'
                ? location.pathname === '/dashboard/invoices'
                : item.path === '/dashboard/automation'
                ? location.pathname === '/dashboard/automation'
                : item.path === '/dashboard/notifications'
                ? location.pathname === '/dashboard/notifications'
                : item.path === '/dashboard/analytics'
                ? location.pathname === '/dashboard/analytics'
                : item.path === '/dashboard/branding'
                ? location.pathname === '/dashboard/branding'
                : item.path === '/dashboard/settings'
                ? location.pathname === '/dashboard/settings'
                : item.path === '/dashboard/requests'
                ? location.pathname === '/dashboard/requests'
                : item.path === '/dashboard/quotes'
                ? location.pathname === '/dashboard/quotes'
                : item.path === '/dashboard/events'
                ? location.pathname === '/dashboard/events'
                : item.path === '/dashboard/shortlist'
                ? location.pathname === '/dashboard/shortlist'
                : item.path === '/dashboard/event-brief'
                ? location.pathname === '/dashboard/event-brief'
                : item.path === '/dashboard/booking-status'
                ? location.pathname === '/dashboard/bookings'
                : location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="sidebar-nav-label">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="sidebar-nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="sidebar-avatar"
              />
            ) : (
              <div className="sidebar-avatar sidebar-avatar-placeholder">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            )}
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {user.firstName} {user.lastName}
              </span>
              <span className="sidebar-user-role">{role}</span>
            </div>
          </div>
          <button
            className="sidebar-logout"
            onClick={logout}
            title="Sign out"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
