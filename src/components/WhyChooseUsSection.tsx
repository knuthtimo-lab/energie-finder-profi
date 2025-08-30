import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Award, Clock, HeartHandshake, TrendingUp } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verifizierte Installateure",
      description: "Alle Fachbetriebe werden sorgfältig geprüft und zertifiziert für höchste Qualitätsstandards.",
      gradient: "bg-gradient-solar"
    },
    {
      icon: Users,
      title: "Kostenlose Beratung",
      description: "Erhalten Sie unverbindliche Beratung und bis zu 3 Angebote von qualifizierten Experten.",
      gradient: "bg-gradient-wind"
    },
    {
      icon: Award,
      title: "Beste Preise",
      description: "Durch unseren Vergleich erhalten Sie garantiert die besten Konditionen für Ihr Projekt.",
      gradient: "bg-gradient-geo"
    },
    {
      icon: Clock,
      title: "Schnelle Vermittlung",
      description: "In nur wenigen Minuten erhalten Sie passende Installateur-Vorschläge für Ihre Region.",
      gradient: "bg-gradient-battery"
    },
    {
      icon: HeartHandshake,
      title: "Persönlicher Service",
      description: "Unser Expertenteam steht Ihnen bei allen Fragen rund um erneuerbare Energien zur Seite.",
      gradient: "bg-gradient-solar"
    },
    {
      icon: TrendingUp,
      title: "Langfristige Erfolge",
      description: "Profitieren Sie von nachhaltigen Energielösungen und langfristigen Kosteneinsparungen.",
      gradient: "bg-gradient-wind"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Warum EnergieProfis?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Wir verbinden Sie mit den besten Fachbetrieben für erneuerbare Energien 
            und sorgen für eine professionelle Umsetzung Ihres Projekts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;