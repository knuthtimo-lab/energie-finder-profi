import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Zap, ArrowRight, Calculator, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { usePostHog } from "@/hooks/usePostHog";

const HeroSection = () => {
  const posthog = usePostHog();

  const handleSearchClick = () => {
    posthog.capture('hero_search_clicked', {
      location: 'hero_section',
      action: 'search_installers'
    });
  };

  const handleViewAllClick = () => {
    posthog.capture('hero_view_all_clicked', {
      location: 'hero_section',
      action: 'view_all_installers'
    });
  };

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
        <div className="max-w-4xl text-white">
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
          <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl px-12 py-8 mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative group min-w-0">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-200 w-5 h-5 z-10" />
                <select className="pl-10 bg-white border-gray-300 text-gray-900 h-12 w-full rounded-md border px-3 py-2 text-sm focus:border-cyan-200 focus:ring-2 focus:ring-cyan-200/20 focus:outline-none min-w-[200px]">
                  <option value="">Bundesland wählen</option>
                  <option value="all">Alle Bundesländer</option>
                  <option value="Baden-Württemberg">Baden-Württemberg</option>
                  <option value="Bayern">Bayern</option>
                  <option value="Berlin">Berlin</option>
                  <option value="Brandenburg">Brandenburg</option>
                  <option value="Bremen">Bremen</option>
                  <option value="Hamburg">Hamburg</option>
                  <option value="Hessen">Hessen</option>
                  <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
                  <option value="Niedersachsen">Niedersachsen</option>
                  <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
                  <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                  <option value="Saarland">Saarland</option>
                  <option value="Sachsen">Sachsen</option>
                  <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                  <option value="Schleswig-Holstein">Schleswig-Holstein</option>
                  <option value="Thüringen">Thüringen</option>
                </select>
              </div>
              <div className="flex-1 relative group min-w-0">
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200 w-5 h-5 z-10" />
                <select className="pl-10 bg-white border-gray-300 text-gray-900 h-12 w-full rounded-md border px-3 py-2 text-sm focus:border-yellow-200 focus:ring-2 focus:ring-yellow-200/20 focus:outline-none min-w-[200px]">
                  <option value="">Energieart wählen</option>
                  <option value="all">Alle Energiearten</option>
                  <option value="solar">Solar</option>
                  <option value="wind">Wind</option>
                </select>
              </div>
              <Button 
                asChild
                variant="hero" 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleSearchClick}
              >
                <Link to="/installateur-finden">
                  <Search className="w-5 h-5 mr-2" />
                  Installateur Finden
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean floating stats */}
      <div className="absolute bottom-8 right-8 hidden xl:block">
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-white shadow-lg">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-200">60+</div>
              <div className="text-sm text-white/90 font-medium">Installateure</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-200">4.8★</div>
              <div className="text-sm text-white/90 font-medium">Bewertung</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO: Additional content section for better indexing */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-3 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-white/90 max-w-2xl mx-auto">
            <div className="text-center">
              <Calculator className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Kostenlose Rechner</h3>
              <p className="text-sm">Solar- und Windenergie berechnen</p>
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
          onClick={handleViewAllClick}
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