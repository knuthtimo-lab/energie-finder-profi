import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EnergyTypesSection from "@/components/EnergyTypesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <EnergyTypesSection />
        <WhyChooseUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
