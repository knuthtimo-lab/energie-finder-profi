import { test, expect } from '@playwright/test';

test.describe('Sitemap XML Validation', () => {
  test('should serve valid sitemap.xml', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toMatch(/xml/);
    
    const content = await page.textContent('urlset') || await page.textContent('body');
    
    // Should be valid XML
    expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(content).toContain('</urlset>');
  });

  test('should include all main pages with lastmod', async ({ page }) => {
    await page.goto('/sitemap.xml');
    
    const content = await page.textContent('urlset') || await page.textContent('body');
    
    const expectedUrls = [
      'https://energie-profis.de/',
      'https://energie-profis.de/solar',
      'https://energie-profis.de/wind',
      'https://energie-profis.de/installateur-finden',
      'https://energie-profis.de/kostenlose-beratung',
      'https://energie-profis.de/unternehmen-listen'
    ];

    for (const url of expectedUrls) {
      expect(content).toContain(`<loc>${url}</loc>`);
    }

    // Check for lastmod tags
    expect(content).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  });

  test('should have proper priority and changefreq values', async ({ page }) => {
    await page.goto('/sitemap.xml');
    
    const content = await page.textContent('urlset') || await page.textContent('body');
    
    // Homepage should have highest priority
    expect(content).toMatch(/https:\/\/energie-profis\.de\/<\/loc>[\s\S]*?<priority>1\.0<\/priority>/);
    
    // Should have valid changefreq values
    const validChangeFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    const changefreqMatches = content.match(/<changefreq>([^<]+)<\/changefreq>/g) || [];
    
    for (const match of changefreqMatches) {
      const value = match.replace(/<\/?changefreq>/g, '');
      expect(validChangeFreqs).toContain(value);
    }
  });

  test('should have valid date format for lastmod', async ({ page }) => {
    await page.goto('/sitemap.xml');
    
    const content = await page.textContent('urlset') || await page.textContent('body');
    
    // Extract all lastmod dates
    const lastmodMatches = content.match(/<lastmod>([^<]+)<\/lastmod>/g) || [];
    expect(lastmodMatches.length).toBeGreaterThan(0);
    
    for (const match of lastmodMatches) {
      const dateString = match.replace(/<\/?lastmod>/g, '');
      
      // Should be in YYYY-MM-DD format (ISO date)
      expect(dateString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      
      // Should be a valid date
      const date = new Date(dateString);
      expect(date.toString()).not.toBe('Invalid Date');
    }
  });
});