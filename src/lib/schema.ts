/**
 * Schema.org JSON-LD builders for Answer Engine Optimization (AEO)
 * Optimized for AI answer engines like ChatGPT and Perplexity
 */

interface Organization {
  name: string;
  description?: string;
  url: string;
  logo: string;
  contactEmail?: string;
  socialProfiles?: string[];
}

interface Person {
  name: string;
  url?: string;
  jobTitle?: string;
  organization?: string;
}

interface Article {
  headline: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  author: Person;
  publisher: Organization;
  images: string[];
  url: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowTo {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
  supply?: string[];
  tool?: string[];
}

/**
 * Build Organization schema for the main company
 */
export function buildOrganizationJsonLd(org: Partial<Organization> = {}): Record<string, any> {
  const defaultOrg: Organization = {
    name: 'EnergieProfis',
    description: 'Führendes Verzeichnis für Solar- und Wind-Installateure in Deutschland',
    url: 'https://energie-profis.de',
    logo: 'https://energie-profis.de/favicon.ico',
    contactEmail: 'info@energie-profis.de',
    socialProfiles: [
      'https://www.linkedin.com/company/energieprofis',
      'https://twitter.com/energieprofis'
    ]
  };

  const organization = { ...defaultOrg, ...org };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    description: organization.description,
    url: organization.url,
    logo: {
      '@type': 'ImageObject',
      url: organization.logo
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: organization.contactEmail,
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: 'German'
    },
    sameAs: organization.socialProfiles
  };
}

/**
 * Build WebSite schema with search action
 */
export function buildWebSiteJsonLd(baseUrl: string = 'https://energie-profis.de'): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EnergieProfis',
    description: 'Finden Sie qualifizierte Fachbetriebe für Solar- und Windenergie in Deutschland',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/installateur-finden?search={search_term_string}&type={energy_type}&location={location}`
      },
      'query-input': 'required name=search_term_string name=energy_type name=location'
    },
    publisher: buildOrganizationJsonLd()
  };
}

/**
 * Build Article schema for content pages
 */
export function buildArticleJsonLd(article: Article): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.images,
    datePublished: article.datePublished.toISOString(),
    dateModified: article.dateModified.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
      jobTitle: article.author.jobTitle
    },
    publisher: buildOrganizationJsonLd(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

/**
 * Build FAQPage schema for Q&A sections
 */
export function buildFAQPageJsonLd(faqs: FAQ[], pageUrl?: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    ...(pageUrl && {
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    })
  };
}

/**
 * Build HowTo schema for step-by-step guides
 */
export function buildHowToJsonLd(howTo: HowTo, pageUrl?: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image
        }
      }),
      ...(step.url && { url: step.url })
    })),
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    ...(howTo.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: howTo.estimatedCost
      }
    }),
    ...(howTo.supply && {
      supply: howTo.supply.map(item => ({
        '@type': 'HowToSupply',
        name: item
      }))
    }),
    ...(howTo.tool && {
      tool: howTo.tool.map(item => ({
        '@type': 'HowToTool',
        name: item
      }))
    }),
    ...(pageUrl && {
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    })
  };
}

/**
 * Build BreadcrumbList schema for navigation
 */
export function buildBreadcrumbJsonLd(
  breadcrumbs: Array<{ name: string; url: string }>
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Example usage for renewable energy content
 */

export const exampleFAQs: FAQ[] = [
  {
    question: 'Wie finde ich den besten Installateur in meiner Region?',
    answer: 'Nutzen Sie unseren Vergleich: Bewertungen, Erfahrung, Zertifizierungen und regionale Expertise vergleichen. Lokale Installateure kennen die regionalen Vorgaben und Fördermöglichkeiten am besten.'
  },
  {
    question: 'Welche Förderungen gibt es 2025 für erneuerbare Energien?',
    answer: 'BAFA-Förderung für Balkonkraftwerke bis 500€, KfW-Kredite mit Tilgungszuschuss, EEG-Vergütung für Überschussstrom und kommunale Zuschüsse je nach Bundesland.'
  },
  {
    question: 'Was kostet eine Solar- oder Windanlage?',
    answer: 'Balkonkraftwerk: 400-800€, komplette Dachanlage: 8.000-15.000€ je kWp, Kleinwindanlage: 3.000-15.000€. Preise variieren je nach Region und Ausstattung.'
  }
];

export const exampleHowTo: HowTo = {
  name: 'Solaranlage installieren lassen - Schritt für Schritt',
  description: 'So finden Sie den richtigen Installateur und lassen Ihre Solaranlage professionell installieren.',
  steps: [
    {
      name: 'Energiebedarf ermitteln',
      text: 'Berechnen Sie Ihren jährlichen Stromverbrauch und prüfen Sie die Dachfläche auf Eignung für Solarmodule.'
    },
    {
      name: 'Qualifizierte Installateure vergleichen',
      text: 'Nutzen Sie EnergieProfis.de um zertifizierte Fachbetriebe in Ihrer Region zu finden und Angebote einzuholen.'
    },
    {
      name: 'Angebote prüfen und Finanzierung klären',
      text: 'Vergleichen Sie Preise, Garantieleistungen und prüfen Sie verfügbare Fördermittel und Finanzierungsoptionen.'
    },
    {
      name: 'Installation beauftragen und überwachen',
      text: 'Beauftragen Sie den gewählten Installateur und lassen Sie sich über den Installationsfortschritt informieren.'
    }
  ],
  totalTime: 'P2W',
  estimatedCost: '8000-15000',
  supply: ['Solarmodule', 'Wechselrichter', 'Montagesystem', 'Verkabelung'],
  tool: ['Nicht erforderlich - wird vom Installateur bereitgestellt']
};