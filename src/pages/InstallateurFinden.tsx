import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Phone, Mail, Globe, Filter, AlertCircle } from "lucide-react";
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
      setInstallers(data || []);

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
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Installateure Finden
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Entdecken Sie qualifizierte Fachbetriebe für erneuerbare Energien in Ihrer Region
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
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
      </div>
    </div>
  );
};

export default InstallateurFinden;
