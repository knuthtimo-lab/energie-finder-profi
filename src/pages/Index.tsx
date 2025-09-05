import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EnergyTypesSection from "@/components/EnergyTypesSection";
import CalculatorNavigation from "@/components/CalculatorNavigation";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Award, Shield, TrendingUp, Map, Users, CheckCircle, ArrowRight, Search, MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // SEO: Update page title and meta description
  useEffect(() => {
    const title = "EnergieProfis - Solar- und Wind-Installateure finden & vergleichen";
    const description = "Finden Sie qualifizierte Fachbetriebe für erneuerbare Energien in Ihrer Region. Solar- und Wind-Installateure vergleichen, Angebote einholen & Kosten sparen. Kostenlos & unverbindlich.";
    
    document.title = title;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'EnergieProfis' },
      { property: 'og:image', content: `${window.location.origin}/sun_flow_banner.png` }
    ];

    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${window.location.origin}/sun_flow_banner.png` }
    ];

    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    // Add structured data for the homepage
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "EnergieProfis",
      "description": "Führendes Verzeichnis für Solar- und Wind-Installateure in Deutschland",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/installateur-finden?search={search_term_string}&type={energy_type}&location={location}`
        },
        "query-input": "required name=search_term_string name=energy_type name=location"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EnergieProfis",
        "description": "Fachverzeichnis für erneuerbare Energien",
        "url": window.location.origin,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/favicon.ico`
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Solar- und Wind-Installateure",
        "description": "Qualifizierte Fachbetriebe für erneuerbare Energien",
        "numberOfItems": 500,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Service",
              "name": "Solar-Installation",
              "description": "Photovoltaik-Anlagen, Solarthermie und komplette Energiesysteme",
              "url": `${window.location.origin}/solar`
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Service",
              "name": "Wind-Installation",
              "description": "Kleinwindanlagen und Windkraftanlagen für private und gewerbliche Nutzung",
              "url": `${window.location.origin}/wind`
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Service",
              "name": "Installateur-Vergleich",
              "description": "Fachbetriebe finden, Angebote vergleichen und Kosten sparen",
              "url": `${window.location.origin}/installateur-finden`
            }
          }
        ]
      }
    };

    // Insert structured data into the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* SEO: Rich content section for better indexing */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              {/* SEO Content Block 1: Installateur finden */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Search className="w-5 h-5" />
                    Installateur finden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Qualifizierte Fachbetriebe für Solar- und Windenergie in Ihrer Region finden. 
                    Kostenlos vergleichen und Angebote einholen.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>500+ verifizierte Installateure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Kostenlose Angebote</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Direkter Vergleich</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Content Block 2: Regionale Expertise */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Map className="w-5 h-5" />
                    Regionale Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Lokale Installateure kennen die regionalen Gegebenheiten, Förderprogramme 
                    und Genehmigungsverfahren in Ihrem Bundesland.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Lokale Genehmigungsrichtlinien</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Regionale Preisvergleiche</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Persönliche Beratung vor Ort</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <EnergyTypesSection />
        <CalculatorNavigation />
        <WhyChooseUsSection />

        {/* SEO: FAQ Section for better content depth */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Häufige Fragen zu erneuerbaren Energien</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-3 text-lg">Wie finde ich den besten Installateur in meiner Region?</h3>
                  <p className="text-muted-foreground">
                    Nutzen Sie unseren Vergleich: Bewertungen, Erfahrung, Zertifizierungen und 
                    regionale Expertise vergleichen. Lokale Installateure kennen die regionalen Vorgaben.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-3 text-lg">Was kostet eine Solar- oder Windanlage?</h3>
                  <p className="text-muted-foreground">
                    Balkonkraftwerk: 400-800€, Komplette Dachanlage: 8.000-15.000€ je kWp, 
                    Kleinwindanlage: 3.000-15.000€. Preise variieren je nach Region und Ausstattung.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-3 text-lg">Brauche ich eine Genehmigung?</h3>
                  <p className="text-muted-foreground">
                    Solaranlagen sind meist genehmigungsfrei. Windanlagen unter 15m Mast sind in den 
                    meisten Bundesländern genehmigungsfrei. Ab 15m ist ein Bauantrag erforderlich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO: Internal linking section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Weitere nützliche Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-semibold mb-2">Solar-Einsparungsrechner</h3>
                <p className="text-muted-foreground mb-4">
                  Berechnen Sie Ihre Solareinsparungen und vergleichen Sie Angebote
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link 
                    to="/solar" 
                    onClick={() => {
                      setTimeout(() => {
                        const calculatorElement = document.querySelector('[data-calculator]') || 
                                                document.querySelector('.calculator') ||
                                                document.querySelector('h2');
                        if (calculatorElement) {
                          calculatorElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    Zum Solarrechner
                  </Link>
                </Button>
              </Card>
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Windenergie-Rechner</h3>
                <p className="text-muted-foreground mb-4">
                  Windenergie berechnen: Ertrag, Kosten & Angebote vergleichen
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link 
                    to="/wind" 
                    onClick={() => {
                      setTimeout(() => {
                        const calculatorElement = document.querySelector('[data-calculator]') || 
                                                document.querySelector('.calculator') ||
                                                document.querySelector('h2');
                        if (calculatorElement) {
                          calculatorElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    Zum Windrechner
                  </Link>
                </Button>
              </Card>
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <Search className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">Installateur finden</h3>
                <p className="text-muted-foreground mb-4">
                  Qualifizierte Fachbetriebe in Ihrer Region finden und vergleichen
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/installateur-finden">Installateure suchen</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
