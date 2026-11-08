import React from 'react';
import './Tabs.css';

interface TabsProps {
  tabs: { id: string; label: string; disabled?: boolean }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`tabs ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          className={`tab ${activeTab === tab.id ? 'active' : ''} ${
            tab.disabled ? 'disabled' : ''
          }`}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  hidden?: boolean;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  id,
  children,
  hidden = true,
  className = '',
}) => {
  return (
    <div
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={`tab-panel ${hidden ? 'hidden' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Tabs;
