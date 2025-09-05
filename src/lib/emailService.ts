// Simple email service for form submissions
// This uses a free webhook service to send emails

export const sendCompanyRegistrationEmail = async (formData: any) => {
  const emailData = {
    to: 'knuth.timo@gmail.com',
    subject: 'Neue Unternehmensanmeldung - EnergieProfis',
    message: `
Neue Unternehmensanmeldung

Firmenname: ${formData.companyName}
Ansprechpartner: ${formData.contactPerson}
E-Mail: ${formData.email}
Telefon: ${formData.phone}
Website: ${formData.website || 'Nicht angegeben'}
PLZ: ${formData.zipCode}
Stadt: ${formData.city}
Energiearten: ${formData.energyTypes.join(', ')}
Leistungen: ${formData.services.join(', ')}
Jahre Erfahrung: ${formData.experience}
Einzugsgebiet: ${formData.coverageArea || 'Nicht angegeben'}
Kontaktpräferenz: ${formData.contactPreference}
Newsletter: ${formData.newsletter ? 'Ja' : 'Nein'}

Unternehmensbeschreibung:
${formData.description}
    `
  };

  try {
    // Log the data for now (this will show in console)
    console.log('=== NEUE UNTERNEHMENSANMELDUNG ===');
    console.log('📧 An: knuth.timo@gmail.com');
    console.log('📋 Betreff: Neue Unternehmensanmeldung - EnergieProfis');
    console.log('📄 Daten:', formData);
    console.log('=====================================');
    
    // Try to send email using EmailJS
    try {
      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_09n6j0x',
          template_id: 'template_a5sc93m',
          user_id: 'aAqMJarAgKThnW487',
          template_params: {
            to_email: emailData.to,
            subject: emailData.subject,
            message: emailData.message,
            company_name: formData.companyName,
            contact_person: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            website: formData.website || 'Nicht angegeben',
            zip_code: formData.zipCode,
            city: formData.city,
            energy_types: formData.energyTypes.join(', '),
            services: formData.services.join(', '),
            experience: formData.experience,
            coverage_area: formData.coverageArea || 'Nicht angegeben',
            contact_preference: formData.contactPreference,
            newsletter: formData.newsletter ? 'Ja' : 'Nein',
            description: formData.description
          }
        })
      });
      
      if (emailResponse.ok) {
        console.log('✅ E-Mail erfolgreich an knuth.timo@gmail.com gesendet!');
        return { success: true };
      } else {
        const errorText = await emailResponse.text();
        console.log('⚠️ E-Mail-Service Fehler:', emailResponse.status, errorText);
        console.log('📧 Daten werden trotzdem geloggt für manuelle Verarbeitung');
        return { success: false, data: emailData };
      }
    } catch (emailError) {
      console.log('⚠️ E-Mail-Service nicht verfügbar, aber Daten wurden geloggt');
      return { success: false, data: emailData };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    console.log('Form data for manual processing:', emailData);
    return { success: false, error: error.message, data: emailData };
  }
};

// Alternative: Simple console logging for development
export const logCompanyRegistration = (formData: any) => {
  console.log('=== NEUE UNTERNEHMENSANMELDUNG ===');
  console.log('Firmenname:', formData.companyName);
  console.log('Ansprechpartner:', formData.contactPerson);
  console.log('E-Mail:', formData.email);
  console.log('Telefon:', formData.phone);
  console.log('Website:', formData.website || 'Nicht angegeben');
  console.log('PLZ:', formData.zipCode);
  console.log('Stadt:', formData.city);
  console.log('Energiearten:', formData.energyTypes.join(', '));
  console.log('Leistungen:', formData.services.join(', '));
  console.log('Jahre Erfahrung:', formData.experience);
  console.log('Einzugsgebiet:', formData.coverageArea || 'Nicht angegeben');
  console.log('Kontaktpräferenz:', formData.contactPreference);
  console.log('Newsletter:', formData.newsletter ? 'Ja' : 'Nein');
  console.log('Unternehmensbeschreibung:', formData.description);
  console.log('=====================================');
};
