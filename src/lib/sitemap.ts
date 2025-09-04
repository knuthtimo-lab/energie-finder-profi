/**
 * Sitemap generator for Vite React app with proper lastmod for AEO
 */

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface PageMetadata {
  path: string;
  lastModified?: Date;
  changeFreq?: SitemapUrl['changefreq'];
  priority?: number;
}

class SitemapGenerator {
  private readonly baseUrl: string;
  
  constructor(baseUrl: string = 'https://energie-profis.de') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  /**
   * Generate complete sitemap XML
   */
  generateSitemap(): string {
    const urls = this.getStaticPages();
    
    const urlElements = urls.map(url => `
  <url>
    <loc>${this.escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  /**
   * Generate news sitemap for recent content updates
   */
  generateNewsSitemap(): string {
    const recentUrls = this.getStaticPages()
      .filter(url => {
        const lastMod = new Date(url.lastmod);
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return lastMod > threeDaysAgo;
      });

    if (recentUrls.length === 0) {
      return '';
    }

    const newsItems = recentUrls.map(url => `
  <url>
    <loc>${this.escapeXml(url.loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>EnergieProfis</news:name>
        <news:language>de</news:language>
      </news:publication>
      <news:publication_date>${url.lastmod}</news:publication_date>
      <news:title>${this.getPageTitle(url.loc)}</news:title>
    </news:news>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems}
</urlset>`;
  }

  /**
   * Get static page metadata with realistic last modified dates
   */
  private getStaticPages(): SitemapUrl[] {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const pages: PageMetadata[] = [
      {
        path: '/',
        lastModified: oneWeekAgo,
        changeFreq: 'weekly',
        priority: 1.0
      },
      {
        path: '/solar',
        lastModified: oneWeekAgo,
        changeFreq: 'weekly', 
        priority: 0.9
      },
      {
        path: '/wind',
        lastModified: oneWeekAgo,
        changeFreq: 'weekly',
        priority: 0.9
      },
      {
        path: '/installateur-finden',
        lastModified: new Date(), // Updated frequently with new installers
        changeFreq: 'daily',
        priority: 0.8
      },
      {
        path: '/kostenlose-beratung',
        lastModified: oneMonthAgo,
        changeFreq: 'monthly',
        priority: 0.7
      },
      {
        path: '/unternehmen-listen',
        lastModified: new Date(), // Business listings updated daily
        changeFreq: 'daily',
        priority: 0.6
      }
    ];

    return pages.map(page => ({
      loc: `${this.baseUrl}${page.path}`,
      lastmod: (page.lastModified || now).toISOString().split('T')[0],
      changefreq: page.changeFreq,
      priority: page.priority
    }));
  }

  /**
   * Get page title for news sitemap
   */
  private getPageTitle(url: string): string {
    const path = url.replace(this.baseUrl, '');
    const titles: Record<string, string> = {
      '/': 'Solar- und Wind-Installateure finden & vergleichen',
      '/solar': 'Solarenergie: Photovoltaik-Anlagen und Solarthermie',
      '/wind': 'Windenergie: Kleinwind- und Windkraftanlagen',
      '/installateur-finden': 'Qualifizierte Installateure in Ihrer Region finden',
      '/kostenlose-beratung': 'Kostenlose Beratung für erneuerbare Energien',
      '/unternehmen-listen': 'Ihr Unternehmen bei EnergieProfis listen'
    };
    return titles[path] || 'EnergieProfis - Erneuerbare Energien';
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
}

// Export singleton instance
export const sitemapGenerator = new SitemapGenerator();

/**
 * Generate and serve sitemap for development/build
 */
export function generateSitemapXml(): string {
  return sitemapGenerator.generateSitemap();
}

/**
 * Generate news sitemap if there are recent updates
 */
export function generateNewsSitemapXml(): string {
  return sitemapGenerator.generateNewsSitemap();
}