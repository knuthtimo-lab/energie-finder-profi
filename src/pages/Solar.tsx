import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolarCalculator from "@/components/SolarCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Zap, TrendingUp, Shield, ArrowRight, Calculator, Award, CheckCircle, MapPin, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Solar = () => {
  const benefits = [
    {
      icon: Sun,
      title: "Nachhaltige Energie",
      description: "100% saubere, erneuerbare Energie direkt von der Sonne"
    },
    {
      icon: Zap,
      title: "Kosteneinsparung",
      description: "Bis zu 70% Reduzierung Ihrer Stromkosten"
    },
    {
      icon: TrendingUp,
      title: "Wertsteigerung",
      description: "Erhöhung des Immobilienwerts um bis zu 10%"
    },
    {
      icon: Shield,
      title: "Langzeitgarantie",
      description: "20+ Jahre Produktgarantie und Leistungsgarantie"
    }
  ];

  // SEO: Update page title and meta description
  useEffect(() => {
    const title = "Solar-Einsparungen berechnen – EnergieProfis Rechner";
    const description = "Berechnen Sie Ihre Solareinsparungen und vergleichen Sie Angebote – jetzt online! Förderungen, Kosten & Potenziale im Solarrechner entdecken – gratis & unverbindlich.";
    
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
      { property: 'og:image', content: `${window.location.origin}/solar_banner.png` }
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

    // Add structured data for the Solar page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Solar-Einsparungen berechnen",
      "description": "Solarrechner für Photovoltaik-Anlagen: Kosten, Förderungen und Ertrag berechnen",
      "url": window.location.href,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Startseite",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Solar",
            "item": window.location.href
          }
        ]
      },
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Solar-Einsparungsrechner",
        "description": "Berechnen Sie Ihre Solareinsparungen und vergleichen Sie Angebote",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "url": window.location.href,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Kostenloser Solarrechner"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "EnergieProfis",
        "url": window.location.origin
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
      
      {/* SEO-Optimized Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/solar_banner.png"
            alt="Solar Banner - Photovoltaik Installation und Solartechnik"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-solar/80 via-solar/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            {/* H1: Primary SEO heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Solar-Einsparungen und Angebote berechnen
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Finden Sie qualifizierte Solartechnik-Experten für Photovoltaik-Anlagen, 
              Solarthermie und komplette Energiesysteme. Kostenlos vergleichen & sparen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="bg-white text-solar hover:bg-white/90" asChild>
                <Link to="/installateur-finden?type=solar">
                  Solar-Installateur Finden
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO: Rich content section for better indexing */}
      <section className="py-16 bg-gradient-to-b from-background to-solar-light/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* SEO Content Block 1: Förderoptionen */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Award className="w-5 h-5" />
                  Förderoptionen im Bundesland
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Aktuelle Förderprogramme 2025: BAFA-Zuschüsse für Balkonkraftwerke, 
                  KfW-Kredite mit Tilgungszuschuss und kommunale Förderungen.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>BAFA bis 500€ für Balkonkraftwerke</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>KfW 270 mit 10% Tilgungszuschuss</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>EEG-Vergütung für Überschussstrom</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Content Block 2: Kosten und Wirtschaftlichkeit */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="w-5 h-5" />
                  Kosten und Wirtschaftlichkeit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Transparente Kostenaufstellung: Von Balkonkraftwerken bis zur kompletten 
                  Dachanlage. Amortisation in 7-12 Jahren möglich.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Balkonkraftwerk: 400-800€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Dachanlage: 8.000-15.000€/kWp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Speicher: 1.200-1.800€/kWh</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Content Block 3: Ertragsprognose */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Calculator className="w-5 h-5" />
                  Ertragsprognose für Ihre Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Standort-spezifische Ertragsberechnung: Sonneneinstrahlung, Dachneigung, 
                  Ausrichtung und lokale Wetterdaten berücksichtigt.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Dachneigung 30-35° optimal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Süd-Ausrichtung bevorzugt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>800-1.200 kWh/kWp pro Jahr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-solar-light/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Warum Solar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Investieren Sie in die Zukunft mit nachhaltiger Solarenergie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-solar/20 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-solar rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Calculator Section */}
      <SolarCalculator />

      {/* SEO: FAQ Section for better content depth */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Häufige Fragen zu Solar-Installationen</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Welche Förderungen gibt es 2025 für Solaranlagen?</h3>
                <p className="text-muted-foreground">
                  BAFA-Förderung für Balkonkraftwerke (bis 500€), KfW-Kredite mit Tilgungszuschuss, 
                  EEG-Vergütung für Überschussstrom und kommunale Zuschüsse je nach Bundesland.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Was kostet eine Solaranlage 2025?</h3>
                <p className="text-muted-foreground">
                  Balkonkraftwerk: 400-800€, Komplette Dachanlage: 8.000-15.000€ je kWp. 
                  Preise variieren je nach Region, Anbieter und Ausstattung.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Wie lange dauert die Amortisation?</h3>
                <p className="text-muted-foreground">
                  Bei aktuellen Strompreisen amortisiert sich eine Solaranlage in 7-12 Jahren. 
                  Mit Förderungen und steigenden Energiekosten kann sich die Zeit verkürzen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Brauche ich einen Stromspeicher?</h3>
                <p className="text-muted-foreground">
                  Ein Speicher ist nicht zwingend erforderlich, erhöht aber den Eigenverbrauch 
                  von 30% auf 60-80%. Die Wirtschaftlichkeit hängt von Ihrem Verbrauchsprofil ab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-solar text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für Ihre Solar-Installation?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Erhalten Sie kostenlose Angebote von geprüften Solar-Installateuren in Ihrer Region
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="bg-white text-solar hover:bg-white/90" asChild>
              <Link to="/installateur-finden?type=solar">
                Solar-Installateure finden
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solar;