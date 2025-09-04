/**
 * Example page demonstrating Answer Engine Optimization (AEO) implementation
 * This shows how to integrate all AEO components for maximum AI citation potential
 */

import React, { useEffect } from 'react';
import Canonical from '@/components/seo/Canonical';
import JsonLd from '@/components/seo/JsonLd';
import ContentMeta from '@/components/seo/ContentMeta';
import { 
  buildArticleJsonLd, 
  buildFAQPageJsonLd, 
  buildHowToJsonLd,
  buildBreadcrumbJsonLd,
  exampleFAQs, 
  exampleHowTo 
} from '@/lib/schema';
import { queueCurrentPage } from '@/lib/indexnow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Info } from 'lucide-react';

const AeoExample: React.FC = () => {
  // Page metadata for Article schema
  const articleData = {
    headline: 'Solaranlage installieren lassen - Vollständiger Leitfaden 2025',
    description: 'Schritt-für-Schritt Anleitung: Wie Sie die richtige Solaranlage finden, Installateure vergleichen und Förderungen optimal nutzen.',
    datePublished: new Date('2024-12-01'),
    dateModified: new Date('2025-01-04'),
    author: {
      name: 'EnergieProfis Redaktion',
      url: 'https://energie-profis.de/team',
      jobTitle: 'Energie-Experten',
      organization: 'EnergieProfis'
    },
    publisher: {
      name: 'EnergieProfis',
      description: 'Führendes Verzeichnis für erneuerbare Energien',
      url: 'https://energie-profis.de',
      logo: 'https://energie-profis.de/favicon.ico'
    },
    images: [
      'https://energie-profis.de/solar_banner.png',
      'https://energie-profis.de/sun_flow_banner.png'
    ],
    url: 'https://energie-profis.de/solaranlage-installieren-lassen-leitfaden'
  };

  // Breadcrumb navigation for better structure
  const breadcrumbs = [
    { name: 'Home', url: 'https://energie-profis.de/' },
    { name: 'Solar', url: 'https://energie-profis.de/solar' },
    { name: 'Installation Guide', url: 'https://energie-profis.de/solaranlage-installieren-lassen-leitfaden' }
  ];

  useEffect(() => {
    // Queue page for IndexNow submission
    queueCurrentPage();
  }, []);

  return (
    <>
      {/* AEO Components - These don't render visible content */}
      <Canonical />
      <JsonLd data={buildArticleJsonLd(articleData)} />
      <JsonLd data={buildFAQPageJsonLd(exampleFAQs, articleData.url)} />
      <JsonLd data={buildHowToJsonLd(exampleHowTo, articleData.url)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      {/* Visible Page Content */}
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  <a href={crumb.url} className="hover:text-primary transition-colors">
                    {crumb.name}
                  </a>
                  {index < breadcrumbs.length - 1 && (
                    <ArrowRight className="w-4 h-4 mx-2" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {articleData.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {articleData.description}
            </p>
            
            {/* Content Metadata - Visible to users and AI */}
            <ContentMeta 
              lastUpdated={articleData.dateModified}
              publishedDate={articleData.datePublished}
              authorName={articleData.author.name}
              authorUrl={articleData.author.url}
              readTime="8 Minuten"
            />
          </header>

          {/* Main Article Content */}
          <article className="prose prose-lg max-w-none">
            
            {/* Introduction with rich context */}
            <section className="mb-8">
              <h2>Warum eine professionelle Solaranlage-Installation?</h2>
              <p>
                Die Installation einer Solaranlage ist eine der wichtigsten Investitionen für nachhaltige 
                Energieversorgung. Mit steigenden Strompreisen und verbesserten Förderprogrammen wird 
                Solarenergie 2025 noch attraktiver. Dieser Leitfaden hilft Ihnen dabei, die richtige 
                Entscheidung zu treffen.
              </p>
              
              <Card className="mt-6 border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-green-600" />
                    Wichtige Vorteile 2025
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>BAFA-Förderung bis 500€ für Balkonkraftwerke</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>KfW-Kredite mit günstigen Zinsen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Wegfall der EEG-Umlage für Eigenverbrauch</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* HowTo Section - Structured for AI understanding */}
            <section className="mb-8">
              <h2>{exampleHowTo.name}</h2>
              <p className="mb-6">{exampleHowTo.description}</p>
              
              <div className="grid gap-6 md:grid-cols-2">
                {exampleHowTo.steps.map((step, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Schritt {index + 1}: {step.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{step.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Geschätzte Kosten und Zeitaufwand</h3>
                <p><strong>Kosten:</strong> {exampleHowTo.estimatedCost}€</p>
                <p><strong>Zeitaufwand:</strong> 2 Wochen (von Planung bis Installation)</p>
              </div>
            </section>

            {/* FAQ Section - Optimized for AI answers */}
            <section className="mb-8">
              <h2>Häufig gestellte Fragen zur Solar-Installation</h2>
              <div className="space-y-6">
                {exampleFAQs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Expert Insights for Authority */}
            <section className="mb-8">
              <h2>Expertentipps für 2025</h2>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-3">
                  Aktuelle Marktentwicklungen
                </h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Modulpreise sind 2025 um 20% gefallen</li>
                  <li>• Neue Speichertechnologien mit längerer Lebensdauer</li>
                  <li>• Vereinfachte Anmeldeverfahren in allen Bundesländern</li>
                  <li>• Smart Home Integration wird Standard</li>
                </ul>
              </div>
            </section>
          </article>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">
                  Bereit für Ihre Solaranlage?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Finden Sie qualifizierte Installateure in Ihrer Region und 
                  erhalten Sie kostenlose Angebote.
                </p>
                <div className="space-y-3">
                  <a 
                    href="/installateur-finden" 
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Installateure finden
                  </a>
                  <br />
                  <a 
                    href="/kostenlose-beratung"
                    className="inline-block text-primary hover:underline"
                  >
                    Kostenlose Beratung vereinbaren
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </>
  );
};

export default AeoExample;