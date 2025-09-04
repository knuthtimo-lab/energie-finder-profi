#!/usr/bin/env tsx
/**
 * Manual IndexNow ping script for CI/CD and manual testing
 * Usage: npm run ping-indexnow <url1> <url2> ...
 */

import { pingIndexNowManually } from '../src/lib/indexnow.js';

async function main() {
  const urls = process.argv.slice(2);
  
  if (urls.length === 0) {
    console.error('Usage: npm run ping-indexnow <url1> <url2> ...');
    console.error('Example: npm run ping-indexnow https://energie-profis.de/ https://energie-profis.de/solar');
    process.exit(1);
  }

  console.log(`Pinging IndexNow for ${urls.length} URLs...`);
  console.log('URLs:', urls.join(', '));

  try {
    const success = await pingIndexNowManually(urls);
    
    if (success) {
      console.log('✅ IndexNow ping completed successfully');
      process.exit(0);
    } else {
      console.error('❌ IndexNow ping failed or queued for retry');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ IndexNow ping error:', error);
    process.exit(1);
  }
}

main().catch(console.error);