import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EnergieProfis</span>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed">
              Ihr vertrauensvoller Partner für erneuerbare Energielösungen in Deutschland. 
              Wir verbinden Sie mit den besten Installateuren für eine nachhaltige Zukunft.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-solar" />
                <span>+49 (0) 800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-wind" />
                <span>info@energieprofis.de</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-geo" />
                <span>München, Deutschland</span>
              </div>
            </div>
          </div>

          {/* Energy Types */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Energielösungen</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/solar" className="text-primary-foreground/80 hover:text-solar transition-colors">
                  Solar-Installateure
                </Link>
              </li>
              <li>
                <Link to="/wind" className="text-primary-foreground/80 hover:text-wind transition-colors">
                  Wind-Installateure
                </Link>
              </li>
              <li>
                <Link to="/geothermie" className="text-primary-foreground/80 hover:text-geo transition-colors">
                  Geothermie-Installateure
                </Link>
              </li>
              <li>
                <Link to="/batteriespeicher" className="text-primary-foreground/80 hover:text-battery transition-colors">
                  Batteriespeicher-Installateure
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/installateur-finden" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Installateur Finden
                </Link>
              </li>
              <li>
                <Link to="/kostenlose-beratung" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Kostenlose Beratung
                </Link>
              </li>
              <li>
                <Link to="/unternehmen-listen" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Unternehmen Listen
                </Link>
              </li>
              <li>
                <Link to="/preisvergleich" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Preisvergleich
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-primary-foreground/80">
              Bleiben Sie informiert über die neuesten Entwicklungen 
              in der erneuerbaren Energie.
            </p>
            
            <div className="space-y-3">
              <Input 
                placeholder="Ihre E-Mail-Adresse"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="hero" className="w-full bg-white text-primary hover:bg-white/90">
                Anmelden
              </Button>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 EnergieProfis. Alle Rechte vorbehalten.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/datenschutz" className="text-primary-foreground/60 hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link to="/agb" className="text-primary-foreground/60 hover:text-white transition-colors">
                AGB
              </Link>
              <Link to="/impressum" className="text-primary-foreground/60 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link to="/kontakt" className="text-primary-foreground/60 hover:text-white transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;