/**
 * Canonical URL component for Answer Engine Optimization (AEO)
 * Ensures single canonical URL per page for better AI indexing
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CanonicalProps {
  url?: string;
  baseUrl?: string;
}

const Canonical: React.FC<CanonicalProps> = ({ 
  url, 
  baseUrl = 'https://energie-profis.de' 
}) => {
  const location = useLocation();

  useEffect(() => {
    // Remove any existing canonical links
    const existingCanonical = document.querySelectorAll('link[rel="canonical"]');
    existingCanonical.forEach(link => link.remove());

    // Generate canonical URL
    const canonicalUrl = url || `${baseUrl.replace(/\/$/, '')}${location.pathname}`;
    
    // Create new canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);

    // Cleanup function
    return () => {
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, [url, baseUrl, location.pathname]);

  return null; // This component doesn't render anything
};

export default Canonical;