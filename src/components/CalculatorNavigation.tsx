import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, Wind, Calculator, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalculatorNavigation = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            <Calculator className="inline-block mr-3 text-blue-600" />
            Einsparungsrechner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Berechnen Sie Ihre potentiellen Einsparungen mit unseren 
            spezialisierten Rechnern für Solar- und Windenergie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Solar Calculator Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-yellow-400/5 group-hover:from-orange-400/10 group-hover:to-yellow-400/10 transition-all duration-500"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Beliebt
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-600 transition-colors">
                Solar-Einsparungsrechner
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Erfahren Sie, wie viel Sie mit einer Photovoltaik-Anlage sparen können. 
                Berechnung basierend auf Ihrer Dachgröße, Standort und Energieverbrauch.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Monatliche & jährliche Einsparungen</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="w-4 h-4 mr-2 text-orange-500" />
                  <span>25-Jahre Gesamteinsparungen</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Amortisationsdauer</span>
                </div>
              </div>
              
              <Button 
                asChild
                size="lg" 
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/solar#calculator" className="flex items-center justify-center">
                  Solar-Rechner öffnen
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Wind Calculator Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-cyan-50 to-emerald-50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-emerald-400/5 group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 transition-all duration-500"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Wind className="w-8 h-8 text-white animate-spin" />
                </div>
                <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Neu
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-cyan-600 transition-colors">
                Windenergie-Rechner
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Berechnen Sie das Potential von Windenergie für Ihr Grundstück. 
                Berücksichtigt Grundstücksgröße, Windgeschwindigkeit und lokale Bestimmungen.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Wind className="w-4 h-4 mr-2 text-cyan-500" />
                  <span>Anlagengröße-Empfehlung</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Wind className="w-4 h-4 mr-2 text-cyan-500" />
                  <span>20-Jahre Einsparpotential</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Wind className="w-4 h-4 mr-2 text-cyan-500" />
                  <span>Förderungen & Zuschüsse</span>
                </div>
              </div>
              
              <Button 
                asChild
                size="lg" 
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/wind#calculator" className="flex items-center justify-center">
                  Wind-Rechner öffnen
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Unsicher, welche Lösung für Sie geeignet ist?
          </p>
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
          >
            <Link to="/installateur-finden" className="flex items-center">
              Alle Installateure ansehen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorNavigation;