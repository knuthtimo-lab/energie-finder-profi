import { supabase } from "@/integrations/supabase/client";

export const cleanAndReseedDatabase = async () => {
  console.log('Cleaning existing installer data...');
  
  try {
    // First, delete all existing installers
    const { error: deleteError } = await supabase
      .from('installers')
      .delete()
      .not('id', 'is', null); // Delete all records

    if (deleteError) {
      console.error('Error deleting existing data:', deleteError);
      throw deleteError;
    }

    console.log('Existing data cleaned successfully!');
    
    // Now insert our proper German installer data
    const germanInstallers = [
      {
        name: "SolarTech Pro München",
        company_name: "SolarTech Pro GmbH",
        email: "info@solartech-pro.de",
        phone: "+49 89 123 4567",
        website: "www.solartech-pro.de",
        address: "Maximilianstrasse 15, 80539 München",
        location: "München, Bayern",
        energy_type: "solar",
        description: "Spezialisiert auf hochwertige Photovoltaik-Anlagen für Privathaushalte und Gewerbe. Mit über 15 Jahren Erfahrung sind wir Ihr vertrauensvoller Partner für nachhaltige Energielösungen.",
        specialties: ["Photovoltaik", "Solarthermie", "Energiespeicher", "Smart Home Integration"],
        certifications: ["IHK Zertifiziert", "VDE Prüfung", "TÜV Süd"],
        experience_years: 15,
        rating: 4.8,
        review_count: 127,
        verified: true,
        status: "active",
        service_areas: ["München", "Augsburg", "Ingolstadt", "Landshut"],
        languages: ["Deutsch", "Englisch"],
        latitude: 48.1351,
        longitude: 11.5820
      },
      {
        name: "WindEnergie Solutions Hamburg",
        company_name: "WindEnergie Solutions GmbH",
        email: "kontakt@windenergie-solutions.de",
        phone: "+49 40 987 6543",
        website: "www.windenergie-solutions.de",
        address: "Hafenstraße 42, 20359 Hamburg",
        location: "Hamburg, Hamburg",
        energy_type: "wind",
        description: "Experten für Windkraftanlagen und erneuerbare Energielösungen. Wir planen und installieren Windenergieanlagen für private und gewerbliche Kunden.",
        specialties: ["Windkraft", "Kleinwindanlagen", "Planung", "Wartung"],
        certifications: ["BWE Mitglied", "VDMA Zertifikat", "ISO 9001"],
        experience_years: 12,
        rating: 4.6,
        review_count: 89,
        verified: true,
        status: "active",
        service_areas: ["Hamburg", "Bremen", "Schleswig-Holstein", "Niedersachsen"],
        languages: ["Deutsch", "Englisch", "Dänisch"],
        latitude: 53.5511,
        longitude: 9.9937
      },
      {
        name: "Grüne Energie Partner Berlin",
        company_name: "Grüne Energie Partner GmbH",
        email: "info@gruene-energie-partner.de",
        phone: "+49 30 555 1234",
        website: "www.gruene-energie-partner.de",
        address: "Unter den Linden 77, 10117 Berlin",
        location: "Berlin, Berlin",
        energy_type: "solar",
        description: "Vollständige Lösungen für erneuerbare Energien mit Fokus auf Nachhaltigkeit. Wir bieten sowohl Solar- als auch Windenergie-Lösungen aus einer Hand.",
        specialties: ["Solar", "Wind", "Energieberatung", "Förderung", "Hybrid-Systeme"],
        certifications: ["DGS Zertifikat", "Handwerkskammer Berlin", "KfW Effizienzexperte"],
        experience_years: 18,
        rating: 4.9,
        review_count: 203,
        verified: true,
        status: "active",
        service_areas: ["Berlin", "Brandenburg", "Potsdam"],
        languages: ["Deutsch", "Englisch", "Polnisch"],
        latitude: 52.5200,
        longitude: 13.4050
      },
      {
        name: "EcoSolar Systems Stuttgart",
        company_name: "EcoSolar Systems GmbH",
        email: "service@ecosolar-systems.de",
        phone: "+49 711 789 0123",
        website: "www.ecosolar-systems.de",
        address: "Königstraße 28, 70173 Stuttgart",
        location: "Stuttgart, Baden-Württemberg",
        energy_type: "solar",
        description: "Innovative Solaranlagen mit modernster Technologie für maximale Effizienz. Spezialisiert auf High-End Photovoltaik-Systeme mit intelligenter Steuerung.",
        specialties: ["Hochleistungs-Solar", "Smart Home Integration", "Wartung", "Monitoring"],
        certifications: ["Solarfachbetrieb", "E-Handwerk Innungsbetrieb", "BSW Solar"],
        experience_years: 14,
        rating: 4.7,
        review_count: 156,
        verified: true,
        status: "active",
        service_areas: ["Stuttgart", "Karlsruhe", "Heilbronn", "Tübingen"],
        languages: ["Deutsch", "Englisch"],
        latitude: 48.7758,
        longitude: 9.1829
      },
      {
        name: "NordWind Energie Bremen",
        company_name: "NordWind Energie GmbH",
        email: "info@nordwind-energie.de",
        phone: "+49 421 456 7890",
        website: "www.nordwind-energie.de",
        address: "Weserstraße 50, 28199 Bremen",
        location: "Bremen, Bremen",
        energy_type: "wind",
        description: "Spezialisten für Windenergie-Projekte in Norddeutschland. Von der Planung bis zur Wartung - wir begleiten Ihr Windenergie-Projekt vom ersten Tag an.",
        specialties: ["Windparks", "Offshore", "Wartung", "Repowering"],
        certifications: ["BWE Vollmitglied", "GWO Zertifikat", "VDMA Wind Power"],
        experience_years: 16,
        rating: 4.5,
        review_count: 67,
        verified: true,
        status: "active",
        service_areas: ["Bremen", "Bremerhaven", "Oldenburg", "Cuxhaven"],
        languages: ["Deutsch", "Englisch", "Niederländisch"],
        latitude: 53.0793,
        longitude: 8.8017
      },
      {
        name: "Bayerische Solar Solutions",
        company_name: "Bayerische Solar Solutions GmbH",
        email: "kontakt@bayerische-solar.de",
        phone: "+49 89 321 6547",
        website: "www.bayerische-solar.de",
        address: "Marienplatz 8, 80331 München",
        location: "München, Bayern",
        energy_type: "solar",
        description: "Traditioneller Handwerksbetrieb mit moderner Solartechnik. Seit 20 Jahren verlässlicher Partner für Photovoltaik-Anlagen in ganz Bayern.",
        specialties: ["Dachintegration", "Fassadenmontage", "Carports", "Gewerbeanlagen"],
        certifications: ["Handwerkskammer München", "BSW Solar", "TÜV Bayern"],
        experience_years: 20,
        rating: 4.6,
        review_count: 189,
        verified: true,
        status: "active",
        service_areas: ["München", "Rosenheim", "Freising", "Garmisch-Partenkirchen"],
        languages: ["Deutsch", "Bayerisch"],
        latitude: 48.1372,
        longitude: 11.5755
      }
    ];

    // Insert the proper German installer data
    const { data, error: insertError } = await supabase
      .from('installers')
      .insert(germanInstallers)
      .select();

    if (insertError) {
      console.error('Error inserting German installer data:', insertError);
      console.error('Insert error details:', {
        message: insertError.message,
        details: insertError.details,
        code: insertError.code,
        hint: insertError.hint
      });
      throw insertError;
    }

    console.log('German installer data inserted successfully:', data?.length, 'installers added');
    return data;
    
  } catch (error) {
    console.error('Error in cleanAndReseedDatabase:', error);
    throw error;
  }
};