/**
 * JSON-LD components for Answer Engine Optimization (AEO)
 * Optimized for ChatGPT, Perplexity, and other AI answer engines
 */

import React, { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  useEffect(() => {
    // Remove existing script with same @type to prevent duplicates
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      try {
        const scriptData = JSON.parse(script.textContent || '');
        if (scriptData['@type'] === data['@type']) {
          script.remove();
        }
      } catch (e) {
        // Ignore invalid JSON
      }
    });

    // Create new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [data]);

  return null;
};

export default JsonLd;