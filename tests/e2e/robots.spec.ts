import { test, expect } from '@playwright/test';

test.describe('Robots.txt AEO Compliance', () => {
  test('should allow PerplexityBot and GPTBot', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    
    const content = await page.textContent('pre') || await page.textContent('body');
    
    // Check for PerplexityBot
    expect(content).toContain('User-agent: PerplexityBot');
    expect(content).toContain('Allow: /');
    
    // Check for GPTBot  
    expect(content).toContain('User-agent: GPTBot');
    expect(content).toContain('Allow: /');
    
    // Check for sitemap reference
    expect(content).toContain('Sitemap: https://energie-profis.de/sitemap.xml');
    
    // Ensure no blanket disallow that would block AI bots
    expect(content).not.toMatch(/User-agent: \*[\s\S]*?Disallow: \//);
  });

  test('should maintain existing bot permissions', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    
    const content = await page.textContent('pre') || await page.textContent('body');
    
    // Check that existing bots are still allowed
    expect(content).toContain('User-agent: Googlebot');
    expect(content).toContain('User-agent: Bingbot'); 
    expect(content).toContain('User-agent: Twitterbot');
    expect(content).toContain('User-agent: facebookexternalhit');
  });
});