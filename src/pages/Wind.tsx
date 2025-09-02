import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WindCalculator from "@/components/WindCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wind, Zap, TrendingUp, Shield, ArrowRight } from "lucide-react";
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

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/wind_banner.png"
            alt="Wind Banner"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wind/80 via-wind/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Wind-Installateure für Ihre Region
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Entdecken Sie die Kraft des Windes mit modernen Windkraftanlagen 
              für private und gewerbliche Nutzung.
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