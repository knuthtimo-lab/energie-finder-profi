import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Zap, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import solarImage from "@/assets/solar-installation.jpg";

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

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={solarImage}
            alt="Solar Installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-solar/80 via-solar/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Solar-Installateure in Ihrer Nähe
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Finden Sie qualifizierte Solartechnik-Experten für Photovoltaik-Anlagen, 
              Solarthermie und komplette Energiesysteme.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="bg-white text-solar hover:bg-white/90" asChild>
                <Link to="/installateur-finden?type=solar">
                  Solar-Installateur Finden
                </Link>
              </Button>
              <Button variant="solar-outline" size="xl" className="border-white/30 text-white hover:bg-white hover:text-solar">
                <Link to="/kostenlose-beratung?type=solar">
                  Kostenlose Beratung
                </Link>
              </Button>
            </div>
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
              <Link to="/kostenlose-beratung?type=solar">
                Jetzt kostenlose Beratung anfordern
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