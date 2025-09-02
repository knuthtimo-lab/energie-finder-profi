# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Vite, runs on port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Project Architecture

This is a React + TypeScript application built with Vite, targeting the German renewable energy market. The app connects energy customers with solar and wind installation professionals.

### Core Technologies
- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Supabase** - Backend database and authentication
- **shadcn/ui** - Component library built on Radix UI
- **Tailwind CSS** - Styling with custom energy-themed colors

### Application Structure

**Pages** (`src/pages/`):
- `Index.tsx` - Landing page with hero section and energy type overview
- `Solar.tsx` / `Wind.tsx` - Energy-specific information pages
- `InstallateurFinden.tsx` - Installer search/listing page
- `KostenloseBeratung.tsx` - Free consultation request page
- `UnternehmenListen.tsx` - Business listing page

**Components** (`src/components/`):
- Standard layout components: `Header`, `Footer`, `HeroSection`
- Feature components: `EnergyTypesSection`, `WhyChooseUsSection`, `EnergyTypeCard`
- Complete shadcn/ui component library in `ui/` subdirectory

**Database Integration** (`src/integrations/supabase/`):
- `client.ts` - Supabase client configuration
- `types.ts` - Auto-generated TypeScript types from Supabase schema

### Database Schema (Supabase)

Key tables:
- `installers` - Installation companies with location, certifications, ratings
- `quotes` - Customer quote requests with project details
- `installer_quotes` - Installer responses to quote requests
- `reviews` - Customer reviews for installers
- `contact_clicks` - Analytics for installer contact interactions
- `analytics_events` - General application usage analytics

Energy types: `solar` | `wind`
Quote status: `pending` | `accepted` | `rejected` | `expired`

### Styling System

Custom Tailwind configuration with energy-themed colors:
- `solar` colors - Orange/yellow theme for solar energy
- `wind` colors - Blue/teal theme for wind energy
- CSS custom properties defined in `src/index.css`
- Gradient backgrounds and shadows for visual branding

### Path Aliases
- `@/*` maps to `src/*` for clean imports

### TypeScript Configuration
- Relaxed strictness settings for rapid development
- Path mapping configured for `@/` alias
- Composite project structure with separate app and node configs

### Routing Architecture
All routes are defined in `src/App.tsx`:
- `/` - Homepage
- `/solar`, `/wind` - Energy type pages  
- `/installateur-finden` - Installer search
- `/kostenlose-beratung` - Consultation requests
- `/unternehmen-listen` - Business listings
- `*` - 404 catch-all

### Component Patterns
- Functional components with hooks
- shadcn/ui components for consistent design
- Lucide React icons throughout the application
- German language content and URLs