import { test, expect } from '@playwright/test';

test.describe('Canonical URL Validation', () => {
  test('homepage should have exactly one canonical link', async ({ page }) => {
    await page.goto('/');
    
    const canonicalLinks = await page.locator('link[rel="canonical"]').all();
    expect(canonicalLinks.length).toBe(1);
    
    const href = await canonicalLinks[0].getAttribute('href');
    expect(href).toBe('https://energie-profis.de/');
  });

  test('all main pages should have proper canonical URLs', async ({ page }) => {
    const pages = [
      { path: '/', expected: 'https://energie-profis.de/' },
      { path: '/solar', expected: 'https://energie-profis.de/solar' },
      { path: '/wind', expected: 'https://energie-profis.de/wind' },
      { path: '/installateur-finden', expected: 'https://energie-profis.de/installateur-finden' },
      { path: '/kostenlose-beratung', expected: 'https://energie-profis.de/kostenlose-beratung' },
      { path: '/unternehmen-listen', expected: 'https://energie-profis.de/unternehmen-listen' }
    ];

    for (const { path, expected } of pages) {
      await page.goto(path);
      
      // Should have exactly one canonical link
      const canonicalLinks = await page.locator('link[rel="canonical"]').all();
      expect(canonicalLinks.length).toBe(1);
      
      // Should have the correct href
      const href = await canonicalLinks[0].getAttribute('href');
      expect(href).toBe(expected);
    }
  });

  test('canonical should not have query parameters or fragments', async ({ page }) => {
    // Test with query parameters
    await page.goto('/?utm_source=test&ref=social');
    
    const canonicalLinks = await page.locator('link[rel="canonical"]').all();
    expect(canonicalLinks.length).toBe(1);
    
    const href = await canonicalLinks[0].getAttribute('href');
    expect(href).toBe('https://energie-profis.de/');
    expect(href).not.toContain('utm_source');
    expect(href).not.toContain('ref=');
  });

  test('canonical should be absolute URL with https', async ({ page }) => {
    await page.goto('/solar');
    
    const canonicalLink = await page.locator('link[rel="canonical"]').first();
    const href = await canonicalLink.getAttribute('href');
    
    expect(href).toMatch(/^https:\/\//);
    expect(href).toContain('energie-profis.de');
  });
});