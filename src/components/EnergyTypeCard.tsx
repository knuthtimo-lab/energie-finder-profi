import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface EnergyTypeCardProps {
  title: string;
  description: string;
  image: string;
  gradient: string;
  buttonVariant: "solar" | "wind" | "geo" | "battery";
  href: string;
  features: string[];
}

const EnergyTypeCard = ({ 
  title, 
  description, 
  image, 
  gradient, 
  buttonVariant, 
  href, 
  features 
}: EnergyTypeCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`}></div>
        <div className="absolute top-4 left-4">
          <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {title.charAt(0)}
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${gradient} mr-3 flex-shrink-0`}></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button variant={buttonVariant} className="w-full group" asChild>
          <Link to={href}>
            {title} Installateure Finden
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnergyTypeCard;