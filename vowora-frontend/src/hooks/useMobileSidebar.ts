import { useState, useEffect, useCallback } from 'react';

export const useMobileSidebar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileSidebar = useCallback((force?: boolean) => {
    setIsMobileSidebarOpen((prev) => (force !== undefined ? force : !prev));
  }, []);

  return {
    isMobileSidebarOpen,
    toggleMobileSidebar,
  };
};

export default useMobileSidebar;
