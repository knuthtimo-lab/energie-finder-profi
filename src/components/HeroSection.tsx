import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Zap, ArrowRight, Calculator, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Minimal Overlay */}
      <div className="absolute inset-0">
        <img
          src="/sun_flow_banner.png"
          alt="Sun Flow Banner - Renewable Energy Solutions in Germany - Solar und Wind Installateure finden"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          {/* Clean headline with subtle color accents */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Finden Sie Ihren perfekten{" "}
              <span className="text-yellow-300">
                Erneuerbaren
              </span>{" "}
              <span className="text-cyan-200">
                Energie
              </span>{" "}
              <span className="text-green-200">
                Installateur
              </span>
            </h1>
          </div>
          
          {/* Clean description with subtle accents */}
          <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed font-medium">
            Vergleichen Sie qualifizierte Fachbetriebe für{" "}
            <span className="text-yellow-200 font-semibold">Solar</span> und{" "}
            <span className="text-cyan-200 font-semibold">Wind</span> 
            in Ihrer Region.{" "}
            <span className="text-green-200 font-semibold">Kostenlos</span> und{" "}
            <span className="text-white font-semibold">unverbindlich</span>.
          </p>

          {/* Clean search box */}
          <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-200 w-5 h-5" />
                <Input
                  placeholder="PLZ oder Stadt eingeben..."
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 h-12 focus:border-cyan-200 focus:ring-cyan-200/20 transition-all duration-300"
                />
              </div>
              <div className="flex-1 relative group">
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200 w-5 h-5" />
                <select className="w-full h-12 pl-10 pr-4 bg-white/20 border-white/30 rounded-lg text-white appearance-none focus:border-yellow-200 focus:ring-yellow-200/20 transition-all duration-300">
                  <option value="">Energieart wählen</option>
                  <option value="solar">Solar</option>
                  <option value="wind">Wind</option>
                </select>
              </div>
              <Button 
                variant="hero" 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Installateur Finden
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean floating stats */}
      <div className="absolute bottom-8 right-8 hidden xl:block">
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-white shadow-lg">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-200">500+</div>
              <div className="text-sm text-white/90 font-medium">Installateure</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">2,500+</div>
              <div className="text-sm text-white/90 font-medium">Projekte</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-200">4.8★</div>
              <div className="text-sm text-white/90 font-medium">Bewertung</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO: Additional content section for better indexing */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-8 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-white/90">
            <div className="text-center">
              <Calculator className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Kostenlose Rechner</h3>
              <p className="text-sm">Solar- und Windenergie berechnen</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-cyan-300" />
              <h3 className="font-semibold mb-1">Förderprogramme</h3>
              <p className="text-sm">BAFA, KfW & kommunale Zuschüsse</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-300" />
              <h3 className="font-semibold mb-1">Verifizierte Experten</h3>
              <p className="text-sm">Zertifizierte Fachbetriebe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logo in top left corner */}
      <div className="absolute top-8 left-8 z-20">
        <img 
          src="/icon_energie-finder.jpeg" 
          alt="EnergieProfis Logo" 
          className="w-12 h-12 rounded-lg shadow-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm"
        />
      </div>

      {/* Moved "Alle Installateure Ansehen" button to upper right corner */}
      <div className="absolute top-8 right-8 z-20">
        <Button 
          variant="outline" 
          size="lg" 
          className="border-2 border-white/40 text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
        >
          <Link to="/installateur-finden" className="flex items-center">
            Alle Installateure Ansehen
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;