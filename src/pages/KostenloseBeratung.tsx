import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

const KostenloseBeratung = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    city: "",
    energyType: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
    contactPreference: "email",
    newsletter: false,
    privacyPolicy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Beratungsanfrage gesendet!</h2>
            <p className="text-muted-foreground mb-4">
              Vielen Dank für Ihr Interesse. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
            </p>
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Zurück zur Startseite
            </Button>
          </CardContent>
        </Card>
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
            Kostenlose Beratung
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Lassen Sie sich von unseren Experten beraten und erhalten Sie ein maßgeschneidertes Angebot
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Ihre Beratungsanfrage</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">PLZ *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Stadt *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="energyType">Energieart *</Label>
                      <Select value={formData.energyType} onValueChange={(value) => handleInputChange("energyType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Energieart wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solar">Solar</SelectItem>
                          <SelectItem value="wind">Wind</SelectItem>
                          <SelectItem value="both">Beide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Projekttyp *</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Projekttyp wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Privathaushalt</SelectItem>
                          <SelectItem value="commercial">Gewerbe</SelectItem>
                          <SelectItem value="industrial">Industrie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Budget wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Unter 10.000 €</SelectItem>
                          <SelectItem value="10k-25k">10.000 - 25.000 €</SelectItem>
                          <SelectItem value="25k-50k">25.000 - 50.000 €</SelectItem>
                          <SelectItem value="over-50k">Über 50.000 €</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Zeitplan</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Zeitplan wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Sofort</SelectItem>
                          <SelectItem value="3months">Innerhalb 3 Monate</SelectItem>
                          <SelectItem value="6months">Innerhalb 6 Monate</SelectItem>
                          <SelectItem value="1year">Innerhalb 1 Jahr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Projektbeschreibung</Label>
                    <Textarea
                      id="description"
                      placeholder="Beschreiben Sie Ihr Projekt, Ihre Anforderungen und Ziele..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Kontaktpräferenz</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="email-pref"
                          name="contactPreference"
                          value="email"
                          checked={formData.contactPreference === "email"}
                          onChange={(e) => handleInputChange("contactPreference", e.target.value)}
                        />
                        <Label htmlFor="email-pref">E-Mail</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="phone-pref"
                          name="contactPreference"
                          value="phone"
                          checked={formData.contactPreference === "phone"}
                          onChange={(e) => handleInputChange("contactPreference", e.target.value)}
                        />
                        <Label htmlFor="phone-pref">Telefon</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                      />
                      <Label htmlFor="newsletter">
                        Ich möchte den Newsletter mit Tipps zu erneuerbaren Energien erhalten
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onCheckedChange={(checked) => handleInputChange("privacyPolicy", checked as boolean)}
                        required
                      />
                      <Label htmlFor="privacyPolicy">
                        Ich akzeptiere die <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a> *
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Wird gesendet..." : "Beratungsanfrage senden"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Ihre Vorteile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Kostenlose Beratung</h4>
                    <p className="text-sm text-muted-foreground">Unverbindliche Erstberatung ohne Kosten</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Expertenwissen</h4>
                    <p className="text-sm text-muted-foreground">Beratung durch zertifizierte Fachleute</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Maßgeschneiderte Lösungen</h4>
                    <p className="text-sm text-muted-foreground">Individuelle Beratung für Ihr Projekt</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Förderung & Finanzierung</h4>
                    <p className="text-sm text-muted-foreground">Informationen zu staatlichen Förderungen</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+49 (0) 800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>beratung@energieprofis.de</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>München, Deutschland</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Mo-Fr: 8:00 - 18:00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KostenloseBeratung;
