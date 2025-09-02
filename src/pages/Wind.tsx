import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WindCalculator from "@/components/WindCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Zap, TrendingUp, Shield, ArrowRight, Calculator, Award, CheckCircle, MapPin, Users, Clock, Star, Map } from "lucide-react";
import { Link } from "react-router-dom";

const WindPage = () => {
  const benefits = [
    {
      icon: Wind,
      title: "Konstante Energie",
      description: "24/7 Energieproduktion bei ausreichender Windgeschwindigkeit"
    },
    {
      icon: Zap,
      title: "Hohe Effizienz",
      description: "Moderne Anlagen nutzen auch schwache Winde effektiv"
    },
    {
      icon: TrendingUp,
      title: "Skalierbarkeit",
      description: "Von kleinen Anlagen bis zu großen Windparks"
    },
    {
      icon: Shield,
      title: "Bewährte Technologie",
      description: "Jahrzehntelange Erfahrung und zuverlässige Systeme"
    }
  ];

  // SEO: Update page title and meta description
  useEffect(() => {
    const title = "Windenergie-Ertrag berechnen – EnergieProfis Rechner";
    const description = "Windenergie berechnen: Ertrag, Kosten & Angebote vergleichen – jetzt kostenlos! Förderungen und Potenzial für Ihre Windanlage im Rechner entdecken.";
    
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
      { property: 'og:image', content: `${window.location.origin}/wind_banner.png` }
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

    // Add structured data for the Wind page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Windenergie-Ertrag berechnen",
      "description": "Windenergie-Rechner für Kleinwindanlagen: Ertrag, Kosten und Genehmigungen berechnen",
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
            "name": "Windenergie",
            "item": window.location.href
          }
        ]
      },
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Windenergie-Rechner",
        "description": "Windenergie berechnen: Ertrag, Kosten & Angebote vergleichen",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "url": window.location.href,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Kostenloser Windenergie-Rechner"
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
            src="/wind_banner.png"
            alt="Wind Banner - Windkraftanlagen und Kleinwindanlagen Installation"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wind/80 via-wind/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            {/* H1: Primary SEO heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Windkraft-Ertrag und Angebote berechnen
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Entdecken Sie die Kraft des Windes mit modernen Windkraftanlagen 
              für private und gewerbliche Nutzung. Kostenlos vergleichen & sparen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="bg-white text-wind hover:bg-white/90" asChild>
                <Link to="/installateur-finden?type=wind">
                  Wind-Installateur Finden
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO: Rich content section for better indexing */}
      <section className="py-16 bg-gradient-to-b from-background to-wind-light/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* SEO Content Block 1: Fördermittel und Genehmigungen */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Award className="w-5 h-5" />
                  Fördermittel und Genehmigungen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Bundesland-spezifische Förderprogramme und Genehmigungsverfahren: 
                  Mast-Höhen unter 15m sind in den meisten Bundesländern genehmigungsfrei.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Genehmigung unter 15m Mast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Bundesland-spezifische Vorgaben</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Schallemissions-Gutachten</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Content Block 2: Kosten und Rendite */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="w-5 h-5" />
                  Kosten und Rendite hier kalkulieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Transparente Kostenaufstellung: Von Kleinwindanlagen bis zu größeren 
                  Systemen. Amortisation in 8-15 Jahren möglich.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Kleinwindanlage: 3.000-15.000€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Mast und Fundament: 1.500-5.000€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Installation: 2.000-8.000€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Content Block 3: Angebote vergleichen */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Map className="w-5 h-5" />
                  Angebote für Windanlagen vergleichen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Qualifizierte Wind-Installateure in Ihrer Region finden und 
                  Angebote direkt vergleichen. Kostenlos und unverbindlich.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Lokale Fachbetriebe</span>
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
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-wind-light/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Warum Windenergie?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nutzen Sie die unerschöpfliche Kraft des Windes für saubere Energie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-wind/20 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-wind rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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

      {/* Wind Calculator Section */}
      <WindCalculator />

      {/* SEO: FAQ Section for better content depth */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Häufige Fragen zu Windkraft-Installationen</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Brauche ich eine Genehmigung für eine Kleinwindanlage?</h3>
                <p className="text-muted-foreground">
                  Mast-Höhen unter 15m sind in den meisten Bundesländern genehmigungsfrei. 
                  Ab 15m ist ein Bauantrag erforderlich. Schallemissions-Gutachten können nötig sein.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Was kostet eine Windkraftanlage 2025?</h3>
                <p className="text-muted-foreground">
                  Kleinwindanlage: 3.000-15.000€, Mast und Fundament: 1.500-5.000€, 
                  Installation: 2.000-8.000€. Preise variieren je nach Größe und Region.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Welche Windgeschwindigkeit ist optimal?</h3>
                <p className="text-muted-foreground">
                  Moderne Anlagen starten bereits bei 2-3 m/s Windgeschwindigkeit. 
                  Optimal sind 5-8 m/s. Ab 12 m/s wird die Leistung begrenzt.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg">Wie laut ist eine Kleinwindanlage?</h3>
                <p className="text-muted-foreground">
                  Moderne Anlagen sind sehr leise. Bei 50m Entfernung liegt der Schallpegel 
                  bei 35-45 dB(A), vergleichbar mit leisen Gesprächen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-wind text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für Ihre Windkraft-Installation?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Erhalten Sie kostenlose Angebote von geprüften Wind-Installateuren in Ihrer Region
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="bg-white text-wind hover:bg-white/90" asChild>
              <Link to="/installateur-finden?type=wind">
                Wind-Installateure finden
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

export default WindPage;