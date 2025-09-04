/**
 * IndexNow Integration for Answer Engine Optimization (AEO)
 * Supports PerplexityBot, GPTBot, and other AI crawlers
 */

interface IndexNowConfig {
  host: string;
  key: string;
  keyLocation: string;
}

interface QueuedUrl {
  url: string;
  timestamp: number;
  attempts: number;
}

class IndexNowClient {
  private config: IndexNowConfig;
  private queue: Map<string, QueuedUrl> = new Map();
  private isProcessing = false;
  private maxRetries = 3;
  private baseDelay = 1000; // 1 second

  constructor() {
    const key = import.meta.env.VITE_INDEXNOW_KEY;
    const host = import.meta.env.VITE_SITE_HOST || 'energie-profis.de';
    
    if (!key) {
      console.warn('VITE_INDEXNOW_KEY not found. IndexNow disabled.');
      this.config = { host: '', key: '', keyLocation: '' };
      return;
    }

    this.config = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`
    };

    // Auto-process queue periodically
    setInterval(() => this.processQueue(), 5000);
  }

  /**
   * Queue URLs for IndexNow submission with deduplication
   */
  queueUrls(urls: string[]): void {
    if (!this.config.key) return;

    const validUrls = urls.filter(url => this.isValidUrl(url));
    
    for (const url of validUrls) {
      const canonical = this.getCanonicalUrl(url);
      if (!this.queue.has(canonical)) {
        this.queue.set(canonical, {
          url: canonical,
          timestamp: Date.now(),
          attempts: 0
        });
      }
    }

    if (validUrls.length > 0) {
      console.log(`Queued ${validUrls.length} URLs for IndexNow`);
      this.processQueue();
    }
  }

  /**
   * Queue a single URL
   */
  queueUrl(url: string): void {
    this.queueUrls([url]);
  }

  /**
   * Process the queue with exponential backoff retry logic
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.size === 0 || !this.config.key) {
      return;
    }

    this.isProcessing = true;

    try {
      const urlsToSubmit: QueuedUrl[] = [];
      const urlsToRetry: QueuedUrl[] = [];
      const urlsToRemove: string[] = [];

      // Categorize URLs by their status
      for (const [key, queuedUrl] of this.queue) {
        if (queuedUrl.attempts >= this.maxRetries) {
          urlsToRemove.push(key);
          console.warn(`Removing URL after ${this.maxRetries} attempts: ${queuedUrl.url}`);
        } else if (queuedUrl.attempts === 0) {
          urlsToSubmit.push(queuedUrl);
        } else {
          // Check if enough time has passed for retry
          const delay = this.baseDelay * Math.pow(2, queuedUrl.attempts - 1);
          if (Date.now() - queuedUrl.timestamp > delay) {
            urlsToRetry.push(queuedUrl);
          }
        }
      }

      // Remove failed URLs
      urlsToRemove.forEach(key => this.queue.delete(key));

      // Submit new URLs
      if (urlsToSubmit.length > 0) {
        const success = await this.submitToIndexNow(
          urlsToSubmit.map(u => u.url)
        );

        if (success) {
          // Remove successful submissions
          urlsToSubmit.forEach(u => this.queue.delete(u.url));
        } else {
          // Mark for retry
          urlsToSubmit.forEach(u => {
            u.attempts++;
            u.timestamp = Date.now();
          });
        }
      }

      // Retry failed URLs
      if (urlsToRetry.length > 0) {
        const success = await this.submitToIndexNow(
          urlsToRetry.map(u => u.url)
        );

        if (success) {
          urlsToRetry.forEach(u => this.queue.delete(u.url));
        } else {
          urlsToRetry.forEach(u => {
            u.attempts++;
            u.timestamp = Date.now();
          });
        }
      }

    } catch (error) {
      console.error('IndexNow queue processing error:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Submit URLs to IndexNow API
   */
  private async submitToIndexNow(urls: string[]): Promise<boolean> {
    if (urls.length === 0) return true;

    try {
      const payload = {
        host: this.config.host,
        key: this.config.key,
        keyLocation: this.config.keyLocation,
        urlList: urls
      };

      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`IndexNow: Successfully submitted ${urls.length} URLs`);
        return true;
      } else {
        console.error(`IndexNow submission failed: ${response.status} ${response.statusText}`);
        return false;
      }

    } catch (error) {
      console.error('IndexNow submission error:', error);
      return false;
    }
  }

  /**
   * Validate URL format and domain
   */
  private isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === this.config.host || 
             urlObj.hostname === `www.${this.config.host}` ||
             (urlObj.hostname.includes('localhost') && import.meta.env.DEV);
    } catch {
      return false;
    }
  }

  /**
   * Get canonical URL (removes fragments, normalizes)
   */
  private getCanonicalUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      urlObj.hash = '';
      urlObj.search = urlObj.search.replace(/[?&]utm_[^&]*/g, '');
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  /**
   * Get current queue status (for debugging)
   */
  getQueueStatus(): { size: number; urls: string[] } {
    return {
      size: this.queue.size,
      urls: Array.from(this.queue.keys())
    };
  }
}

// Singleton instance
export const indexNowClient = new IndexNowClient();

/**
 * Convenience functions for common use cases
 */

export function queueIndexNowPing(urls: string[]): void {
  indexNowClient.queueUrls(urls);
}

export function queueCurrentPage(): void {
  if (typeof window !== 'undefined') {
    indexNowClient.queueUrl(window.location.href);
  }
}

/**
 * Hook for React components to easily queue current page
 */
export function useIndexNow() {
  const queueCurrentPage = () => {
    if (typeof window !== 'undefined') {
      indexNowClient.queueUrl(window.location.href);
    }
  };

  return { queueCurrentPage, queueUrls: queueIndexNowPing };
}

/**
 * Manual ping function for scripts
 */
export async function pingIndexNowManually(urls: string[]): Promise<boolean> {
  indexNowClient.queueUrls(urls);
  // Wait for processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  const status = indexNowClient.getQueueStatus();
  return status.size === 0; // Success if queue is empty
}