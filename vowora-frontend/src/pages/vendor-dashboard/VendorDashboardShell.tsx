import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from '../../components/layout/Sidebar';
import { TopNav } from '../../components/layout/TopNav';
import { useMobileSidebar } from '../../hooks/useMobileSidebar';
import { VendorPlannerDashboard } from '../vendor-planner-dashboard/VendorPlannerDashboard';
import './VendorDashboard.css';

export const VendorDashboard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar();

  if (!user) return null;
  if (user.role !== 'vendor') return null;

  return (
    <div className="vendor-dashboard-layout">
      <Sidebar />
      {isMobileSidebarOpen && (
        <div className="sidebar-mobile-overlay" onClick={() => toggleMobileSidebar(false)} />
      )}
      <div className="vendor-dashboard-main">
        <TopNav onMenuClick={() => toggleMobileSidebar(true)} />
        <main className="vendor-dashboard-content">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
