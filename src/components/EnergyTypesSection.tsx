import EnergyTypeCard from "./EnergyTypeCard";
import solarImage from "@/assets/solar-installation.jpg";
import windImage from "@/assets/wind-turbines.jpg";

const EnergyTypesSection = () => {
  const energyTypes = [
    {
      title: "Solar",
      description: "Nutzen Sie die Kraft der Sonne mit modernsten Photovoltaik-Anlagen für Ihr Zuhause oder Unternehmen.",
      image: solarImage,
      gradient: "bg-gradient-solar",
      buttonVariant: "solar" as const,
      href: "/solar",
      features: [
        "Bis zu 70% Stromkostenersparnis",
        "20+ Jahre Garantie",
        "Staatliche Förderungen verfügbar",
        "Umweltfreundlich & nachhaltig"
      ]
    },
    {
      title: "Wind",
      description: "Erzeugen Sie saubere Energie mit effizienten Windkraftanlagen für private und gewerbliche Nutzung.",
      image: windImage,
      gradient: "bg-gradient-wind",
      buttonVariant: "wind" as const,
      href: "/wind",
      features: [
        "Konstante Energieproduktion",
        "Hohe Effizienz auch bei schwachem Wind",
        "Wartungsarme Technologie",
        "Ideale Ergänzung zu Solar"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Erneuerbare Energielösungen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie die Vielfalt nachhaltiger Energietechnologien und finden Sie 
            die perfekte Lösung für Ihre Bedürfnisse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {energyTypes.map((type) => (
            <EnergyTypeCard key={type.title} {...type} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyTypesSection;