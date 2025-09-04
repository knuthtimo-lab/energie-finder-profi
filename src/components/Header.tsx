import { Button } from "@/components/ui/button";
import { Menu, Search, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/icon_energie-finder.jpeg" 
              alt="EnergieProfis Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold text-primary">EnergieProfis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/solar" className="text-foreground hover:text-solar transition-colors font-medium">
              Solar
            </Link>
            <Link to="/wind" className="text-foreground hover:text-wind transition-colors font-medium">
              Wind
            </Link>
            <Link to="/installateur-finden" className="text-foreground hover:text-primary transition-colors font-medium">
              Installateur Finden
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/unternehmen-listen">Unternehmen Listen</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;