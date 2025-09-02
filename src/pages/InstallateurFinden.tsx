import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Phone, Mail, Globe, Filter, AlertCircle, Calculator, Award, Shield, TrendingUp, Map, Users, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { installerService, analyticsService } from "@/lib/database";
import { cleanAndReseedDatabase } from "@/lib/cleanDatabase";
import { debugDatabase, forceDeleteAll, testConnection } from "@/lib/debugDatabase";
import type { Database } from "@/integrations/supabase/types";

type Installer = Database['public']['Tables']['installers']['Row'];

const InstallateurFinden = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [energyType, setEnergyType] = useState(searchParams.get("type") || "all");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // SEO: Add structured data for the page
  useEffect(() => {
    // Add structured data for the installer directory
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Solar- und Wind-Installateure in Deutschland",
      "description": "Qualifizierte Fachbetriebe für Photovoltaik und Windenergie finden und vergleichen",
      "url": window.location.href,
      "numberOfItems": installers.length,
      "itemListElement": installers.map((installer, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "LocalBusiness",
          "name": installer.name,
          "description": installer.description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": installer.location
          },
          "telephone": installer.phone,
          "email": installer.email,
          "url": installer.website ? `https://${installer.website}` : undefined,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": installer.rating,
            "reviewCount": installer.review_count || 0
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${installer.energy_type === 'solar' ? 'Solar' : 'Wind'}-Installation`,
            "itemListElement": installer.specialties?.map(specialty => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": specialty
              }
            })) || []
          }
        }
      }))
    };

    // Add breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
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
          "name": "Installateur finden",
          "item": window.location.href
        }
      ]
    };

    // Insert structured data into the page
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(script2);

    // Cleanup function
    return () => {
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, [installers]);

  // SEO: Update page title and meta description
  useEffect(() => {
    const title = "Solar- und Wind-Installateur finden – EnergieProfis Vergleich";
    const description = "Qualifizierte Solar- und Windbetriebe direkt vergleichen. Jetzt Anfrage starten! Fachbetriebe finden, Angebote vergleichen & Kosten sparen – Echtzeit-Vergleich online.";
    
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
      { property: 'og:site_name', content: 'EnergieProfis' }
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
  }, []);

  // Load installers from database
  const loadInstallers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        energyType: energyType && energyType !== "all" ? energyType : undefined,
        location: location || undefined,
        searchTerm: searchTerm || undefined
      };

      const data = await installerService.getInstallers(filters);
      
      // If no installers found, automatically seed the database
      if (!data || data.length === 0) {
        console.log('No installers found, seeding database...');
        try {
          await cleanAndReseedDatabase();
          // Try to load installers again after seeding
          const reseededData = await installerService.getInstallers(filters);
          setInstallers(reseededData || []);
        } catch (seedError) {
          console.error('Error seeding database:', seedError);
          setError('Datenbank wird initialisiert. Bitte versuchen Sie es in wenigen Sekunden erneut.');
          setInstallers([]);
        }
      } else {
        setInstallers(data);
      }

      // Track search event
      if (searchTerm || energyType !== "all" || location) {
        analyticsService.trackEvent({
          event_type: 'installer_search',
          page_url: window.location.pathname,
          event_data: filters,
          user_agent: navigator.userAgent,
          session_id: sessionStorage.getItem('session_id') || 'anonymous'
        });
      }
    } catch (err) {
      console.error('Error loading installers:', err);
      setError('Fehler beim Laden der Installateure. Bitte versuchen Sie es später erneut.');
      setInstallers([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadInstallers();
  }, []);

  // Reload when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadInstallers();
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, energyType, location]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (energyType && energyType !== "all") params.set("type", energyType);
    if (location) params.set("location", location);
    setSearchParams(params);
  }, [searchTerm, energyType, location, setSearchParams]);

  const handleReset = () => {
    setSearchTerm("");
    setEnergyType("all");
    setLocation("");
  };

  // Test connection
  const handleTestConnection = async () => {
    await testConnection();
  };

  // Debug database
  const handleDebugDatabase = async () => {
    await debugDatabase();
  };

  // Force delete all and reseed
  const handleForceReseed = async () => {
    try {
      await forceDeleteAll();
      await cleanAndReseedDatabase();
      alert('Database forcefully reseeded!');
      loadInstallers();
    } catch (error) {
      console.error('Error in force reseed:', error);
      alert('Error in force reseed. Check console.');
    }
  };

  // Clean and reseed with proper German data
  const handleSeedDatabase = async () => {
    try {
      await cleanAndReseedDatabase();
      alert('Deutsche Installateure erfolgreich geladen!');
      loadInstallers(); // Reload the data
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('Fehler beim Laden der Installateure. Details in der Konsole.');
    }
  };

  // Track contact clicks
  const handleContactClick = async (installerId: string, contactType: string) => {
    try {
      await analyticsService.trackContactClick({
        installer_id: installerId,
        contact_type: contactType,
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        ip_address: await getClientIP()
      });
    } catch (error) {
      console.error('Error tracking contact click:', error);
    }
  };

  // Simple IP detection (fallback)
  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Installateure werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md mx-auto px-4">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Fehler beim Laden</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => loadInstallers()} className="mb-4">
              Erneut versuchen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />
      
      {/* SEO-Optimized Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          {/* H1: Primary SEO heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Finden Sie den besten Solar- oder Wind-Installateur in Ihrer Region
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Qualifizierte Fachbetriebe für erneuerbare Energien in Ihrer Nähe finden und vergleichen
          </p>
          
          {/* SEO: Key benefits and CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Calculator className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Angebote vergleichen</h3>
              <p className="text-sm text-white/80">Kostenlos & unverbindlich</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Fördermöglichkeiten</h3>
              <p className="text-sm text-white/80">BAFA, KfW & kommunale Zuschüsse</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Verifizierte Experten</h3>
              <p className="text-sm text-white/80">Zertifizierte Fachbetriebe</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO: Rich content section for better indexing */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* SEO Content Block 1: Solar Installation */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <TrendingUp className="w-5 h-5" />
                Solar-Installation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Photovoltaik-Anlagen für Ihr Zuhause: Von Balkonkraftwerken bis zur kompletten Dachanlage. 
                Aktuelle Förderungen 2025, Kostenvergleich und qualifizierte Installateure in Ihrer Region.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>BAFA-Förderung bis 500€</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>KfW-Kredite mit Tilgungszuschuss</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>EEG-Vergütung für Überschuss</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Content Block 2: Wind Energy */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Map className="w-5 h-5" />
                Windenergie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Kleinwindanlagen für Privatgrundstücke: Genehmigungsverfahren, Schallemission, 
                Mast-Höhen und aktuelle Förderprogramme. Fachbetriebe mit Windenergie-Expertise.
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

          {/* SEO Content Block 3: Regional Benefits */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Users className="w-5 h-5" />
                Regionale Vorteile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Lokale Installateure kennen die regionalen Gegebenheiten, Förderprogramme und 
                Genehmigungsverfahren in Ihrem Bundesland. Persönliche Beratung vor Ort.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Kommunale Förderprogramme</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Lokale Genehmigungsrichtlinien</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Regionale Preisvergleiche</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Suche & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Installateur oder Spezialität suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={energyType} onValueChange={setEnergyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Energieart wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Energiearten</SelectItem>
                  <SelectItem value="solar">Solar</SelectItem>
                  <SelectItem value="wind">Wind</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="PLZ oder Stadt"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button onClick={handleReset} variant="outline" className="w-full">
                Filter zurücksetzen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SEO: FAQ Section for better content depth */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Häufige Fragen zu Solar- und Wind-Installation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Welche Förderungen gibt es 2025 für Solaranlagen?</h3>
                <p className="text-muted-foreground text-sm">
                  BAFA-Förderung für Balkonkraftwerke (bis 500€), KfW-Kredite mit Tilgungszuschuss, 
                  EEG-Vergütung für Überschussstrom und kommunale Zuschüsse je nach Bundesland.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Brauche ich eine Genehmigung für eine Kleinwindanlage?</h3>
                <p className="text-muted-foreground text-sm">
                  Mast-Höhen unter 15m sind in den meisten Bundesländern genehmigungsfrei. 
                  Ab 15m ist ein Bauantrag erforderlich. Schallemissions-Gutachten können nötig sein.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Wie finde ich den besten Installateur in meiner Region?</h3>
                <p className="text-muted-foreground text-sm">
                  Nutzen Sie unseren Vergleich: Bewertungen, Erfahrung, Zertifizierungen und 
                  regionale Expertise vergleichen. Lokale Installateure kennen die regionalen Vorgaben.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Was kostet eine Solaranlage 2025?</h3>
                <p className="text-muted-foreground text-sm">
                  Balkonkraftwerk: 400-800€, Komplette Dachanlage: 8.000-15.000€ je kWp. 
                  Preise variieren je nach Region, Anbieter und Ausstattung. Nutzen Sie unseren Kostenrechner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debug Section - Only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Debug Tools (Development Only)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleTestConnection} variant="outline" size="sm">
                  Test Connection
                </Button>
                <Button onClick={handleDebugDatabase} variant="outline" size="sm">
                  Debug Database
                </Button>
                <Button onClick={handleSeedDatabase} variant="outline" size="sm">
                  Seed Database
                </Button>
                <Button onClick={handleForceReseed} variant="outline" size="sm">
                  Force Reseed
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">Fehler beim Laden</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={loadInstallers} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Erneut versuchen
                  </Button>
                  {process.env.NODE_ENV === 'development' && (
                    <Button onClick={handleSeedDatabase} variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      Datenbank initialisieren
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-blue-700">Installateure werden geladen...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {installers.length} Installateur{installers.length !== 1 ? 'e' : ''} gefunden
          </p>
        </div>

        {/* Installer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {installers.map((installer) => (
            <Card key={installer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{installer.name}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{installer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{installer.rating}</span>
                        <span className="text-muted-foreground">({installer.review_count || 0})</span>
                      </div>
                      <Badge variant="secondary">{installer.experience_years || 0} Jahre Erfahrung</Badge>
                      {installer.verified && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Verifiziert
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={installer.energy_type === 'solar' ? 'default' : 'secondary'}
                      className={installer.energy_type === 'solar' ? 'bg-gradient-solar' : 'bg-gradient-wind'}
                    >
                      {installer.energy_type === 'solar' ? 'Solar' : 'Wind'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{installer.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Spezialitäten:</h4>
                  <div className="flex flex-wrap gap-2">
                    {installer.specialties?.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    )) || (
                      <span className="text-muted-foreground text-sm">Keine Spezialitäten angegeben</span>
                    )}
                  </div>
                </div>

                {installer.certifications && installer.certifications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Zertifizierungen:</h4>
                    <div className="flex flex-wrap gap-2">
                      {installer.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      handleContactClick(installer.id, 'phone');
                      window.location.href = `tel:${installer.phone}`;
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Anrufen
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      handleContactClick(installer.id, 'email');
                      window.location.href = `mailto:${installer.email}`;
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    E-Mail
                  </Button>
                  {installer.website && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        handleContactClick(installer.id, 'website');
                        window.open(`https://${installer.website}`, '_blank');
                      }}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {installers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">
                Keine Installateure gefunden, die Ihren Kriterien entsprechen.
              </p>
              <Button onClick={handleReset} variant="outline">
                Alle Filter zurücksetzen
              </Button>
            </CardContent>
          </Card>
        )}

        {/* SEO: Internal linking section */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Weitere nützliche Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="text-center p-6 hover:shadow-md transition-shadow">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold mb-2">Solar-Einsparungsrechner</h3>
              <p className="text-muted-foreground mb-4">
                Berechnen Sie Ihre Solareinsparungen und vergleichen Sie Angebote
              </p>
              <Button variant="outline" className="w-full">
                Zum Solarrechner
              </Button>
            </Card>
            <Card className="text-center p-6 hover:shadow-md transition-shadow">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Windenergie-Rechner</h3>
              <p className="text-muted-foreground mb-4">
                Windenergie berechnen: Ertrag, Kosten & Angebote vergleichen
              </p>
              <Button variant="outline" className="w-full">
                Zum Windrechner
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallateurFinden;
