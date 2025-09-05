import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, MapPin, Phone, Mail, Globe, CheckCircle, Users, Award, Clock } from "lucide-react";
import Header from "@/components/Header";
import { usePostHog } from "@/hooks/usePostHog";
import { sendCompanyRegistrationEmail } from "@/lib/emailService";

const UnternehmenListen = () => {
  const posthog = usePostHog();
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    zipCode: "",
    city: "",
    energyTypes: [] as string[],
    services: [] as string[],
    description: "",
    experience: "",
    certifications: [] as string[],
    coverageArea: "",
    contactPreference: "email",
    newsletter: false,
    privacyPolicy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Track form interactions
    if (field === 'experience') {
      posthog.capture('experience_selected', {
        experience_level: value,
        form_section: 'company_registration'
      });
    }
  };

  const handleEnergyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        energyTypes: [...prev.energyTypes, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        energyTypes: prev.energyTypes.filter(t => t !== type)
      }));
    }
    
    // Track energy type selection
    posthog.capture('energy_type_selected', {
      energy_type: type,
      selected: checked,
      form_section: 'company_registration'
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(s => s !== service)
      }));
    }
    
    // Track service selection
    posthog.capture('service_selected', {
      service: service,
      selected: checked,
      form_section: 'company_registration'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track form submission in PostHog
    posthog.capture('company_registration_started', {
      company_name: formData.companyName,
      energy_types: formData.energyTypes,
      services: formData.services,
      experience: formData.experience,
      location: `${formData.zipCode} ${formData.city}`
    });
    
    try {
      // Send email notification via webhook
      const result = await sendCompanyRegistrationEmail(formData);
      
      if (result.success) {
        console.log('✅ E-Mail erfolgreich an Webhook gesendet!');
        console.log('📧 Daten wurden an knuth.timo@gmail.com weitergeleitet');
        
        // Track successful submission
        posthog.capture('company_registration_completed', {
          company_name: formData.companyName,
          energy_types: formData.energyTypes,
          services: formData.services,
          experience: formData.experience,
          location: `${formData.zipCode} ${formData.city}`
        });
      } else {
        console.log('⚠️ Webhook-Fehler, aber Daten wurden geloggt:', result.data);
        
        // Track failed submission
        posthog.capture('company_registration_failed', {
          company_name: formData.companyName,
          error: result.error || 'Webhook failed'
        });
      }
      
    } catch (error) {
      console.error('❌ Fehler beim Senden der E-Mail:', error);
      
      // Track failed submission
      posthog.capture('company_registration_failed', {
        company_name: formData.companyName,
        error: error.message
      });
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Anmeldung erfolgreich!</h2>
            <p className="text-muted-foreground mb-4">
              Vielen Dank für Ihre Anmeldung. Wir werden Ihr Unternehmen innerhalb von 48 Stunden prüfen und freischalten.
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
            Unternehmen Listen
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Werden Sie Teil unseres Netzwerks und erreichen Sie neue Kunden für erneuerbare Energien
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Unternehmensanmeldung</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Firmenname *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Ansprechpartner *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                      />
                    </div>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://www.example.de"
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

                  {/* Energy Types */}
                  <div className="space-y-2">
                    <Label>Energiearten *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="solar"
                          checked={formData.energyTypes.includes("solar")}
                          onCheckedChange={(checked) => handleEnergyTypeChange("solar", checked as boolean)}
                        />
                        <Label htmlFor="solar">Solar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wind"
                          checked={formData.energyTypes.includes("wind")}
                          onCheckedChange={(checked) => handleEnergyTypeChange("wind", checked as boolean)}
                        />
                        <Label htmlFor="wind">Wind</Label>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-2">
                    <Label>Angebotene Leistungen *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="planning"
                          checked={formData.services.includes("planning")}
                          onCheckedChange={(checked) => handleServiceChange("planning", checked as boolean)}
                        />
                        <Label htmlFor="planning">Planung & Beratung</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="installation"
                          checked={formData.services.includes("installation")}
                          onCheckedChange={(checked) => handleServiceChange("installation", checked as boolean)}
                        />
                        <Label htmlFor="installation">Installation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="maintenance"
                          checked={formData.services.includes("maintenance")}
                          onCheckedChange={(checked) => handleServiceChange("maintenance", checked as boolean)}
                        />
                        <Label htmlFor="maintenance">Wartung & Service</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="financing"
                          checked={formData.services.includes("financing")}
                          onCheckedChange={(checked) => handleServiceChange("financing", checked as boolean)}
                        />
                        <Label htmlFor="financing">Finanzierung</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Jahre Erfahrung *</Label>
                      <SimpleSelect 
                        value={formData.experience} 
                        onValueChange={(value) => handleInputChange("experience", value)}
                        placeholder="Erfahrung wählen"
                      >
                        <SimpleSelectItem value="0-2">0-2 Jahre</SimpleSelectItem>
                        <SimpleSelectItem value="3-5">3-5 Jahre</SimpleSelectItem>
                        <SimpleSelectItem value="6-10">6-10 Jahre</SimpleSelectItem>
                        <SimpleSelectItem value="10+">Über 10 Jahre</SimpleSelectItem>
                      </SimpleSelect>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverageArea">Einzugsgebiet</Label>
                      <Input
                        id="coverageArea"
                        value={formData.coverageArea}
                        onChange={(e) => handleInputChange("coverageArea", e.target.value)}
                        placeholder="z.B. Bayern, 50km Umkreis"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Unternehmensbeschreibung *</Label>
                    <Textarea
                      id="description"
                      placeholder="Beschreiben Sie Ihr Unternehmen, Ihre Spezialitäten und warum Kunden Sie wählen sollten..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
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
                        Ich möchte über neue Funktionen und Marketing-Möglichkeiten informiert werden
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
                    {isSubmitting ? "Wird gesendet..." : "Unternehmen anmelden"}
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
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Neue Kunden gewinnen</h4>
                    <p className="text-sm text-muted-foreground">Erreichen Sie potenzielle Kunden in Ihrer Region</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Vertrauen aufbauen</h4>
                    <p className="text-sm text-muted-foreground">Präsentieren Sie sich als verifizierter Experte</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Zeit sparen</h4>
                    <p className="text-sm text-muted-foreground">Kunden finden Sie automatisch über unsere Plattform</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Professioneller Auftritt</h4>
                    <p className="text-sm text-muted-foreground">Präsentieren Sie Ihr Unternehmen professionell</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card>
              <CardHeader>
                <CardTitle>Ablauf</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold">Anmeldung</h4>
                    <p className="text-sm text-muted-foreground">Füllen Sie das Formular aus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold">Prüfung</h4>
                    <p className="text-sm text-muted-foreground">Wir prüfen Ihre Angaben (48h)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold">Freischaltung</h4>
                    <p className="text-sm text-muted-foreground">Ihr Profil wird veröffentlicht</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold">Kundenkontakte</h4>
                    <p className="text-sm text-muted-foreground">Erhalten Sie Anfragen von Kunden</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnternehmenListen;
