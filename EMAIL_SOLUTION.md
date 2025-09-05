# E-Mail-Lösung für Unternehmensanmeldungen

## Problem
Webhook.site empfängt nur HTTP-Requests, aber leitet keine E-Mails weiter.

## Lösung: EmailJS (Kostenlos & Einfach)

### Schritt 1: EmailJS Account erstellen
1. Gehen Sie zu [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klicken Sie auf "Sign Up" (kostenlos)
3. Erstellen Sie ein Konto

### Schritt 2: E-Mail-Service einrichten
1. **Dashboard** → **Email Services** → **Add New Service**
2. Wählen Sie **Gmail**
3. Verbinden Sie Ihr Gmail-Konto (`knuth.timo@gmail.com`)
4. Notieren Sie sich die **Service ID** (z.B. `service_xxxxxxx`)

### Schritt 3: E-Mail-Vorlage erstellen
1. **Dashboard** → **Email Templates** → **Create New Template**
2. **Template ID:** `template_company_registration`
3. **Subject:** `Neue Unternehmensanmeldung - EnergieProfis`
4. **Content:**
```
Neue Unternehmensanmeldung

Firmenname: {{company_name}}
Ansprechpartner: {{contact_person}}
E-Mail: {{email}}
Telefon: {{phone}}
Website: {{website}}
PLZ: {{zip_code}}
Stadt: {{city}}
Energiearten: {{energy_types}}
Leistungen: {{services}}
Jahre Erfahrung: {{experience}}
Einzugsgebiet: {{coverage_area}}
Kontaktpräferenz: {{contact_preference}}
Newsletter: {{newsletter}}

Unternehmensbeschreibung:
{{description}}
```

### Schritt 4: User ID finden
1. **Dashboard** → **Account** → **General**
2. Kopieren Sie Ihre **Public Key** (User ID)

### Schritt 5: Code aktualisieren
Ersetzen Sie in `src/lib/emailService.ts`:
```typescript
user_id: 'YOUR_EMAILJS_USER_ID' // Mit Ihrer echten User ID
```

## Alternative: Zapier (Automatisiert)

### Schritt 1: Zapier Account
1. Gehen Sie zu [https://zapier.com](https://zapier.com)
2. Erstellen Sie ein kostenloses Konto

### Schritt 2: Zap erstellen
1. **Create Zap**
2. **Trigger:** "Webhooks by Zapier" → "Catch Hook"
3. **Action:** "Gmail" → "Send Email"
4. **Konfiguration:**
   - **To:** `knuth.timo@gmail.com`
   - **Subject:** `Neue Unternehmensanmeldung - EnergieProfis`
   - **Body:** Verwenden Sie die Webhook-Daten

### Schritt 3: Webhook-URL ersetzen
Ersetzen Sie die Webhook-URL in `src/lib/emailService.ts` mit der Zapier-URL.

## Sofortige Lösung: Console Logging

Bis Sie einen E-Mail-Service einrichten, werden alle Daten in der Browser-Konsole geloggt:
1. Öffnen Sie F12 (Entwicklertools)
2. Gehen Sie zum "Console" Tab
3. Alle Formular-Daten werden dort angezeigt

## Status
✅ **Webhook funktioniert** - Daten werden empfangen  
⚠️ **E-Mail-Weiterleitung** - Benötigt E-Mail-Service  
✅ **PostHog Analytics** - Funktioniert  
✅ **Dropdown ohne Animation** - Funktioniert  
