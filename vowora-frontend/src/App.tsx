import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LandingPage } from './pages/marketplace/LandingPage';
import { MarketplaceBrowse } from './pages/marketplace/MarketplaceBrowse';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { CustomerDashboard } from './pages/customer-dashboard/CustomerDashboard';
import { CreateEventBrief } from './pages/customer-dashboard/CreateEventBrief';
import { EventDetail } from './pages/customer-dashboard/EventDetail';
import { PlannerSelection } from './pages/customer-dashboard/PlannerSelection';
import { ShortlistPage } from './pages/customer-dashboard/ShortlistPage';
import { AccountSettings } from './pages/customer-dashboard/AccountSettings';
import { CustomerNotifications } from './pages/customer-dashboard/NotificationsPage';
import { VendorDashboard } from './pages/vendor-dashboard/VendorDashboardShell';
import { IncomingRequestsPage } from './pages/vendor-dashboard/IncomingRequestsPage';
import { QuotesPage } from './pages/vendor-dashboard/QuotesPage';
import { PlannerDashboard } from './pages/planner-dashboard/PlannerDashboardShell';
import { PlannerEventWorkspace } from './pages/planner-dashboard/PlannerEventWorkspace';

import { AdminShell } from './pages/admin/AdminShell';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminVendors } from './pages/admin/AdminVendors';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminPlans } from './pages/admin/AdminPlans';
import { AdminVerification } from './pages/admin/AdminVerification';
import { AdminAudit } from './pages/admin/AdminAudit';
import { ProfileEditor } from './pages/vendor-planner-dashboard/ProfileEditor';
import { PortfolioManager } from './pages/vendor-planner-dashboard/PortfolioManager';
import { ServicesManager } from './pages/vendor-planner-dashboard/ServicesManager';
import { PackagesManager } from './pages/vendor-planner-dashboard/PackagesManager';
import { RatesManager } from './pages/vendor-planner-dashboard/RatesManager';
import { AvailabilityManager } from './pages/vendor-planner-dashboard/AvailabilityManager';
import { TeamMembersPage } from './pages/vendor-planner-dashboard/TeamMembersPage';
import { CRMPage } from './pages/vendor-planner-dashboard/CRMPage';
import { VendorPlannerNotifications } from './pages/vendor-planner-dashboard/NotificationsPage';
import { VendorPlannerDashboard } from './pages/vendor-planner-dashboard/VendorPlannerDashboard';
import { AnalyticsPage } from './pages/vendor-planner-dashboard/AnalyticsPage';
import { BrandingPage } from './pages/vendor-planner-dashboard/BrandingPage';
import { AutomationPage } from './pages/vendor-planner-dashboard/AutomationPage';
import './App.css';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function DashboardApp() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return null;

  switch (user.role) {
    case 'customer':
      if (pathname === '/dashboard/event-brief') return <CreateEventBrief />;
      if (pathname.startsWith('/dashboard/event/')) return <EventDetail />;
      if (pathname === '/dashboard/planner-selection') return <PlannerSelection />;
      if (pathname === '/dashboard/shortlist') return <ShortlistPage />;
      if (pathname === '/dashboard/settings') return <AccountSettings />;
      if (pathname === '/dashboard/notifications') return <CustomerNotifications />;
      return <CustomerDashboard />;
    case 'vendor':
      if (pathname === '/dashboard/profile') return <VendorDashboard><ProfileEditor /></VendorDashboard>;
      if (pathname === '/dashboard/portfolio') return <VendorDashboard><PortfolioManager /></VendorDashboard>;
      if (pathname === '/dashboard/services') return <VendorDashboard><ServicesManager /></VendorDashboard>;
      if (pathname === '/dashboard/packages') return <VendorDashboard><PackagesManager /></VendorDashboard>;
      if (pathname === '/dashboard/rates') return <VendorDashboard><RatesManager /></VendorDashboard>;
      if (pathname === '/dashboard/availability') return <VendorDashboard><AvailabilityManager /></VendorDashboard>;
      if (pathname === '/dashboard/team') return <VendorDashboard><TeamMembersPage /></VendorDashboard>;
      if (pathname === '/dashboard/crm') return <VendorDashboard><CRMPage /></VendorDashboard>;
      if (pathname === '/dashboard/notifications') return <VendorDashboard><VendorPlannerNotifications /></VendorDashboard>;
      if (pathname === '/dashboard/analytics') return <VendorDashboard><AnalyticsPage /></VendorDashboard>;
      if (pathname === '/dashboard/branding') return <VendorDashboard><BrandingPage /></VendorDashboard>;
      if (pathname === '/dashboard/automation') return <VendorDashboard><AutomationPage /></VendorDashboard>;
      if (pathname === '/dashboard/requests') return <VendorDashboard><IncomingRequestsPage /></VendorDashboard>;
      if (pathname === '/dashboard/quotes') return <VendorDashboard><QuotesPage /></VendorDashboard>;
      return (
        <VendorDashboard><VendorPlannerDashboard role="vendor" userId={user.id} /></VendorDashboard>
      );
    case 'planner':
      if (pathname === '/dashboard/profile') return <PlannerDashboard><ProfileEditor /></PlannerDashboard>;
      if (pathname === '/dashboard/portfolio') return <PlannerDashboard><PortfolioManager /></PlannerDashboard>;
      if (pathname === '/dashboard/services') return <PlannerDashboard><ServicesManager /></PlannerDashboard>;
      if (pathname === '/dashboard/packages') return <PlannerDashboard><PackagesManager /></PlannerDashboard>;
      if (pathname === '/dashboard/rates') return <PlannerDashboard><RatesManager /></PlannerDashboard>;
      if (pathname === '/dashboard/availability') return <PlannerDashboard><AvailabilityManager /></PlannerDashboard>;
      if (pathname === '/dashboard/team') return <PlannerDashboard><TeamMembersPage /></PlannerDashboard>;
      if (pathname === '/dashboard/crm') return <PlannerDashboard><CRMPage /></PlannerDashboard>;
      if (pathname === '/dashboard/notifications') return <PlannerDashboard><VendorPlannerNotifications /></PlannerDashboard>;
      if (pathname === '/dashboard/analytics') return <PlannerDashboard><AnalyticsPage /></PlannerDashboard>;
      if (pathname === '/dashboard/branding') return <PlannerDashboard><BrandingPage /></PlannerDashboard>;
      if (pathname === '/dashboard/automation') return <PlannerDashboard><AutomationPage /></PlannerDashboard>;
      if (pathname.startsWith('/dashboard/event-workspace/')) return <PlannerDashboard><PlannerEventWorkspace /></PlannerDashboard>;
      return (
        <PlannerDashboard><VendorPlannerDashboard role="planner" userId={user.id} /></PlannerDashboard>
      );
    case 'admin':
      return <Navigate to="/admin" replace />;
    default:
      return null;
  }
}

function AdminApp() {
  const { pathname } = useLocation();
  if (pathname === '/admin/users') return <AdminShell><AdminUsers /></AdminShell>;
  if (pathname === '/admin/vendors') return <AdminShell><AdminVendors /></AdminShell>;
  if (pathname === '/admin/categories') return <AdminShell><AdminCategories /></AdminShell>;
  if (pathname === '/admin/plans') return <AdminShell><AdminPlans /></AdminShell>;
  if (pathname === '/admin/verification') return <AdminShell><AdminVerification /></AdminShell>;
  if (pathname === '/admin/audit') return <AdminShell><AdminAudit /></AdminShell>;
  return <AdminShell><AdminDashboard /></AdminShell>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/marketplace" element={<MarketplaceBrowse />} />
      <Route path="/marketplace/category/:slug" element={<MarketplaceBrowse />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Customer dashboard */}
      <Route path="/dashboard/*" element={<ProtectedRoute allowedRoles={['customer', 'vendor', 'planner', 'admin']}><DashboardApp /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminApp /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
