import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Wind, Zap } from 'lucide-react';
import { analyticsService } from '@/lib/database';

interface WindCalculatorResults {
  monthlySavings: number;
  yearlySavings: number;
  lifetimeSavings: number;
  turbineSize: number;
  installCost: number;
  taxCredit: number;
  netCost: number;
  paybackPeriod: number;
}

const WindCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<string>('150');
  const [propertySize, setPropertySize] = useState<string>('2');
  const [zoning, setZoning] = useState<string>('rural');
  const [windSpeed, setWindSpeed] = useState<string>('12');
  const [turbineHeight, setTurbineHeight] = useState<string>('80');
  const [electricityRate, setElectricityRate] = useState<string>('0.33');
  const [zipCode, setZipCode] = useState<string>('');
  const [results, setResults] = useState<WindCalculatorResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateWindSavings = async () => {
    const monthlyBillNum = parseFloat(monthlyBill) || 0;
    const propertySizeNum = parseFloat(propertySize) || 0;
    const windSpeedNum = parseFloat(windSpeed) || 12;
    const turbineHeightNum = parseFloat(turbineHeight) || 80;
    const electricityRateNum = parseFloat(electricityRate) || 0.33;

    if (monthlyBillNum === 0) {
      alert('Bitte geben Sie Ihre monatliche Stromrechnung ein');
      return;
    }

    // Wind power calculation (simplified for German market)
    const airDensity = 1.225; // kg/m³ at sea level
    const powerCoefficient = 0.35; // Typical for small wind turbines
    const efficiency = 0.85;

    // Determine turbine size based on property and zoning
    let maxTurbineKW = 0;
    const zoningSizeFactors: { [key: string]: number } = {
      rural: 1.5,
      agricultural: 2.0,
      suburban: 0.8,
      urban: 0.5
    };

    const sizeFactor = zoningSizeFactors[zoning] || 1.0;
    
    // Base turbine size on property size and height allowance
    if (propertySizeNum >= 0.8 && turbineHeightNum >= 80) { // 0.8 hectares ≈ 2 acres
      maxTurbineKW = Math.min(20, propertySizeNum * 3 * sizeFactor);
    } else if (propertySizeNum >= 0.4 && turbineHeightNum >= 60) {
      maxTurbineKW = Math.min(10, propertySizeNum * 2 * sizeFactor);
    } else {
      maxTurbineKW = Math.min(5, propertySizeNum * 1.5 * sizeFactor);
    }

    // Wind speed factor affects actual output
    let windSpeedFactor = 1.0;
    if (windSpeedNum >= 15) windSpeedFactor = 1.4;
    else if (windSpeedNum >= 12) windSpeedFactor = 1.0;
    else if (windSpeedNum >= 10) windSpeedFactor = 0.7;
    else windSpeedFactor = 0.4;

    const effectiveTurbineKW = maxTurbineKW * windSpeedFactor;
    
    // Height bonus (higher = better wind)
    let heightFactor = 1.0;
    if (turbineHeightNum >= 120) heightFactor = 1.3;
    else if (turbineHeightNum >= 100) heightFactor = 1.2;
    else if (turbineHeightNum >= 80) heightFactor = 1.1;
    else if (turbineHeightNum >= 60) heightFactor = 1.0;
    else heightFactor = 0.9;

    const finalTurbineKW = Math.max(1, effectiveTurbineKW * heightFactor);

    // Annual energy production (kWh/year)
    // Small wind turbines typically produce 25-35% capacity factor
    const capacityFactor = Math.min(0.35, windSpeedNum * 0.025);
    const annualProduction = finalTurbineKW * 8760 * capacityFactor; // 8760 hours/year
    const monthlyProduction = annualProduction / 12;

    // Cost calculations (adapted for German market)
    const costPerKW = 6500; // EUR - Higher than solar due to complexity, adapted for German market
    const installCost = finalTurbineKW * costPerKW;
    const germanIncentives = installCost * 0.25; // KfW subsidies and regional incentives
    const netCost = installCost - germanIncentives;

    // Savings calculations
    const monthlyUsage = monthlyBillNum / electricityRateNum;
    const monthlySavings = Math.min(monthlyProduction * electricityRateNum, monthlyBillNum * 0.8);
    const yearlySavings = monthlySavings * 12;
    const lifetimeSavings = yearlySavings * 20; // 20-year turbine life

    // Payback period
    const paybackPeriod = Math.round(netCost / yearlySavings * 10) / 10;

    setResults({
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      lifetimeSavings: Math.round(lifetimeSavings),
      turbineSize: Math.round(finalTurbineKW * 10) / 10,
      installCost: Math.round(installCost),
      taxCredit: Math.round(germanIncentives),
      netCost: Math.round(netCost),
      paybackPeriod
    });

    setShowResults(true);

    // Track wind calculator usage
    try {
      await analyticsService.trackEvent({
        event_type: 'wind_calculator_used',
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        session_id: sessionStorage.getItem('session_id') || 'anonymous',
        event_data: {
          monthly_bill: monthlyBillNum,
          property_size: propertySizeNum,
          zoning: zoning,
          wind_speed: windSpeedNum,
          turbine_height: turbineHeightNum,
          electricity_rate: electricityRateNum,
          zip_code: zipCode,
          calculated_savings: {
            monthly: Math.round(monthlySavings),
            yearly: Math.round(yearlySavings),
            lifetime: Math.round(lifetimeSavings),
            turbine_size: Math.round(finalTurbineKW * 10) / 10,
            payback_period: paybackPeriod
          }
        }
      });
    } catch (error) {
      console.error('Error tracking wind calculator usage:', error);
    }
  };

  // Auto-populate electricity rate based on German ZIP code
  useEffect(() => {
    if (zipCode.length === 5) {
      // German electricity rates by region (higher than solar calculator due to wind being less common)
      const rates: { [key: string]: number } = {
        '0': 0.34, // Eastern Germany
        '1': 0.36, // Berlin/Brandenburg  
        '2': 0.35, // Northern Germany (better wind resources)
        '3': 0.37, // Central Germany
        '4': 0.35, // Western Germany
        '5': 0.36, // NRW
        '6': 0.37, // Hessen/Baden-Württemberg
        '7': 0.35, // Baden-Württemberg
        '8': 0.34, // Bavaria
        '9': 0.33  // Bavaria
      };
      
      const firstDigit = zipCode[0];
      const rate = rates[firstDigit] || 0.35;
      setElectricityRate(rate.toFixed(2));
    }
  }, [zipCode]);

  const createSavingsChart = () => {
    if (!results) return null;

    const bars = [
      { label: 'Monat 1', value: results.monthlySavings },
      { label: 'Jahr 1', value: results.yearlySavings },
      { label: '5 Jahre', value: results.yearlySavings * 5 },
      { label: '10 Jahre', value: results.yearlySavings * 10 },
      { label: '20 Jahre', value: results.lifetimeSavings }
    ];

    const maxValue = results.lifetimeSavings;

    return (
      <div className="flex items-end justify-center h-32 gap-3 mt-4">
        {bars.map((bar, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="bg-gradient-to-t from-wind-dark to-wind-light rounded-t-sm w-6 transition-all duration-1000 ease-out animate-pulse"
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
    <div className="bg-gradient-to-br from-teal-800 via-emerald-700 to-green-600 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-slate-700 text-white p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0 0c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  animation: 'windFlow 15s linear infinite'
                }}
              ></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
              <Wind className="inline-block mr-3 animate-spin" />
              Windenergie-Einsparungsrechner
            </h2>
            <p className="text-xl opacity-95 font-light">
              Nutzen Sie die Kraft des Windes, um Ihre Energiekosten zu senken
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Calculator Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-emerald-50 to-green-100 border-r border-green-200">
              <div className="flex justify-center mb-8">
                <div className="flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-8 relative">
                <Wind className="inline mr-2 text-emerald-600 animate-spin" />
                Berechnen Sie Ihre Windenergie-Einsparungen
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-600 rounded"></div>
              </h3>

              <Card className="bg-white/70 border-green-200 backdrop-blur-sm mb-6">
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
                          className="pl-8 h-12 border-2 border-green-200 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Grundstücksgröße (Hektar)
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <Input
                        type="number"
                        value={propertySize}
                        onChange={(e) => setPropertySize(e.target.value)}
                        placeholder="0.8"
                        step="0.1"
                        min="0"
                        className="h-12 border-2 border-green-200 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Grundstücksart
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <Select value={zoning} onValueChange={setZoning}>
                        <SelectTrigger className="h-12 border-2 border-green-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rural">Ländlich</SelectItem>
                          <SelectItem value="suburban">Vorstädtisch</SelectItem>
                          <SelectItem value="urban">Städtisch</SelectItem>
                          <SelectItem value="agricultural">Landwirtschaftlich</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 border-green-200 backdrop-blur-sm mb-8">
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Durchschnittliche Windgeschwindigkeit (km/h)
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <Select value={windSpeed} onValueChange={setWindSpeed}>
                        <SelectTrigger className="h-12 border-2 border-green-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">13 km/h (Schwache Windzone)</SelectItem>
                          <SelectItem value="10">16 km/h (Mäßiger Wind)</SelectItem>
                          <SelectItem value="12">19 km/h (Gute Windressource)</SelectItem>
                          <SelectItem value="15">24 km/h (Ausgezeichneter Wind)</SelectItem>
                          <SelectItem value="18">29+ km/h (Hervorragender Wind)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max. erlaubte Anlagenhöhe (m)
                        <HelpCircle className="inline w-4 h-4 ml-1 text-gray-400" />
                      </label>
                      <Select value={turbineHeight} onValueChange={setTurbineHeight}>
                        <SelectTrigger className="h-12 border-2 border-green-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="40">12 m (Eingeschränkte Gebiete)</SelectItem>
                          <SelectItem value="60">18 m (Vorstädtisches Limit)</SelectItem>
                          <SelectItem value="80">24 m (Standard Wohngebiet)</SelectItem>
                          <SelectItem value="100">30 m (Ländliche Gebiete)</SelectItem>
                          <SelectItem value="120">36+ m (Keine Beschränkungen)</SelectItem>
                        </SelectContent>
                      </Select>
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
                          placeholder="0.35"
                          className="pl-8 h-12 border-2 border-green-200 focus:border-emerald-500"
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
                        className="h-12 border-2 border-green-200 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={calculateWindSavings}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Wind className="w-5 h-5 mr-2" />
                Meine Windenergie-Einsparungen berechnen
              </Button>
            </div>

            {/* Results Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 relative">
                <Zap className="inline mr-2 text-emerald-600" />
                Ihre Windenergie-Einsparungen
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded"></div>
              </h3>

              {showResults && results ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <Card className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <div className="text-3xl font-bold mb-1">€{results.monthlySavings}</div>
                      <div className="opacity-90">Monatliche Einsparungen</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <div className="text-3xl font-bold mb-1">€{results.yearlySavings.toLocaleString()}</div>
                      <div className="opacity-90">Jährliche Einsparungen</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <div className="text-3xl font-bold mb-1">€{results.lifetimeSavings.toLocaleString()}</div>
                      <div className="opacity-90">20-Jahre Einsparungen</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-center text-gray-800">Windenergie-System Aufschlüsselung</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-green-200">
                          <span>Anlagengröße:</span>
                          <span className="font-semibold">{results.turbineSize} kW</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-green-200">
                          <span>Installationskosten:</span>
                          <span className="font-semibold">€{results.installCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-green-200">
                          <span>Förderung/Zuschüsse (25%):</span>
                          <span className="font-semibold text-green-600">-€{results.taxCredit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-green-200">
                          <span>Nettokosten nach Förderung:</span>
                          <span className="font-semibold">€{results.netCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-emerald-600">
                          <span>Amortisationsdauer:</span>
                          <span>{results.paybackPeriod} Jahre</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-center mb-4 text-gray-800">
                        Windenergie-Einsparungen über die Zeit
                      </h4>
                      {createSavingsChart()}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Wind className="w-16 h-16 mx-auto mb-4 text-emerald-400 animate-spin" />
                  <div className="text-lg mb-2">Bereit zur Berechnung</div>
                  <div className="text-sm">Füllen Sie das Formular aus und klicken Sie auf "Berechnen"</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindCalculator;