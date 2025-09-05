import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Calculator,
  TrendingUp,
  Shield,
  Award
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EnergieProfis</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ihr vertrauensvoller Partner für erneuerbare Energien. 
              Finden Sie qualifizierte Solar- und Wind-Installateure in Ihrer Region.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Schnellzugriff</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/solar" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Solar-Installation
                </Link>
              </li>
              <li>
                <Link 
                  to="/wind" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Windenergie
                </Link>
              </li>
              <li>
                <Link to="/installateur-finden" className="text-gray-300 hover:text-white transition-colors">
                  Installateur finden
                </Link>
              </li>
              <li>
                <Link 
                  to="/solar" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => {
                    setTimeout(() => {
                      const calculatorElement = document.querySelector('[data-calculator]') || 
                                              document.querySelector('.calculator') ||
                                              document.querySelector('h2');
                      if (calculatorElement) {
                        calculatorElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  Solar-Kostenrechner
                </Link>
              </li>
              <li>
                <Link 
                  to="/wind" 
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => {
                    setTimeout(() => {
                      const calculatorElement = document.querySelector('[data-calculator]') || 
                                              document.querySelector('.calculator') ||
                                              document.querySelector('h2');
                      if (calculatorElement) {
                        calculatorElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  Wind-Kostenrechner
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Unsere Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <Calculator className="w-4 h-4" />
                Solar-Einsparungsrechner
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <TrendingUp className="w-4 h-4" />
                Windenergie-Rechner
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Shield className="w-4 h-4" />
                Verifizierte Installateure
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Award className="w-4 h-4" />
                Zertifizierte Fachbetriebe
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@energieprofis.de</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+49 (0) 800 123 456</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  EnergieProfis GmbH<br />
                  Musterstraße 123<br />
                  10115 Berlin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2025 EnergieProfis. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                Impressum
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                Datenschutz
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                AGB
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                Cookie-Einstellungen
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;