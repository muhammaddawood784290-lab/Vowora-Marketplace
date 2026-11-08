import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useAuth } from '../../hooks/useAuth';
import { useMobileSidebar } from '../../hooks/useMobileSidebar';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  title?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  breadcrumbs,
}) => {
  const { user } = useAuth();
  const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileSidebarOpen) {
        // Close mobile sidebar on resize to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileSidebarOpen]);

  return (
    <div className="dashboard-layout">
      <Sidebar className={isMobileSidebarOpen ? 'sidebar-open' : ''} />

      {isMobileSidebarOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={() => toggleMobileSidebar(false)}
        />
      )}

      <div className="dashboard-main">
        <TopNav
          onMenuClick={() => toggleMobileSidebar(true)}
          pageTitle={title}
          breadcrumbs={breadcrumbs}
        />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
