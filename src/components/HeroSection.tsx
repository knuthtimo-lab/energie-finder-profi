import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-renewable-energy.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Renewable Energy Solutions in Germany"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Finden Sie Ihren perfekten{" "}
            <span className="bg-gradient-to-r from-solar via-wind to-geo bg-clip-text text-transparent">
              Erneuerbaren Energie
            </span>{" "}
            Installateur
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Vergleichen Sie qualifizierte Fachbetriebe für Solar, Wind, Geothermie 
            und Batteriespeicher in Ihrer Region. Kostenlos und unverbindlich.
          </p>

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <Input
                  placeholder="PLZ oder Stadt eingeben..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                />
              </div>
              <div className="flex-1 relative">
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <select className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/20 rounded-lg text-white appearance-none">
                  <option value="">Energieart wählen</option>
                  <option value="solar">Solar</option>
                  <option value="wind">Wind</option>
                  <option value="geothermal">Geothermie</option>
                  <option value="battery">Batteriespeicher</option>
                </select>
              </div>
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Search className="w-5 h-5 mr-2" />
                Installateur Finden
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/kostenlose-beratung">
                Kostenlose Beratung Anfordern
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white hover:text-primary">
              <Link to="/installateur-finden">
                Alle Installateure Ansehen
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 right-8 hidden xl:block">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-white/80">Installateure</div>
            </div>
            <div>
              <div className="text-2xl font-bold">2,500+</div>
              <div className="text-sm text-white/80">Projekte</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm text-white/80">Bewertung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;