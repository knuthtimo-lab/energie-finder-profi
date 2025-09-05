import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Impressum</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Angaben gemäß § 5 TMG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Betreiber dieser Website</h3>
                <p className="text-muted-foreground">
                  Diese Website wird von einem privaten Betreiber geführt.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Haftungsausschluss</h3>
                <p className="text-muted-foreground">
                  Die Inhalte dieser Website dienen der allgemeinen Information. Wir übernehmen keine Gewähr für die Vollständigkeit, Richtigkeit oder Aktualität der bereitgestellten Informationen.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Urheberrecht</h3>
                <p className="text-muted-foreground">
                  Die Inhalte dieser Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Impressum;
