import { test, expect } from '@playwright/test';

test.describe('JSON-LD Schema Validation', () => {
  test('homepage should have valid Organization and WebSite schema', async ({ page }) => {
    await page.goto('/');
    
    // Find JSON-LD script tags
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    expect(jsonLdScripts.length).toBeGreaterThan(0);
    
    let hasWebSite = false;
    let hasOrganization = false;
    
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content) {
        const data = JSON.parse(content);
        
        if (data['@type'] === 'WebSite') {
          hasWebSite = true;
          expect(data.name).toBe('EnergieProfis');
          expect(data.url).toMatch(/energie-profis\.de/);
          expect(data.potentialAction).toBeDefined();
          expect(data.potentialAction['@type']).toBe('SearchAction');
        }
        
        if (data['@type'] === 'Organization') {
          hasOrganization = true;
          expect(data.name).toBe('EnergieProfis');
          expect(data.logo).toBeDefined();
        }
      }
    }
    
    expect(hasWebSite).toBe(true);
    expect(hasOrganization).toBe(true);
  });

  test('FAQ sections should have valid FAQPage schema', async ({ page }) => {
    await page.goto('/');
    
    // Look for FAQ content on homepage
    const faqSection = await page.locator('text=Häufige Fragen').first();
    if (await faqSection.isVisible()) {
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      let hasFAQPage = false;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content) {
          const data = JSON.parse(content);
          
          if (data['@type'] === 'FAQPage') {
            hasFAQPage = true;
            expect(data.mainEntity).toBeInstanceOf(Array);
            expect(data.mainEntity.length).toBeGreaterThan(0);
            
            // Validate each FAQ item
            for (const item of data.mainEntity) {
              expect(item['@type']).toBe('Question');
              expect(item.name).toBeDefined();
              expect(item.acceptedAnswer).toBeDefined();
              expect(item.acceptedAnswer['@type']).toBe('Answer');
              expect(item.acceptedAnswer.text).toBeDefined();
            }
          }
        }
      }
      
      // FAQ schema should exist if FAQ content is present
      if (await faqSection.isVisible()) {
        expect(hasFAQPage).toBe(true);
      }
    }
  });

  test('all JSON-LD should be valid JSON', async ({ page }) => {
    const pages = ['/', '/solar', '/wind', '/installateur-finden'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content) {
          // This should not throw if JSON is valid
          expect(() => JSON.parse(content)).not.toThrow();
          
          const data = JSON.parse(content);
          expect(data['@context']).toBe('https://schema.org');
          expect(data['@type']).toBeDefined();
        }
      }
    }
  });
});