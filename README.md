# EnergieProfis - Renewable Energy Platform

A React + TypeScript platform connecting energy customers with qualified solar and wind installation professionals in Germany.

## Project info

**URL**: https://lovable.dev/projects/54a0b4f8-e87d-43d2-ac51-69b3e38c23fb
**Domain**: energie-profis.de

## Answer Engine Optimization (AEO) Features

This project implements comprehensive AEO to be cited by ChatGPT, Perplexity, and other AI answer engines:

### ✅ Implemented Features

- **Robots.txt**: Explicitly allows PerplexityBot and GPTBot
- **IndexNow Integration**: Automatic URL submission with queue and retry logic
- **Sitemaps**: XML sitemaps with accurate lastmod dates
- **Canonical URLs**: Single canonical per page for AI indexing
- **JSON-LD Schema**: FAQ, HowTo, Article, Organization markup
- **Content Metadata**: Visible "Zuletzt aktualisiert" and author information

### 🔧 AEO Setup

1. **Environment Variables**
   ```bash
   VITE_INDEXNOW_KEY=your-indexnow-key-here
   VITE_SITE_HOST=energie-profis.de
   ```

2. **Create IndexNow Key File**
   ```bash
   # Create public key file (replace with your actual key)
   echo "your-indexnow-key-here" > public/your-indexnow-key-here.txt
   ```

3. **Usage in Components**
   ```tsx
   import Canonical from '@/components/seo/Canonical';
   import JsonLd from '@/components/seo/JsonLd';
   import ContentMeta from '@/components/seo/ContentMeta';
   import { buildFAQPageJsonLd, exampleFAQs } from '@/lib/schema';
   
   function MyPage() {
     return (
       <>
         <Canonical />
         <JsonLd data={buildFAQPageJsonLd(exampleFAQs)} />
         <ContentMeta lastUpdated={new Date()} />
       </>
     );
   }
   ```

4. **Manual IndexNow Ping**
   ```bash
   npm run ping-indexnow https://energie-profis.de/ https://energie-profis.de/solar
   ```

### 🧪 Testing AEO Features

Run E2E tests to validate AEO implementation:

```bash
npm run test:e2e
```

Tests cover:
- Robots.txt allows AI bots
- Canonical URLs are present and correct
- JSON-LD schema is valid
- Sitemap includes all pages with lastmod

### 📋 Manual Validation

Quick checks to verify AEO compliance:

```bash
# Check robots.txt allows AI bots
curl https://energie-profis.de/robots.txt | grep -E "(PerplexityBot|GPTBot)"

# Validate sitemap structure  
curl https://energie-profis.de/sitemap.xml | xmllint --format -

# Check canonical on homepage
curl -s https://energie-profis.de/ | grep -o '<link rel="canonical"[^>]*>'
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/54a0b4f8-e87d-43d2-ac51-69b3e38c23fb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/54a0b4f8-e87d-43d2-ac51-69b3e38c23fb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
