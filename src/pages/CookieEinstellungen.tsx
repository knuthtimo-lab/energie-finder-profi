import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookieEinstellungen = () => {
  const [necessaryCookies, setNecessaryCookies] = useState(true); // Always true, can't be disabled
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const handleSavePreferences = () => {
    // Save cookie preferences to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: necessaryCookies,
      analytics: analyticsCookies,
      marketing: marketingCookies
    }));
    
    // Show success message
    alert('Ihre Cookie-Einstellungen wurden gespeichert!');
  };

  const handleAcceptAll = () => {
    setAnalyticsCookies(true);
    setMarketingCookies(true);
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true
    }));
    alert('Alle Cookies wurden akzeptiert!');
  };

  const handleRejectAll = () => {
    setAnalyticsCookies(false);
    setMarketingCookies(false);
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false
    }));
    alert('Alle optionalen Cookies wurden abgelehnt!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie-Einstellungen</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Was sind Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. 
                Sie helfen uns dabei, Ihre Präferenzen zu speichern und die Website für Sie zu verbessern. 
                Wir verwenden verschiedene Arten von Cookies für unterschiedliche Zwecke.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cookie-Kategorien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Notwendige Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Diese Cookies sind für das Funktionieren der Website unerlässlich. Sie können nicht deaktiviert werden.
                    Sie werden normalerweise nur als Reaktion auf Aktionen gesetzt, die Sie ausführen und die einer Anfrage nach Diensten entsprechen.
                  </p>
                </div>
                <Switch checked={necessaryCookies} disabled />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Analyse-Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Diese Cookies ermöglichen es uns, die Anzahl der Besucher zu zählen und zu verstehen, wie Besucher mit unserer Website interagieren.
                    Alle Informationen, die diese Cookies sammeln, werden aggregiert und sind daher anonym.
                  </p>
                </div>
                <Switch 
                  checked={analyticsCookies} 
                  onCheckedChange={setAnalyticsCookies}
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Marketing-Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Diese Cookies werden verwendet, um Besuchern auf Webseiten zu folgen. Die Absicht ist, Anzeigen zu zeigen, 
                    die relevant und ansprechend für den einzelnen Benutzer sind und daher wertvoller für Publisher und Drittanbieter sind.
                  </p>
                </div>
                <Switch 
                  checked={marketingCookies} 
                  onCheckedChange={setMarketingCookies}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detaillierte Cookie-Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Notwendige Cookies</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">session_id</span>
                    <span className="text-muted-foreground">Speichert Ihre Session-ID</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">cookie_preferences</span>
                    <span className="text-muted-foreground">Speichert Ihre Cookie-Einstellungen</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Analyse-Cookies</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">_ga</span>
                    <span className="text-muted-foreground">Google Analytics - Unterscheidet Benutzer</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">_gid</span>
                    <span className="text-muted-foreground">Google Analytics - Unterscheidet Benutzer</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Marketing-Cookies</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">_fbp</span>
                    <span className="text-muted-foreground">Facebook Pixel - Verfolgt Besucher</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ihre Rechte</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Sie haben das Recht, Ihre Cookie-Einstellungen jederzeit zu ändern. Sie können auch Cookies, 
                die bereits auf Ihrem Gerät gespeichert sind, über Ihren Browser löschen.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Chrome:</strong> Einstellungen → Erweitert → Datenschutz und Sicherheit → Cookies und andere Websitedaten</p>
                <p><strong>Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten</p>
                <p><strong>Safari:</strong> Einstellungen → Datenschutz → Cookies und Website-Daten verwalten</p>
                <p><strong>Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen → Cookies und gespeicherte Daten</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSavePreferences}
              className="bg-primary hover:bg-primary/90"
            >
              Einstellungen speichern
            </Button>
            <Button 
              onClick={handleAcceptAll}
              variant="outline"
            >
              Alle akzeptieren
            </Button>
            <Button 
              onClick={handleRejectAll}
              variant="outline"
            >
              Alle ablehnen
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CookieEinstellungen;
