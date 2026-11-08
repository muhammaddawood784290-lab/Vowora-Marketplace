import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from '../../components/layout/Sidebar';
import { TopNav } from '../../components/layout/TopNav';
import { useMobileSidebar } from '../../hooks/useMobileSidebar';
import './Admin.css';

export interface AdminShellProps {
  children?: React.ReactNode;
  className?: string;
}

const AdminShellInner: React.FC<AdminShellProps> = ({
  children,
  className,
}) => {
  const { user } = useAuth();
  const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar();

  if (!user) return null;
  if (user.role !== 'admin') return null;

  return (
    <div className={`admin-layout ${className ?? ''}`}>
      <Sidebar />
      {isMobileSidebarOpen && (
        <div className="sidebar-mobile-overlay" onClick={() => toggleMobileSidebar(false)} />
      )}
      <div className="admin-main">
        <TopNav onMenuClick={() => toggleMobileSidebar(true)} />
        <main className="admin-content">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

export const AdminShell = AdminShellInner as React.FC<AdminShellProps>;
export default AdminShell;

export const AdminShellWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AdminShell>{children}</AdminShell>
);
