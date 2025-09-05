import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle } from 'lucide-react';
import { analyticsService, quoteService } from '@/lib/database';

interface CalculatorResults {
  monthlySavings: number;
  yearlySavings: number;
  lifetimeSavings: number;
  systemSize: number;
  installCost: number;
  taxCredit: number;
  netCost: number;
  paybackPeriod: number;
}

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<string>('150');
  const [homeSize, setHomeSize] = useState<string>('2000');
  const [roofType, setRoofType] = useState<string>('asphalt');
  const [sunlightHours, setSunlightHours] = useState<string>('6');
  const [electricityRate, setElectricityRate] = useState<string>('0.12');
  const [zipCode, setZipCode] = useState<string>('');
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  
  // Quote form fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const calculateSavings = async () => {
    const monthlyBillNum = parseFloat(monthlyBill) || 0;
    const homeSizeNum = parseFloat(homeSize) || 0;
    const sunlightHoursNum = parseFloat(sunlightHours) || 6;
    const electricityRateNum = parseFloat(electricityRate) || 0.12;

    if (monthlyBillNum === 0) {
      alert('Bitte geben Sie Ihre monatliche Stromrechnung ein');
      return;
    }

    // Calculate system size based on monthly usage
    const monthlyUsage = monthlyBillNum / electricityRateNum; // kWh per month
    const dailyUsage = monthlyUsage / 30; // kWh per day
    const systemSize = Math.ceil(dailyUsage / sunlightHoursNum); // kW system size

    // Roof type efficiency factors
    const roofFactors: { [key: string]: number } = {
      asphalt: 1.0,
      tile: 0.95,
      metal: 1.05,
      flat: 0.9
    };

    const roofFactor = roofFactors[roofType] || 1.0;
    const adjustedSystemSize = Math.max(3, Math.min(20, systemSize * roofFactor));

    // Cost calculations (converted to EUR for German market)
    const costPerWatt = 2.8; // Average cost per watt installed in EUR
    const installCost = adjustedSystemSize * 1000 * costPerWatt;
    const federalTaxCredit = installCost * 0.19; // German VAT can be deducted
    const netCost = installCost - federalTaxCredit;

    // Energy production calculations
    const annualProduction = adjustedSystemSize * sunlightHoursNum * 365 * 0.85; // 85% efficiency
    const monthlyProduction = annualProduction / 12;
    
    // Savings calculations
    const monthlySavings = Math.min(monthlyProduction * electricityRateNum, monthlyBillNum * 0.9);
    const yearlySavings = monthlySavings * 12;
    const lifetimeSavings = yearlySavings * 25; // 25-year system life

    // Payback period
    const paybackPeriod = Math.round(netCost / yearlySavings * 10) / 10;

    setResults({
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      lifetimeSavings: Math.round(lifetimeSavings),
      systemSize: Math.round(adjustedSystemSize * 10) / 10,
      installCost: Math.round(installCost),
      taxCredit: Math.round(federalTaxCredit),
      netCost: Math.round(netCost),
      paybackPeriod
    });

    setShowResults(true);

    // Track calculator usage
    try {
      await analyticsService.trackEvent({
        event_type: 'solar_calculator_used',
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        session_id: sessionStorage.getItem('session_id') || 'anonymous',
        event_data: {
          monthly_bill: monthlyBillNum,
          home_size: homeSizeNum,
          roof_type: roofType,
          sunlight_hours: sunlightHoursNum,
          electricity_rate: electricityRateNum,
          zip_code: zipCode,
          calculated_savings: {
            monthly: Math.round(monthlySavings),
            yearly: Math.round(yearlySavings),
            lifetime: Math.round(lifetimeSavings),
            system_size: Math.round(adjustedSystemSize * 10) / 10,
            payback_period: paybackPeriod
          }
        }
      });
    } catch (error) {
      console.error('Error tracking calculator usage:', error);
    }
  };

  // Auto-populate electricity rate based on ZIP code (German postal codes)
  useEffect(() => {
    if (zipCode.length === 5) {
      // Simplified German electricity rates by region
      const rates: { [key: string]: number } = {
        '0': 0.32, // Eastern Germany
        '1': 0.34, // Berlin/Brandenburg
        '2': 0.33, // Northern Germany
        '3': 0.35, // Central Germany
        '4': 0.33, // Western Germany
        '5': 0.34, // NRW
        '6': 0.35, // Hessen/Baden-Württemberg
        '7': 0.33, // Baden-Württemberg
        '8': 0.32, // Bavaria
        '9': 0.31  // Bavaria
      };
      
      const firstDigit = zipCode[0];
      const rate = rates[firstDigit] || 0.33;
      setElectricityRate(rate.toFixed(2));
    }
  }, [zipCode]);

  // Submit quote request
  const handleQuoteSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail || !results) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    try {
      await quoteService.submitQuote({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        energy_type: 'solar',
        location: zipCode,
        monthly_bill: parseFloat(monthlyBill),
        property_size: parseFloat(homeSize),
        property_type: 'residential',
        roof_type: roofType,
        estimated_cost: results.installCost,
        estimated_savings: results.yearlySavings,
        additional_requirements: `Berechnet: ${results.systemSize} kW System, ${results.paybackPeriod} Jahre Amortisation`,
        status: 'pending'
      });

      alert('Ihr Angebot wurde erfolgreich eingereicht! Sie erhalten bald Kontakt von qualifizierten Installateuren.');
      setShowQuoteForm(false);
      
      // Reset form
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Fehler beim Senden des Angebots. Bitte versuchen Sie es später erneut.');
    }
  };

  const createSavingsChart = () => {
    if (!results) return null;

    const bars = [
      { label: 'Monat 1', value: results.monthlySavings },
      { label: 'Jahr 1', value: results.yearlySavings },
      { label: '5 Jahre', value: results.yearlySavings * 5 },
      { label: '10 Jahre', value: results.yearlySavings * 10 },
      { label: '25 Jahre', value: results.lifetimeSavings }
    ];

    const maxValue = results.lifetimeSavings;

    return (
      <div className="flex items-end justify-center h-32 gap-3 mt-4">
        {bars.map((bar, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="bg-gradient-to-t from-solar to-solar-light rounded-t-sm w-6 transition-all duration-1000 ease-out"
              style={{ 
                height: `${(bar.value / maxValue) * 120}px`,
                minHeight: '10px'
              }}
            ></div>
            <span className="text-xs text-muted-foreground mt-2 text-center">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-white p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                animation: 'float 20s linear infinite'
              }}></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              Solar-Einsparungsrechner
            </h2>
            <p className="text-xl opacity-95 font-light">
              Entdecken Sie, wie viel Sie mit Solarenergie sparen können
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Calculator Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-slate-50 to-slate-100 border-r border-gray-200">
              <div className="flex justify-center mb-8">
                <div className="flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-8 relative">
                Berechnen Sie Ihre Solar-Einsparungen
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded"></div>
              </h3>

              <Card className="bg-white/70 border-gray-200 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Durchschnittliche monatliche Stromrechnung
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">€</span>
                        <Input
                          type="number"
                          value={monthlyBill}
                          onChange={(e) => setMonthlyBill(e.target.value)}
                          placeholder="150"
                          className="pl-8 h-12 border-2 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hausgröße (m²)
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <Input
                        type="number"
                        value={homeSize}
                        onChange={(e) => setHomeSize(e.target.value)}
                        placeholder="200"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Dachtyp
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <select 
                        value={roofType} 
                        onChange={(e) => setRoofType(e.target.value)}
                        className="h-12 w-full rounded-md border-2 border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="asphalt">Ziegeldach</option>
                        <option value="tile">Tonziegel</option>
                        <option value="metal">Metalldach</option>
                        <option value="flat">Flachdach</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 border-gray-200 backdrop-blur-sm mb-8">
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tägliche Sonnenstunden
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <select 
                        value={sunlightHours} 
                        onChange={(e) => setSunlightHours(e.target.value)}
                        className="h-12 w-full rounded-md border-2 border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="4">4 Stunden (Weniger sonnige Gebiete)</option>
                        <option value="5">5 Stunden (Mäßige Sonne)</option>
                        <option value="6">6 Stunden (Gute Sonneneinstrahlung)</option>
                        <option value="7">7 Stunden (Sehr sonnig)</option>
                        <option value="8">8+ Stunden (Ausgezeichnete Sonne)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Strompreis (pro kWh)
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">€</span>
                        <Input
                          type="number"
                          value={electricityRate}
                          onChange={(e) => setElectricityRate(e.target.value)}
                          step="0.01"
                          placeholder="0.33"
                          className="pl-8 h-12 border-2 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Postleitzahl
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <Input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="12345"
                        pattern="[0-9]{5}"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={calculateSavings}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Meine Einsparungen berechnen
              </Button>
            </div>

            {/* Results Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 relative">
                Ihre Solar-Einsparungen
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded"></div>
              </h3>

              {showResults && results ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold mb-1">€{results.monthlySavings}</div>
                      <div className="opacity-90">Monatliche Einsparungen</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-600 to-green-800 text-white">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold mb-1">€{results.yearlySavings.toLocaleString()}</div>
                      <div className="opacity-90">Jährliche Einsparungen</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold mb-1">€{results.lifetimeSavings.toLocaleString()}</div>
                      <div className="opacity-90">25-Jahre Einsparungen</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-center text-gray-800">Kostenaufschlüsselung</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span>Anlagengröße:</span>
                          <span className="font-semibold">{results.systemSize} kW</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span>Installationskosten:</span>
                          <span className="font-semibold">€{results.installCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span>Förderung/MwSt. (19%):</span>
                          <span className="font-semibold text-green-600">-€{results.taxCredit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span>Nettokosten:</span>
                          <span className="font-semibold">€{results.netCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-green-600">
                          <span>Amortisationsdauer:</span>
                          <span>{results.paybackPeriod} Jahre</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-center mb-4 text-gray-800">
                        Einsparungen über die Zeit
                      </h4>
                      {createSavingsChart()}
                    </CardContent>
                  </Card>

                  {/* Quote Request Button */}
                  <div className="text-center">
                    <Button 
                      onClick={() => setShowQuoteForm(true)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
                      size="lg"
                    >
                      Kostenloses Angebot anfordern
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-lg mb-2">Bereit zur Berechnung</div>
                  <div className="text-sm">Füllen Sie das Formular aus und klicken Sie auf "Berechnen"</div>
                </div>
              )}

              {/* Quote Form Modal */}
              {showQuoteForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <Card className="max-w-md w-full mx-4">
                    <CardHeader>
                      <CardTitle>Kostenloses Angebot anfordern</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleQuoteSubmission} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name *
                          </label>
                          <Input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                            placeholder="Ihr vollständiger Name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            E-Mail *
                          </label>
                          <Input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                            placeholder="ihre.email@beispiel.de"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Telefon (optional)
                          </label>
                          <Input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="+49 123 456 7890"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowQuoteForm(false)}
                            className="flex-1"
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            Angebot anfordern
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;